import {Component, OnInit} from '@angular/core';
import {VideosService} from '../services/videos.service';
import {ViewEncapsulation} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class TopbarComponent {
    id = '2r5IbVJRvH4';
    private player;
    public ytEvent;
    public snippet: any;
    public token: string;

    constructor(public data: VideosService) {
    }

    searchForm() {
        this.data.getVideos().subscribe(data => {
            this.data.results = data['items'];
            console.log(this.data.results);
        });
    }
    addToQueue() {
    }

    onStateChange(event) {
        this.ytEvent = event.data;
        console.log(event.data);
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
}
