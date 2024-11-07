

using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using RecipeManagement.Infrastructure.Data;


namespace RecipeManagement.Application.Requets.Querries
{
    public class IsFavouriteQuery : IRequest<bool>
    {
        public int UserId { get; set; }
        public int RecipeId { get; set; }

        public IsFavouriteQuery(int userId, int recipeId)
        {
            UserId = userId;
            RecipeId = recipeId;
        }
    }
    public class IsFavouriteQueryHandler : IRequestHandler<IsFavouriteQuery, bool>
    {
        private readonly RecipeManagementContext _context;

        public IsFavouriteQueryHandler(RecipeManagementContext context)
        {
            _context = context;
        }

        public async Task<bool> Handle(IsFavouriteQuery request, CancellationToken cancellationToken)
        {
            return await _context.Favourites
                .AnyAsync(f => f.user.UserId == request.UserId && f.recipe.RecipeId == request.RecipeId, cancellationToken);
        }
    }
}

