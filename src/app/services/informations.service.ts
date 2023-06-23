import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { InfoArtist } from '../models/information.model';
import { INFORMATIONS } from '../mocks/information.mock';

@Injectable({
  providedIn: 'root'
})
export class InformationsService {

  constructor() { }

  getInfoArtist(): Observable<InfoArtist[]> {
    return of (INFORMATIONS)
  }
}
