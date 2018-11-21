import { Component, OnInit } from '@angular/core';


import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { MenuService }  from '../menu.service';
import { Meal } from '../model/meal';

@Component({
  selector: 'app-meal-detail',
  templateUrl: './meal-detail.component.html',
  styleUrls: ['./meal-detail.component.scss']
})
export class MealDetailComponent implements OnInit {

  meal: Meal;

  constructor(
    private route: ActivatedRoute,
    private heroService: MenuService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getMeal();
  }

  getMeal(): void {
    const codebar = +this.route.snapshot.paramMap.get('codebar');
    this.heroService.getMeal(codebar)
      .subscribe(meal => this.meal = meal);
  }

}
