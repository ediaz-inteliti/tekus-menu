import { Component, OnInit } from '@angular/core';


import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { MenuService }  from '../menu.service';
import { OrderService }  from '../order.service';
import { Meal } from '../model/meal';
import { Step } from '../model/step';
import { Item } from '../model/item';

@Component({
  selector: 'app-meal-detail',
  templateUrl: './meal-detail.component.html',
  styleUrls: ['./meal-detail.component.scss']
})
export class MealDetailComponent implements OnInit {

  meal: Meal;
  mealOrder: Meal;

  constructor(
    private route: ActivatedRoute,
    private menuService: MenuService,
    private location: Location,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.getMeal();
  }

  getMeal(): void {
    const codebar = +this.route.snapshot.paramMap.get('codebar');
    this.menuService.getMeal(codebar)
      .subscribe(meal => {
        this.meal = meal;
        this.orderService.addMeal(meal);
      });
    
  }

  onItemSelected(item: Item): void{
    this.orderService.addItem({codebar:this.meal.codebar,item:item});
  }
}
