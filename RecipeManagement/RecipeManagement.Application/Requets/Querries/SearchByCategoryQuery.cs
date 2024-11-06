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
                .Where(r => r.category.CategoryName == request.CategoryName && r.IsComplete)
                .GroupJoin(
                    _context.Favourites,
                    recipe => recipe.RecipeId,
                    favourite => favourite.recipe.RecipeId,
                    (recipe, favourites) => new { Recipe = recipe, FavouritesCount = favourites.Count() }
                )
                .Select(r => new
                {
                    r.Recipe,
                    r.FavouritesCount,
                    Author = _context.RecipeAuthors
                        .Where(ra => ra.Recipe.RecipeId == r.Recipe.RecipeId)
                        .Select(ra => ra.User)
                        .FirstOrDefault()
                })
                .Select(r => new RecipeDTO
                {
                    RecipeId = r.Recipe.RecipeId,
                    RecipeTitle = r.Recipe.RecipeTitle,
                    RecipeDescription = r.Recipe.RecipeDescription,
                    Duration = r.Recipe.Duration,
                    IsComplete = r.Recipe.IsComplete,
                    RecipeImage = r.Recipe.RecipeImage,
                    RecipeSteps = r.Recipe.RecipeSteps,
                    categoryDTO = new CategoryDTO
                    {
                        CategoryId = r.Recipe.category.CategoryId,
                        CategoryName = r.Recipe.category.CategoryName
                    },
                    FavouritesCount = r.FavouritesCount,
                    User = r.Author == null ? null : new UserDTO
                    {
                        UserId = r.Author.UserId,
                        Name = r.Author.Name,
                        Email = r.Author.Email
                    }
                })
                .ToListAsync(cancellationToken);

            return recipes;
        }
    }
}
