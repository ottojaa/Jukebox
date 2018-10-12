import {Component, OnInit} from '@angular/core';
import {VideosService} from '../services/videos.service';
import {ViewEncapsulation} from '@angular/core';
import {ResizedEvent} from 'angular-resize-event/resized-event';


@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class TopbarComponent implements OnInit {
    id = '_Yhyp-_hX2s';
    private player;
    public ytEvent;
    public lista: any = [];
    public current: any = [];
    videoId = new Array();
    searchDone = false;
    width: any;
    height: any;
    title: any;
    i: string;
    lastIndex = 0;
    public messageSuccess: any;
    public jono = [];
    public pageLoaded = false;
    addToQueue: boolean;
    public playerStatus: string;
    currentSearch: string;

    constructor(public data: VideosService) {
    }

    onResized(event: ResizedEvent): void {
        this.width = event.newWidth;
        this.height = event.newHeight;
        if (this.pageLoaded === true) {
            const k = document.querySelector('[title="YouTube video player"]') as HTMLElement;
            k.style.width = this.width + 'px';
            k.style.height = ((this.width) * 0.75) + 'px';
            console.log(k.style.width);
        }
    }

    searchForm() {
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
        this.player.loadVideoById(this.jono[index]);
        this.data.getQueue(this.jono[index]).subscribe(res => {
            this.data.current = res['items'];
        });
        const x = <any>document.getElementById('parent').querySelectorAll('.mat-list-item');
        x[index].style.backgroundColor = 'rgba(45, 144, 56, 0.92)';
        x[this.lastIndex].style.backgroundColor = '#22242a';
        this.lastIndex = index;
        this.data.jonoId = index + 1;
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
            const x = <any>document.getElementById('parent').querySelectorAll('mat-list-item');
            x[this.data.jonoId].style.backgroundColor = 'rgba(45, 144, 56, 0.92)';
            if (this.lastIndex !== this.data.jonoId) {
                x[this.lastIndex].style.backgroundColor = '#22242a';
            }
            this.id = this.jono[this.data.jonoId];
            this.lastIndex = this.data.jonoId;
            this.data.jonoId += 1;
            this.data.getQueue(this.id).subscribe(res => {
                this.data.current = res['items'];
                console.log(this.data.current);
            });
            this.player.loadVideoById(this.id);
        }
        this.autoResize();
    }

    skipCurrent() {
        console.log(this.data.jonoId);
        if (this.jono[this.data.jonoId]) {
            const x = <any>document.getElementById('parent').querySelectorAll('mat-list-item');
            x[this.data.jonoId].style.backgroundColor = 'rgba(45, 144, 56, 0.92)';
            if (this.lastIndex !== this.data.jonoId) {
                x[this.lastIndex].style.backgroundColor = '#22242a';
            }
            this.lastIndex = this.data.jonoId;
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
            const i = document.getElementById('status');
            i.innerHTML = 'Playlist end reached';
            i.style.background = 'rgba(236, 0, 107, 0.47)';
            i.style.padding = '4px';
            i.style.borderRadius = '5px';
            i.style.width = '30%';
            i.style.opacity = '1';
        }
        this.autoResize();
    }

    autoResize() {
        const width = document.getElementById('vasen').clientWidth;
        const k = document.querySelector('[title="YouTube video player"]') as HTMLElement;
        k.style.width = this.width + 'px';
        k.style.height = ((this.width) * 0.75) + 'px';
        console.log(document.getElementById('vasen').clientWidth);
    }

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

    deleteEntry(index) {
        this.lista.splice(index, 1);
        this.jono.splice(index, 1);
        if (index < this.lastIndex) {
            this.lastIndex -= 1;
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

    ngOnInit() {
        this.data.getTopVideos().subscribe(data => {
            this.data.results = data['items'];
            console.log(this.data.results);
            this.data.results.forEach(res => {
                this.videoId.push(res.id.videoId);
            });
        });
        this.data.getQueue(this.id).subscribe(res => {
            this.data.current = res['items'];
        });
        this.pageLoaded = true;
        this.messageSuccess = true;

        setTimeout(() => {
            this.autoResize();
            console.log('testi');
        }, 700);
    }
}
