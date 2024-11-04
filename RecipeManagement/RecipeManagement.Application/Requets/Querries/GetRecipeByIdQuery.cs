using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using RecipeManagement.Application.DTO;
using RecipeManagement.Infrastructure.Data;

namespace RecipeManagement.Application.Requests.Queries
{
    public class GetRecipeByIdQuery : IRequest<RecipeDTO>
    {
        public int RecipeId { get; set; }

        public GetRecipeByIdQuery(int recipeId)
        {
            RecipeId = recipeId;
        }
    }

    public class GetRecipeByIdQueryHandler : IRequestHandler<GetRecipeByIdQuery, RecipeDTO>
    {
        private readonly RecipeManagementContext _context;

        public GetRecipeByIdQueryHandler(RecipeManagementContext context)
        {
            _context = context;
        }

        public async Task<RecipeDTO> Handle(GetRecipeByIdQuery request, CancellationToken cancellationToken)
        {
            var recipe = await _context.Recipes
                .Include(r => r.category)
                .FirstOrDefaultAsync(r => r.RecipeId == request.RecipeId, cancellationToken);

            if (recipe == null)
            {
                return null; // Handle null case in controller
            }

            return new RecipeDTO
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
        }
    }
}
