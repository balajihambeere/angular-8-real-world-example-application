import { NgModule } from '@angular/core';
import { AuthenticateDirective } from './authenticate.directive';

@NgModule({
    imports: [],
    declarations: [
        AuthenticateDirective
    ],
    exports: [
        AuthenticateDirective
    ]
})
export class DirectiveModule { }
