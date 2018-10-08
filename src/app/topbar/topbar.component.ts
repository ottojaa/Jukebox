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
    public messageSuccess: any;
    public jono = [];
    public pageLoaded = false;
    addToQueue: boolean;
    public playerStatus: string;

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
        console.log(this.data.results);
        this.data.getVideos().subscribe(data => {
            this.data.results = data['items'];
            console.log(this.data.results);
            this.searchDone = true;
            this.data.results.forEach(res => {
                this.videoId.push(res.id.videoId);
            });
        });
    }

    onPlayerReady(event) {
        this.title = event.target.getVideoData().title;
    }

    onStateChange(event) {
        this.title = event.target.getVideoData().title;
        this.ytEvent = event.data;
        console.log(this.ytEvent);
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
        if (event.data === 0 && this.jono[0]) {
            this.id = this.jono[0];
            this.data.getQueue(this.id).subscribe(res => {
                this.data.current = res['items'];
            });
            this.player.loadVideoById(this.id);
            this.jono.splice(0, 1);
            this.lista.splice(0, 1);
            this.title = event.target.getVideoData().title;
            console.log(this.jono);
        }
        console.log(event.data);
        console.log(this.id);
    }

    skipCurrent() {
        if (this.jono[0]) {
            this.id = this.jono[0];
            this.player.loadVideoById(this.id);
            this.jono.splice(0, 1);
            this.lista.splice(0, 1);
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
        if (this.jono.length < 10) {
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
                console.log(this.lista);
                console.log(this.jono[index]);
                if (this.lista.length < 10) {
                    this.lista.push(data['items']);
                }
                if (this.lista.length === 10) {
                    document.getElementById('listEnd').innerHTML = 'Playlist Full!';
                    document.getElementById('listEnd').style.margin = '10px';
                }
            });
        }
    }

    deleteEntry(index) {
        this.lista.splice(index, 1);
        this.jono.splice(index, 1);
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
