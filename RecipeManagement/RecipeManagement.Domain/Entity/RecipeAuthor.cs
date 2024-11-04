using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RecipeManagement.Domain.Entity
{
    public class RecipeAuthor
    {
        public int RecipeAuthorId { get; set; }
        
        public Recipe Recipe { get; set; }
        public User User { get; set; }
    }
}
