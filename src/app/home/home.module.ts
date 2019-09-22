import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HomeSubComponent } from './home-sub.component';
import { CommonModule } from '@angular/common';
import { AuthModule } from '../auth';
import { IconsModule } from '../shared';

@NgModule({
    declarations: [
        HomeComponent,
        HomeSubComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IconsModule,
        HomeRoutingModule,
        AuthModule
    ],
})
export class HomeModule { }
