import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


// Imports for loading & configuring the in-memory web api
//basically a way of faking http server requests
//replaces the defaut Http client backend with an in-memory web API alternative service
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';


import { AppComponent } from './app.component';

import { HeroDetailComponent } from './hero-detail.component';

import { HeroesComponent } from './heroes.component';
import { HeroService } from './hero.service';

import { routing } from './app.routing';

import { DashboardComponent} from './dashboard.component';


@NgModule({
  imports:      [ 
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    routing
  ],
  declarations: [ 
    AppComponent,
    DashboardComponent,
    HeroDetailComponent,
    HeroesComponent
  ],
  providers: [
    HeroService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
