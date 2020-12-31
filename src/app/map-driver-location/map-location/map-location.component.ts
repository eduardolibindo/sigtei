import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const ping = `${environment.apiUrl}/ping`;

@Component({
  selector: 'app-map-location',
  templateUrl: './map-location.component.html',
  styleUrls: ['./map-location.component.css']
})
export class MapLocationComponent implements OnInit {

  public constructor(private http: HttpClient) {}

  pingServer(location) {
    this.http
      .post(ping, location)
      .subscribe((res) => {});
  }

  ngOnInit() {
    if ('geolocation' in navigator) {
      navigator.geolocation.watchPosition((position) => {
        this.pingServer({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }
}
