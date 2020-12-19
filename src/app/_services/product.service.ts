import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import baseUrl from './api';
import { ProductList } from '../interfaces/product';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
	providedIn: 'root'
})
export class ProductService {
	constructor(private http: HttpClient) {}

	getProducts(): Observable<any> {
		return this.http.get(baseUrl + 'product', httpOptions);
	}

	getCategories(): Observable<any> {
		return this.http.get(baseUrl + 'category', httpOptions);
	}

	orderProducts(request: any): Observable<any> {
		return this.http.post<ProductList>(baseUrl + 'order/create/', request, {
			headers: httpOptions.headers
		});
	}
}
