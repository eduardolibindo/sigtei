import { Component, Input, ViewChild, NgZone, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MapsAPILoader, AgmMap, GoogleMapsAPIWrapper, MouseEvent } from '@agm/core';
import { StudentlistService } from '../../_services/student-list.service';
import { InfoWindow } from '@agm/core/services/google-maps-types';
import { google } from 'google-maps';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';

declare var google: google;

@Component({
  selector: 'app-map-places',
  templateUrl: './map-places.component.html',
  styleUrls: ['./map-places.component.css']
})

export class MapPlacesComponent implements OnInit {
  waypoint: any[];
  waypoints: any[];

  constructor(private studentlistService: StudentlistService) { }

  public origin: any;
  public destination: any;
  public travelMode: String = 'DRIVING';
  provideRouteAlternatives = false; // default: false
  optimizeWaypoints = true; // default: true
  avoidHighways = false; // default: false
  avoidTolls = false; // default: false
  visible = true; // default: true

  public renderOptions: any = {
    draggable: false,
    suppressMarkers: false,
    suppressInfoWindows: false,
    markerOptions: { // afeta todos os marcadores
      icon: '../../../assets/icon.png',
    },
  };

  public markerOptions: {};


  title: string = 'Google Map';
  lat: number = -29.136974;
  lng: number = -56.549621;


  ngOnInit() {
    this.studentlistService.getaddressAll()
      .pipe()
      .subscribe(lists => this.waypoint = lists);

    this.studentlistService.getlabelAll()
      .pipe()
      .subscribe(lists => this.waypoints = lists);

    this.markerOptions = {waypoints: this.waypoints};

    this.getDirection();
  }

  getDirection() {
    this.origin = { lat: -29.144011, lng: -56.531227 };
    this.destination = { lat: -29.121408, lng: -56.557359 };
  }

}
