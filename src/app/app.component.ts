import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { AuthStore } from './_services/auth.store';
import { TokenStorageService } from './_services/token-storage.service';
import { ToastrService } from 'ngx-toastr';
import { Product, ProductList } from './interfaces/product';
import { Router } from '@angular/router';
import { User } from './interfaces/user';
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
	isLoggedIn = false;
	title = 'KeyShop';
	reg = false;
	log = true;
	form: any = {};
	isLoginFailed = false;
	errorMessage = '';
	TOKEN_KEY = 'token';
	cart = 'shopping_cart';

	sepet: Product[] = [];
	user: User;
	values: ProductList[] = [];
	tempP: ProductList;

	constructor(
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

		this.authService.userInfo$.subscribe((user: User) => {
			this.user = user;
		});

		this.authService.isLoggedIn$.subscribe((data: boolean) => {
			this.isLoggedIn = data;
		});
	}

	convertTypes() {
		this.sepet.map((item) => {
			console.log(item);
			let tempP = {
				quantity: item.quantity,
				product: item
			};
			const finalItem = tempP as ProductList;
			this.values.push(finalItem);
		});

		return this.values;
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
		let value = 1;
		this.sepet.forEach((element) => {
			if (element.id === id) {
				console.log(element.id);

				return element.quantity;
			}
		});
		return value;
	}

	getTotal() {
		let total = 0;
		this.sepet.forEach((element) => {
			if (element.discount_price > 0)
				total += element.discount_price * element.quantity;
			else {
				total += element.price * element.quantity;
			}
		});

		return total;
	}
}
