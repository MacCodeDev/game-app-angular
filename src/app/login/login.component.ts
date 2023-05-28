import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface User {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username!: string;
  password!: string;

  constructor(private router: Router) {}

  async login() {
    const adminUser: User = {
      username: 'Admin',
      password: 'Wsei123'
    };

    if (this.username === adminUser.username && this.password === adminUser.password) {
      sessionStorage.setItem('currentUser', JSON.stringify(adminUser));
      await this.router.navigate(['/projects'])
      console.log('TEST')
    } else {
      console.log('Invalid username or password');
    }
  }
}
