import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  POST_DATA<T>(apiURL: string, postObject: any): Observable<T> {
    return this.http.post<T>(apiURL, postObject).pipe();
  }
  
  PUT_DATA<T>(apiURL: string, postObject: any): Observable<T> {
    return this.http.put<T>(apiURL, postObject).pipe();
  }

  GET_DATA<T>(apiURL: string): Observable<T> {
    return this.http.get<T>(`${apiURL}`).pipe();
  }

  DELETE_DATA<T>(apiURL: string): Observable<T> {
    return this.http.get<T>(`${apiURL}`).pipe();
  }
}
