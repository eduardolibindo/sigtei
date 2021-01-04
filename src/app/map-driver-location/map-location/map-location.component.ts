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
      navigator.geolocation.watchPosition(this.geoSucess, this.catchError, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 3000
      });
    } else {
      alert('Ops! Este navegador não oferece suporte para geolocalização de HTML.');
    }
}

geoSucess = (position) => {
  this.pingServer({
    lat: position.coords.latitude,
    lng: position.coords.longitude,
  });
}

catchError = (error) => {
    switch (error.code)
    {
    case error.TIMEOUT:
      alert('A solicitação para obter a localização do usuário foi cancelada porque demorou muito.');
      break;
    case error.POSITION_UNAVAILABLE:
      alert('As informações de localização não estão disponíveis.');
      break;
    case error.PERMISSION_DENIED:
      alert('A permissão para compartilhar informações de localização foi negada!');
      break;
    default:
      alert('Ocorreu um erro desconhecido.');
    }
  }

}
