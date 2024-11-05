using RecipeManagement.Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RecipeManagement.Application.DTO
{
    internal class RecipeAuthorDTO
    {
        public int RecipeId { get; set; }
        public UserDTO User { get; set; }
    }
}
