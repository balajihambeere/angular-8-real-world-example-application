import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectComponent } from './project.component';


const projectRoutes: Routes = [
    {
        path: 'projects',
        component: ProjectComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(projectRoutes)],
    exports: [RouterModule]
})
export class ProjectRoutingModule { }

