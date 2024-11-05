using RecipeManagement.Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RecipeManagement.Application.DTO
{
    public class FavouritesDTO
    {
        public UserDTO userDTO { get; set; }
        public List<RecipeDTO> Recipes { get; set; } = new List<RecipeDTO>();
    }
}
