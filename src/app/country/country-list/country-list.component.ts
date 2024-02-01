import { Component } from '@angular/core';
import { CountryService } from '../country.service';
import { Country } from 'src/app/models/country';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css'],
})
export class CountryListComponent implements OnInit {
  countries: Country[] = [];
  searchTerm: string = '';
  chosenRegion: string = '';
  showScrollButton = false;

  constructor(private countryService: CountryService) {
    window.addEventListener('scroll', () => {
      this.showScrollButton = window.scrollY > 200;
    });
  }
  ngOnInit(): void {
    this.countries = JSON.parse(localStorage.getItem('countries') || '[]');
    if (this.countries.length === 0) {
      this.countryService.getAllCountries().subscribe((data) => {
        data.forEach((item: any) => {
          let country: Country = {
            name: item.name.common,
            nativeName: item.name.nativeName
              ? (Object.values(item.name.nativeName)[0] as string)
              : '',
            abbr: item.cca3,
            capital: item.capital ? item.capital[0] : '',
            borders: item.borders,
            currencies: item.currencies ? Object.keys(item.currencies) : [],
            domain: item.tld ? item.tld[0] : '',
            languages: item.languages ? Object.values(item.languages) : [],
            population: item.population,
            flagImage: item.flags.png,
            region: item.region,
            subregion: item.subregion,
          };
          this.countries.push(country);
          localStorage.setItem('countries', JSON.stringify(this.countries));
        });
      });
    }
  }

  searchByName(event: Event) {
    let searchTerm: string = (event.target as HTMLInputElement).value;
    this.searchTerm = searchTerm ? searchTerm : '';
  }

  filterByRegion(event: Event) {
    let region: string = (event.target as HTMLInputElement).value;
    this.chosenRegion = region ? region : '';
    console.log(this.chosenRegion);
  }

  getCountry(abbr: string): Country | undefined {
    if (this.countries) {
      return this.countries.find((country) => country.abbr === abbr);
    }
    return undefined;
  }

  get filteredCountries() {
    let filteredCountries: Country[] = this.countries;
    filteredCountries = this.searchTerm
      ? filteredCountries.filter((item) =>
          item.name.toLowerCase().startsWith(this.searchTerm.toLowerCase())
        )
      : filteredCountries;
    filteredCountries =
      this.chosenRegion && this.chosenRegion !== 'all'
        ? filteredCountries.filter(
            (item) =>
              item.region.toLowerCase() == this.chosenRegion.toLowerCase()
          )
        : filteredCountries;
    return filteredCountries;
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
