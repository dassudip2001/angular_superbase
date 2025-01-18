import { Routes } from '@angular/router';
import { ContentWrapperComponent } from './shared/content-wrapper.component';
import { authGuard } from './auth/services/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/views/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./auth/views/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
  {
    path: 'drawing',
    component: ContentWrapperComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'chat',
        loadComponent: () =>
          import('./auth/views/chat/chat.component').then(
            (m) => m.ChatComponent
          ),
      },
      {
        path: 'category',
        loadComponent: () =>
          import('./features/views/category/category.component').then(
            (m) => m.CategoryComponent
          ),
      },
      {
        path: 'posts',
        loadComponent: () =>
          import('./features/views/posts/posts.component').then(
            (m) => m.PostsComponent
          ),
      },
      {
        path: '',
        redirectTo: 'chat',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'drawing',
    pathMatch: 'full', // Redirect root path to 'dashboard'
  },
];
