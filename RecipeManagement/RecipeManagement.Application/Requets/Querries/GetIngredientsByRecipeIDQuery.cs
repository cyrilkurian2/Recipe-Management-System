using MediatR;
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
    public class GetIngredientsByRecipeIDQuery : IRequest<List<RecipeIngredientDTO>>
    {
        public int RecipeId { get; set; }
    }
    public class GetIngredientsByRecipeIDQueryHandler : IRequestHandler<GetIngredientsByRecipeIDQuery, List<RecipeIngredientDTO>>
    {
        private readonly RecipeManagementContext _context;

        public GetIngredientsByRecipeIDQueryHandler(RecipeManagementContext context)
        {
            _context = context;
        }

        public async Task<List<RecipeIngredientDTO>> Handle(GetIngredientsByRecipeIDQuery request, CancellationToken cancellationToken)
        {
            var ingredients = await _context.RecipeIngredients
                .Where(ri => ri.recipe.RecipeId == request.RecipeId)
                .Select(ri => new RecipeIngredientDTO
                {
                    IngredientName = ri.ingredients.IngredientsName,
                    Quantity = ri.Quantity
                })
                .ToListAsync(cancellationToken);

            return ingredients;
        }
    }
}
