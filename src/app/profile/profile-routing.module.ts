import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { EditProfileComponent } from './edit-profile.component';


const profileRoutes: Routes = [
    {
        path: 'profile',
        component: ProfileComponent,
    },
    {
        path: 'profile/:profileId/edit-profile',
        component: EditProfileComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(profileRoutes)],
    exports: [RouterModule]
})
export class ProfileRoutingModule { }

