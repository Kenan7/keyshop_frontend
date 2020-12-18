import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { JWT } from '../interfaces/jwt';
import { map, shareReplay, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import baseUrl from './api';

const AUTH_DATA = 'auth_data';

@Injectable({
	providedIn: 'root'
})
export class AuthStore {
	private subject = new BehaviorSubject<JWT>(null);
	private userSubject = new BehaviorSubject<User>(null);

	user$: Observable<JWT> = this.subject.asObservable();
	userInfo$: Observable<User> = this.userSubject.asObservable();

	isLoggedIn$: Observable<boolean>;
	isLoggedOut$: Observable<boolean>;

	constructor(private http: HttpClient) {
		console.log('--------------auth store initialize');
		this.isLoggedIn$ = this.user$.pipe(map((user) => !!user));

		this.isLoggedOut$ = this.isLoggedIn$.pipe(map((loggedIn) => !loggedIn));

		const user = localStorage.getItem(AUTH_DATA);

		if (user) {
			this.subject.next(JSON.parse(user));
			this.connection().subscribe((userInfoFromAPI) => {
				this.userSubject.next(userInfoFromAPI);
			});
			// this.userInfo$ = this
		}
	}

	login(email: string, password: string): Observable<JWT> {
		return this.http.post<JWT>(baseUrl + 'auth/jwt/create/', { email, password }).pipe(
			tap((user) => {
				this.subject.next(user);
				localStorage.setItem(AUTH_DATA, JSON.stringify(user));
			}),
			shareReplay()
		);
	}

	logout() {
		this.subject.next(null);
		localStorage.removeItem(AUTH_DATA);
	}

	register(form): Observable<User> {
		return this.http.post<User>(baseUrl + 'auth/users/', form);
		// .pipe
		// // tap((user) => {
		// // 	// this.subject.next(user);
		// // 	// localStorage.setItem(AUTH_DATA, JSON.stringify(user));
		// // }),
		// // shareReplay()
		// ();
	}

	connection(): Observable<any> {
		const key = JSON.parse(localStorage.getItem(AUTH_DATA)).access;
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			Authorization: 'JWT ' + key
		});
		return this.http.get<User>(baseUrl + 'auth/users/me', { headers }).pipe(
			tap((user) => {
				this.userSubject.next(user);
			}),
			shareReplay()
		);
	}
}
