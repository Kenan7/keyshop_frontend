import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { AuthStore } from '../../_services/auth.store';
import { User } from '../../interfaces/user';
import { ProductService } from '../../_services/product.service';
import { FinalOrder, ProductList } from 'src/app/interfaces/product';
import { ToastrService } from 'ngx-toastr';
import { error } from 'jquery';
@Component({
	selector: 'app-order-page',
	templateUrl: './order-page.component.html',
	styleUrls: [ './order-page.component.css' ]
})
export class OrderPageComponent implements OnInit {
	user: User;

	order: FinalOrder;
	values: ProductList[] = [];

	address: string;

	constructor(
		public app: AppComponent,
		public authService: AuthStore,
		private productService: ProductService,
		private toastr: ToastrService
	) {}

	ngOnInit(): void {
		this.authService.userInfo$.subscribe((user: User) => {
			this.user = user;
		});
	}

	async onSubmit() {
		if (!this.user) {
			this.toastr.info('Sipariş vermek için giriş yapmanız gerekiyor');
		} else {
			await this.app.sepet.map((item) => {
				console.log(item);
				let tempP = {
					quantity: item.quantity,
					product: item.id
				};
				const finalItem = tempP as ProductList;
				this.values.push(finalItem);
			});

			let obj = {
				product_list: this.values,
				address: this.address,
				user: this.user.id
			};
			const finalItemm = (obj as unknown) as FinalOrder;

			this.productService.orderProducts(finalItemm).subscribe((data) => {
				this.toastr.success('Siparişiniz alındı');
			}),
				(error) => {
					this.toastr.success('Bir hata oldu');
				};
		}
	}
}
