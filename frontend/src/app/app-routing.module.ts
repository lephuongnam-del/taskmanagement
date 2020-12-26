import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskViewComponent } from './pages/task-view/task-view.component';
import { NewListComponent} from './pages/new-list/new-list.component'
import { NewTaskComponent } from './pages/new-task/new-task.component';
import {RegisterComponent} from './pages/register/register.component'
import {LoginComponent} from './pages/login/login.component'
import {UpdateTaskComponent} from './pages/update-task/update-task.component'
import {UpdateListComponent} from './pages/update-list/update-list.component'
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
