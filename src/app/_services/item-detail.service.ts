import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import baseUrl from './api';

@Injectable({
	providedIn: 'root'
})
export class ItemDetailService {
	constructor(private http: HttpClient) {}

	getById(id: any): Observable<any> {
		return this.http.get(baseUrl + 'product/' + id + '/');
	}
}
