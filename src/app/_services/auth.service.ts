import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import baseUrl from './api';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	constructor(private http: HttpClient) {}

	login(credentials): Observable<any> {
		return this.http.post(
			baseUrl + 'auth/jwt/create/',
			{
				email: credentials.email,
				password: credentials.password
			},
			httpOptions
		);
	}

	register(user): Observable<any> {
		return this.http.post(
			baseUrl + 'users/',
			{
				username: user.username,
				email: user.email,
				password: user.password
			},
			httpOptions
		);
	}
}
