import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private recipeService: RecipeService, private router: Router) {}

  canActivate(): boolean {
    if (this.recipeService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/user/login']);  // Redirect to login if not logged in
      return false;
    }
  }
}
