import { Component, Input, ViewChild, NgZone, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MapsAPILoader, AgmMap, GoogleMapsAPIWrapper, MouseEvent } from '@agm/core';
import { StudentlistService } from '../../_services/student-list.service';
import { InfoWindow } from '@agm/core/services/google-maps-types';
import { google } from 'google-maps';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';

declare var google: google;

interface Waypoint {
  location: string;
}

@Component({
  selector: 'app-map-places',
  templateUrl: './map-places.component.html',
  styleUrls: ['./map-places.component.css']
})

export class MapPlacesComponent implements OnInit {
  waypoints: any[];

  constructor(private studentlistService: StudentlistService) { }

  public infoWindow: InfoWindow = undefined;
  public origin: any;
  public destination: any;
  public travelMode: String = 'DRIVING';
  // transitOptions: string; // default: 'DRIVING'
  provideRouteAlternatives = false; // default: false
  optimizeWaypoints = true; // default: true
  avoidHighways = false; // default: false
  avoidTolls = false; // default: false
  visible = true; // default: true

  public renderOptions: any = {
    markerOptions: { // effect all markers
      icon: {
        url: '../../../assets/icon.png',
      }
    }
  };

  title: string = 'Google Map';
  lat: number = 51.678418;
  lng: number = 7.809007;

  // public waypoints: any = [
  //   {
  //     location: 'Travessa Brigada - Estação, Itaqui - RS',
  //     stopover: true
  //   },
  //   {
  //     location: { lat: -29.140501, lng: -56.547600 },
  //     stopover: true
  //   },
  //   {
  //     location: { lat: -29.134065, lng: -56.545883 },
  //     stopover: true
  //   }
  // ];

  ngOnInit() {
    this.studentlistService.getaddressAll()
      .pipe()
      .subscribe(lists => this.waypoints = lists);

    this.getDirection();
  }

  getDirection() {
    this.origin = { lat: -29.144011, lng: -56.531227 };
    this.destination = { lat: -29.121408, lng: -56.557359 };
    // Location within a string
    // this.origin = 'barra do quaraí, rs';
    // this.destination = 'santo antônio das missões, rs';
  }

}
