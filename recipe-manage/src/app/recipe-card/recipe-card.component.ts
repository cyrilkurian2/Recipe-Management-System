import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss'
})
export class RecipeCardComponent {
  recipes = [
    {
      name: 'Chicken Biriyani',
      imageUrl: 'https://picsum.photos/id/292/200', // replace with actual image path or URL
      rating: 4.2,
    },
    {
      name: 'Paneer Tikka',
      imageUrl: 'https://picsum.photos/id/225/200',
      rating: 4.5,
    },
    {
      name: 'Pasta Alfredo',
      imageUrl: 'https://picsum.photos/200',
      rating: 4.1,
    },
    // Add more recipes as needed
  ];

  // Function to view recipe (for demonstration purposes)
  viewRecipe(recipe: any) {
    console.log(`Viewing recipe: ${recipe.name}`);
    alert(`Viewing recipe: ${recipe.name} with rating: ${recipe.rating}`);
  }
}
