import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { AuthStore } from '../../_services/auth.store';
import { User } from '../../interfaces/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'app-order-page',
	templateUrl: './order-page.component.html',
	styleUrls: [ './order-page.component.css' ]
})
export class OrderPageComponent implements OnInit {
	user: User;
	public demoForm: FormGroup;
	public submitted = false;

	order: any = {};

	constructor(
		public app: AppComponent,
		public authService: AuthStore,
		private fb: FormBuilder
	) {}

	ngOnInit(): void {
		this.authService.userInfo$.subscribe((user: User) => {
			this.user = user;
		});
	}

	public onSubmit() {
		this.submitted = true;
	}
}
