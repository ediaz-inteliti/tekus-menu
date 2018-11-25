import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import { MenuService }  from '../menu.service';
import { OrderService }  from '../order.service';
import { Meal } from '../model/meal';
import { Step } from '../model/step';
import { Item } from '../model/item';
import { Order } from '../model/order';

@Component({
  selector: 'app-meal-detail',
  templateUrl: './meal-detail.component.html',
  styleUrls: ['./meal-detail.component.scss']
})
export class MealDetailComponent implements OnInit {

  meal: Meal;
  orderKey : number;
  order : Order;
  condition : boolean;
  currentStepId : number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private menuService: MenuService,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.getMeal();
  }

  /**
   * Obtiene informacion del platillo para mostrarlo en la vista de detalle
   */
  getMeal(): void {
    const codebar = +this.route.snapshot.paramMap.get('codebar');
     
    this.menuService.getMeal(codebar)
      .subscribe(meal => {
        this.meal = meal;
        this.currentStepId = meal.steps[0].id;
        this.orderKey = this.orderService.addMeal(meal);
        this.getOrder(this.orderKey);
      });
    
  }

  /**
   * Obtiene objeto de platillo que se esta pidiendo
   * @param orderKey 
   */
  getOrder(orderKey): void {
    this.orderService.getOrder(orderKey)
      .subscribe(order => {
        this.order = order;
      });
  }

  /**
   * Event Handler cada vez se selecciona un item de un paso de personalizacion del pedido
   * @param step 
   * @param item 
   */
  onItemSelected(step: Step, item: Item): void{
    if(step.selectableItems==1 && this.order.stepItems[step.id].length>0){
      this.orderService.clearStep(this.orderKey,step.id);
    }
    this.orderService.addItem(this.orderKey,step.id,item);
    this.condition = true;
  }

  /**
   * Permite saber si un item fue seleccionado
   * @param step 
   * @param item 
   */
  isItemSelected(step: Step, item: Item): boolean{
    for(let j=0; j<this.order.stepItems[step.id].length; j++){
      if(this.order.stepItems[step.id][j].id==item.id){
        return true;
      }
    }
    return false;
  }

  /**
   * Indica en que paso se encuentra
   * @param stepId 
   */
  currentStep(stepId: number): boolean{
    if(stepId==this.currentStepId){
      return true;
    }
    return false;
  }

  /**
   * Se mueve al siguiente paso
   */
  nextStep(): void{
    let nextStepIndex = 0;
    for(let i=0;i<this.meal.steps.length; i++){
      if(this.meal.steps[i].id==this.currentStepId){
        nextStepIndex = i+1;
      }
    }
    if(typeof this.meal.steps[nextStepIndex] !== 'undefined'){
      this.currentStepId = this.meal.steps[nextStepIndex].id;
    }
  }

  /**
   * Regresa al paso anterior
   */
  prevStep(): void{
    let prevStepIndex = 0;
    for(let i=0;i<this.meal.steps.length; i++){
      if(this.meal.steps[i].id==this.currentStepId){
        prevStepIndex = i-1;
      }
    }
    if(typeof this.meal.steps[prevStepIndex] !== 'undefined'){
      this.currentStepId = this.meal.steps[prevStepIndex].id;
    }
  }

  /**
   * Indica si esta en el primer paso de seleccion
   */
  isFirstStep(): boolean{
    if(this.currentStepId==this.meal.steps[0].id){
      return true;
    }
    return false;
  }

  /**
   * Indica si esta en el ultimo paso de seleccion
   */
  isLastStep(): boolean{
    let len = this.meal.steps.length;
    if(this.currentStepId==this.meal.steps[len-1].id){
      return true;
    }
    return false;
  }

  /**
   * Elimina la el platillo del pedido y regresa a la pantalla principal
   */
  cancelOrder(): void{
    this.orderService.removeOrder(this.orderKey);
    this.router.navigate(['/main']);
  }
}
