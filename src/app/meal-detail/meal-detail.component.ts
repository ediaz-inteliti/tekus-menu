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

  getOrder(orderKey): void {
    this.orderService.getOrder(orderKey)
      .subscribe(order => {
        this.order = order;
      });
  }

  onItemSelected(step: Step, item: Item): void{
    if(step.selectableItems==1 && this.order.stepItems[step.id].length>0){

      this.orderService.clearStep(this.orderKey,step.id);

    }
    this.orderService.addItem(this.orderKey,step.id,item);
    this.condition = true;
  }

  isItemSelected(step: Step, item: Item): boolean{
    
    for(let j=0; j<this.order.stepItems[step.id].length; j++){
      if(this.order.stepItems[step.id][j].id==item.id){
        return true;
      }
    }
    return false;
  }


  currentStep(stepId: number): boolean{
    if(stepId==this.currentStepId){
      return true;
    }
    return false;
  }

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

  isFirstStep(): boolean{
    if(this.currentStepId==this.meal.steps[0].id){
      return true;
    }
    return false;
  }

  isLastStep(): boolean{
    let len = this.meal.steps.length;
    if(this.currentStepId==this.meal.steps[len-1].id){
      return true;
    }
    return false;
  }

  cancelOrder(): void{
    this.orderService.removeOrder(this.orderKey);
    this.router.navigate(['/main']);
  }
}
