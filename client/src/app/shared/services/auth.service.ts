import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../interfaces";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string = null;

  constructor(private http: HttpClient) {
  }

  login(user: User): Observable<{ token: string }> {
    return this.http.post<{ token }>('/api/auth/login', user).pipe(
      tap(({token}) => {
        this.token = token;
        this.setToken(token);
      })
    );
  }

  logout(): void {
    this.token = null;
    localStorage.clear();
  }

  register(user: User): Observable<User> {
    return this.http.post<User>('/api/auth/register', user);
  }

  getToken(): string {
    return this.token;
  }

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('token-key', token);
  }

  isAuth(): boolean {
    return !!this.token;
  }

}
