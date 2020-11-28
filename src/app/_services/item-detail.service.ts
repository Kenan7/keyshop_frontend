import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'https://keyshop.herokuapp.com/';
// const AUTH_API = 'http://localhost:8000/';

@Injectable({
  providedIn: 'root'
})
export class ItemDetailService {

  constructor(private http: HttpClient) { }

  getById(id: any): Observable<any> {
    return this.http.get(AUTH_API + 'product/' + id + '/');
  }
}
