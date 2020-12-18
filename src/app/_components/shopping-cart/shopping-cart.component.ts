import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { Product } from '../../interfaces/product';

@Component({
	selector: 'app-shopping-cart',
	templateUrl: './shopping-cart.component.html',
	styleUrls: [ './shopping-cart.component.css' ]
})
export class ShoppingCartComponent implements OnInit {
	sepet: Product[] = [];
	constructor(private app: AppComponent) {}

	ngOnInit(): void {
		this.sepet = this.app.sepet;
	}

	getProductById(id: number): any {
		let elem: any;
		this.sepet.forEach((element) => {
			if (element.id === id) {
				elem.obj = element;
				elem.id = this.sepet.indexOf(element);
				return elem;
			}
		});
	}

	removeFromCart(id: number) {
		let item = this.getProductById(id);
		console.log(item);
		this.sepet.splice(item.id, 1);
	}
}
