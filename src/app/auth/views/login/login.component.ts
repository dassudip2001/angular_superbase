import { Component, inject } from '@angular/core';
import { AuthT } from './login-type';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'drawing-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent {
  loginForm: FormGroup;
  private auth = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  constructor() {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
    }

    this.authLogin();
  }

  async authLogin() {
    const data: AuthT = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    console.log('authLogin');
    await this.auth.signInWithEmail(data)
    this.router.navigate(['/drawing']);
  }
}
