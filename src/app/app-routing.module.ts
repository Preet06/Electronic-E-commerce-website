import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './component/sign-in/sign-in.component';
import { HomeComponent } from './component/home/home.component';
import { CartComponent } from './component/cart/cart.component';

const routes: Routes = [
  {path:'',redirectTo:'signIn',pathMatch:'full'},
  {path:'signIn',component: SignInComponent},
  {path:'home',component: HomeComponent},
  {path:'cart',component: CartComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
