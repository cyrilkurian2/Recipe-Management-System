import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent implements OnInit {
  availableIngredients: string[] = [];
  selectedIngredients: { ingredientName: string, quantity: string }[] = [];
  ingredientSuggestions: string[] = [];
  ingredientSearchQuery = ''; // Holds the search query for ingredients
  recipeData = {
    title: '',
    duration: 0,
    description: '',
    // steps: '',
    isCompleted: 0  // Initialize IsCompleted field
  };

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.loadAvailableIngredients();
  }

  // Load ingredients from API and format as array of strings
  loadAvailableIngredients() {
    this.recipeService.getAllIngredients().subscribe({
      next: (response: { ingredientName: string }[]) => {
        this.availableIngredients = response.map(item => item.ingredientName);
      },
      error: (err) => {
        console.error('Failed to load ingredients:', err);
      }
    });
  }

  // Filter ingredient suggestions based on search input
  onIngredientSearch(query: string) {
    if (query) {
      this.ingredientSuggestions = this.availableIngredients.filter(name =>
        name.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      this.ingredientSuggestions = [];
    }
  }

  // Select ingredient from suggestions or add a new one if not found
  selectIngredient(ingredientName: string) {
    if (!this.availableIngredients.includes(ingredientName)) {
      if (confirm(`"${ingredientName}" is not in the list. Would you like to add it as a new ingredient?`)) {
        this.addNewIngredient(ingredientName);
      }
    } else {
      this.addIngredientToList(ingredientName);
    }
  }

  // Add ingredient with quantity to selected ingredients list
  addIngredientToList(ingredientName: string) {
    const quantity = prompt(`Enter quantity for ${ingredientName}:`, "1 unit");
    if (quantity) {
      this.selectedIngredients.push({ ingredientName, quantity });
    }
    this.ingredientSearchQuery = '';
    this.ingredientSuggestions = [];
  }

  // Call API to add a new ingredient
  addNewIngredient(ingredientName: string) {
    this.recipeService.addIngredient({ name: ingredientName }).subscribe({
      next: () => {
        this.availableIngredients.push(ingredientName);
        alert(`Ingredient "${ingredientName}" added successfully!`);
        this.addIngredientToList(ingredientName);
      },
      error: (err) => {
        alert(`Failed to add ingredient: ${err.message}`);
      }
    });
  }

  // Remove an ingredient from the selected ingredients list
  removeIngredient(index: number) {
    this.selectedIngredients.splice(index, 1);
  }

  // Save recipe as draft or submit as complete
  saveRecipe(isComplete: boolean) {
    this.recipeData.isCompleted = isComplete ? 1 : 0;
    this.recipeService.addRecipe(this.recipeData).subscribe({
      next: (response: { recipeId: number }) => {
        alert(isComplete ? 'Recipe submitted successfully!' : 'Recipe saved as draft!');
        console.log('Recipe added:', response);
        this.addIngredientsToRecipe(response.recipeId);
      },
      error: (err) => {
        alert(`Failed to ${isComplete ? 'submit' : 'save draft'}: ${err.message}`);
      }
    });
  }

  // Call API to add each selected ingredient to the recipe
  addIngredientsToRecipe(recipeId: number) {
    this.selectedIngredients.forEach(ingredient => {
      const ingredientData = {
        recipeId,
        ingredientName: ingredient.ingredientName,
        quantity: ingredient.quantity
      };
      this.recipeService.addRecipeIngredient(ingredientData).subscribe({
        next: () => {
          console.log(`Ingredient ${ingredient.ingredientName} added to recipe ${recipeId}`);
        },
        error: (err) => {
          console.error(`Failed to add ingredient ${ingredient.ingredientName}: ${err.message}`);
        }
      });
    });
  }

  // Triggered on form submission
  onSubmit() {
    this.saveRecipe(true); // Save as completed recipe
  }

  // Triggered on saving as draft
  saveAsDraft() {
    this.saveRecipe(false); // Save as draft
  }
}
