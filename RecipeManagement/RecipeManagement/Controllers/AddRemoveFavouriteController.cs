using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RecipeManagement.Application.Requets.Commands.FavouritesCommands;
using RecipeManagement.Application.Requets.Commands.IngredientCommands;
using static RecipeManagement.Application.Requets.Commands.FavouritesCommands.AddRemoveFavouriteCommand;

namespace RecipeManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class AddRemoveFavouriteController : ControllerBase
    {
        private readonly IMediator _mediator;
        public AddRemoveFavouriteController(IMediator mediator)
        {
            _mediator = mediator;

        }
        [HttpPost]
        public async Task<IActionResult> AddRemoveFavourites(AddRemoveFavouriteCommand command)
        {
            var resultMessage = await _mediator.Send(command);
            return Ok(new { message = resultMessage }); 
        }

    }
}