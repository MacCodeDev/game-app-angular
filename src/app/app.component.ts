import { Component } from '@angular/core';
import { AuthGuard } from "./guards/auth.guard";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'game-app';

  constructor(public authGuard: AuthGuard) { }
}
