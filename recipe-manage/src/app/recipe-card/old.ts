import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss'
})
export class RecipeCardComponent {
  recipes = [
    {
      id:1,
      name: 'Chicken Biriyani',
      imageUrl: 'https://picsum.photos/id/292/200', // replace with actual image path or URL
      rating: 4.2,
    },
    {
      id:2,
      name: 'Paneer Tikka',
      imageUrl: 'https://picsum.photos/id/225/200',
      rating: 4.5,
    },
    {
      id:3,
      name: 'Pasta Alfredo',
      imageUrl: 'https://picsum.photos/200',
      rating: 4.1,
    },
    // Add more recipes as needed
  ];

  constructor(private router: Router){
  }
  // Function to view recipe (for demonstration purposes)
  viewRecipe(recipeId: number) {
    this.router.navigate(['/recipe', recipeId]); // Navigate to the recipe details page with ID
  }
}
