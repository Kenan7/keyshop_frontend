import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';

@Component({
	selector: 'app-shopping-cart',
	templateUrl: './shopping-cart.component.html',
	styleUrls: [ './shopping-cart.component.css' ]
})
export class ShoppingCartComponent implements OnInit {
	constructor(public app: AppComponent) {}

	ngOnInit(): void {}

	getProductById(id: number): any {
		this.app.sepet.forEach((element) => {
			console.log(
				'checking element -> ' + element + ' ' + element.id + ' against: ' + id
			);
			if (element.id === id) {
				return this.app.sepet.indexOf(element);
			}
		});
	}

	modifyProduct(id: number, value: number): void {
		this.app.sepet.forEach((element) => {
			if (element.id === id) {
				element.quantity = value;
			}
		});
	}

	removeFromCart(id: number): void {
		let item = this.getProductById(id);
		this.app.sepet.splice(item, 1);
		this.app.updateStorage();
	}

	modifyQuantity(id: any): void {
		let value = parseInt(
			(<HTMLInputElement>document.getElementById(id)).value
		);
		this.modifyProduct(id, value);
		this.app.updateStorage();
	}

	getTotal() {
		let total = 0;
		this.app.sepet.forEach((element) => {
			if (element.discount_price > 0)
				total += element.discount_price * element.quantity;
			else {
				total += element.price * element.quantity;
			}
		});

		return total;
	}
}
