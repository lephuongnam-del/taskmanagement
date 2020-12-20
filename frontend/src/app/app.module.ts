import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskViewComponent } from './pages/task-view/task-view.component';
import { NewListComponent} from './pages/new-list/new-list.component'
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { RegisterComponent } from './pages/register/register.component';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { WebReqInterceptor } from './web-req.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    TaskViewComponent,
    NewListComponent,
    NewTaskComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: WebReqInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
