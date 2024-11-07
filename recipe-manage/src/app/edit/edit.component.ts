import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class EditRecipeComponent implements OnInit {
  recipeId!: string;
  recipeData: any = {
    recipeTitle: '',
    recipeDescription: '',
    duration: '',
    categoryId: null,
    recipeSteps: '',
    isComplete: false // Default is 'false' for draft
  };
  categories = [
    { categoryId: 1, categoryName: 'Breakfast' },
    { categoryId: 2, categoryName: 'Lunch' },
    { categoryId: 3, categoryName: 'Dinner' }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.recipeId = this.route.snapshot.paramMap.get('id')!;
    this.getRecipeDetails(this.recipeId);
  }

  getRecipeDetails(recipeId: string): void {
    this.recipeService.viewRecipeById(recipeId).subscribe({
      next: (data) => {
        this.recipeData = {
          recipeTitle: data.recipeTitle,
          recipeDescription: data.recipeDescription,
          duration: data.duration,
          categoryId: data.categoryDTO.categoryId,
          recipeSteps: data.recipeSteps,
        };
      },
      error: (error) => {
        console.error('Error fetching recipe details:', error);
      }
    });
  }

  // Save as Draft - Sets isComplete to false
  saveAsDraft(): void {
    this.recipeData.isComplete = false; // Draft state
    this.updateRecipe();
  }

  // On Submit - Sets isComplete to true
  onSubmit(): void {
    this.recipeData.isComplete = true; // Mark as complete
    this.updateRecipe();
  }

  // Function to update the recipe data (both Save as Draft and Submit use this)
  updateRecipe(): void {
    this.recipeService.updateRecipe(this.recipeId, this.recipeData).subscribe({
      next: () => {
        const action = this.recipeData.isComplete ? 'submitted' : 'saved as draft';
        alert(`Recipe ${action} successfully.`);
        this.router.navigate(['/profile']);
      },
      error: (error) => {
        console.error('Error updating recipe:', error);
        alert('Failed to update recipe. Please try again.');
      }
    });
  }
}
