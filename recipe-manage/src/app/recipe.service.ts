import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private baseUrl = environment.apiUrl;
  public userId: number =0;  // Track userId to manage login status

  private searchResultsSubject = new BehaviorSubject<any[]>([]); // Store search results
  searchResults$ = this.searchResultsSubject.asObservable();

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  // Set userId after login
  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/AddUser/ValidateUser`, data, { headers: this.getHeaders() }).pipe(
      tap((response: any) => {
        if (response) {
          this.userId = response;
          console.log('UserId stored in service:', this.userId);
        } else {
          console.error('Invalid login response or missing userId');
        }
      })
    );
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return this.userId !== 0;
  }


  // Category APIs
  getCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/category`, { headers: this.getHeaders() });
  }

  addCategory(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/category`, data, { headers: this.getHeaders() });
  }

  // Ingredient APIs
  getIngredients(): Observable<any> {
    return this.http.get(`${this.baseUrl}/ingredient`, { headers: this.getHeaders() });
  }

  addIngredient(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/AddIngredient`, data, { headers: this.getHeaders() });
  }

  // Recipe APIs
  addRecipe(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/AddRecipe`, data, { headers: this.getHeaders() });
  }

  updateRecipe(recipeId: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/addRecipe/${recipeId}`, data, { headers: this.getHeaders() });
  }

  deleteRecipe(recipeId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/DeleteRecipeById`, {
      headers: this.getHeaders(),
      params: { recipeId: recipeId.toString() } // Add recipeId as a query parameter
    });
  }

  viewAllRecipes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/ViewAllRecipe`, { headers: this.getHeaders() });
  }

  viewRecipeById(recipeId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/ViewAllRecipe/${recipeId}`, { headers: this.getHeaders() });
  }

  viewRecipeByCategory(categoryName: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/ViewAllRecipe/categoryName=${categoryName}`, { headers: this.getHeaders() });
  }

  // Favourite APIs
  // addRemoveFavourite(recipeId: number): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/api/AddRemoveFavourite`, { recipeId }, { headers: this.getHeaders() });
  // }

  addRemoveFavourite(userId: number, recipeId: number): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/api/AddRemoveFavourite`,
      { userId, recipeId }, // Include userId in the payload
      { headers: this.getHeaders() }
    );
  }

  // getFavourites(): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/getFavourites`, { headers: this.getHeaders() });
  // }


  getFavouritesByUser(userId: number): Observable<any> {
    console.log(userId);
    return this.http.get(`${this.baseUrl}/api/GetFavourites/${userId}`, { headers: this.getHeaders() });
  }



  // Method to call the API for search
  searchRecipes(searchQuery: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/GetSearch/search?recipeTitle=${searchQuery}`,{ headers: this.getHeaders() });
  }

  // Update the search results in the subject
  updateSearchResults(data: any[]) {
    this.searchResultsSubject.next(data);
  }




  // User APIs
  addUser(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/AddUser`, data, { headers: this.getHeaders() });
  }
  //login
  // login(data: any): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/api/AddUser/ValidateUser`, data, { headers: this.getHeaders() });
  // }
  // login(data: { email: string; password: string }): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/api/AddUser/ValidateUser`, data, { headers: this.getHeaders() }); 
  // }
  
  // login(data: { email: string; password: string }): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/api/AddUser/ValidateUser`, data, { headers: this.getHeaders() }).pipe(
  //     tap((response: any) => {
  //       if (response && response.userId) {
  //         this.userId = response.userId; // Store userId on successful login
  //         console.log('UserId stored in service:', this.userId); // Debug log
  //       } else {
  //         console.error('Invalid login response or missing userId');
  //       }
  //     })
  //   );
  // }



  // login(data: { email: string; password: string }): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/api/AddUser/ValidateUser`, data, { headers: this.getHeaders() }).pipe(
  //     tap((response:any) => {
  //       if (response) {
  //         this.userId = response; // Store userId on successful login
  //         console.log('UserId stored in service:', this.userId); // Debug log
  //       } else {
  //         console.error('Invalid login response or missing userId');
  //       }
  //     })
  //   );
  // }




  getTop5FavouriteRecipes(userId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/Top5Recipes/top5/${userId}`);
  }




  getUser(): Observable<any> {
    return this.http.get(`${this.baseUrl}/addUser`, { headers: this.getHeaders() });
  }

  // Profile-specific Recipe View
  viewProfileRecipes(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/ViewProfileRecipe`, { headers: this.getHeaders(), params: { userId } });
  }


  getAllIngredients(): Observable<{ ingredientId: number; ingredientsName: string }[]> {
    return this.http.get<{ ingredientId: number; ingredientsName: string }[]>(`${this.baseUrl}/api/GetAllIngredients`);
  }

  addRecipeIngredient(ingredientData: { recipeId: number; ingredientId:number; quantity: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/AddRecipeIngredient`, ingredientData);
  }

  getRecipeIngredients(recipeId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/GetRecipeIngredients/${recipeId}/ingredients`);
  }

  getUserById(userId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/AddUser/${userId}`, { headers: this.getHeaders(), params: { userId } });
  }
  
}