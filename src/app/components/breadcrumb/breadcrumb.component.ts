import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styles: [`
  .breadcrumb{
    background-color: #1d1d1d!important;
  }
  `]
})
export class BreadcrumbComponent {
  @Input() data: any;

}
