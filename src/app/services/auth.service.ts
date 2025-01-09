import { inject, Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private superbase: SupabaseClient;
  private router = inject(Router);

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
      if (session?.user) {
        this.router.navigate(['chat']);
      }
    });
  }

  get isLoggedIn() {
    const user = localStorage.getItem('session') as string;
    return user === 'undefined' ? false : true;
  }

  async signInWithEmail() {
    const { data, error } = await this.superbase.auth.signInWithPassword({
      email: 'sudip5428@gmail.com',
      password: 'Sudip@123',
    });
  }

  async sugnUpNewUser() {
    const { data, error } = await this.superbase.auth.signUp({
      email: 'sudip5428@gmail.com',
      password: 'Sudip@123',
      options: {
        emailRedirectTo: '/chat',
      },
    });
  }

  async signout() {
    return await this.superbase.auth.signOut();
  }
}
