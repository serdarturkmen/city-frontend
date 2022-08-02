import { Component } from '@angular/core';
import {TokenStorageService} from "./services/token-storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private roles: string[] = [];
  isLoggedIn = false;
  showCityPage = false;
  showEditPage = false;
  username?: string;

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const role = this.tokenStorageService.getRole();
      this.roles.push(role);
      this.showCityPage = this.roles.includes('ROLE_USER');
      this.showEditPage = this.roles.includes('ROLE_ALLOW_EDIT');
    }
  }


  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}

