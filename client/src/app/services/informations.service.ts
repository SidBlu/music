import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { InfoArtist } from '../models/information.model';
import { INFORMATIONS } from '../mocks/information.mock';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InformationsService {
  apiBaseUrl = 'api/infos';
  favoriteArtists: string[] = [];

  constructor(private http: HttpClient) { }

  getInfoArtists(): Observable<InfoArtist[]> {
    return this.http.get<InfoArtist[]>(`${this.apiBaseUrl}/`);
    // return of (INFORMATIONS)
  }

  getArtistsAsync() {
    return this.http.get<InfoArtist[]>(`${this.apiBaseUrl}/`);
  }

  getInfoArtist(id: string): Observable<InfoArtist> {
    return this.http.get<InfoArtist>(`${this.apiBaseUrl}/${id}`);
    // const infoart = INFORMATIONS.find(info => info._id == id);
    // return of (infoart);
  }

  createInfoArtist(form): Observable<InfoArtist> {
    return this.http.post<InfoArtist>(`${this.apiBaseUrl}/`, form);
  }

  getArtistsByGenre(genre: string): Observable<InfoArtist[]> {
    // Your API endpoint to fetch artists by genre
    return this.http.get<InfoArtist[]>(`${this.apiBaseUrl}/artist/genre/${genre}`);
  }

  deleteArtist(id: number): Observable<InfoArtist> {
    return this.http.delete<InfoArtist>(`${this.apiBaseUrl}/${id}`);
  }

  updateArtist(id: number, updateArtist: InfoArtist): Observable<InfoArtist> {
    return this.http.put<InfoArtist>(`${this.apiBaseUrl}/${id}`, updateArtist);
  }
}
