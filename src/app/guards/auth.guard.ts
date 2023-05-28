import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

interface User {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  async canActivate(): Promise<boolean> {
    const isLoggedIn = this.checkLoginStatus();

    if (isLoggedIn) {
      return true;
    } else {
      await this.router.navigate(['']);
      return false;
    }
  }

  private checkLoginStatus(): boolean {
    const expectedUsername = 'Admin';
    const expectedPassword = 'Wsei123';

    const storedUser = sessionStorage.getItem('currentUser');
    if (storedUser) {
      const enteredUser: User = JSON.parse(storedUser);
      const enteredUsername = enteredUser.username;
      const enteredPassword = enteredUser.password;

      const isLoggedIn = (enteredUsername === expectedUsername && enteredPassword === expectedPassword);

      return isLoggedIn;
    }

    return false;
  }
}
