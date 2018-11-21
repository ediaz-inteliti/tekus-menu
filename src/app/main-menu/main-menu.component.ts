import { Component, OnInit } from '@angular/core';
import { MenuService } from '../menu.service';
import { Meal } from '../model/meal';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {
  meals: Meal[] = [];


  constructor(private menuService: MenuService) {
    
  }

  ngOnInit() {
    this.getMeals();
  }

  getMeals(): void {
    this.menuService.getMeals()
        .subscribe(meals => this.meals = meals);
  }

}
