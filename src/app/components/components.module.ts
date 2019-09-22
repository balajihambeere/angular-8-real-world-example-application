import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

import { ToastComponent, ToastService } from './toast';
import { BreadcrumbComponent, BreadcrumbService } from './breadcrumb';


@NgModule({
    declarations: [
        ToastComponent,
        BreadcrumbComponent
    ],
    exports: [
        ToastComponent,
        BreadcrumbComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        NgbToastModule
    ],
    providers: [
        ToastService,
        BreadcrumbService
    ],
})

export class ComponentsModule { }
