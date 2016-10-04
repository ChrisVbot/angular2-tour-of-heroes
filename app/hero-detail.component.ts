//importing these decorators from Angular because we're going to need them
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from './hero.service';
import { Hero } from './hero';

//metadata:
@Component({
  selector: 'my-hero-detail',
  templateUrl: 'hero-detail.component.html',
  styleUrls: ['hero-detail.component.css'],
  moduleId: module.id
})
//export to make it available to other components
export class HeroDetailComponent implements OnInit {
  @Input()
  hero: Hero;
  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  //convert the route parameter value to a number with the JavaScript (+) operator
  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      this.heroService.getHero(id)
        .then(hero => this.hero = hero);
    });
  }

  //using the Location service we injected
  goBack(): void {
    this.location.back();
  }
  save(): void {
    this.heroService.update(this.hero)
      .then(() => this.goBack());
  }
}




