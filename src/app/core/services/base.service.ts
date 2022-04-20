import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private http: HttpClient) { }

  public get<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  public post<T>(url: string, body?: any, options?: any ) {
    if (body) {
      return this.http.post(url, body, options);
    }
    return this.http.post(url, options);
  }

  public put<T>(url: string, body?: any, options?: any ) {
    if (body) {
      return this.http.put(url, body, options);
    }
    return this.http.put(url, options);
  }

  public delete<T>(url: string, options?: any) {
    return this.http.delete(url, options);
  }

  public request<T>(type: string, url: string, options?: any) {
    return this.http.request(type, url, options);
  }
}
