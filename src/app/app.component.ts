import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'obligatorio-web-mobile-2023';
  toggleDarkLight() {
    const container = document.querySelector('container');
    if (container) {
      container.classList.toggle('dark-theme');
    }
  }
}
