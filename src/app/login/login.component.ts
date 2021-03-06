import {Component, OnInit} from '@angular/core';
import {VideosService} from '../services/videos.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(public data: VideosService) {
    }

    ngOnInit() {
        console.log(localStorage.getItem('user'));
    }

}
