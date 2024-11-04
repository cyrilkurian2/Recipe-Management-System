using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RecipeManagement.Application.DTO;
using RecipeManagement.Application.Requests.Queries;
using RecipeManagement.Application.Requets.Commands.UserCommands;
using RecipeManagement.Application.Requets.Querries;
using RecipeManagement.Domain.Entity;

namespace RecipeManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GetSearchController : ControllerBase
    {
        private readonly IMediator _mediator;

        public GetSearchController(IMediator mediator)
        {
            _mediator = mediator;
        }


        [HttpGet("search")]
        public async Task<ActionResult<List<RecipeDTO>>> SearchRecipes([FromQuery] string recipeTitle)
        {
            var query = new SearchByQuery { RecipeTitle = recipeTitle };
            var result = await _mediator.Send(query);

            if (result == null || result.Count == 0)
            {
                return NotFound("No recipes found.");
            }

            return Ok(result);
        }
    }
}





