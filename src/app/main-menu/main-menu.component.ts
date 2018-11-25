import { Component, OnInit } from '@angular/core';
import { MenuService } from '../menu.service';
import { Meal } from '../model/meal';
import { OrderService }  from '../order.service';
import { Order } from '../model/order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {
  meals: Meal[] = [];
  orders: Order[];
  total: number;

  constructor(private menuService: MenuService,
    private orderService: OrderService,
    private router: Router) {
    
  }

  ngOnInit() {
    this.getMeals();
    this.getOrders();
    this.getTotal();
  }

  getMeals(): void {
    this.menuService.getMeals()
        .subscribe(meals => this.meals = meals);
  }

  getOrders(): void {
    this.orderService.getOrders()
      .subscribe(orders => {
        this.orders = orders;
      });

    
  }

  getTotal(): void{
    this.orderService.getOrderTotal()
      .subscribe(total => {
        this.total = total;
      });
  }

  removeOrder(orderKey): void{
    this.orderService.removeOrder(orderKey);
    this.getTotal();
  }

  addMeal(meal): void{
    if(meal.available){
      this.router.navigate(['/meal/'+meal.codebar]);
    }
    
  }

  getStepItemsArray(stepItems): any[]{
    let items = [];
    let stepItemsProps = Object.keys(stepItems);
    for (let id of stepItemsProps) { 
      for(let j=0; j<stepItems[id].length; j++){
        items.push(stepItems[id][j].name);
      }
    }
    return items;
  }

  isAnyOrder(): boolean{
    if(this.orders.length>0){
      return true;
    }
    return false;
  }
  

}
