import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ItemDetailComponent } from './_components/item-detail/item-detail.component';
import { ContactUsComponent } from './_components/contact-us/contact-us.component';
import { AboutUsComponent } from './_components/about-us/about-us.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'item', component: ItemDetailComponent },
  { path: 'iletisim', component: ContactUsComponent },
  { path: 'hakkimizda', component: AboutUsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
