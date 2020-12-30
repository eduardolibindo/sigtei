import { Injectable } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { Observable, Subject, of, from } from 'rxjs';
import { filter, catchError, tap, map, switchMap } from 'rxjs/operators';
import { Location } from '../_models/location';


@Injectable({
  providedIn: 'root'
})
export class MapService {
  lat: number;
  lng: number;

  private geocoder: any;

  constructor(private mapLoader: MapsAPILoader) { }

  private initGeocoder() {
    console.log('Init geocoder!');
    this.geocoder = new google.maps.Geocoder();
  }

  private waitForMapsToLoad(): Observable<boolean> {
    if (!this.geocoder) {
      return from(this.mapLoader.load())
        .pipe(
          tap(() => this.initGeocoder()),
          map(() => true)
        );
    }
    return of(true);
  }

  geocodeAddress(location: string) {
    this.geocoder.geocode({ address: location }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          this.lat = results[0].geometry.location.lat();
          this.lng = results[0].geometry.location.lng();
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }
  
}
