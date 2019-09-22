import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { TaskRoutingModule } from './task-routing.module';
import { TaskComponent } from './task.component';
import { TaskService } from './task.service';
import { ComponentsModule } from '../components';
import { NgbDatepickerModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { IconsModule } from '../shared';


@NgModule({
    declarations: [
        TaskComponent
    ],
    imports: [
        CommonModule,
        NgbDatepickerModule,
        NgbDropdownModule,
        IconsModule,
        ReactiveFormsModule,
        FormsModule,
        TaskRoutingModule,
        ComponentsModule,
    ],
    providers: [TaskService],
})

export class TaskModule { }
