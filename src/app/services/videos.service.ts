import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Videolist} from '../Models/videolist.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import {NgZone} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class VideosService {
    constructor(private http: HttpClient, private db: AngularFirestore, public afAuth: AngularFireAuth, private router: Router, private ngZone: NgZone) {
    }
    query: string;
    results = new Array();
    public nextPageToken: string;
    public previousPageToken: string;
    currentSearch: string;
    pageIndex = 1;
    jonoId = 0;
    current = new Array();

    googleLogin() {
        return new Promise<any>((resolve, reject) => {
            const provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('profile');
            provider.addScope('email');
            this.afAuth.auth
                .signInWithPopup(provider)
                .then(res => {
                    console.log(res);
                    resolve(res);
                    this.ngZone.run(() => (this.router.navigate(['/topbar'])));
                }, err => {
                    console.log(err);
                    reject(err);
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
