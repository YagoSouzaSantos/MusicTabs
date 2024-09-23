import { ListComponent } from './features/post-list/list/list.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home/home.component';
import { LoginComponent } from './features/auth/components/login/login.component';
import { DisplayPostComponent } from './features/post-list/display-post/display-post.component';
import { RegisterComponent } from './features/auth/components/register/register.component';
import { LoginContainerComponent } from './features/auth/container/login-container.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path:'',
        component: ListComponent
      },
      {
        path: 'post/:r_id',
        component: DisplayPostComponent

      }
    ]
  },
  {
    path: 'auth',
    component: LoginContainerComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      }
    ]
  }
];
