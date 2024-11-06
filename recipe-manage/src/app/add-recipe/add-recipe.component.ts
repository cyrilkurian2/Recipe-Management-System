import { booleanAttribute, Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent implements OnInit {
  

  availableIngredients: { ingredientId: number; ingredientsName: string }[] = [];
  selectedIngredients: { ingredientId: number; ingredientsName: string; quantity: string }[] = [];
  ingredientSuggestions: string[] = [];
  ingredientSearchQuery = ''; // Holds the search query for ingredients
  temporaryIngredientIds: number[] = []; // Track newly added ingredient IDs for deletion if not saved
  


  constructor(private recipeService: RecipeService, private router: Router) {}

  

  recipeData = {
    RecipeTitle: '',
    duration: '',
    RecipeDescription: '',
    isComplete: false,
    categoryId: 0,
    userId: 0,
    RecipeImage: ''
  };

  

  ngOnInit() {
    this.loadAvailableIngredients();
  }



  onImageUpload(event: any): void {
    const file = event.target.files[0]; // Get the first file (if multiple files are allowed, you can handle them here)
    
    if (file) {
      const reader = new FileReader();
      
      reader.onloadend = () => {
        // Once the file is read, assign the Base64 string to RecipeImage
        this.recipeData.RecipeImage = reader.result as string;
      };

      reader.readAsDataURL(file);  // This converts the image to Base64
    }
  }

  // ngOnDestroy() {
  //   // Remove unsaved ingredients if the user exits without saving
  //   this.deleteTemporaryIngredients();
  // }

  loadAvailableIngredients() {
    this.recipeService.getAllIngredients().subscribe({
      next: (response: { ingredientId: number; ingredientsName: string }[]) => {
        this.availableIngredients = response;
      },
      error: (err) => {
        console.error('Failed to load ingredients:', err);
      }
    });
  }

  // onIngredientSearch(query: string) {
  //   if (query) {
  //     this.ingredientSuggestions = this.availableIngredients
  //       .map((ingredient) => ingredient.ingredientsName)
  //       .filter((name) => name.toLowerCase().includes(query.toLowerCase()));
  //   } else {
  //     this.ingredientSuggestions = [];
  //   }
  // }




  onIngredientSearch(query: string) {
    if (query) {
      this.ingredientSuggestions = this.availableIngredients
        .filter(ingredient => ingredient && ingredient.ingredientsName) // Ensure ingredient is defined
        .map(ingredient => ingredient.ingredientsName)
        .filter(name => name.toLowerCase().includes(query.toLowerCase()));
    } else {
      this.ingredientSuggestions = [];
    }
  }
  










  // selectIngredient(ingredientsName: string) {
  //   const existingIngredient = this.availableIngredients.find(i => i.ingredientsName === ingredientsName);
    
  //   if (existingIngredient) {
  //     this.addIngredientToList(existingIngredient);
  //   } else {
  //     const quantity = prompt(`Enter quantity for new ingredient "${ingredientsName}":`, "1 unit");
  //     if (quantity) {
  //       this.recipeService.addIngredient({ ingredientsName }).subscribe({
  //         next: (newIngredient) => {
  //           // Add the new ingredient to available ingredients and selectedIngredients
  //           this.availableIngredients.push(newIngredient);
  //           this.temporaryIngredientIds.push(newIngredient.ingredientId); // Track for potential deletion
  //           this.selectedIngredients.push({ 
  //             ingredientId: newIngredient.ingredientId, 
  //             ingredientsName, 
  //             quantity 
  //           });
  //         },
  //         error: (err) => {
  //           console.error(`Failed to add new ingredient "${ingredientsName}": ${err.message}`);
  //         }
  //       });
  //     }
  //     this.ingredientSearchQuery = '';
  //     this.ingredientSuggestions = [];
  //   }
  // }









  // selectIngredient(ingredientsName: string) {
  //   const existingIngredient = this.availableIngredients.find(i => i.ingredientsName === ingredientsName);
    
  //   if (existingIngredient) {
  //     this.addIngredientToList(existingIngredient);
  //   } else {
  //     const quantity = prompt(`Enter quantity for new ingredient "${ingredientsName}":`, "1 unit");
  //     if (quantity) {
  //       this.recipeService.addIngredient({ ingredientsName }).subscribe({
  //         next: (newIngredient) => {
  //           // Add the new ingredient to availableIngredients and selectedIngredients
  //           this.availableIngredients.push(newIngredient);
  //           this.temporaryIngredientIds.push(newIngredient.ingredientId);
  //           this.selectedIngredients.push({ 
  //             ingredientId: newIngredient.ingredientId, 
  //             ingredientsName, 
  //             quantity 
  //           });
  
  //           // Update auto-suggestions to include the new ingredient
  //           this.ingredientSuggestions = this.availableIngredients
  //             .map(ingredient => ingredient.ingredientsName)
  //             .filter(name => 
  //               name.toLowerCase().includes(this.ingredientSearchQuery.toLowerCase()));
  //         },
  //         error: (err) => {
  //           console.error(`Failed to add new ingredient "${ingredientsName}": ${err.message}`);
  //         }
  //       });
  //     }
  //     this.ingredientSearchQuery = '';
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
            // Add the new ingredient to availableIngredients and selectedIngredients
            this.availableIngredients.push(newIngredient);
            this.temporaryIngredientIds.push(newIngredient.ingredientId);
            this.selectedIngredients.push({ 
              ingredientId: newIngredient.ingredientId, 
              ingredientsName, 
              quantity 
            });
  
            // Ensure ingredientSearchQuery is defined before applying filter
            this.ingredientSuggestions = this.availableIngredients
              .map(ingredient => ingredient.ingredientsName)
              .filter(name => 
                this.ingredientSearchQuery?.toLowerCase() && 
                name.toLowerCase().includes(this.ingredientSearchQuery.toLowerCase())
              );
          },
          error: (err) => {
            console.error(`Failed to add new ingredient "${ingredientsName}": ${err.message}`);
          }
        });
      }
      this.ingredientSearchQuery = '';
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
    const newIngredients = this.selectedIngredients.filter(ingredient => ingredient.ingredientId === 0);
  
    newIngredients.forEach(ingredient => {
      this.recipeService.addIngredient({ ingredientsName: ingredient.ingredientsName }).subscribe({
        next: (newIngredient: { ingredientId: number; ingredientsName: string }) => {
          // Update the selectedIngredients with the real ingredientId
          const ingredientIndex = this.selectedIngredients.findIndex(i => i.ingredientsName === newIngredient.ingredientsName);
          if (ingredientIndex > -1) {
            this.selectedIngredients[ingredientIndex].ingredientId = newIngredient.ingredientId;
          }
          console.log(`New ingredient "${newIngredient.ingredientsName}" saved with ID: ${newIngredient.ingredientId}`);
        },
        error: (err) => {
          console.error(`Failed to save new ingredient "${ingredient.ingredientsName}": ${err.message}`);
        }
      });
    });
  }
  
  

  addIngredientToList(ingredient: { ingredientId: number; ingredientsName: string }) {
    const quantity = prompt(`Enter quantity for ${ingredient.ingredientsName}:`, "1 unit");
    if (quantity) {
      this.selectedIngredients.push({ ingredientId: ingredient.ingredientId, ingredientsName: ingredient.ingredientsName, quantity });
    }
    this.ingredientSearchQuery = '';
    this.ingredientSuggestions = [];
  }

  addNewIngredient(ingredientsName: string) {
    this.recipeService.addIngredient({ ingredientsName: ingredientsName }).subscribe({
      next: (newIngredient: { ingredientId: number; ingredientsName: string }) => {
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

  // saveRecipe(isComplete: boolean) {
  //   this.recipeData.isCompleted = isComplete ? 1 : 0;
  //   this.recipeService.addRecipe(this.recipeData).subscribe({
  //     next: (recipeId: number) => {
  //       alert(isComplete ? 'Recipe submitted successfully!' : 'Recipe saved as draft!');
  //       console.log('Recipe added with ID:', recipeId);
  //       this.addIngredientsToRecipe(recipeId);
  //     },
  //     error: (err) => {
  //       alert(`Failed to ${isComplete ? 'submit' : 'save draft'}: ${err.message}`);
  //     }
  //   });
  // }






  saveRecipe(isComplete: boolean) {
    this.recipeData.isComplete = isComplete ? true : false; // Update the completion status
    this.recipeService.addRecipe(this.recipeData).subscribe({
      next: (recipeId: number) => {
        this.addIngredientsToRecipe(recipeId);
        alert(isComplete ? 'Recipe submitted successfully!' : 'Recipe saved as draft!');
        console.log('Recipe added with ID:', recipeId);
        this.router.navigate(['profile']);
        
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
  //       ingredientId: ingredient.ingredientId, // Use ingredientID instead of ingredientsName
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
      
      // Ensure ingredientId is available before making API call
      if (matchingIngredient) {
        
        console.log(matchingIngredient);

        const ingredientData = {
          recipeId,
          ingredientId: matchingIngredient.ingredientId, // Retrieve ingredientId using ingredientsName
          quantity: ingredient.quantity
        };

        console.log(ingredientData);
        
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
    this.recipeData.userId = this.recipeService.userId;  // Get the userId from RecipeService
    this.recipeData.isComplete = true;  // Mark the recipe as completed
    this.saveRecipe(true); // Save as completed recipe
    
    // this.router.navigate(['profile']);
  }

  saveAsDraft() {
    this.temporaryIngredientIds = []; // Clear temporary ingredient tracking as they're now part of a saved recipe
    this.recipeData.userId = this.recipeService.userId;  // Get the userId from RecipeService
    this.recipeData.isComplete = false;  // Mark the recipe as a draft
    this.saveRecipe(false); // Save as draft

    // this.router.navigate(['profile']);
  }


}
