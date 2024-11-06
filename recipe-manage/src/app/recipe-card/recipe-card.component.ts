import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';




interface CategoryDTO {
  categoryId: number;
  categoryName: string;
}

interface Recipe {
  recipeId: number;
  recipeTitle: string;
  imageUrl: string;
  recipeDescription: string;
  duration: string;
  //rating: number;
  favouritesCount: number;
  isfav: boolean;
  categoryDTO: CategoryDTO;
}

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss'
})
export class RecipeCardComponent implements OnInit {
  @Input() isProfileView: boolean = false; // Input to determine context
  @Input() selectedCategory: string | null = null;
  @Input() showFavoritesOnly: boolean = false; // New input to show only favorites

  recipes: Recipe[] = [];

  private searchResultsSubscription: Subscription | null = null;

  constructor(private http: HttpClient, private router: Router,private recipeService: RecipeService) {}



  // ngOnInit(): void {
  //   this.loadRecipes();
  // }

  // ngOnInit(): void {
  //   if (this.showFavoritesOnly) {
  //     this.loadFavoriteRecipes();
  //   } else {
  //     this.loadRecipes();
  //   }
  // }



  ngOnInit(): void {

    // Subscribe to search results
    this.searchResultsSubscription = this.recipeService.searchResults$.subscribe(
      (data) => {
        this.recipes = data.map((recipe: any) => ({
          ...recipe,
          imageUrl: 'https://d.img.vision/recipe-management-system/chicken_briyani.jpg' // Hardcoded image URL
        }));
      }
    );



    if (this.isProfileView) {
      this.loadProfileRecipes();
    } else if (this.showFavoritesOnly) {
      this.loadFavoriteRecipes();
    } else {
      this.loadRecipes();
    }
  }




  ngOnChanges(): void {
    if (this.selectedCategory) {
      this.fetchRecipesByCategory(this.selectedCategory);
    }
  }





  ngOnDestroy(): void {
    if (this.searchResultsSubscription) {
      this.searchResultsSubscription.unsubscribe();
    }
  }





  loadProfileRecipes(): void {
    const userId = this.recipeService.userId; // Access the current user's ID
    this.recipeService.viewProfileRecipes(userId).subscribe(
      (data) => {
        this.recipes = data.map((recipe: any) => ({
          recipeId: recipe.recipeId,
          recipeTitle: recipe.recipeTitle,
          imageUrl: 'https://d.img.vision/recipe-management-system/chicken_briyani.jpg', // Hardcoded image URL
          recipeDescription: recipe.recipeDescription,
          duration: recipe.duration,
          favouritesCount: recipe.favouritesCount,
          isfav: recipe.favouritesCount > 0, // Assuming favorite if it has count > 0
          categoryDTO: recipe.categoryDTO
        }));
      },
      (error) => {
        console.error('Failed to load profile recipes:', error);
      }
    );
  }





  



  loadFavoriteRecipes(): void {
    const userId = this.recipeService.userId; // Access the current user's ID
    this.recipeService.getFavouritesByUser(userId).subscribe(
      (data) => {
        this.recipes = data.recipes.map((recipe: any) => ({
          recipeId: recipe.recipeId,
          recipeTitle: recipe.recipeTitle,
          imageUrl: 'https://d.img.vision/recipe-management-system/chicken_briyani.jpg', // Optional hardcoded image URL
          recipeDescription: recipe.recipeDescription,
          duration: recipe.duration,
          favouritesCount: recipe.favouritesCount,
          isfav: true, // Mark as favorite since it’s from the favorite list
          categoryDTO: recipe.categoryDTO
        }));
      },
      (error) => {
        console.error('Failed to load favorite recipes:', error);
      }
    );
  }


  fetchRecipesByCategory(categoryName: string): void {
    this.recipeService.viewRecipeByCategory(categoryName).subscribe(
      (response) => {
        // Set a hardcoded imageUrl for each recipe
        this.recipes = response.map((recipe: Recipe) => ({
          ...recipe,
          imageUrl: 'https://d.img.vision/recipe-management-system/chicken_briyani.jpg' // Hardcoded image URL
        }));
      },
      (error) => {
        console.error(`Failed to load recipes for category ${categoryName}:`, error);
      }
    );
  }
  



  loadRecipes(): void {
    this.recipeService.viewAllRecipes().subscribe(
      // (data) => {
      //   this.recipes = data;
      // },
      (data: Recipe[]) => {
        // Set hardcoded imageUrl for each recipe
        this.recipes = data.map(recipe => ({
          ...recipe,
          // imageUrl: 'https://picsum.photos/id/237/200' // Hardcoded image URL
          imageUrl: 'https://d.img.vision/recipe-management-system/chicken_briyani.jpg'
        }));
      },
      (error) => {
        console.error('Failed to fetch recipes:', error);
      }
    );
  }

  // loadAvailableIngredients() {
  //   this.recipeService.getAllIngredients().subscribe({
  //     next: (response: { ingredientid: number; ingredientsName: string }[]) => {
  //       this.availableIngredients = response;
  //     },
  //     error: (err) => {
  //       console.error('Failed to load ingredients:', err);
  //     }
  //   });
  // }

  get filteredRecipes() {
    return this.recipes.filter(recipe => {
      const matchesCategory = this.selectedCategory ? recipe.categoryDTO.categoryName === this.selectedCategory : true;
      const matchesFavorites = this.showFavoritesOnly ? recipe.isfav : true;
      return matchesCategory && matchesFavorites;
    });
  }

  viewRecipe(recipeId: number) {
    this.router.navigate(['/recipe', recipeId]);
  }

  // toggleFavourite(recipe: Recipe) {
  //   recipe.isfav = !recipe.isfav;
  //   console.log(`Toggled favourite for recipe ${recipe.recipeId}, new state: ${recipe.isfav}`);
  //   // Add any additional favorite handling logic here
  // }


  toggleFavourite(recipe: Recipe) {
    const userId = this.recipeService.userId; // Access userId from RecipeService
    console.log("hiiiiii"+ userId);
    this.recipeService.addRemoveFavourite(userId, recipe.recipeId).subscribe(
      (response) => {
        recipe.isfav = !recipe.isfav; // Toggle the favorite status on success
        console.log(`Toggled favourite for recipe ${recipe.recipeId}, new state: ${recipe.isfav}`);
      },
      (error) => {
        console.error(`Failed to toggle favourite for recipe ${recipe.recipeId}:`, error);
      }
    );
  }
  





  // deleteRecipe(recipeId: number) {
  //   console.log(`Deleted recipe ${recipeId}`);
  //   // Add delete logic here
  // }




  deleteRecipe(recipeId: number): void {
    this.recipeService.deleteRecipe(recipeId).subscribe(
      () => {
        alert('Recipe deleted successfully.');
        if (this.isProfileView) {
          this.loadRecipes(); // Reload recipes if in profile view
        }
      },
      (error) => {
        console.error(`Failed to delete recipe ${recipeId}:`, error);
        alert('Failed to delete recipe. Please try again.');
      }
    );
  }





  editRecipe(recipeId: number) {
    console.log(`Editing recipe ${recipeId}`);
    // Add edit logic here
  }
}
