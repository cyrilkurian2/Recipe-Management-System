import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';

@Component({
  selector: 'app-favourite',
  standalone: true,
  imports: [NavbarComponent,RecipeCardComponent],
  templateUrl: './favourite.component.html',
  styleUrl: './favourite.component.scss'
})
export class FavouriteComponent {
  selectedCategory: string | null = null;

  onCategorySelected(category: string) {
    this.selectedCategory = category;
  }
}
