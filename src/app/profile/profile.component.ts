import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from '../components/breadcrumb';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [`
    .profile-bg {
        background-color: #1d1d1d!important;
        color:#fff;
      },
      .table {
        color:#fff;
      }
      `]
})
export class ProfileComponent implements OnInit {
  title = 'todo-profile';
  user: any;
  breadcrumbData: any;
  constructor(
    private profileService: ProfileService,
    private breadcrumbService: BreadcrumbService,
    private route: ActivatedRoute,
    private router: Router) {

  }

  ngOnInit() {
    this.route.url.subscribe(data => {
      this.breadcrumbData = this.breadcrumbService.breadcrumb(data, this.router.url.split('/'));
    });
    this.load();
  }
  private load() {
    this.profileService.getProfileById('id').subscribe(source => {
      if (source.data instanceof Array) {
        this.user = source.data[0];
        console.log(this.user);
      }
    });
  }

  renderToEditProfile(id: string) {
    const route = `/dashboard/profile/${id}/edit-profile`;
    this.router.navigateByUrl(route);
  }
}
