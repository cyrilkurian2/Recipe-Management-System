import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
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
  imports:[CommonModule,FormsModule]
})
export class EditRecipeComponent implements OnInit {
  recipeId!: string;
  recipeData: any = {
    recipeTitle: '',
    recipeDescription: '',
    duration: '',
    categoryId: null,
    recipeSteps: '',
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

  onImageUpload(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      // Handle file upload
      // You may convert the file to a base64 string or upload it as needed
    }
  }

  onSubmit(): void {
    this.recipeService.updateRecipe(this.recipeId, this.recipeData).subscribe({
      next: () => {
        alert('Recipe updated successfully.');
        this.router.navigate(['/profile']);
      },
      error: (error) => {
        console.error('Error updating recipe:', error);
        alert('Failed to update recipe. Please try again.');
      }
    });
  }
}