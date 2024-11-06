import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../environments/environment'; // Make sure to configure environment for your base API URL

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private baseUrl = environment.apiUrl; // Base URL from environment file
  public userId: number = 0;  // Store userId globally

  constructor(private http: HttpClient) {}

  // Headers (if you need authentication headers, set them here)
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      // Add authorization token if required
      // 'Authorization': `Bearer ${token}`
    });
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

  // Search
  searchRecipes(searchQuery: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/getSearch/${searchQuery}`, { headers: this.getHeaders() });
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



  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/AddUser/ValidateUser`, data, { headers: this.getHeaders() }).pipe(
      tap((response:any) => {
        if (response) {
          this.userId = response; // Store userId on successful login
          console.log('UserId stored in service:', this.userId); // Debug log
        } else {
          console.error('Invalid login response or missing userId');
        }
      })
    );
  }




  getTop5FavouriteRecipes(userId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/Top5Recipes/top5/${userId}`);
  }




  getUser(): Observable<any> {
    return this.http.get(`${this.baseUrl}/addUser`, { headers: this.getHeaders() });
  }

  // Profile-specific Recipe View
  viewProfileRecipes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/viewProfileRecipe`, { headers: this.getHeaders() });
  }


  getAllIngredients(): Observable<{ ingredientid: number; ingredientsName: string }[]> {
    return this.http.get<{ ingredientid: number; ingredientsName: string }[]>(`${this.baseUrl}/api/GetAllIngredients`);
  }

  addRecipeIngredient(ingredientData: { recipeId: number; ingredientid:number; quantity: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/AddRecipeIngredient`, ingredientData);
  }

}