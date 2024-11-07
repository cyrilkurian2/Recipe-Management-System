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



  // onSearch() {
  //   if (this.searchQuery) {
  //     this.recipeService.searchRecipes(this.searchQuery).subscribe(
  //       (data) => {
  //         const recipesWithImage = data.map(recipe => ({
  //           ...recipe,
  //           recipeImage: `data:image/jpeg;base64,${recipe.recipeImage}`,
  //         }));
  
  //         this.recipeService.updateSearchResults(recipesWithImage);
  //       },
        
  //       (error) => {
  //         console.error('Failed to search recipes:', error);
  //       }
  //     );
  //   }
  // }







  onSearch() {
    if (this.searchQuery.trim()) {
      this.recipeService.searchRecipes(this.searchQuery).subscribe(
        (data) => {
          const recipesWithImage = data.map(recipe => ({
            ...recipe,
            recipeImage: `data:image/jpeg;base64,${recipe.recipeImage}`,
          }));
          this.recipeService.updateSearchResults(recipesWithImage);
        },
        (error) => {
          console.error('Failed to search recipes:', error);
        }
      );
    } else {
      this.recipeService.viewAllRecipes().subscribe(
        (data) => {
          const allRecipes = data.map((recipe: { recipeImage: any; }) => ({
            ...recipe,
            recipeImage: `data:image/jpeg;base64,${recipe.recipeImage}`,
          }));
          this.recipeService.updateSearchResults(allRecipes); 
        },
        (error) => {
          console.error('Failed to load all recipes:', error);
        }
      );
    }
  }
  








}
