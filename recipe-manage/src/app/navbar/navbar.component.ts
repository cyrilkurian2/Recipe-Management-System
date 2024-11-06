import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @Output() categorySelected = new EventEmitter<string>();


  constructor(private recipeService: RecipeService, private router: Router) {}


  selectCategory(category: string) {
    this.categorySelected.emit(category);
  }



  logout() {
    this.recipeService.userId = 0; // Set userId to 0
    this.router.navigate(['/user/login']); // Redirect to login page
  }
  
}
