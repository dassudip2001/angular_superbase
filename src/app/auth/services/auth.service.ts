import { inject, Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment.development';
import { AuthT } from '../views/login/login-type';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private superbase: SupabaseClient;

  private _ts = inject(ToastrService);

  constructor() {
    this.superbase = createClient(
      environment.superBaseUrl,
      environment.superBaseKey
    );
    this.superbase.auth.onAuthStateChange((event, session) => {
      if (session) {
        // this.router.navigate(['drawing']);
      } else {
        console.log('logged out');
      }
      localStorage.setItem('session', JSON.stringify(session?.user));

      // if (session?.user) {
      //   this.ngZone.run(() => {
      //     this.router.navigate(['dashboard']);
      //   });
      // }
    });
  }

  // check if user is logged in
  get isLoggedIn() {
    const user = localStorage.getItem('session') as string;
    return user === 'undefined' ? false : true;
  }

  // login
  async signInWithEmail(auth: AuthT) {
    const { data, error } = await this.superbase.auth.signInWithPassword({
      email: auth.email,
      password: auth.password,
    });
    if (error) {
      console.log(error.code);
      this._ts.error(error.code);
      return;
    }
    return data;
  }

  // signup
  async signUpNewUser(auth: AuthT) {
    const { data, error } = await this.superbase.auth.signUp({
      email: auth.email,
      password: auth.password,
      options: {
        emailRedirectTo: '/chat',
      },
    });
    if (error) {
      console.log(error.code);

      this._ts.error(error.code);
      return;
    }
    return data;
  }

  // logout
  async signout() {
    return await this.superbase.auth.signOut();
  }
}
