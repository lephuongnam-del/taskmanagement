import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskViewComponent } from './pages/task-view/task-view.component';
import { NewListComponent} from './pages/new-list/new-list.component'
import { NewTaskComponent } from './pages/new-task/new-task.component';
import {RegisterComponent} from './pages/register/register.component'
import {LoginComponent} from './pages/login/login.component'
import {UpdateTaskComponent} from './pages/update-task/update-task.component'
import {UpdateListComponent} from './pages/update-list/update-list.component'
import { SocialLoginModule } from 'angularx-social-login';
import { SocialAuthServiceConfig, SocialAuthService } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';

const routes: Routes = [
  {path:'',redirectTo:'/list',pathMatch:'full'},
  {path:'new-list',component:NewListComponent},
  {path:'list',component:TaskViewComponent},
  {path:'list/:listId',component:TaskViewComponent},
  {path:'list/:listId/new-task',component:NewTaskComponent},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'update-list/:listId', component:UpdateListComponent},
  {path:'update-task/:listId/task/:taskId', component:UpdateTaskComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), SocialLoginModule],
  exports: [RouterModule],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('408808110384473')
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ]
})
export class AppRoutingModule { }
