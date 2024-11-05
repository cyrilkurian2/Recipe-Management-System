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
  availableIngredients: { ingredientid: number; ingredientsName: string }[] = [];
  selectedIngredients: { ingredientid: number; ingredientsName: string; quantity: string }[] = [];
  ingredientSuggestions: string[] = [];
  ingredientSearchQuery = ''; // Holds the search query for ingredients
  temporaryIngredientIds: number[] = []; // Track newly added ingredient IDs for deletion if not saved

  recipeData = {
    RecipeTitle: '',
    duration: 0,
    RecipeDescription: '',
    isCompleted: 0,
    categoryId: 1,
    userId: 1,
  };

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.loadAvailableIngredients();
  }


  // ngOnDestroy() {
  //   // Remove unsaved ingredients if the user exits without saving
  //   this.deleteTemporaryIngredients();
  // }

  loadAvailableIngredients() {
    this.recipeService.getAllIngredients().subscribe({
      next: (response: { ingredientid: number; ingredientsName: string }[]) => {
        this.availableIngredients = response;
      },
      error: (err) => {
        console.error('Failed to load ingredients:', err);
      }
    });
  }

  onIngredientSearch(query: string) {
    if (query) {
      this.ingredientSuggestions = this.availableIngredients
        .map((ingredient) => ingredient.ingredientsName)
        .filter((name) => name.toLowerCase().includes(query.toLowerCase()));
    } else {
      this.ingredientSuggestions = [];
    }
  }

  // selectIngredient(ingredientsName: string) {
  //   const ingredient = this.availableIngredients.find(i => i.ingredientsName === ingredientsName);
  //   if (ingredient) {
  //     this.addIngredientToList(ingredient);
  //   } else if (confirm(`"${ingredientsName}" is not in the list. Would you like to add it as a new ingredient?`)) {
  //     this.addNewIngredient(ingredientsName);
  //   }
  // }


  // selectIngredient(ingredientsName: string) {
  //   const existingIngredient = this.availableIngredients.find(i => i.ingredientsName === ingredientsName);
    
  //   if (existingIngredient) {
  //     this.addIngredientToList(existingIngredient);
  //   } else {
  //     // Prompt for quantity when ingredient is new
  //     const quantity = prompt(`Enter quantity for new ingredient "${ingredientsName}":`, "1 unit");
  //     if (quantity) {
  //       // Temporarily add the new ingredient to the selectedIngredients list
  //       this.selectedIngredients.push({ ingredientid: 0, ingredientsName, quantity });  // Using 0 as a placeholder id
  //     }
  //     this.ingredientSearchQuery = '';
  //     this.ingredientSuggestions = [];
  //   }
  // }











  selectIngredient(ingredientsName: string) {
    const existingIngredient = this.availableIngredients.find(i => i.ingredientsName === ingredientsName);
    
    if (existingIngredient) {
      this.addIngredientToList(existingIngredient);
    } else {
      const quantity = prompt(`Enter quantity for new ingredient "${ingredientsName}":`, "1 unit");
      if (quantity) {
        this.recipeService.addIngredient({ ingredientsName }).subscribe({
          next: (newIngredient) => {
            // Add the new ingredient to available ingredients and selectedIngredients
            this.availableIngredients.push(newIngredient);
            this.temporaryIngredientIds.push(newIngredient.ingredientid); // Track for potential deletion
            this.selectedIngredients.push({ 
              ingredientid: newIngredient.ingredientid, 
              ingredientsName, 
              quantity 
            });
          },
          error: (err) => {
            console.error(`Failed to add new ingredient "${ingredientsName}": ${err.message}`);
          }
        });
      }
      this.ingredientSearchQuery = '';
      this.ingredientSuggestions = [];
    }
  }





  // deleteTemporaryIngredients() {
  //   this.temporaryIngredientIds.forEach(id => {
  //     this.recipeService.deleteIngredient(id).subscribe({
  //       next: () => {
  //         console.log(`Temporary ingredient with ID ${id} deleted.`);
  //       },
  //       error: (err) => {
  //         console.error(`Failed to delete temporary ingredient with ID ${id}: ${err.message}`);
  //       }
  //     });
  //   });
  // }
















  confirmNewIngredients() {
    const newIngredients = this.selectedIngredients.filter(ingredient => ingredient.ingredientid === 0);
  
    newIngredients.forEach(ingredient => {
      this.recipeService.addIngredient({ ingredientsName: ingredient.ingredientsName }).subscribe({
        next: (newIngredient: { ingredientid: number; ingredientsName: string }) => {
          // Update the selectedIngredients with the real ingredientid
          const ingredientIndex = this.selectedIngredients.findIndex(i => i.ingredientsName === newIngredient.ingredientsName);
          if (ingredientIndex > -1) {
            this.selectedIngredients[ingredientIndex].ingredientid = newIngredient.ingredientid;
          }
          console.log(`New ingredient "${newIngredient.ingredientsName}" saved with ID: ${newIngredient.ingredientid}`);
        },
        error: (err) => {
          console.error(`Failed to save new ingredient "${ingredient.ingredientsName}": ${err.message}`);
        }
      });
    });
  }
  
  

  addIngredientToList(ingredient: { ingredientid: number; ingredientsName: string }) {
    const quantity = prompt(`Enter quantity for ${ingredient.ingredientsName}:`, "1 unit");
    if (quantity) {
      this.selectedIngredients.push({ ingredientid: ingredient.ingredientid, ingredientsName: ingredient.ingredientsName, quantity });
    }
    this.ingredientSearchQuery = '';
    this.ingredientSuggestions = [];
  }

  addNewIngredient(ingredientsName: string) {
    this.recipeService.addIngredient({ ingredientsName: ingredientsName }).subscribe({
      next: (newIngredient: { ingredientid: number; ingredientsName: string }) => {
        this.availableIngredients.push(newIngredient);
        alert(`Ingredient "${ingredientsName}" added successfully!`);
        this.addIngredientToList(newIngredient);
      },
      error: (err) => {
        alert(`Failed to add ingredient: ${err.message}`);
      }
    });
  }

  removeIngredient(index: number) {
    this.selectedIngredients.splice(index, 1);
  }

  saveRecipe(isComplete: boolean) {
    this.recipeData.isCompleted = isComplete ? 1 : 0;
    this.recipeService.addRecipe(this.recipeData).subscribe({
      next: (recipeId: number) => {
        alert(isComplete ? 'Recipe submitted successfully!' : 'Recipe saved as draft!');
        console.log('Recipe added with ID:', recipeId);
        this.addIngredientsToRecipe(recipeId);
      },
      error: (err) => {
        alert(`Failed to ${isComplete ? 'submit' : 'save draft'}: ${err.message}`);
      }
    });
  }

  // addIngredientsToRecipe(recipeId: number) {
  //   this.selectedIngredients.forEach((ingredient) => {
  //     const ingredientData = {
  //       recipeId,
  //       ingredientid: ingredient.ingredientid, // Use ingredientID instead of ingredientsName
  //       ingredientsName: ingredient.ingredientsName,
  //       quantity: ingredient.quantity
  //     };
  //     this.recipeService.addRecipeIngredient(ingredientData).subscribe({
  //       next: () => {
  //         console.log(`Ingredient ${ingredient.ingredientsName} added to recipe ${recipeId}`);
  //       },
  //       error: (err) => {
  //         console.error(`Failed to add ingredient ${ingredient.ingredientsName}: ${err.message}`);
  //       }
  //     });
  //   });
  // }





  addIngredientsToRecipe(recipeId: number) {
    this.selectedIngredients.forEach((ingredient) => {
      // Find the ingredient ID from availableIngredients based on ingredientsName
      const matchingIngredient = this.availableIngredients.find(
        (availableIngredient) => availableIngredient.ingredientsName === ingredient.ingredientsName
      );
      
      // Ensure ingredientid is available before making API call
      if (matchingIngredient) {
        const ingredientData = {
          recipeId,
          ingredientid: matchingIngredient.ingredientid, // Retrieve ingredientid using ingredientsName
          quantity: ingredient.quantity
        };
        
        this.recipeService.addRecipeIngredient(ingredientData).subscribe({
          next: () => {
            console.log(`Ingredient ${ingredient.ingredientsName} added to recipe ${recipeId}`);
          },
          error: (err) => {
            console.error(`Failed to add ingredient ${ingredient.ingredientsName}: ${err.message}`);
          }
        });
      } else {
        console.error(`Ingredient ID not found for ${ingredient.ingredientsName}`);
      }
    });
  }
  





  onSubmit() {
    this.temporaryIngredientIds = []; // Clear temporary ingredient tracking as they're now part of a saved recipe
    this.saveRecipe(true); // Save as completed recipe
  }

  saveAsDraft() {
    this.temporaryIngredientIds = []; // Clear temporary ingredient tracking as they're now part of a saved recipe
    this.saveRecipe(false); // Save as draft
  }



  // onSubmit() {
  //   this.confirmNewIngredients();
  //   this.saveRecipe(true); // Save as completed recipe
  // }

  // saveAsDraft() {
  //   this.confirmNewIngredients();
  //   this.saveRecipe(false); // Save as draft
  // }
}
