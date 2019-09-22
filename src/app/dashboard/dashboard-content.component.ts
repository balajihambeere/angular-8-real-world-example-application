import { Component, OnInit } from '@angular/core';
import { StatsService } from '../stats';
import { Stats } from '../stats';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from '../components/breadcrumb';

@Component({
    selector: 'app-dashboard-content',
    templateUrl: './dashboard-content.component.html',
    styles: [`
    .card {
        background-color: #1d1d1d!important;
      }
      `]
})
export class DashboardContentComponent implements OnInit {
    title = 'todo-dashboard-content';
    stats: Stats;
    breadcrumbData: any;
    constructor(
        private statsService: StatsService,
        private route: ActivatedRoute,
        private router: Router,
        private breadcrumbService: BreadcrumbService, ) {
    }
    ngOnInit() {
        this.route.url.subscribe(data => {
            this.breadcrumbData = this.breadcrumbService.breadcrumb(data, this.router.url.split('/'));
        });
        this.statsService.getStats().subscribe(source => {
            this.stats = source.data;
        });
    }
}
