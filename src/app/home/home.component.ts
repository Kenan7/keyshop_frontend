import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { ProductService } from '../_services/product.service';

import { AppComponent } from '../app.component';

import { Product } from '../interfaces/product';

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

	constructor(private userService: UserService, private productService: ProductService, private app: AppComponent) {}

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
		this.app.sebet.push(item);
	}
}
