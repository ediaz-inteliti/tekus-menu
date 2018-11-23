import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { MealDetailComponent } from './meal-detail/meal-detail.component';

import { HttpClientModule }    from '@angular/common/http';

import { FormWizardModule } from 'angular2-wizard';


@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    MealDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormWizardModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
