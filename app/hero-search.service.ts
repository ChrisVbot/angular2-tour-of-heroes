import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { Hero } from './hero';

@Injectable()
export class HeroSearchService {
  constructor(private http: Http) {}

  //the http.get() call is similar to the one in the HeroService, although the URL now has a query string
  //another notable difference: we no longer call toPromise, we simply return the observable instead
  search(term: string): Observable<Hero[]> {
    return this.http 
      .get(`app/heroes/?name=${term}`)
      .map((r: Response) => r.json().data as Hero[]);
  }
}