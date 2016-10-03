import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
//TypeScript sees the @Injectable() decorator and emits metadata about our service, that Angular may need to inject other dependencies into this service
//It is "best practice" to apply the @Injectable() decorator from the start both for consistence and for future-proofing
@Injectable()
export class HeroService {
  getHeroes(): Promise<Hero[]> {
    return Promise.resolve(HEROES);
  }

  getHeroesSlowly(): Promise<Hero[]> {
    return new Promise<Hero[]>(resolve => 
      setTimeout(resolve, 2000))
      .then(() => this.getHeroes());
  }
}