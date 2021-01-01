import { Component, Input, ViewChild, NgZone, OnInit, OnChanges } from '@angular/core';
import { MapsAPILoader, AgmMap, GoogleMapsAPIWrapper, MouseEvent } from '@agm/core';

declare var google: any;

@Component({
  selector: 'app-map-places',
  templateUrl: './map-places.component.html',
  styleUrls: ['./map-places.component.css']
})

export class MapPlacesComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: { lat: 41.85, lng: -87.65 }
    });
    directionsDisplay.setMap(map);
    calculateAndDisplayRoute(directionsService, directionsDisplay);

    function calculateAndDisplayRoute(directionsService, directionsDisplay) {

      const waypts = [];
      const checkboxArray: any[] = [
        'winnipeg', 'regina', 'calgary'
      ];
      for (var i = 0; i < checkboxArray.length; i++) {

        waypts.push({
          location: checkboxArray[i],
          stopover: true
        });

      }

      directionsService.route({
        origin: { lat: 41.85, lng: -87.65 },
        destination: { lat: 49.3, lng: -123.12 },
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: 'DRIVING'
      }, function (response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    }
  }
}
