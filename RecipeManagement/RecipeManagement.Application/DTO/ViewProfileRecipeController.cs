using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RecipeManagement.Application.DTO;
using RecipeManagement.Application.Requets.Querries;

namespace RecipeManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ViewProfileRecipeController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ViewProfileRecipeController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<RecipeDTO>>> GetAllRecipe(int userid)
        {
            var query = new GetProfileRecipeQuery { UserId = userid};
            var result = await _mediator.Send(query);

            if (result == null || result.Count == 0)
            {
                return NotFound("No recipes found.");
            }

            return Ok(result);
        }
    }
}
