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
  recipeDescription: string;
  duration: string;
  favouritesCount: number;
  isfav?: boolean;
  categoryDTO: CategoryDTO;
  recipeImage: string;
}

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss'
})
export class RecipeCardComponent implements OnInit {
  @Input() isProfileView: boolean = false; 
  @Input() selectedCategory: string | null = null;
  @Input() showFavoritesOnly: boolean = false; 

  recipes: Recipe[] = [];
  loading: boolean = true;

  private searchResultsSubscription: Subscription | null = null;

  constructor(private http: HttpClient, private router: Router,private recipeService: RecipeService) {}



  ngOnInit(): void {

    // Subscribe to search results
    this.searchResultsSubscription = this.recipeService.searchResults$.subscribe(
      (data) => {
        this.recipes = data.map((recipe: any) => ({
          ...recipe,
        }));
        this.loading = false;
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
    this.loading = true;
    const userId = this.recipeService.userId; 
    this.recipeService.viewProfileRecipes(userId).subscribe(
      (data) => {
        this.recipes = data.map((recipe: any) => ({
          recipeId: recipe.recipeId,
          recipeTitle: recipe.recipeTitle,
          recipeImage: `data:image/jpeg;base64,${recipe.recipeImage}`,
          recipeDescription: recipe.recipeDescription,
          duration: recipe.duration,
          favouritesCount: recipe.favouritesCount,
          isfav: recipe.favouritesCount, 
          categoryDTO: recipe.categoryDTO
        }));
        this.loading = false; 
      },
      (error) => {
        console.error('Failed to load profile recipes:', error);
        this.loading = false; 
      }
    );
  }




  loadFavoriteRecipes(): void {
    this.loading = true;
    const userId = this.recipeService.userId; 
    this.recipeService.getFavouritesByUser(userId).subscribe(
      (data) => {
        this.recipes = data.recipes.map((recipe: any) => ({
          recipeId: recipe.recipeId,
          recipeTitle: recipe.recipeTitle,
          recipeImage: `data:image/jpeg;base64,${recipe.recipeImage}`,
          recipeDescription: recipe.recipeDescription,
          duration: recipe.duration,
          favouritesCount: recipe.favouritesCount,
          isfav: true, 
          categoryDTO: recipe.categoryDTO
        }));
        this.loading = false; 
      },
      (error) => {
        console.error('Failed to load favorite recipes:', error);
        this.loading = false; 
      }
    );
  }


  // fetchRecipesByCategory(categoryName: string): void {
  //   this.loading = true;
  //   this.recipeService.viewRecipeByCategory(categoryName).subscribe(
  //     (response) => {
  //       this.recipes = response.map((recipe: Recipe) => ({
  //         ...recipe,
  //         recipeImage: `data:image/jpeg;base64,${recipe.recipeImage}`,
  //       }));
  //       this.loading = false;
  //     },
  //     (error) => {
  //       console.error(`Failed to load recipes for category ${categoryName}:`, error);
  //       this.loading = false;
  //     }
  //   );
  // }



  


  fetchRecipesByCategory(categoryName: string): void {
    this.loading = true;
    const userId = this.recipeService.userId;
  
    this.recipeService.viewRecipeByCategory(categoryName).subscribe(
      (response) => {
        
        const recipePromises = response.map((recipe: { recipeId: number; recipeImage: any; }) =>
          this.recipeService.checkFavourite(userId, recipe.recipeId).toPromise().then(isFav => ({
            ...recipe,
            recipeImage: `data:image/jpeg;base64,${recipe.recipeImage}`,
            isfav: Boolean(isFav) 
          }))
        );
  
        
        Promise.all(recipePromises).then(recipes => {
          this.recipes = recipes;
          this.loading = false;
        });
      },
      (error) => {
        console.error(`Failed to load recipes for category ${categoryName}:`, error);
        this.loading = false;
      }
    );
  }
  





















  


  // loadRecipes(): void {
  //   this.loading = true;
  //   const userId = this.recipeService.userId;

  //   this.recipeService.viewAllRecipes().subscribe(
  //     (data: Recipe[]) => {
  //       this.recipes = data.map(recipe => ({
  //         ...recipe,
  //         recipeImage: `data:image/jpeg;base64,${recipe.recipeImage}`,
  //         // isfav: recipe.isfav
  //       }));
  //       this.loading = false;
  //     },
  //     (error) => {
  //       console.error('Failed to fetch recipes:', error);
  //       this.loading = false;
  //     }
  //   );
  // }






  loadRecipes(): void {
    this.loading = true;
    const userId = this.recipeService.userId;
  
    this.recipeService.viewAllRecipes().subscribe(
      (data: Recipe[]) => {
        
        const recipePromises = data.map(recipe =>
          this.recipeService.checkFavourite(userId, recipe.recipeId).toPromise().then(isFav => ({
            ...recipe,
            recipeImage: `data:image/jpeg;base64,${recipe.recipeImage}`,
            isfav: isFav 
          }))
        );
  
        
        Promise.all(recipePromises).then(recipes => {
          this.recipes = recipes;
          this.loading = false;
        });
      },
      (error) => {
        console.error('Failed to fetch recipes:', error);
        this.loading = false;
      }
    );
  }
  














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


  toggleFavourite(recipe: Recipe) {
    const userId = this.recipeService.userId; 
    // console.log("hiiiiii"+ userId);
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
  


  deleteRecipe(recipeId: number): void {
    this.recipeService.deleteRecipe(recipeId).subscribe(
      () => {
        alert('Recipe deleted successfully.');
        if (this.isProfileView) {
          this.loadRecipes(); 
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
    this.router.navigate(['/recipe/edit', recipeId]);
  }
}
