import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { AuthStore } from './_services/auth.store';
import { TokenStorageService } from './_services/token-storage.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from './interfaces/product';
import { Router } from '@angular/router';

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
	TOKEN_KEY = 'token';
	cart = 'shopping_cart';

	sepet: Product[] = [];

	constructor(
		private tokenStorageService: TokenStorageService,
		// private authService: AuthService,
		public authService: AuthStore,
		private toastr: ToastrService,
		private router: Router
	) {}

	ngOnInit(): void {
		// this.isLoggedIn = this.authService.loggedIn();
		// if (this.isLoggedIn) {
		// 	this.username = this.authService.getCurrentUserName();
		// }

		const shopCart = localStorage.getItem(this.cart);

		if (shopCart) {
			this.sepet = JSON.parse(shopCart);
		}
	}

	logout(): void {
		this.authService.logout();
	}

	showReg(): void {
		this.reg = true;
		this.log = false;
	}
	showLog(): void {
		this.reg = false;
		this.log = true;
	}

	async delay(ms: number) {
		await new Promise((resolve) =>
			setTimeout(() => resolve(), ms)
		).then(() => {});
	}

	onSubmit(): void {
		this.authService.login(this.form.email, this.form.password).subscribe(
			(data) => {
				// localStorage.setItem(this.TOKEN_KEY, data.access);
				// localStorage.setItem('name', data.name);

				this.toastr.success('Giriş başarılı');
				// this.isLoginFailed = false;
				// this.isLoggedIn = true;

				// this.delay(200).then((any) => {
				// window.location.reload();
				// });
			},
			(err) => {
				this.errorMessage = err.error.message;
				this.isLoginFailed = true;
				this.toastr.error('Giriş başarısız');
			}
		);
	}

	onRegister(): void {
		this.authService.register(this.form).subscribe(
			(data) => {
				// localStorage.setItem(this.TOKEN_KEY, data.access);
				// localStorage.setItem('name', data.name);

				this.toastr.success('Hesap oluşturuldu, Lütfen giriş yapın');

				// this.isLoggedIn = true;

				this.delay(500).then((any) => {
					this.showLog();
				});
			},
			(err) => {
				this.errorMessage = err.error.message;
				this.isLoginFailed = true;
				this.toastr.error('Kayıt başarısız');
			}
		);
	}

	reloadPage(): void {
		window.location.reload();
	}

	updateStorage() {
		localStorage.setItem(this.cart, JSON.stringify(this.sepet));
	}

	getProductById(id: number): number {
		console.log('ffff');
		let value = 1;
		this.sepet.forEach((element) => {
			if (element.id === id) {
				console.log(element.id);

				return element.quantity;
			}
		});
		return value;
	}
}
