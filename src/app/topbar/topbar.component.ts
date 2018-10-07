import {Component, OnInit} from '@angular/core';
import {VideosService} from '../services/videos.service';
import {ViewEncapsulation} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Videolist} from '../Models/videolist.model';

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class TopbarComponent implements OnInit {
    id = '2r5IbVJRvH4';
    private player;
    public ytEvent;
    public lista: any = [];
    public token: string;
    videoId = new Array();
    public jono = [];
    public playerStatus: string;

    constructor(public data: VideosService) {
    }

    searchForm() {
        this.data.getVideos().subscribe(data => {
            this.data.results = data['items'];
            console.log(this.data.results);
            this.data.results.forEach(res => {
                this.videoId.push(res.id.videoId);
                console.log(this.videoId);
            });
        });
    }

    onStateChange(event) {
        this.ytEvent = event.data;
        console.log(this.ytEvent);
        if (this.ytEvent = 0) {
            this.playerStatus = 'Not loaded';
        }
        if (this.ytEvent = 1) {
            this.playerStatus = 'Now playing';
        }
        if (this.ytEvent = 2) {
            this.playerStatus = 'Paused';
        }
        if (this.ytEvent = 3) {
            this.playerStatus = 'Buffering';
        }
        console.log(event.data);
    }

    passIndex(index) {
        this.jono.push(this.videoId[index]);
        console.log(index);
        let num = index;
        const i = this.videoId[index];
        console.log(i);
        this.data.getQueue(i).subscribe(data => {
            console.log(data['items']);
            this.lista.push(data['items']);
            console.log(this.lista);
        });
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
    }
}
