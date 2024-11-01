import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [NavbarComponent, RecipeCardComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
  exploreRecipesHeading: string = 'Explore Recipes';
  selectedCategory: string | null = null;

  onCategorySelected(category: string) {
    this.exploreRecipesHeading = `${category} Recipes`;
    this.selectedCategory = category;
  }
}
