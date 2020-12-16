import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { TokenStorageService } from './_services/token-storage.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from './interfaces/product';
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
	private roles: string[];
	isLoggedIn = false;
	showAdminBoard = false;
	showModeratorBoard = false;
	username: string;
	title = 'KeyShop';
	reg = false;
	log = true;
	form: any = {};
	isLoginFailed = false;
	errorMessage = '';
	dropdown: any;

	sebet: Product[] = [];

	constructor(
		private tokenStorageService: TokenStorageService,
		private authService: AuthService,
		private toastr: ToastrService
	) {}

	ngOnInit(): void {
		this.isLoggedIn = !!this.tokenStorageService.getToken();

		if (this.isLoggedIn) {
			const user = this.tokenStorageService.getUser();
			this.username = user.username;
		}
	}

	logout(): void {
		this.tokenStorageService.signOut();
		window.location.reload();
	}

	showReg(): void {
		this.reg = true;
		this.log = false;
	}
	showLog(): void {
		this.reg = false;
		this.log = true;
	}

	onSubmit(): void {
		this.authService.login(this.form).subscribe(
			(data) => {
				this.tokenStorageService.saveToken(data.accessToken);
				this.tokenStorageService.saveUser(data);

				this.isLoginFailed = false;
				this.isLoggedIn = true;

				this.toastr.success('Giriş başarılı');
			},
			(err) => {
				this.errorMessage = err.error.message;
				this.isLoginFailed = true;
				this.toastr.error('Giriş başarısız');
			}
		);
	}

	reloadPage(): void {
		window.location.reload();
	}
}
