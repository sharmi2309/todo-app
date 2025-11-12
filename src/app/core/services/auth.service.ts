import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 private apiUrl = 'http://localhost:8080/auth'; 
 constructor(private http: HttpClient) { }

  register(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post<any>(`${this.apiUrl}/register`, body);
  }

  login(email: string, password: string): Observable<{ token: string }> {
    const body = { email, password };
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, body);
  }
  setToken(token: string): void {
    sessionStorage.setItem('token', token);
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  logout(): void {
    sessionStorage.removeItem('token');
  }
  isLoggedIn(): boolean {
    return this.getToken() != null;
  }

}
