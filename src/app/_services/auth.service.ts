import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import baseUrl from './api';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	constructor(private toastr: ToastrService, private http: HttpClient, private router: Router) {}

	jwtHelper: JwtHelperService = new JwtHelperService();
	TOKEN_KEY = 'token';

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
			baseUrl + 'auth/users/',
			{
				first_name: user.first_name,
				last_name: user.last_name,
				email: user.email,
				password: user.password
			},
			httpOptions
		);
	}

	logOut() {
		localStorage.removeItem(this.TOKEN_KEY);
		localStorage.removeItem('name');
		this.toastr.success('çıkış yapıldı');
		this.router.navigateByUrl('/');
	}

	loggedIn() {
		return !this.jwtHelper.isTokenExpired(localStorage.getItem(this.TOKEN_KEY));
	}

	get token() {
		return localStorage.getItem(this.TOKEN_KEY);
	}

	getCurrentUserId() {
		if (this.token != null) {
			return this.jwtHelper.decodeToken(this.token).identity;
		}
		return null;
	}

	getCurrentUserName() {
		if (this.token != null) {
			return localStorage.getItem('name');
		}
		return null;
	}
}
