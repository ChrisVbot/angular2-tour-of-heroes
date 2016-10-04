import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { Headers, Http } from '@angular/http';

//RxJS Observable - a powerful way to manage asynchronous data flows
//We are importing the operator 'toPromise' which is one of many operators like toPromise
import 'rxjs/add/operator/toPromise';

//TypeScript sees the @Injectable() decorator and emits metadata about our service, that Angular may need to inject other dependencies into this service
//It is "best practice" to apply the @Injectable() decorator from the start both for consistence and for future-proofing
@Injectable()
export class HeroService {
  //url to web api
  private heroesUrl = 'app/heroes';

  constructor(private http: Http) { }

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
      //immediately convert Observable to a Promise:
      .toPromise()
      //we call the json method of the HTTP Response to extract the data within the response
      //the data property holds the array of heroes(for this web api - other APIs may be different) that the caller really wants so we grab it and return it as the resolved Promise value
      .then(response => response.json().data as Hero[])
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); 
    return Promise.reject(error.message || error);
  }

  getHero(id: number): Promise<Hero> {
    return this.getHeroes()
      .then(heroes => heroes.find(hero => hero.id === id));
  }
  private headers = new Headers({'Content-Type': 'application/json'});

  //we idenfify which hero the server should update by encoding the hero id in the URL.
  //the put body is the JSON string encoding of the hero, obtained by calling JSON.stringify
  //we identify the body content type (application/json) in the request header
  update(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http
      .put(url, JSON.stringify(hero), {headers: this.headers})
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }

  create(name: string): Promise<Hero> {
    return this.http
    .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
    .toPromise()
    .then(res => res.json().data)
    .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
}











