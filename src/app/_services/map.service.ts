import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private baseUrl: string = environment.map_url;

  constructor(private httpClient: HttpClient) { }

  public getCoordinates(query: string) {
    query = query.trim();
    const options = query ?
      {
        params: new HttpParams()
          .set('access_key', environment.positionstack_apikey)
          .set('query', query)
          .set('limit', '10')
          .set('output', 'json')
      } : {};

    return this.httpClient.get(
      this.baseUrl + '/forward',
      options
    );
  }
}
