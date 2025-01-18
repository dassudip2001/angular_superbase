import { Routes } from '@angular/router';
import { authGuard } from './pages/services/auth.guard';
import { ContentWrapperComponent } from './shared/content-wrapper.component';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/views/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'dashboard',
    component: ContentWrapperComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'chat',
        loadComponent: () =>
          import('./pages/views/chat/chat.component').then(
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
        pathMatch: 'full', // Apply redirection ONLY for empty child paths
      },
    ],
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full', // Redirect root path to 'dashboard'
  },
];
