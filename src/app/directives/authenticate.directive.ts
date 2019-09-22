import { Directive, Input, OnInit, TemplateRef, ViewContainerRef, OnChanges } from '@angular/core';

import { AuthService } from '../auth/auth.services';

@Directive({ selector: '[appAuthenticate]' })
export class AuthenticateDirective implements OnInit {
    constructor(
        private templateRef: TemplateRef<any>,
        private authService: AuthService,
        private viewContainer: ViewContainerRef
    ) { }

    condition: boolean;

    ngOnInit() {
        this.authService.isAuthenticated.subscribe(
            (isAuthenticated) => {
                this.viewContainer.clear();
                if (isAuthenticated && this.condition || !isAuthenticated && !this.condition) {
                    this.viewContainer.createEmbeddedView(this.templateRef);
                } else {
                    this.viewContainer.clear();
                }
            }
        );
    }
    @Input() set appAuthenticate(condition: boolean) {
        this.condition = condition;
    }
}
