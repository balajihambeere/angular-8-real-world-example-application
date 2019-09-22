import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { AuthService } from './auth.services';
import { ToastService } from '../components';

// Cross field validation
export const passwordCompareValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password && confirmPassword && password.value === confirmPassword.value ? { passwordCompare: true } : null;
};

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
    authForm: FormGroup;
    authType = '';
    title = '';
    isSubmitting = false;
    buttonTitle = '';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private authService: AuthService,
        private toastService: ToastService) {
        this.authForm = this.fb.group({
            email: ['', Validators.compose([Validators.required, Validators.email])],
            password: ['', Validators.required]
        });
    }

    ngOnInit() {
        this.route.url.subscribe(data => {
            this.authType = data[data.length - 1].path;
            this.title = (this.authType === 'login') ? 'Please login here..' : 'Create a new account';
            this.buttonTitle = (this.authType === 'login') ? 'Login' : 'Register';
            if (this.authType === 'register') {
                this.authForm.addControl('confirmPassword', new FormControl('', Validators.required));
            }
        });
    }

    submitForm() {
        this.isSubmitting = true;
        const credentials = this.authForm.value;
        if (this.authType === 'register') {
            if (credentials.password !== credentials.confirmPassword) {
                this.toastService.show('password &  confirm password does not match', { classname: 'bg-danger text-light', delay: 10000 });
                return;
            }
        }
        this.authService.auth(this.authType, credentials).subscribe(data => {
            if (this.authType === 'register') {
                this.router.navigateByUrl('/auth/login');
            } else {
                this.router.navigateByUrl('/dashboard');
            }
        }, error => {
            this.toastService.show(error.statusText, { classname: 'bg-danger text-light', delay: 10000 });
        });
    }
}
