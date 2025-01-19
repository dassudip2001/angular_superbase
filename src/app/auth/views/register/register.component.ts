import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthT } from '../login/login-type';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'drawing-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styles: ``,
})
export class RegisterComponent {
  registerForm: FormGroup;
  private auth = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private toastr = inject(ToastrService);
  constructor() {
    this.registerForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
    }

    this.authRegister();
  }

  async authRegister() {
    const data: AuthT = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
    };
    console.log('authRegister');
    await this.auth.signUpNewUser(data);
    this.toastr.success('Send email verification');
    this.router.navigate(['/login']);
  }
}
