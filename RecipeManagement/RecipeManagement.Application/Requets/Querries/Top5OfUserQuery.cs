/*using MediatR;
using Microsoft.EntityFrameworkCore;
using RecipeManagement.Application.DTO;
using RecipeManagement.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RecipeManagement.Application.Requets.Querries
{
    public  class Top5OfUserQuery : IRequest<List<RecipeWithoutAuthorDTO>>
    {
        public int UserId { get; }

        public Top5OfUserQuery(int userId)
        {
            UserId = userId;
        }
    }
    public class Top5OfUserQueryHandler : IRequestHandler<Top5OfUserQuery, List<RecipeWithoutAuthorDTO>>
    {
        private readonly RecipeManagementContext _context;

        public Top5OfUserQueryHandler(RecipeManagementContext context)
        {
            _context = context;
        }

        public async Task<List<RecipeWithoutAuthorDTO>> Handle(Top5OfUserQuery request, CancellationToken cancellationToken)
        {
            var topRecipes = await _context.RecipeAuthors
                .Where(ra => ra.User.UserId == request.UserId) 
                .Select(ra => ra.Recipe) 
                .GroupJoin(
                    _context.Favourites,
                    recipe => recipe.RecipeId,
                    favourite => favourite.recipe.RecipeId,
                    (recipe, favourites) => new { Recipe = recipe, FavouritesCount = favourites.Count() }
                )
                .OrderByDescending(r => r.FavouritesCount) // Sort by favourites count
                .Take(5) // Limit to top 5
                .Select(r => new RecipeWithoutAuthorDTO
                {
                    RecipeId = r.Recipe.RecipeId,
                    RecipeTitle = r.Recipe.RecipeTitle
                })
                .ToListAsync(cancellationToken);

            return topRecipes;
        }
    }
}
*/
using MediatR;
using Microsoft.EntityFrameworkCore;
using RecipeManagement.Application.DTO;
using RecipeManagement.Infrastructure.Data;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace RecipeManagement.Application.Requests.Queries
{
    public class Top5OfUserQuery : IRequest<List<RecipeWithoutAuthorDTO>>
    {
        public int UserId { get; }

        public Top5OfUserQuery(int userId)
        {
            UserId = userId;
        }
    }

    public class Top5OfUserQueryHandler : IRequestHandler<Top5OfUserQuery, List<RecipeWithoutAuthorDTO>>
    {
        private readonly RecipeManagementContext _context;

        public Top5OfUserQueryHandler(RecipeManagementContext context)
        {
            _context = context;
        }

        public async Task<List<RecipeWithoutAuthorDTO>> Handle(Top5OfUserQuery request, CancellationToken cancellationToken)
        {
            var topRecipes = await _context.RecipeAuthors
                .Where(ra => ra.User.UserId == request.UserId)
                .Select(ra => ra.Recipe)
                .GroupJoin(
                    _context.Favourites,
                    recipe => recipe.RecipeId,
                    favourite => favourite.recipe.RecipeId,
                    (recipe, favourites) => new { Recipe = recipe, FavouritesCount = favourites.Count() }
                )
                .OrderByDescending(r => r.FavouritesCount)
                .Take(5)
                .Select(r => new RecipeWithoutAuthorDTO
                {
                    RecipeId = r.Recipe.RecipeId,
                    RecipeTitle = r.Recipe.RecipeTitle,
                    FavouriteCount = r.FavouritesCount 
                })
                .ToListAsync(cancellationToken);

            return topRecipes;
        }
    }
}
