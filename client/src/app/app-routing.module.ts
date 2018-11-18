import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthLayoutComponent} from "./shared/layouts/auth-layout/auth-layout.component";
import {LoginPageComponent} from "./login-page/login-page.component";
import {RegisterPageComponent} from "./register-page/register-page.component";
import {SiteLayoutComponent} from "./shared/layouts/site-layout/site-layout.component";
import {OverviewPageComponent} from "./overview-page/overview-page.component";
import {AuthGuard} from "./shared/services/auth.guard";
import {CategoryPageComponent} from "./category-page/category-page.component";
import {CategoryFormComponent} from "./category-page/category-form/category-form.component";
import {OrderPageComponent} from "./order-page/order-page.component";
import {OrderCategoriesComponent} from "./order-page/order-categories/order-categories.component";
import {OrderPositionsComponent} from "./order-page/order-positions/order-positions.component";

const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent, children:
      [
        {path: 'login', component: LoginPageComponent},
        {path: 'register', component: RegisterPageComponent}
      ]
  },
  {
    path: '', component: SiteLayoutComponent, canActivate: [AuthGuard], children:
      [
        {path: 'overview', component: OverviewPageComponent},
        {path: 'category', component: CategoryPageComponent},
        {path: 'category/new', component: CategoryFormComponent},
        {path: 'category/:id', component: CategoryFormComponent},
        {
          path: 'order', component: OrderPageComponent, children:
            [
              {path: '', component: OrderCategoriesComponent},
              {path: ':id', component: OrderPositionsComponent}
            ]
        }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
