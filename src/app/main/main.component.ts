import {Component, OnInit} from '@angular/core';
import {Videolist} from '../Models/videolist.model';
import {VideosService} from '../services/videos.service';


@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent {
    constructor(public data: VideosService) {
    }
    id = '2r5IbVJRvH4';
    private player;
    public ytEvent;

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
