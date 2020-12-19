import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemDetailService } from '../../_services/item-detail.service';
import { Product } from '../../interfaces/product';
import { AppComponent } from 'src/app/app.component';

@Component({
	selector: 'app-item-detail',
	templateUrl: './item-detail.component.html',
	styleUrls: [ './item-detail.component.css' ]
})
export class ItemDetailComponent implements OnInit {
	id: any;
	item: Product;
	detailss: false;

	constructor(
		private route: ActivatedRoute,
		private itemService: ItemDetailService,
		public app: AppComponent
	) {}

	ngOnInit(): void {
		this.id = this.route.snapshot.paramMap.get('id');
		this.itemService
			.getById(this.id)
			.subscribe((data: Product) => (this.item = data));
	}

	increaseQuantity(id: any): void {
		this.app.sepet.forEach((element) => {
			if (element.id === id) {
				element.quantity += 1;
				this.item.quantity += 1;
			}
		});
		this.app.updateStorage();
	}

	decreaseQuantity(id: any): void {
		this.app.sepet.forEach((element) => {
			if (element.id === id) {
				if (element.quantity > 1) {
					element.quantity -= 1;
					this.item.quantity -= 1;
				}
			}
		});
		this.app.updateStorage();
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
	}
}
