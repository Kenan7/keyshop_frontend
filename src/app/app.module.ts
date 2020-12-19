import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { CreditCardDirectivesModule } from 'angular-cc-library';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { ItemDetailComponent } from './_components/item-detail/item-detail.component';
import { FooterComponent } from './_components/footer/footer.component';
import { ContactUsComponent } from './_components/contact-us/contact-us.component';
import { AboutUsComponent } from './_components/about-us/about-us.component';
import { ShoppingCartComponent } from './_components/shopping-cart/shopping-cart.component';
import { OrderPageComponent } from './_components/order-page/order-page.component';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		RegisterComponent,
		HomeComponent,
		ProfileComponent,
		ItemDetailComponent,
		FooterComponent,
		ContactUsComponent,
		AboutUsComponent,
		ShoppingCartComponent,
		OrderPageComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		HttpClientModule,
		BrowserAnimationsModule, // required animations module
		ToastrModule.forRoot(),
		ReactiveFormsModule,
		CreditCardDirectivesModule
	],
	// providers: [authInterceptorProviders],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
