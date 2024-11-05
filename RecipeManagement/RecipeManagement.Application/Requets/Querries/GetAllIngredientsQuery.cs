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
    public class GetAllIngredientsQuery : IRequest<List<IngredientDTO>>
    {
    }
    public class GetAllIngredientsQueryHandler : IRequestHandler<GetAllIngredientsQuery, List<IngredientDTO>>
    {
        private readonly RecipeManagementContext _context;

        public GetAllIngredientsQueryHandler(RecipeManagementContext context)
        {
            _context = context;
        }

        public async Task<List<IngredientDTO>> Handle(GetAllIngredientsQuery request, CancellationToken cancellationToken)
        {
            // Fetch all ingredients and map to IngredientDTO
            var ingredients = await _context.Ingredients
                .Select(x => new IngredientDTO
                {
                    IngredientID=x.IngredientsId,
                    IngredientName = x.IngredientsName
                })
                .ToListAsync(cancellationToken);

            return ingredients;
        }
    }
}
