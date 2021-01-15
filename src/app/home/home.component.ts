import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { ProductService } from '../_services/product.service';

import { AppComponent } from '../app.component';

import { Product } from '../interfaces/product';
import { ToastrService } from 'ngx-toastr';

declare var $: any;

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: [ './home.component.css' ]
})
export class HomeComponent implements OnInit {
	content: string;
	productList: Product[] = [];
	rawResponse: any;
	categories: any;
	result: any = [];

	constructor(
		private userService: UserService,
		private productService: ProductService,
		private app: AppComponent,
		private toastr: ToastrService
	) {}

	ngOnInit(): void {
		this.productService.getProducts().subscribe((data) => {
			this.productList = data.results;
		});

		this.productService.getCategories().subscribe(
			(data) => {
				this.rawResponse = data;
				this.result = this.rawResponse.results;
			},
			(err) => {
				this.content = JSON.parse(err.error).message;
			}
		);
		// this.productService.getProducts().subscribe(
		// 	(data) => {
		// 		this.rawResponse = data;
		// 		this.productList = this.rawResponse.results;
		// 		console.log(this.productList);
		// 	},
		// 	(err) => {
		// 		this.content = JSON.parse(err.error).message;
		// 	}
		// );
	}

	getProductsByCategory(id: any) {
		this.productList = this.result[id].products;
	}

	addToCart(item: Product) {
		if (this.app.sepet.length > 0) {
			const id = item.id;
			this.app.sepet.forEach((element) => {
				if (item.id === element.id) {
					element.quantity += 1;
				} else {
					this.app.sepet.push(item);
				}
			});
		} else {
			this.app.sepet.push(item);
		}
		localStorage.setItem(this.app.cart, JSON.stringify(this.app.sepet));
		this.toastr.success('Eklendi', '', { timeOut: 800 });
	}
}
