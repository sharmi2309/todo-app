import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './layout/layout/layout.component';

export const routes: Routes = [
   {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then(m => m.AuthModule),
  },
    {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'todos',
        loadChildren: () =>
          import('./features/todo/todo.module').then(m => m.TodoModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'auth'
  }  
];

