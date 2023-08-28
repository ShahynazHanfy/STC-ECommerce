import { Component, Inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, first } from 'rxjs';
import { LibraryConfig } from '../../models/model.config';
import { AuthenticationService } from '../../services/service-authentication/authentication.service';
import { User } from '../../models/model-user';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnDestroy {

  loginForm: FormGroup;
  errorMessage: string = '';
  private dataSubscription!: Subscription;

  constructor(
    private authService: AuthenticationService, public translate: TranslateService,
    private router: Router,
    @Inject('config') private config: LibraryConfig) {

    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const user = this.loginForm.value;
    this.dataSubscription = this.authService.login(user)
      .subscribe({
        next: (res) => {
          this.checkUser(res)
        },
        error: (err) => {
          console.log('err', err);
          this.errorMessage = err
        },
      });
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.loginForm?.get(controlName)!;
    return control.touched && control.invalid;
  }

  checkUser(user: User) {
    if (user?.token == 'user') {
      this.router.navigate([this.config.userPage]);
    }
    else if (user?.token == 'admin') {
      this.router.navigate([this.config.AdminPage]);
    }
  }
  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    this.dataSubscription.unsubscribe();
  }
}
