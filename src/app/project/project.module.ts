import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project.component';
import { ProjectService } from './project.service';
import { ComponentsModule } from '../components';
import { IconsModule } from '../shared';


@NgModule({
    declarations: [
        ProjectComponent
    ],
    imports: [
        CommonModule,
        IconsModule,
        FormsModule,
        ReactiveFormsModule,
        ProjectRoutingModule,
        ComponentsModule,
    ],
    providers: [ProjectService],
})
export class ProjectModule { }
