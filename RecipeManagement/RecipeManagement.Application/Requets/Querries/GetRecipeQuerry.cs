/*using MediatR;
using RecipeManagement.Application.DTO;
using RecipeManagement.Domain.Entity;
using RecipeManagement.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RecipeManagement.Application.Requets.Querries
{
    public class GetRecipeQuerry: IRequest<RecipeDTO>
    {
        public int RecipeId {  get; set; }
    }
    public class GetRecipeQuerryHandler : IRequestHandler<GetRecipeQuerry, RecipeDTO>
    {
        public GetRecipeQuerryHandler(RecipeManagementContext context)
        {
            this.Context = context;

        }
        public RecipeManagementContext Context { get; }

        public async Task<RecipeDTO> Handle(GetRecipeQuerry request, CancellationToken cancellationToken)
        {
            RecipeDTO recipeDTO= new RecipeDTO();
            Recipe recipe=Context.Recipes.Where(x=>x.RecipeId==request.RecipeId).First();
            recipeDTO.RecipeId=request.RecipeId;
            recipeDTO.RecipeTitle = recipe.RecipeTitle;
            recipeDTO.Duration=recipe.Duration;
            recipeDTO.RecipeDescription = recipe.RecipeDescription;
            int cat = recipe.category.CategoryId;
            Category category = Context.Category.Where(x => x.CategoryId == cat).First();
            recipeDTO.categoryDTO.CategoryId=category.CategoryId;
            recipeDTO.categoryDTO.CategoryName= category.CategoryName;

            *//*            recipeDTO.categoryDTO.CategoryId=recipe.category.CategoryId;
                        recipeDTO.categoryDTO.CategoryName=recipe.category.CategoryName;*/

/*            Category re = recipe.category.CategoryId;
           CategoryDTO categories = new CategoryDTO();
            categories.CategoryId = re.CategoryId;
            categories.CategoryName = re.CategoryName;
           recipeDTO.categoryDTO = categories;
*//*




return await Task.FromResult(recipeDTO);


}
}
}
*/
using MediatR;
using RecipeManagement.Application.DTO;
using RecipeManagement.Domain.Entity;
using RecipeManagement.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace RecipeManagement.Application.Requests.Queries
{
    public class GetRecipeQuerry : IRequest<RecipeDTO>
    {
        public int RecipeId { get; set; }
    }

    public class GetRecipeQuerryHandler : IRequestHandler<GetRecipeQuerry, RecipeDTO>
    {
        private readonly RecipeManagementContext _context;

        public GetRecipeQuerryHandler(RecipeManagementContext context)
        {
            _context = context;
        }

        public async Task<RecipeDTO> Handle(GetRecipeQuerry request, CancellationToken cancellationToken)
        {
            // Load the recipe along with its category using Include
            var recipe = await _context.Recipes
                .Include(r => r.category) // Eagerly load category to avoid a separate query
                .FirstOrDefaultAsync(r => r.RecipeId == request.RecipeId, cancellationToken);

            // Handle the case where the recipe is not found
            if (recipe == null)
            {
                return null; // or throw an exception if preferred
            }

            // Map recipe to RecipeDTO
            var recipeDTO = new RecipeDTO
            {
                RecipeId = recipe.RecipeId,
                RecipeTitle = recipe.RecipeTitle,
                RecipeDescription = recipe.RecipeDescription,
                Duration = recipe.Duration,
                IsComplete = recipe.IsComplete,
                categoryDTO = new CategoryDTO
                {
                    CategoryId = recipe.category.CategoryId,
                    CategoryName = recipe.category.CategoryName
                }
            };

            return recipeDTO;
        }
    }
}
