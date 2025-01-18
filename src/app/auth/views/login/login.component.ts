import { Component, inject } from '@angular/core';
import { AuthT } from './login-type';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'drawing-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent {
  private auth = inject(AuthService);

  async authLogin() {
    const data: AuthT = {
      email: 'sudip5428@gmail.com',
      password: 'Sudip@123',
    };
    console.log('authLogin');
    await this.auth.signInWithEmail(data);
  }
}
