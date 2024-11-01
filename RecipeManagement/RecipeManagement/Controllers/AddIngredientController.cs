using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RecipeManagement.Application.DTO;
using RecipeManagement.Application.Requets.Commands.IngredientCommands;
using RecipeManagement.Application.Requets.Querries;

namespace RecipeManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddIngredientController : ControllerBase
    {
        private readonly IMediator _mediator;
        public AddIngredientController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpPost]
        public async Task<int> AddIngredient(AddIngredientCommand command)
        {
            return await _mediator.Send(command);
        }
        [HttpGet]
        public async Task<IngredientDTO> Get(int ingredientId)
        {
            return await _mediator.Send(new GetIngredientsQuerry { IngredientID = ingredientId });
        }
    }
    
}
