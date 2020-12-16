import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { Product } from '../../interfaces/product';

@Component({
	selector: 'app-shopping-cart',
	templateUrl: './shopping-cart.component.html',
	styleUrls: [ './shopping-cart.component.css' ]
})
export class ShoppingCartComponent implements OnInit {
	sebet: Product[] = [];
	constructor(private app: AppComponent) {}

	ngOnInit(): void {
		this.sebet = this.app.sebet;
	}
}
