using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RecipeManagement.Application.DTO
{
    public class IsFavouriteDTO
    {
        public int UserId {  get; set; }
        public int RecipeId {  get; set; }
    }
}
