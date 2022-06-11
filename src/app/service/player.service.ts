import {Injectable} from "@angular/core";
import {Player} from "../models/Player";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private http: HttpClient) {
  }

  baseUrl = 'https://ateliertennissavary.herokuapp.com';

  getAllPLayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.baseUrl + '/player');
  }

  getPLayerById(id: number): Observable<Player> {
    return this.http.get<Player>(this.baseUrl +`/player/${id}`);
  }

}
