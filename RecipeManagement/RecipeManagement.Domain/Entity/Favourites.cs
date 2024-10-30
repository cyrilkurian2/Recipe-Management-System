using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RecipeManagement.Domain.Entity
{
    public class Favourites
    {
        public int FavouritesId { get; set; }

        public User user { get; set; }
        public Recipe recipe { get; set; }
    }
}
