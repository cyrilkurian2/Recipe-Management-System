using MediatR;
using RecipeManagement.Application.DTO;
using RecipeManagement.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace RecipeManagement.Application.Requests.Queries
{
    public class SearchByCategoryQuery : IRequest<List<RecipeDTO>>
    {
        public string CategoryName { get; set; }

        public SearchByCategoryQuery(string categoryName)
        {
            CategoryName = categoryName;
        }
    }

    public class SearchByCategoryQueryHandler : IRequestHandler<SearchByCategoryQuery, List<RecipeDTO>>
    {
        private readonly RecipeManagementContext _context;

        public SearchByCategoryQueryHandler(RecipeManagementContext context)
        {
            _context = context;
        }

        public async Task<List<RecipeDTO>> Handle(SearchByCategoryQuery request, CancellationToken cancellationToken)
        {
            var recipes = await _context.Recipes
                .Include(r => r.category)
                .Where(r => r.category.CategoryName == request.CategoryName)
                .Select(recipe => new RecipeDTO
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
                })
                .ToListAsync(cancellationToken);

            return recipes;
        }
    }
}

