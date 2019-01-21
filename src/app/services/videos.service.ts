import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Videolist} from '../Models/videolist.model';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import * as firebase from 'firebase';
import {NgZone} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class VideosService {
    constructor(private http: HttpClient,
                private db: AngularFirestore,
                public afAuth: AngularFireAuth,
                private router: Router,
                private ngZone: NgZone,
                private afs: AngularFirestore) {
        this.afAuth.authState.subscribe(user => {
            console.log('observable toimii');
            if (user) {
                localStorage.setItem('user', JSON.stringify(this.user.uid));
                JSON.parse(localStorage.getItem('user'));
                console.log('Logged in succesfully');
            } else {
                console.log(localStorage.getItem('user'));
                localStorage.setItem('user', null);
                JSON.parse(localStorage.getItem('user'));
            }
        });
        firebase.auth().onAuthStateChanged((user => {
            console.log('onAuth:', user);
        }));
    }

    query: string;
    results = new Array();
    public nextPageToken: string;
    public previousPageToken: string;
    currentSearch: string;
    pageIndex = 1;
    playLists;
    jonoId = 0;
    playListSongId = 0;
    user;
    current = new Array();
    collectionName;
    currentPlaylist;
    currentPlaylistName;
    currentPlaylistId;
    deletable;
    userData;
    displayName;
    deleteId;
    playListToDelete;
    deleteFromPlaylist;
    dialogRef;
    deletableIndex;
    authenticated;

    googleLogin() {
        return new Promise<any>((resolve, reject) => {
            const provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('profile');
            provider.addScope('email');
            this.afAuth.auth
                .signInWithPopup(provider)
                .then(res => {
                    console.log(res);
                    localStorage.setItem('user', this.afAuth.auth.currentUser.uid);
                    resolve(res);
                    this.ngZone.run(() => (this.router.navigate(['/topbar'])));
                }, err => {
                    console.log(err);
                    reject(err);
                });
        });
    }
    signOut() {
        this.afAuth.auth.signOut()
            .then(() => {
                this.router.navigate(['']);
                console.log('toimisitko');
                localStorage.removeItem('user');
                window.localStorage.removeItem('firebase:session::http://localhost:4200');
                /*window.localStorage.removeItem('firebase:session::jukebox-44701.firebaseapp.com');*/

            });
    }


    getPlayLists() {
        return this.afs.collection('users')
            .doc(this.user.uid)
            .collection('playlists').valueChanges();
    }

    getPlayListItems(index) {
        this.collectionName = this.playLists[index].name;
        return this.afs.collection('users')
            .doc(this.user.uid)
            .collection('playlists')
            .doc(this.playLists[index].id)
            .collection(this.collectionName, ref => ref.orderBy('timeAdded')).valueChanges();
    }

    getDeletable(index) {
        this.collectionName = this.currentPlaylist[index].index;
        console.log(this.collectionName);
        console.log(this.currentPlaylistName);
        console.log(this.currentPlaylistId);
        console.log(this.collectionName);
        this.deletable = this.afs.collection('users')
            .doc(this.user.uid)
            .collection('playlists')
            .doc(this.currentPlaylistId)
            .collection(this.currentPlaylistName)
            .doc(this.collectionName).delete();
        console.log(this.deletable);

    }

    deletePlayList(index) {
        this.playListToDelete = this.playLists[index].id;
        this.afs.collection('users')
            .doc(this.user.uid)
            .collection('playlists')
            .doc(this.playListToDelete).delete();
        this.afs.collection('users')
            .doc(this.user.uid)
            .collection('playlists')
            .doc(this.playListToDelete).collection(this.playLists[index].name).get().subscribe(refs => {
                refs.forEach(response => {
                    console.log(response);
                    response.ref.delete();
                });
            });

    }

    getVideos() {
        const finalURL = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyBmxXuhbCdCMj8A6lKbAx-o9X0n7ZAG5PI&part=snippet' +
            ',id&type=video&order=relevance&maxResults=20&q=' + this.query;
        console.log(finalURL);
        this.currentSearch = this.query;
        return this.http.get<Videolist>(finalURL);
    }

    getQueue(index) {
        const URL = 'https://www.googleapis.com/youtube/v3/videos?key=AIzaSyBmxXuhbCdCMj8A6lKbAx-o9X0n7ZAG5PI&type=video&part=snippet' +
            ',contentDetails,statistics,status&id='
            + index;
        console.log(URL);
        console.log(this.current);
        return this.http.get<Videolist>(URL);
    }

    getTopVideos() {
        const finalURL = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyBmxXuhbCdCMj8A6lKbAx-o9X0n7ZAG5PI' +
            '&part=snippet,id&type=video&order=relevance&maxResults=20&chart=mostPopular';
        return this.http.get<Videolist>(finalURL);
    }

    getNextPage() {
        const finalURL = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyBmxXuhbCdCMj8A6lKbAx-o9X0n7ZAG5PI&part=snippet' +
            ',id&type=video&order=relevance&pageToken=' + this.nextPageToken + '&maxResults=20&q=' + this.query;
        console.log(finalURL);
        return this.http.get<Videolist>(finalURL);
    }

    getPreviousPage() {
        const finalURL = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyBmxXuhbCdCMj8A6lKbAx-o9X0n7ZAG5PI&part=snippet' +
            ',id&type=video&order=relevance&pageToken=' + this.previousPageToken + '&maxResults=20&q=' + this.query;
        console.log(finalURL);
        return this.http.get<Videolist>(finalURL);
    }
}
