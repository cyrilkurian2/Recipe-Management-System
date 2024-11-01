import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-recipe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-recipe.component.html',
  styleUrl: './view-recipe.component.scss'
})
export class ViewRecipeComponent {
  recipe: any;
  
  // Mock data for recipes
  recipes = [
    { id: 1, name: 'Chicken Biriyani', imageUrl: 'https://picsum.photos/id/292/200', rating: 4.2, ingredients: ['1 cup rice', '1/2 kg chicken', 'Spices'] },
    { id: 2, name: 'Paneer Tikka', imageUrl: 'https://picsum.photos/id/225/200', rating: 4.5, ingredients: ['200g paneer', 'Yogurt', 'Spices'] },
    { id: 3, name: 'Pasta Alfredo', imageUrl: 'https://picsum.photos/200', rating: 4.1, ingredients: ['200g pasta', '1 cup Alfredo sauce'] },
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const recipeId = Number(this.route.snapshot.paramMap.get('id'));
    this.recipe = this.recipes.find(r => r.id === recipeId); // Find the recipe by ID
  }
}
