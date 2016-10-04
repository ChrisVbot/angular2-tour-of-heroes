import { Component, OnInit } from '@angular/core';

import { Hero } from './hero';
import { HeroService } from './hero.service';

import { Router } from '@angular/router';

@Component({
  selector: 'my-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: [ 'dashboard.component.css' ],
  //module relative loading of template url
  moduleId: module.id
})
export class DashboardComponent implements OnInit { 
  heroes: Hero[] = [];
  //inject the HeroService in the constructor and hold it in a private heroService field
  constructor(
    private router: Router,
    private heroService: HeroService) { 
  }

  ngOnInit(): void {
    this.heroService.getHeroes()
      .then(heroes => this.heroes = heroes.slice(1, 5));
  }

  //sets a route link parameters array
  //passes the array to the router's navigate method
  gotoDetail(hero: Hero): void { 
    let link = ['/detail', hero.id];
    this.router.navigate(link);
  }
}