import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardMenuComponent } from './dashboard-menu.component';
import { ProjectModule } from '../project';
import { DashboardContentComponent } from './dashboard-content.component';
import { StatsModule } from '../stats';
import { ComponentsModule } from '../components';
import { IconsModule } from '../shared';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        DashboardMenuComponent,
        DashboardContentComponent
    ],
    imports: [
        CommonModule,
        IconsModule,
        DashboardRoutingModule,
        NgbDropdownModule,
        ProjectModule,
        ComponentsModule,
        StatsModule
    ],
    providers: [],
})
export class DashboardModule { }
