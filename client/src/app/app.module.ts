import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { OverviewPageComponent } from './overview-page/overview-page.component';
import {TokenInterceptor} from "./shared/classes/token.interceptor";
import { CategoryPageComponent } from './category-page/category-page.component';
import { PreloaderComponent } from './shared/components/preloader/preloader.component';
import { CategoryFormComponent } from './category-page/category-form/category-form.component';
import {PositionFormComponent} from "./category-page/category-form/position-form/position-form.component";


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    SiteLayoutComponent,
    AuthLayoutComponent,
    OverviewPageComponent,
    CategoryPageComponent,
    PreloaderComponent,
    CategoryFormComponent,
    PositionFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
