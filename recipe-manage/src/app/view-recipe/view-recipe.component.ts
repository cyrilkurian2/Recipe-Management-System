// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';

// @Component({
//   selector: 'app-view-recipe',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './view-recipe.component.html',
//   styleUrl: './view-recipe.component.scss'
// })
// export class ViewRecipeComponent {
//   recipe: any;
  
//   // Mock data for recipes
//   recipes = [
//     { id: 1, name: 'Chicken Biriyani', imageUrl: 'https://picsum.photos/id/292/200', rating: 4.2, ingredients: ['1 cup rice', '1/2 kg chicken', 'Spices'] },
//     { id: 2, name: 'Paneer Tikka', imageUrl: 'https://picsum.photos/id/225/200', rating: 4.5, ingredients: ['200g paneer', 'Yogurt', 'Spices'] },
//     { id: 3, name: 'Pasta Alfredo', imageUrl: 'https://picsum.photos/200', rating: 4.1, ingredients: ['200g pasta', '1 cup Alfredo sauce'] },
//   ];

//   constructor(private route: ActivatedRoute) {}

//   ngOnInit() {
//     const recipeId = Number(this.route.snapshot.paramMap.get('id'));
//     this.recipe = this.recipes.find(r => r.id === recipeId); // Find the recipe by ID
//   }
// }



import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../recipe.service'; // Adjust the path as necessary
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-view-recipe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.scss']
})
export class ViewRecipeComponent implements OnInit {
  recipe: any;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService // Inject the RecipeService
  ) {}

  // ngOnInit() {
  //   const recipeId = this.route.snapshot.paramMap.get('id');
  //   if (recipeId) {
  //     this.fetchRecipe(recipeId); // Fetch the recipe from the API
  //   }
  // }

  // fetchRecipe(recipeId: string) {
  //   this.recipeService.viewRecipeById(recipeId).subscribe(
  //     // (data) => {
  //     //   this.recipe = data; // Set the fetched recipe data
  //     // },
  //     (data) => {
  //       // Set the fetched recipe data
  //       this.recipe = {
  //         ...data, // Spread the original recipe data
  //         imageUrl: 'https://d.img.vision/recipe-management-system/chicken_briyani.jpg' // Hardcoded image URL
  //       };
  //     },
  //     (error) => {
  //       console.error('Error fetching recipe:', error);
  //     }
  //   );
  // }




  ngOnInit() {
    const recipeId = this.route.snapshot.paramMap.get('id');
    if (recipeId) {
      this.fetchRecipeWithIngredients(recipeId); // Fetch the recipe and its ingredients
    }
  }

  fetchRecipeWithIngredients(recipeId: string) {
    // Fetch both the recipe details and ingredients in parallel
    forkJoin({
      recipe: this.recipeService.viewRecipeById(recipeId),
      ingredients: this.recipeService.getRecipeIngredients(recipeId)
    }).subscribe(
      ({ recipe, ingredients }) => {
        // Combine recipe data with ingredients
        this.recipe = {
          ...recipe,
          ingredients: ingredients, // Add ingredients to the recipe data
          imageUrl: 'https://d.img.vision/recipe-management-system/chicken_briyani.jpg' // Hardcoded image URL
        };
      },
      (error) => {
        console.error('Error fetching recipe or ingredients:', error);
      }
    );
  }






}
