import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';
import { HeroService } from './hero.service';

import { Router } from '@angular/router'

@Component({
  moduleId: module.id,
  selector: 'my-heroes',
  templateUrl: 'heroes.component.html',
  styleUrls: [ 'heroes.component.css' ]
})

export class HeroesComponent implements OnInit { 

  selectedHero: Hero;
  //We could have defined the heroes list here in this component class. But we know that ultimately,
  //we'll get the heroes from a data service. Because we know where we're heading, it makes sense to separate the hero data from the
  //class implementation from the start.
  heroes: Hero[];
  //the parameter simultaneously defines a private heroService property and identifies it as a HeroService injection site.
  constructor(
    private router: Router,
    private heroService: HeroService) {  }

  //when there is no selectedHero, the ngIf directive removes the hero detail HTML from the DOM.
  //There will be no hero detail elements and no bindings to worry about. 
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
  ngOnInit(): void {
    this.getHeroes();
  }
  //acting on the Promise when it resolves successfully, then we will have heroes to display
  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  //when the given name is non-blank, the handler delegates creation of the named hero to the hero service,
  //then adds the new hero to our array
  add(name: string): void {
    name = name.trim();
    if (!name) {return; }
    this.heroService.create(name)
      .then(hero => {
        this.heroes.push(hero);
        this.selectedHero = null;
      });
  }
  //delegate deletion to the hero service but the component is still responsible for updating the display
  //it removes the deleted hero from the array and resets the selected hero if necessary
  delete(hero: Hero): void {
    this.heroService
      .delete(hero.id)
      .then(() => {
        this.heroes = this.heroes.filter(h => h !== hero);
        if (this.selectedHero === hero) { this.selectedHero = null; }
      });
  }

}








