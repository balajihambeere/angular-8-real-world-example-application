import { NgModule } from '@angular/core';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ProfileService } from './profile.service';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components';
import { EditProfileComponent } from './edit-profile.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        ProfileComponent,
        EditProfileComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ProfileRoutingModule,
        ComponentsModule
    ],
    providers: [ProfileService],
})
export class ProfileModule { }
