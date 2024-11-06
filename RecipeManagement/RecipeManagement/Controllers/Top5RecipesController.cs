using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RecipeManagement.Application.DTO;
using RecipeManagement.Application.Requests.Queries;
using RecipeManagement.Application.Requets.Querries;

namespace RecipeManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Top5RecipesController : ControllerBase
    {
        private readonly IMediator _mediator;
        public Top5RecipesController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpGet("top5/{userId}")]
        public async Task<ActionResult<List<RecipeWithoutAuthorDTO>>> GetTop5FavouritedRecipes(int userId)
        {
            var query = new Top5OfUserQuery(userId);
            var result = await _mediator.Send(query);

            if (result == null || result.Count == 0)
            {
                return NotFound("No top recipes found for the specified user.");
            }

            return Ok(result);
        }
    }
}
