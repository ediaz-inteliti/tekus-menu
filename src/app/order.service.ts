import { Injectable } from '@angular/core';
import { Order } from './model/order';
import { Meal } from './model/meal';
import { Item } from './model/item';

import { Observable, of } from 'rxjs';

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


  addMeal(meal : Meal) : number{
    let order = new Order()
    order.meal = meal;
    order.stepItems = {};
    for(let j=0;j<meal.steps.length;j++){
      order.stepItems[meal.steps[j].id] = [];
    }
    this.total += order.meal.price;
    return this.orders.push(order) - 1;
  }

  getOrder(orderKey): Observable<Order>{
    return of(this.orders[orderKey]);
  }

  getOrders(): Observable<Order[]>{
    return of(this.orders);
  }
  
  getOrderTotal(): Observable<number>{
    return of(this.total);
  }

  addItem(orderKey,stepId,orderItem) : void {
    for(let j=0; j<this.orders[orderKey].stepItems[stepId].length; j++){
      if(this.orders[orderKey].stepItems[stepId][j].id==orderItem.id){
        return;
      }
    }
    this.orders[orderKey].stepItems[stepId].push(orderItem);
  }

  clearStep(orderKey,stepId) : void {
    this.orders[orderKey].stepItems[stepId] = [];
  }

  removeOrder(orderKey): void{
    this.total -= this.orders[orderKey].meal.price;
    this.orders.splice(orderKey, 1);
  }
}
