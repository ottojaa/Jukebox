import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
    /*
    constructor(private http: HttpClient) {
    }
    */
    results: 6;
    key: 'AIzaSyBmxXuhbCdCMj8A6lKbAx-o9X0n7ZAG5PI';
    query: string;

    /*searchBar() {
        const finalURL = 'https://www.googleapis.com/youtube/v3/search?key=' + this.key + '&part=snippet,id&order=date&maxResults='
            + this.results + '&q=' + this.query;
        console.log(finalURL);

        return this.http.get(finalURL).subscribe(response => {

            console.log(response);

            let ytresults = response.json();
            console.log(ytresults);

            console.log(ytresults.nextPageToken);
            this.nextPageToken = ytresults.nextPageToken;

            ytresults.items.forEach(obj => {

                console.log(obj.id.videoId);
                this.ytvideolist.push(obj.id.videoId);

            });
            console.log(this.ytvideolist);

        });
    }*/
    ngOnInit() {

    }



}
