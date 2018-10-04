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

    public token: string;
    constructor(public data: VideosService) {
    }
    searchForm() {
        this.data.getVideos();
        this.token = this.data.nextPageToken;
    }

}
