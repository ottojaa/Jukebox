import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Videolist} from '../Models/videolist.model';

@Injectable({
    providedIn: 'root'
})
export class VideosService {
    constructor(private http: HttpClient) {
    }

    public key: 'AIzaSyBmxXuhbCdCMj8A6lKbAx-o9X0n7ZAG5PI';
    query: string;
    results = [];
    videoids = new Array();
    nextPageToken: string;
    searchDone: false;

    public getVideos() {
        const finalURL = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyBmxXuhbCdCMj8A6lKbAx-o9X0n7ZAG5PI&part=snippet' +
            ',id&order=date&maxResults=8&q=' + this.query;
        console.log(finalURL);

        return this.http.get<Videolist>(finalURL).subscribe(response => {

            console.log(response);
            const ytresults = response['items'];
            const nextToken = response['nextPageToken'];
            console.log(nextToken);
            this.nextPageToken = ytresults.nextPageToken;
            this.results = response['items'];
            ytresults.forEach(res => {
                this.videoids.push(res.id.videoId);
            });
            return this.videoids;
        });
    }

}
