using MediatR;
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
    public class GetIngredientsQuerry:IRequest<IngredientDTO>
    {
        public int IngredientID { get; set; }
    }
    public class GetIngredientsQuerryHandler : IRequestHandler<GetIngredientsQuerry, IngredientDTO>
    {
        public GetIngredientsQuerryHandler(RecipeManagementContext context)
        {
            this.Context=context;
        }
        public RecipeManagementContext Context { get; }

        public Task<IngredientDTO> Handle(GetIngredientsQuerry request, CancellationToken cancellationToken)
        {
            IngredientDTO ingredientDTO=new IngredientDTO();
            Ingredients ingredients = Context.Ingredients.Where(x=>x.IngredientsId==request.IngredientID).First();
            ingredientDTO.IngredientName = ingredients.IngredientsName;
            throw new NotImplementedException();
        }
    }
}
