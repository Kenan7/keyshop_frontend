import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'https://keyshop.herokuapp.com/';

const httpOptions = {
  headers: new HttpHeaders({
})
};

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  postContactForm(name: string, email: string, phoneNumber: string, message: string): Observable<any> {
    return this.http.post(AUTH_API + 'contact/create/', {name, email, phoneNumber, message}, httpOptions);
  }
}
