import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";
import {Page} from "../model/page";

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private readonly resourceUrl: string = '/city';

  constructor(private http: HttpClient) {
    this.resourceUrl = environment.url + this.resourceUrl;
  }

  findAll(page: Page): Observable<any> {
    return this.http.get(`${this.resourceUrl}?page=${page.pageNumber}`, {observe: 'response'});
  }

  findByName(page: Page, name: string): Observable<any> {
    return this.http.get(`${this.resourceUrl}/${name}?page=${page.pageNumber}`, {observe: 'response'});
  }

  findById(id: number): Observable<any> {
    return this.http.get(`${this.resourceUrl}/details/${id}`, {observe: 'response'});
  }

}
