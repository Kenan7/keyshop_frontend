import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import baseUrl from './api';

const httpOptions = {
	headers: new HttpHeaders({})
};

@Injectable({
	providedIn: 'root'
})
export class ContactService {
	constructor(private http: HttpClient) {}

	postContactForm(name: string, email: string, phoneNumber: string, message: string): Observable<any> {
		return this.http.post(baseUrl + 'contact/create/', { name, email, phoneNumber, message }, httpOptions);
	}
}
