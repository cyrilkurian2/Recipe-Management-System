using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RecipeManagement.Application.DTO
{
    public class RecipeWithoutAuthorDTO
    {
        public int RecipeId { get; set; }
        public string RecipeTitle { get; set; }

        public int FavouriteCount {  get; set; }
    }
}
