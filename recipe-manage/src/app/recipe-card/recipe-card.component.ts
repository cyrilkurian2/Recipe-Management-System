import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss'
})
export class RecipeCardComponent {
  @Input() isProfileView: boolean = false; // Input to determine context
  @Input() selectedCategory: string | null = null;
  @Input() showFavoritesOnly: boolean = false; // New input to show only favorites


  recipes = [
    {
      id: 1,
      name: 'Chicken Biriyani',
      imageUrl: 'https://picsum.photos/id/292/200',
      rating: 3.3,
      favouritesCount: 10,
      isfav: true,
      category: 'Breakfast',
    },
    {
      id: 2,
      name: 'Paneer Tikka',
      imageUrl: 'https://picsum.photos/id/225/200',
      rating: 4.5,
      favouritesCount: 8,
      isfav: false,
      category: 'Lunch',
    },
    {
      id: 3,
      name: 'Pasta Alfredo',
      imageUrl: 'https://picsum.photos/id/999/200',
      rating: 4.1,
      favouritesCount: 5,
      isfav: true,
      category: 'Dinner',
    },
    {
      id: 4,
      name: 'Fried chicken',
      imageUrl: 'https://picsum.photos/id/488/200',
      rating: 3.8,
      favouritesCount: 2,
      isfav: false,
      category: 'Breakfast',
    },
    {
      id: 5,
      name: 'Cheeseburger',
      imageUrl: 'https://picsum.photos/id/493/200',
      rating: 4.6,
      favouritesCount: 18,
      isfav: true,
      category: 'Lunch',
    },
    {
      id: 6,
      name: 'Sandwich',
      imageUrl: 'https://picsum.photos/id/1080/200',
      rating: 2.4,
      favouritesCount: 3,
      isfav: false,
      category: 'Dinner',
    }
  ];

  // get filteredRecipes() {
  //   return this.selectedCategory
  //     ? this.recipes.filter(recipe => recipe.category === this.selectedCategory)
  //     : this.recipes;
  // }

  get filteredRecipes() {
    return this.recipes.filter(recipe => {
      const matchesCategory = this.selectedCategory ? recipe.category === this.selectedCategory : true;
      const matchesFavorites = this.showFavoritesOnly ? recipe.isfav : true;
      return matchesCategory && matchesFavorites;
    });
  }


  constructor(private router: Router) {}

  // Function to view recipe
  viewRecipe(recipeId: number) {
    this.router.navigate(['/recipe', recipeId]);
  }

  toggleFavourite(recipe: any) {
    recipe.isfav = !recipe.isfav;
    console.log(`Toggled favourite for recipe ${recipe.id}, new state: ${recipe.isfav}`);
    // Add any additional favorite handling logic here
  }

  // Function to delete recipe (for profile view)
  deleteRecipe(recipeId: number) {
    console.log(`Deleted recipe ${recipeId}`);
    // Add delete logic here
  }

  // Function to edit recipe (for profile view)
  editRecipe(recipeId: number) {
    console.log(`Editing recipe ${recipeId}`);
    // Add edit logic here
  }
}
