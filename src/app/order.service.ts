import { Injectable } from '@angular/core';
import { Order } from './model/order';
import { Meal } from './model/meal';
import { Item } from './model/item';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders : Order[];
  private total : number;

  constructor() { 
    this.total = 0;
    this.orders = [];
  }


  addMeal(meal : Meal) : void{

    let order = new Order()
    order.meal = meal;
    order.items = [];
    this.total += order.meal.price;
    this.orders.push(order);
    console.log(this.orders);
  }

  addItem(mealItem) : void {
    for(let order in this.orders){
      if(this.orders[order].meal.codebar == mealItem.codebar){
        this.orders[order].items.push(mealItem.item);
        break;
      }
    }
  }
}
