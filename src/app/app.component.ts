import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public darkModeActive = false;
  ngOnInit(): void {
    if (localStorage.getItem('darkMode') === 'true') {
      this.darkModeToggle();
    }
  }

  darkModeToggle() {
    this.darkModeActive = !this.darkModeActive;
    console.log(this.darkModeActive);
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', this.darkModeActive.toString());
  }
  title = 'rest-country';
}
