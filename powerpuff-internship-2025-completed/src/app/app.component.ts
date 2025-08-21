import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { MapComponent } from './map/map.component'; // popraw ścieżkę

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'], // <- poprawione
  standalone: true, // musisz dodać standalone, jeśli używasz imports
  imports: [HeaderComponent, FooterComponent, RouterOutlet, MapComponent],
})
export class AppComponent {
  title = 'powerpuff-internship';
}
