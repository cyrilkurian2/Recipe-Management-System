import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';
import { RecipeService } from '../recipe.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [NavbarComponent, RecipeCardComponent,FormsModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
  exploreRecipesHeading: string = 'Explore Recipes';
  selectedCategory: string | null = null;
  searchQuery: string = '';  // Store the search query

  constructor(private recipeService: RecipeService) {}


  onCategorySelected(category: string) {
    this.exploreRecipesHeading = `${category} Recipes`;
    this.selectedCategory = category;
  }



  onSearch() {
    if (this.searchQuery) {
      this.recipeService.searchRecipes(this.searchQuery).subscribe(
        (data) => {
          // Pass the search results to RecipeCardComponent
          this.recipeService.updateSearchResults(data);
        },
        (error) => {
          console.error('Failed to search recipes:', error);
        }
      );
    }
  }


}
