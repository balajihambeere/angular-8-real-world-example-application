import { Component } from '@angular/core';
import { AuthService } from '../auth';

@Component({
    selector: 'app-dashboard-menu',
    templateUrl: './dashboard-menu.component.html',
})
export class DashboardMenuComponent {
    title = 'todo-dashboard';
    constructor(private authService: AuthService) { }
    logout() {
        this.authService.clearAuth();
    }
}
