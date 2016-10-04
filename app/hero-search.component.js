"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var Observable_1 = require('rxjs/Observable');
var Subject_1 = require('rxjs/Subject');
var hero_search_service_1 = require('./hero-search.service');
var HeroSearchComponent = (function () {
    function HeroSearchComponent(heroSearchService, router) {
        this.heroSearchService = heroSearchService;
        this.router = router;
        //subject is a producer of an observable event stream
        //searchTerms produces an Observable of strings, the filter criteria for the name search
        this.searchTerms = new Subject_1.Subject();
    }
    //push a search term into the observable stream
    //each call to search puts a new string into this subject's observable stream by calling next
    HeroSearchComponent.prototype.search = function (term) {
        this.searchTerms.next(term);
    };
    HeroSearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.heroes = this.searchTerms
            .debounceTime(300) //wait for 300ms pause in events
            .distinctUntilChanged() //ignore if next search term is same as previous
            .switchMap(function (term) { return term //switch to new observable each time
            ? _this.heroSearchService.search(term)
            : Observable_1.Observable.of([]); })
            .catch(function (error) {
            console.log(error);
            return Observable_1.Observable.of([]);
        });
    };
    HeroSearchComponent.prototype.gotoDetail = function (hero) {
        var link = ['/detail', hero.id];
        this.router.navigate(link);
    };
    HeroSearchComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'hero-search',
            templateUrl: 'hero-search.component.html',
            styleUrls: ['hero-search.component.css'],
            providers: [hero_search_service_1.HeroSearchService]
        }), 
        __metadata('design:paramtypes', [hero_search_service_1.HeroSearchService, router_1.Router])
    ], HeroSearchComponent);
    return HeroSearchComponent;
}());
exports.HeroSearchComponent = HeroSearchComponent;
//# sourceMappingURL=hero-search.component.js.map