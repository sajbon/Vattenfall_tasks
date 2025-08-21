import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,      // MUSI BYĆ standalone
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    const map = L.map('map').setView([52.2297, 21.0122], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    L.marker([52.2297, 21.0122])
      .addTo(map)
      .bindPopup('Vattenfall Office - Warszawa')
      .openPopup();
  }
}
