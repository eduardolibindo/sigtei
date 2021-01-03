import { Component, OnInit } from '@angular/core';
import { MouseEvent, AgmMap } from '@agm/core';
import { TravelMarker, TravelMarkerOptions, TravelData, TravelEvents, EventType } from 'travel-marker';
import locationData from './loc.json';
import { google } from 'google-maps';
import { StudentlistService } from 'src/app/_services/student-list.service';

declare var google: google;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  waypoints: any[];
  // google maps zoom level
  zoom: number = 14;

  // initial center position for the map
  lat: number = -29.136974;
  lng: number = -56.549621;

  map: any;
  line: any;
  directionsService: any;
  marker: TravelMarker = null;

  constructor(private studentlistService: StudentlistService) { }

  // speedMultiplier to control animation speed
  speedMultiplier = 1;

  onMapReady(map: any) {
    console.log(map);
    this.map = map;
    this.calcRoute();
    // this.mockDirections();
    // this.initEvents();
  }

  // get locations from direction service
  calcRoute() {
    this.line = new google.maps.Polyline({
      strokeOpacity: 0.5,
      path: [],
      map: this.map
    });

    const start = new google.maps.LatLng(-29.144011, -56.531227);
    const end = new google.maps.LatLng(-29.121408, -56.557359);
    const request = {
      origin: start,
      destination: end,
      waypoints: this.waypoints,
      travelMode: google.maps.TravelMode.BICYCLING
    };
    this.directionsService = new google.maps.DirectionsService();
    this.directionsService.route(request, (response, status) => {
      // Empty response as API KEY EXPIRED
      console.log(request);
      console.log(response);
      if (status == google.maps.DirectionsStatus.OK) {
        var legs = response.routes[0].legs;
        for (let i = 0; i < legs.length; i++) {
          var steps = legs[i].steps;
          for (let j = 0; j < steps.length; j++) {
            var nextSegment = steps[j].path;
            for (let k = 0; k < nextSegment.length; k++) {
              this.line.getPath().push(nextSegment[k]);
            }
          }
        }
        this.initRoute();
      }
    });
  }

  // mock directions api
  mockDirections() {
    const locationArray = locationData.map(l => new google.maps.LatLng(l[0], l[1]));
    this.line = new google.maps.Polyline({
      strokeOpacity: 0.5,
      path: [],
      map: this.map
    });
    locationArray.forEach(l => this.line.getPath().push(l));

    const start = new google.maps.LatLng(51.513237, -0.099102);
    const end = new google.maps.LatLng(51.514786, -0.080799);

    const startMarker = new google.maps.Marker({ position: start, map: this.map, label: 'A' });
    const endMarker = new google.maps.Marker({ position: end, map: this.map, label: 'B' });
    this.initRoute();
  }

  // initialize travel marker
  initRoute() {
    const route = this.line.getPath().getArray();

    // options
    const options: TravelMarkerOptions = {
      map: this.map,  // map object
      speed: 50,  // default 10 , animation speed
      interval: 10, // default 10, marker refresh time
      speedMultiplier: this.speedMultiplier,
      markerOptions: {
        title: 'Travel Marker',
        animation: google.maps.Animation.DROP,
        icon: {
          url: '../../../assets/bus.png',
          // This marker is 20 pixels wide by 32 pixels high.
          animation: google.maps.Animation.DROP,
          // size: new google.maps.Size(256, 256),
          scaledSize: new google.maps.Size(128, 128),
          // The origin for this image is (0, 0).
          origin: new google.maps.Point(0, 0),
          // The anchor for this image is the base of the flagpole at (0, 32).
          anchor: new google.maps.Point(60, 130)
        }
      },
    };

    // define marker
    this.marker = new TravelMarker(options);

    // add locations from direction service
    this.marker.addLocation(route);

    setTimeout(() => this.play(), 2000);
  }

  // play animation
  play() {
    this.marker.play();
  }

  // pause animation
  pause() {
    this.marker.pause();
  }

  // reset animation
  reset() {
    this.marker.reset();
  }

  // jump to next location
  next() {
    this.marker.next();
  }

  // jump to previous location
  prev() {
    this.marker.prev();
  }

  // fast forward
  fast() {
    this.speedMultiplier *= 2;
    this.marker.setSpeedMultiplier(this.speedMultiplier);
  }

  // slow motion
  slow() {
    this.speedMultiplier /= 2;
    this.marker.setSpeedMultiplier(this.speedMultiplier)
  }

  ngOnInit() {
    this.studentlistService.getaddressAll()
      .pipe()
      .subscribe(lists => this.waypoints = lists);
  }

  initEvents() {
    this.marker.event.onEvent((event: EventType, data: TravelData) => {
      console.log(event, data);
    });
  }

}
