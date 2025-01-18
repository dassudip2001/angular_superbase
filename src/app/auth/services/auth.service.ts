import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment.development';
import { AuthT } from '../views/login/login-type';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private superbase: SupabaseClient;

  constructor() {
    this.superbase = createClient(
      environment.superBaseUrl,
      environment.superBaseKey
    );
    this.superbase.auth.onAuthStateChange((event, session) => {
      if (session) {
        console.log('logged in');
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

  get isLoggedIn() {
    const user = localStorage.getItem('session') as string;
    return user === 'undefined' ? false : true;
  }

  async signInWithEmail(auth: AuthT) {
    const { data, error } = await this.superbase.auth.signInWithPassword({
      email: auth.email,
      password: auth.password,
    });
  }

  async signUpNewUser(auth: AuthT) {
    const { data, error } = await this.superbase.auth.signUp({
      email: auth.email,
      password: auth.password,
      options: {
        emailRedirectTo: '/chat',
      },
    });
  }

  async signout() {
    return await this.superbase.auth.signOut();
  }
}
