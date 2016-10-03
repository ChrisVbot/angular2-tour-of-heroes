//importing these decorators from Angular because we're going to need them
import { Component, Input } from '@angular/core';
import { Hero } from './hero';

//metadata:
@Component({
  selector: 'my-hero-detail',
  template: `
    <div *ngIf="hero">
    <h2>{{hero.name}} details!</h2>
    <div><label>id: </label>{{hero.id}}</div>
    <div>
        <label>name: </label>
        <input [(ngModel)]="hero.name" placeholder="name"/>
    </div>
  </div>
  `
})
//export to make it available to other components
export class HeroDetailComponent {
  @Input()
  hero: Hero;
}