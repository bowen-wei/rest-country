import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CountryService } from '../country.service';
import { Country } from 'src/app/models/country';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.css'],
})
export class CountryDetailComponent implements OnInit {
  country: Country = {} as Country;
  private name: string = '';
  constructor(
    private countryService: CountryService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => (this.name = params['name'])
    );
    if (this.name) {
      this.countryService.getCountryByName(this.name).subscribe((res) => {
        let data = res[0];
        this.country = {
          name: data.name.common,
          nativeName: '',
          abbr: data.cca3,
          capital: data.capital ? data.capital[0] : '',
          borders: data.borders,
          currencies: data.currencies ? Object.keys(data.currencies) : [],
          domain: data.tld ? data.tld[0] : '',
          languages: data.languages ? Object.values(data.languages) : [],
          population: data.population,
          flagImage: data.flags.png,
          region: data.region,
          subregion: data.subregion,
        };
        let firstKey: any = Object.values(data.name.nativeName)[0];
        this.country.nativeName = firstKey.common;
        this.country.borders.map((border, index) => {
          this.countryService.getCountry(border).subscribe((res) => {
            let data = res[0];
            this.country.borders[index] = data.name.common;
          });
        });
      });
    }
  }

  navigateToCountry(name: string): void {
    this.router.navigate(['/country/' + name]).then(() => {
      window.location.reload();
    });
  }
}
