import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { HomeSubComponent } from './home-sub.component';


const homeRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            { path: '', component: HomeSubComponent, pathMatch: 'full' },
            { path: 'auth', loadChildren: () => import('../auth/auth.module').then(mod => mod.AuthModule), },
        ]
    },
    // { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forChild(homeRoutes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }

