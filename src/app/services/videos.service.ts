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
    public query: string;
    results = new Array();

    getVideos() {
        const finalURL = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyBmxXuhbCdCMj8A6lKbAx-o9X0n7ZAG5PI&part=snippet' +
            ',id&order=date&maxResults=8&q=' + this.query;
        console.log(finalURL);
        return this.http.get<Videolist>(finalURL);
        console.log(finalURL);
    }
}
