import { Injectable } from '@angular/core';
import { MEALS } from './data/menu-data';
import { Meal } from './meal';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }

  
  getMeals(): Observable<Meal[]> {
    return of(MEALS);
  }
  
  getMeal(codebar: number): Observable<Meal> {
    return of(MEALS.find(meal => meal.codebar === codebar));
  }
}
