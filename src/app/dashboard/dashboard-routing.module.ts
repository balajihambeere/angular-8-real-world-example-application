import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardMenuComponent } from './dashboard-menu.component';
import { AuthGuardService } from '../auth';
import { DashboardContentComponent } from './dashboard-content.component';


const dashboardRoutes: Routes = [
    {
        path: 'dashboard',
        component: DashboardMenuComponent,
        canActivate: [AuthGuardService],
        children: [
            { path: '', component: DashboardContentComponent, pathMatch: 'full'  },
            { path: '', loadChildren: () => import('../project/project.module').then(mod => mod.ProjectModule), },
            { path: '', loadChildren: () => import('../task/task.module').then(mod => mod.TaskModule), },
            { path: '', loadChildren: () => import('../profile/profile.module').then(mod => mod.ProfileModule), },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(dashboardRoutes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }

