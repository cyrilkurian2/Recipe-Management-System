using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RecipeManagement.Application.Requets.Commands.CategoryCommands;
using RecipeManagement.Application.Requets.Commands.RecipeIngredientCommands;

namespace RecipeManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddRecipeIngredientController : ControllerBase
    {
        private readonly IMediator _mediator;

        public AddRecipeIngredientController(IMediator mediator)
        {
            _mediator = mediator;


        }
        [HttpPost]
        public async Task<int> AddRecipeIngredient(AddRecipeIngredientCommand command)
        {
            return await _mediator.Send(command);
        }

    }
}
