import {Component, OnDestroy, OnInit} from '@angular/core';
import {VideosService} from '../services/videos.service';
import {ViewEncapsulation} from '@angular/core';
import {ResizedEvent} from 'angular-resize-event/resized-event';
import 'firebase/firestore';
import * as firebase from 'firebase';
import {AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection} from '@angular/fire/firestore';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatDialog, MatDialogRef, MatDialogConfig} from '@angular/material';
import {DialogComponent} from '../dialog/dialog.component';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';

interface User {
    uid: string;
    email: string;
    playlistId: any;
}


@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.scss'],
    animations: [
        trigger('slideInOut', [
            state('out', style({
                opacity: '0',
                overflow: 'hidden',
                height: '0px',
                width: '100%'
            })),
            state('in', style({
                opacity: '1',
                overflow: 'hidden',
                height: '*',
                width: '100%'
            })),
            transition('in => out', animate('400ms ease-in-out')),
            transition('out => in', animate('400ms ease-in-out'))
        ])
    ],
    encapsulation: ViewEncapsulation.None
})
export class TopbarComponent implements OnInit {
    id = 'm7Bc3pLyij0';
    private player;
    public ytEvent;
    public lista: any = [];
    public current: any = [];
    videoId = new Array();
    searchDone = false;
    width: any;
    playlistName;
    user;
    i: string;
    lastIndex = 0;
    public messageSuccess: any;
    public jono = [];
    public pageLoaded = false;
    addToQueue: boolean;
    public playerStatus: string;
    open;
    playlistOpen;
    addToThisPlaylist;
    tempId;
    songIndex;
    playlist;
    condition = [];
    playlistCondition = [];
    private sub;

    constructor(public data: VideosService,
                private afs: AngularFirestore,
                public ngx: NgxSmartModalService,
                public af: AngularFireAuth,
                public dialog: MatDialog,
                private fireAuth: AngularFireAuth,
                private router: Router,) {
    }


    createPlaylist() {
        this.tempId = this.afs.createId();
        this.afs.collection('users').doc(this.data.user.uid).collection('playlists').doc(this.tempId).set({
            name: this.playlistName,
            created: new Date(),
            id: this.tempId,
        });
        this.playlistName = '';
        this.playlist = true;
    }

    showPlayLists() {
        this.playlistOpen = this.playlistOpen === 'out' ? 'in' : 'out';
    }

    goToLogin() {
        this.router.navigate(['']);
    }

