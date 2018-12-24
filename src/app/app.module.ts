import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from "./app.routing.module";
import { CoreModule } from "./core/core.module";
import { AuthService } from "./auth/auth.service";
import {RequestService} from "./request/request.service";
import {AuthGuard} from "./auth/auth.guard";
import {ApiService} from "./core/api.service";
import {UserService} from "./users/user.service";
import {ProfileComponent} from "./profile/profile.component";
import {CallbackComponent} from "./callback/callback.component";
import {RequestsModule} from "./request/requests.module";



@NgModule({
  declarations: [
    AppComponent,

    ProfileComponent,
    CallbackComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CoreModule,
    RequestsModule,
    AppRoutingModule
  ],
  providers: [ AuthService, RequestService, ApiService,UserService, AuthGuard ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
