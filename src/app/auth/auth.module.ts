import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AuthComponent } from './auth.component';
import { AuthService } from './auth.services';
import { AuthRoutingModule } from './auth-routing.module';
import { ComponentsModule } from '../components';

@NgModule({
    declarations: [
        AuthComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AuthRoutingModule,
        ComponentsModule
    ],
    providers: [AuthService],
})

export class AuthModule { }
