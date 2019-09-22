import { Component, OnInit } from '@angular/core';
import { JwtService } from '../shared';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
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
