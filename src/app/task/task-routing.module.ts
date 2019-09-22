import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { TaskComponent } from './task.component';

const taskRoutes: Routes = [
    {
        path: 'projects/:projectId/tasks',
        component: TaskComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(taskRoutes)],
    exports: [RouterModule]
})

export class TaskRoutingModule { }

