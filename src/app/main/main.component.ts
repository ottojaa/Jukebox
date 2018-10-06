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
}
