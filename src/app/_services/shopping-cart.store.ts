import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';

const AUTH_DATA = 'auth_data';

@Injectable({
	providedIn: 'root'
})
export class ShoppingCartService {
	private subject = new BehaviorSubject<any[]>(null);

	shoppingCart$: Observable<any[]> = this.subject.asObservable();

	constructor() {}

	addToCart(item: any) {
		this.subject.next(item);
	}

	removeFromCart(item: any) {}
}
