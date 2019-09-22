import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { BreadcrumbService } from '../components/breadcrumb';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from './profile.model';

@Component({
    selector: 'app-edit-profile',
    templateUrl: './edit-profile.component.html',
    styles: [`
    .form-control:disabled, .form-control[readonly] {
         background-color: transparent;
    }
    `]
})
export class EditProfileComponent implements OnInit {

    title = 'edit-profile';
    profile = new Profile();
    email: string;
    breadcrumbData: any;
    profileId: string;
    constructor(
        private profileService: ProfileService,
        private breadcrumbService: BreadcrumbService,
        private route: ActivatedRoute,
        private router: Router) {

    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            if (params.profileId) {
                this.profileId = params.profileId;
                this.profileService.getProfileById(params.profileId).subscribe(source => {
                    if (source.data instanceof Array) {
                        this.email = source.data[0].email;
                        this.profile = source.data[0].profile;
                    }
                });
            }
        });

        this.route.url.subscribe(data => {
            this.breadcrumbData = this.breadcrumbService.breadcrumb(data, this.router.url.split('/'));
        });
    }
    onSubmit() {
        this.profileService.updateProfile(this.profileId, this.profile).subscribe(result => {
            this.router.navigateByUrl('/dashboard/profile');
        });
    }

    renderToBack() {
        const route = `/dashboard/profile`;
        this.router.navigateByUrl(route);
    }
}

