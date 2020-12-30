import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

declare var H: any;

@Component({
  selector: 'app-map-here',
  templateUrl: './map-here.component.html',
  styleUrls: ['./map-here.component.css']
})
export class MapHereComponent implements OnInit {

  @ViewChild('map', { static: true }) public mapElement: ElementRef;

  public lat: any = '22.5726';
  public lng: any = '88.3639';

  public width: any = '1000px';
  public height: any = '600px';

  private platform: any;
  private map: any;

  private _appId = 'RV6CflwtVLNZqPHe5DcT';
  private _appCode = 'cA2LBBXumd1L97F2T6SFTZY1JPk-rqqWJUaFAK4yHOI';

  public query: string;
  private search: any;
  private ui: any;
  public address: string = '';

  public constructor() {
    this.query = "";
  }

  ngOnInit() {
    this.platform = new H.service.Platform({
      'app_id': 'RV6CflwtVLNZqPHe5DcT',
      'app_code': 'cA2LBBXumd1L97F2T6SFTZY1JPk-rqqWJUaFAK4yHOI',
      useHTTPS: true
    });
    this.search = new H.places.Search(this.platform.getPlacesService());
  }

  public ngAfterViewInit() {
    let pixelRatio = window.devicePixelRatio || 1;
    let defaultLayers = this.platform.createDefaultLayers({
      tileSize: pixelRatio === 1 ? 256 : 512,
      ppi: pixelRatio === 1 ? undefined : 320
    });

    this.map = new H.Map(this.mapElement.nativeElement,
      defaultLayers.normal.map, { pixelRatio: pixelRatio });

    var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
    var ui = H.ui.UI.createDefault(this.map, defaultLayers);

    this.map.setCenter({ lat: this.lat, lng: this.lng });
    this.map.setZoom(14);

    this.setUpClickListener(this.map);
  }

  public places(query: string) {
    this.map.removeObjects(this.map.getObjects());
    this.search.request({ "q": query, "at": this.lat + "," + this.lng }, {}, data => {
      for (let i = 0; i < data.results.items.length; i++) {
        this.dropMarker({ "lat": data.results.items[i].position[0], "lng": data.results.items[i].position[1] }, data.results.items[i]);
        if (i == 0)
          this.map.setCenter({ lat: data.results.items[i].position[0], lng: data.results.items[i].position[1] })
      }
    }, error => {
      console.error(error);
    });
  }

  private dropMarker(coordinates: any, data: any) {
    let marker = new H.map.Marker(coordinates);
    marker.setData("<p>" + data.title + "<br>" + data.vicinity + "</p>");
    marker.addEventListener('tap', event => {
      let bubble = new H.ui.InfoBubble(event.target.getPosition(), {
        content: event.target.getData()
      });
      this.ui.addBubble(bubble);
    }, false);
    this.map.addObject(marker);
  }

  public setUpClickListener(map: any) {
    let self = this;
    this.map.addEventListener('tap', function (evt) {
      let coord = map.screenToGeo(evt.currentPointer.viewportX, evt.currentPointer.viewportY);
      self.lat = Math.abs(coord.lat.toFixed(4)) + ((coord.lat > 0) ? 'N' : 'S');
      self.lng = Math.abs(coord.lng.toFixed(4)) + ((coord.lng > 0) ? 'E' : 'W');
      self.fetchAddress(coord.lat, coord.lng);
    });
  }

  private fetchAddress(lat: any, lng: any): void {
    let self = this;
    let geocoder: any = this.platform.getGeocodingService(),
      parameters = {
        prox: lat + ', ' + lng + ',20',
        mode: 'retrieveAreas',
        gen: '9'
      };


    geocoder.reverseGeocode(parameters,
      function (result) {
        let data = result.Response.View[0].Result[0].Location.Address;
        self.address = data.Label + ', ' + data.City + ', Pin - ' + data.PostalCode + ' ' + data.Country;
      }, function (error) {
        alert(error);
      });
  }


}
