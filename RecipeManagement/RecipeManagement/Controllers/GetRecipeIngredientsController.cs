using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RecipeManagement.Application.DTO;
using RecipeManagement.Application.Requets.Querries;

namespace RecipeManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GetRecipeIngredientsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public GetRecipeIngredientsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("{recipeId}/ingredients")]
        public async Task<ActionResult<List<RecipeIngredientDTO>>> GetIngredientsByRecipeId(int recipeId)
        {
            var query = new GetIngredientsByRecipeIDQuery { RecipeId = recipeId };
            var ingredients = await _mediator.Send(query);

            if (ingredients == null || ingredients.Count == 0)
            {
                return NotFound("No ingredients found for the specified recipe.");
            }

            return Ok(ingredients);
        }
    }
}

