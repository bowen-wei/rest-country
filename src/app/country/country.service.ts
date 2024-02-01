import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Country } from '../models/country';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  apiUrl = 'https://restcountries.com/v3.1';
  constructor(private http: HttpClient) {}

  getAllCountries(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/all');
  }

  getCountry(abbr: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl + '/alpha/'}${abbr}`);
  }

  getCountryByName(name: string): Observable<any[]> {
    return this.http.get<any[]>(
      this.apiUrl + '/name/' + name + '?fullText=true'
    );
  }
}
//https://restcountries.com/v3.1/name/{name}?fullText=true
