import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Meal } from './model/meal';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private apiURL: string = "http://cdn.tekus.co/PT2018/Products.json";
  private meals : Meal[] = [];;


  constructor(private http: HttpClient) { }

  
  getMeals(): Observable<Meal[]> {
    return this.http.get<Meal[]>(this.apiURL).pipe(map((meals: Meal[]) => {
      this.meals = meals;
      return meals;
    })).pipe(
      catchError(this.handleError('getMeals', []))
    );
  }

  getMeal(codebar: number): Observable<Meal> {
    return of(this.meals.find(meal => meal.codebar === codebar));
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
   
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
