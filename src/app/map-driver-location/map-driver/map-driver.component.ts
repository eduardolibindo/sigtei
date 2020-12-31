import { Component, OnInit } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { PusherService } from '../../_services/pusher.service';

declare const google;

@Component({
  selector: 'app-map-driver',
  templateUrl: './map-driver.component.html',
  styleUrls: ['./map-driver.component.css']
})

export class MapDriverComponent implements OnInit {

  constructor(private loader: MapsAPILoader, private pusher: PusherService) {}

  theRanchPolygon;
  showAlert = false;
  showLocationUpdate = false;
  zoom = 15;
  label = 'Ônibus';
  center = {
    lat: -29.134398,
    lng: -56.551694,
  };

  polygon = [
    { lat: -29.161798, lng: -56.541645 },
    { lat: -29.139263, lng: -56.522911 },
    { lat: -29.117932, lng: -56.553013 },
    { lat: -29.117126, lng: -56.566370 },
    { lat: -29.135917, lng: -56.569685 },
    { lat: -29.152034, lng: -56.563441 },
    { lat: -29.154639, lng: -56.551822 },
    { lat: -29.161703, lng: -56.548475 },
  ];


  ngOnInit() {
    this.loader.load().then(() => {
      this.theRanchPolygon = new google.maps.Polygon({ paths: this.polygon });
    });

    const channel = this.pusher.init();
    channel.bind('ping', (position) => {
      this.center = {
        ...position,
      };
      const latLng = new google.maps.LatLng(position);
      this.showLocationUpdate = true;
      if (
        !google.maps.geometry.poly.containsLocation(latLng, this.theRanchPolygon)
      ) {
        this.showAlert = true;
      }
    });
  }

  clickedMarker(label: string) {
    console.log(`clicked the marker: ${label}`)
  }


}
