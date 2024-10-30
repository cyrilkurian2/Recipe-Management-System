using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RecipeManagement.Domain.Entity
{
    public class RecipeIngredients
    {
        public int RecipeIngredientsId { get; set; }
        public Recipe recipe {  get; set; }
        public Ingredients ingredients { get; set; }

        public string Quantity {  get; set; }

    }
}