    openDialog(i, x) {
        this.data.deletableIndex = i;
        this.data.deleteFromPlaylist = true;
        this.data.deleteId = x;
        const dialogConfig = new MatDialogConfig();

        dialogConfig.autoFocus = true;
        const dialogRef = this.dialog.open(DialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
            if (this.data.deletableIndex === this.lastIndex ) {
                this.condition = [];
            }
            console.log(result);
        });
    }

    addToPlaylist(playListIndex, songIndex) {
        this.tempId = this.afs.createId();
        this.addToThisPlaylist = this.data.playLists[playListIndex].id;
        this.afs.collection('users')
            .doc(this.data.user.uid)
            .collection('playlists')
            .doc(this.addToThisPlaylist)
            .collection(this.data.playLists[playListIndex].name).doc(this.tempId).set({
            name: this.data.results[songIndex].snippet.title,
            id: this.data.results[songIndex].id.videoId,
            thumbnail: this.data.results[songIndex].snippet.thumbnails.default.url,
            index: this.tempId,
            timeAdded: Date.now(),
        });
    }

    getSongIndex(index) {
        this.songIndex = index;
    }

    /*onResized(event: ResizedEvent): void {
        this.width = event.newWidth;
        this.height = event.newHeight;
        if (this.pageLoaded === true) {
            const k = document.querySelector('[title="YouTube video player"]') as HTMLElement;
            k.style.width = this.width + 'px';
            k.style.height = ((this.width) * 0.75) + 'px';
            console.log(k.style.width);
        }
    }*/

    edit() {
        this.open = this.open === 'out' ? 'in' : 'out';
    }

    searchForm() {
        this.data.pageIndex = 1;
        this.data.results = [];
        this.videoId = [];
        this.data.nextPageToken = null;
        this.data.previousPageToken = null;
        this.data.getVideos().subscribe(data => {
            this.data.results = data['items'];
            this.data.nextPageToken = data.nextPageToken;
            this.searchDone = true;
            this.data.results.forEach(res => {
                this.videoId.push(res.id.videoId);
            });
        });
    }

    nextPage() {
        this.data.results = [];
        this.videoId = [];
        this.data.getNextPage().subscribe(data => {
            this.data.results = data['items'];
            this.data.nextPageToken = data.nextPageToken;
            if (data.prevPageToken) {
                this.data.previousPageToken = data.prevPageToken;
            }
            console.log(this.data.nextPageToken);
            console.log(this.data.previousPageToken);
            this.data.pageIndex += 1;
            this.searchDone = true;
            this.data.results.forEach(res => {
                this.videoId.push(res.id.videoId);
            });
        });
    }

    previousPage() {
        this.data.results = [];
        this.videoId = [];
        this.data.getPreviousPage().subscribe(data => {
            this.data.results = data['items'];
            this.data.nextPageToken = data.nextPageToken;
            this.data.previousPageToken = data.prevPageToken;
            this.data.pageIndex -= 1;
            this.searchDone = true;
            this.data.results.forEach(res => {
                this.videoId.push(res.id.videoId);
            });
        });
    }

    getThisVideo(index) {
        this.condition = [];
        if (this.lastIndex !== index) {
            this.condition[this.lastIndex] = true;
        }
        this.player.loadVideoById(this.jono[index]);
        this.data.getQueue(this.jono[index]).subscribe(res => {
            this.data.current = res['items'];
        });
        this.lastIndex = index;
        this.data.jonoId = index + 1;
        this.condition[index] = false;
        console.log(this.condition[index]);
    }

    getPlaylistVideo(index) {
        this.condition = [];
        if (this.lastIndex !== index) {
            this.condition[this.lastIndex] = true;
        }
        this.player.loadVideoById(this.data.currentPlaylist[index].id);
        this.data.getQueue(this.data.currentPlaylist[index].id).subscribe(res => {
            this.data.current = res['items'];
        });
        this.lastIndex = index;
        this.data.playListSongId = index + 1;
        this.condition[index] = false;
    }

    onStateChange(event) {
        console.log(this.data.jonoId);
        this.ytEvent = event.data;
        if (this.ytEvent === 0) {
            this.playerStatus = 'Not loaded';
        }
        if (this.ytEvent === 1) {
            this.playerStatus = 'Now playing';
            const i = document.getElementById('status');
            i.innerHTML = '';
            i.style.padding = '0px';
            i.style.borderRadius = '0px';
            i.style.width = '0%';
            i.style.opacity = '1';
        }
        if (this.ytEvent === 2) {
            this.playerStatus = 'Paused';
        }
        if (this.ytEvent === 3) {
            this.playerStatus = 'Buffering';
        }
        if (event.data === 0 && this.jono) {
            console.log(this.data.jonoId);
            this.id = this.jono[this.data.jonoId];
            this.lastIndex = this.data.jonoId;
            this.data.jonoId += 1;
            this.data.getQueue(this.id).subscribe(res => {
                this.data.current = res['items'];
                console.log(this.data.current);
            });
            this.player.loadVideoById(this.id);
        }
    }

    playListChange(event) {
        this.ytEvent = event.data;
        if (this.ytEvent === 0) {
            this.playerStatus = 'Not loaded';
        }
        if (this.ytEvent === 1) {
            this.playerStatus = 'Now playing';
            const i = document.getElementById('status');
            i.innerHTML = '';
            i.style.padding = '0px';
            i.style.borderRadius = '0px';
            i.style.width = '0%';
            i.style.opacity = '1';
        }
        if (this.ytEvent === 2) {
            this.playerStatus = 'Paused';
        }
        if (this.ytEvent === 3) {
            this.playerStatus = 'Buffering';
        }
        if (event.data === 0 && this.playlist) {
            this.id = this.data.currentPlaylist[this.data.playListSongId].id;
            this.condition = [];
            this.lastIndex = this.data.playListSongId;
            this.condition[this.lastIndex - 1] = true;
            this.condition[this.lastIndex] = false;
            this.data.playListSongId += 1;
            this.player.loadVideoById(this.id);
        }
    }

    skipCurrent() {
        if (this.playlist !== true) {
            if (this.jono[this.data.jonoId]) {
                this.condition[this.lastIndex] = true;
                this.lastIndex = this.data.jonoId;
                this.condition[this.lastIndex] = false;
                this.id = this.jono[this.data.jonoId];
                this.player.loadVideoById(this.id);
                this.data.getQueue(this.id).subscribe(res => {
                    this.data.current = res['items'];
                    this.data.jonoId += 1;
                });
            } else {
                this.data.getQueue(this.id).subscribe(res => {
                    this.data.current = res['items'];
                });
                /*const k = document.getElementById('listEnd');
                k.innerHTML = 'Playlist end reached';
                k.style.background = 'rgba(236, 0, 107, 0.47)';
                k.style.padding = '4px';
                k.style.borderRadius = '5px';
                k.style.width = '30%';
                k.style.opacity = '1';*/
            }
        } else {
            if (this.data.currentPlaylist[this.data.playListSongId] + 1) {
                console.log(this.data.currentPlaylist);
                this.lastIndex = this.data.playListSongId;
                console.log(this.lastIndex);
                this.condition = [];
                this.player.loadVideoById(this.data.currentPlaylist[this.data.playListSongId].id);
                /* lastindex = this.data.playlistongid - i? */
                console.log(this.data.currentPlaylist[this.lastIndex].id);
                this.data.getQueue(this.data.currentPlaylist[this.lastIndex].id).subscribe(res => {
                    this.data.current = res['items'];
                    console.log(this.data.current);
                    console.log(this.data.currentPlaylist);
                });
                this.condition[this.lastIndex] = false;
                this.data.playListSongId += 1;
                this.data.deleteFromPlaylist = false;
            } else {
                console.log('lista lobbu');
            }
        }
    }

    /*autoResize() {
        const width = document.getElementById('vasen').clientWidth;
        const k = document.querySelector('[title="YouTube video player"]') as HTMLElement;
        k.style.width = this.width + 'px';
        k.style.height = ((this.width) * 0.75) + 'px';
        console.log(document.getElementById('vasen').clientWidth);
    }*/

    passIndex(index) {
        this.addToQueue = true;
        this.i = this.videoId[index];
        if (this.jono.length < 30) {
            if (!this.jono.includes(this.i)) {
                this.jono.push(this.i);
                console.log(this.jono);
                document.getElementById('listEnd').innerHTML = '';
                document.getElementById('listEnd').style.margin = '0px';
            } else {
                this.addToQueue = false;
                document.getElementById('listEnd').innerHTML = 'Video is already on list!';
                document.getElementById('listEnd').style.margin = '10px';
            }
        }
        console.log(this.jono);
        console.log(this.i);
        if (this.addToQueue === true) {
            this.data.getQueue(this.i).subscribe(data => {
                if (this.lista.length < 30) {
                    this.lista.push(data['items']);
                }
                if (this.lista.length === 30) {
                    document.getElementById('listEnd').innerHTML = 'Playlist Full!';
                    document.getElementById('listEnd').style.margin = '10px';
                }
            });
        }
        setTimeout(() => {
            const song = document.querySelector('#playlist');
            song.scrollTop = song.scrollHeight - song.clientHeight;
        }, 300);
    }

    play(index) {
        this.player.loadVideoById(this.videoId[index]);
        this.data.getQueue(this.videoId[index]).subscribe(res => {
            this.data.current = res['items'];
        });
    }

    deleteEntry(index) {
        this.lista.splice(index, 1);
        this.jono.splice(index, 1);
        if (index < this.lastIndex) {
            this.lastIndex -= 1;
        }
        if (index === this.lastIndex) {
            this.condition = [];
        }
        console.log(this.data.jonoId);
        console.log(this.lista);
        document.getElementById('listEnd').innerHTML = '';
        document.getElementById('listEnd').style.margin = '0px';
    }


    savePlayer(player) {
        this.player = player;
    }

    playVideo() {
        this.player.playVideo();
    }

    pauseVideo() {
        this.player.pauseVideo();
    }

    createUserDoc() {
        console.log(this.data.user);
        const tempId = this.afs.createId();
        const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${this.data.user.uid}`);
        const data: User = {
            uid: this.data.user.uid,
            email: this.data.user.email,
            playlistId: tempId,
        };
        return userRef.set(data);
    }

    async playListContent(index) {
        this.playlistCondition = [];
        this.data.getPlayListItems(index).subscribe(data => {
            this.data.currentPlaylist = data;
            console.log(this.data.currentPlaylist);
            this.data.currentPlaylistName = this.data.playLists[index].name;
            this.data.currentPlaylistId = this.data.playLists[index].id;
            console.log(this.data.currentPlaylistId);
        });
        this.playlist = true;
        this.playlistCondition[index] = false;
        this.condition = [];
    }


    async ngOnInit() {
        console.log(this.data.user);
        this.data.getTopVideos().subscribe(data => {
            this.data.results = data['items'];
            console.log(this.data.results);
            console.log(this.data.results);
            this.id = this.data.results[0].id.videoId;
            this.data.results.forEach(res => {
                this.videoId.push(res.id.videoId);
            });
            this.data.getQueue(this.id).subscribe(res => {
                this.data.current = res['items'];
                console.log(this.data.current);
            });
        });
        this.data.user = firebase.auth().currentUser;
        if (this.data.user) {
            console.log('logged in as => ', this.data.user.displayName);
            this.data.displayName = this.data.user.displayName;
        }
        const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${this.data.user.uid}`);
        userRef.ref.get()
            .then(doc => {
                if (!doc.exists) {
                    console.log('tee uus playlisti');
                    this.createUserDoc();
                } else {
                    console.log('playlist on olemassa');
                    this.playlist = true;
                }
            });
        this.data.getPlayLists().subscribe((playlists => {
            this.data.playLists = playlists;
            console.log(this.data.playLists);
        }));
        this.pageLoaded = true;
        this.messageSuccess = true;
        this.open = 'out';
        this.playlistOpen = 'in';
    }
}