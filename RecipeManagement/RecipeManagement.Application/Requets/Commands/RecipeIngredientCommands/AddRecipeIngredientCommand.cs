using RecipeManagement.Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RecipeManagement.Application.Requets.Commands.RecipeIngredientCommands
{
    public class AddRecipeIngredientCommand
    {
        public int RecipeIngredientsId { get; set; }
        public Recipe recipe { get; set; }
        public List<Ingredients> ingredients { get; set; }

        public string Quantity { get; set; }

    }
}
