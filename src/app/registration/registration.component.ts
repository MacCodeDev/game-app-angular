import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html'
})
export class RegistrationComponent {
  user = {
    name: '',
    email: ''
  };

  constructor(private http: HttpClient) {}

  registerUser() {
    this.http.post('http://localhost:3000/save-data', this.user).subscribe(
      (response) => {
        console.log('Success:', response);
      },
      (error) => {
        console.error('Error Save:', error);
      }
    );
  }
}
