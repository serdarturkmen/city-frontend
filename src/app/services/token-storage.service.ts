import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public getRole(): any {
    const token = window.sessionStorage.getItem(TOKEN_KEY);
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = JSON.parse(atob(payload));
    }
    return payload ? payload.auth : null;
  }
}
