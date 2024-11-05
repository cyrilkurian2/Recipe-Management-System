using MediatR;
using RecipeManagement.Domain.Entity;
using RecipeManagement.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RecipeManagement.Application.Requets.Commands.IngredientCommands
{
    public class AddIngredientCommand:IRequest<int>
    {
        public string IngredientsName { get; set; }
    }
    public  class AddIngredientCommandHandler : IRequestHandler<AddIngredientCommand, int>
    {
        private readonly RecipeManagementContext _context;
        public AddIngredientCommandHandler(RecipeManagementContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(AddIngredientCommand request, CancellationToken cancellationToken)
        {
            Ingredients ingredients=new Ingredients();
            ingredients.IngredientsName= request.IngredientsName;
            _context.Ingredients.Add(ingredients);

            return await _context.SaveChangesAsync();
        }
    }
}
