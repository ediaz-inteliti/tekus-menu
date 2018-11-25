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

  /**
   * Obtiene los platillos para mostrar en la vista principal
   */
  getMeals(): void {
    this.menuService.getMeals()
        .subscribe(meals => this.meals = meals);
  }

  /**
   * Obtiene los platillos que se han pedido para mostrar en la vista principal
   */
  getOrders(): void {
    this.orderService.getOrders()
      .subscribe(orders => {
        this.orders = orders;
      });
  }

  /**
   * Obtiene el total del pedido
   */
  getTotal(): void{
    this.orderService.getOrderTotal()
      .subscribe(total => {
        this.total = total;
      });
  }

  /**
   * Elimina un platillo del pedido del cliente
   * @param orderKey 
   */
  removeOrder(orderKey): void{
    this.orderService.removeOrder(orderKey);
    this.getTotal();
  }

  /**
   * Lleva a detalle para agregar platillo al pedido del cliente
   * @param meal 
   */
  addMeal(meal): void{
    if(meal.available){
      this.router.navigate(['/meal/'+meal.codebar]);
    }
  }

  /**
   * Retorna un arreglo de string con las opciones de cada platillo
   * @param stepItems 
   */
  getStepItemsArray(stepItems): string[]{
    let items = [];
    let stepItemsProps = Object.keys(stepItems);
    for (let id of stepItemsProps) { 
      for(let j=0; j<stepItems[id].length; j++){
        items.push(stepItems[id][j].name);
      }
    }
    return items;
  }

  /**
   * Verifica que haya algun platillo en el pedido
   */
  isAnyOrder(): boolean{
    if(this.orders.length>0){
      return true;
    }
    return false;
  }
  

}
