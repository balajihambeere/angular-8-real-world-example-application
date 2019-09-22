import { Component, OnInit } from '@angular/core';
import { JwtService } from '../shared';

@Component({
    selector: 'app-home-sub',
    templateUrl: './home-sub.component.html',
    styleUrls: ['./home-sub.component.scss']
})
export class HomeSubComponent implements OnInit {
    homeContent = true;
    title = 'todo-home';

    isAppAuthenticate = false;

    constructor(private jwtService: JwtService) {
    }

    ngOnInit() {
        this.appAuthenticate();
    }
    appAuthenticate() {
        if (this.jwtService.getToken()) {
            this.isAppAuthenticate = true;
        }
    }
}
