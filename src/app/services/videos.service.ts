import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Videolist} from '../Models/videolist.model';

@Injectable({
    providedIn: 'root'
})
export class VideosService {
    constructor(private http: HttpClient) {
    }
    query: string;
    results = new Array();
    public nextPageToken: string;
    public previousPageToken: string;
    currentSearch: string;
    pageIndex = 1;
    jonoId = 0;
    current = new Array();

    getVideos() {
        const finalURL = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyBmxXuhbCdCMj8A6lKbAx-o9X0n7ZAG5PI&part=snippet' +
            ',id&order=relevance&maxResults=7&q=' + this.query;
        console.log(finalURL);
        this.currentSearch = this.query;
        return this.http.get<Videolist>(finalURL);
    }

    getQueue(index) {
        const URL = 'https://www.googleapis.com/youtube/v3/videos?key=AIzaSyBmxXuhbCdCMj8A6lKbAx-o9X0n7ZAG5PI&part=snippet' +
            ',contentDetails,statistics,status&id='
            + index;
        console.log(URL);
        return this.http.get<Videolist>(URL);
    }
    getTopVideos() {
        const finalURL = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyBmxXuhbCdCMj8A6lKbAx-o9X0n7ZAG5PI' +
            '&part=snippet,id&order=relevance&maxResults=7&chart=mostPopular';
        return this.http.get<Videolist>(finalURL);
    }
    getNextPage() {
        const finalURL = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyBmxXuhbCdCMj8A6lKbAx-o9X0n7ZAG5PI&part=snippet' +
            ',id&order=relevance&pageToken=' + this.nextPageToken + '&maxResults=7&q=' + this.query;
        console.log(finalURL);
        return this.http.get<Videolist>(finalURL);
    }
    getPreviousPage() {
        const finalURL = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyBmxXuhbCdCMj8A6lKbAx-o9X0n7ZAG5PI&part=snippet' +
            ',id&order=relevance&pageToken=' + this.previousPageToken + '&maxResults=7&q=' + this.query;
        console.log(finalURL);
        return this.http.get<Videolist>(finalURL);
    }
}
