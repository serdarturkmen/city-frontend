import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly resourceUrl: string = '/authenticate';

  constructor(private http: HttpClient) {
    this.resourceUrl = environment.url + this.resourceUrl;
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(this.resourceUrl, {
      email,
      password
    }, httpOptions);
  }
}
