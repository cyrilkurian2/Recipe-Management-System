import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'; // Make sure to configure environment for your base API URL

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private baseUrl = environment.apiUrl; // Base URL from environment file

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

  deleteRecipe(recipeId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteRecipeById/${recipeId}`, { headers: this.getHeaders() });
  }

  viewAllRecipes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/ViewAllRecipe`, { headers: this.getHeaders() });
  }

  viewRecipeById(recipeId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/ViewAllRecipe/${recipeId}`, { headers: this.getHeaders() });
  }

  viewRecipeByCategory(categoryName: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/viewAllRecipe/categoryName=${categoryName}`, { headers: this.getHeaders() });
  }

  // Favourite APIs
  addRemoveFavourite(recipeId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/addRemoveFavourite`, { recipeId }, { headers: this.getHeaders() });
  }

  getFavourites(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getFavourites`, { headers: this.getHeaders() });
  }

  // Search
  searchRecipes(searchQuery: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/getSearch/${searchQuery}`, { headers: this.getHeaders() });
  }

  // User APIs
  addUser(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/addUser`, data, { headers: this.getHeaders() });
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
