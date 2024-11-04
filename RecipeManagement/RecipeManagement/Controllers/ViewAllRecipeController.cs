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
    public class ViewAllRecipeController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ViewAllRecipeController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<RecipeDTO>>> GetAllRecipe()
        {
            var query = new GetAllRecipeQuery();
            var result = await _mediator.Send(query);

            if (result == null || result.Count == 0)
            {
                return NotFound("No recipes found.");
            }

            return Ok(result);
        }



        [HttpGet("{recipeId}")]
        public async Task<ActionResult<RecipeDTO>> GetRecipeById(int recipeId)
        {
            var query = new GetRecipeByIdQuery(recipeId);
            var result = await _mediator.Send(query);

            if (result == null)
            {
                return NotFound($"Recipe with ID {recipeId} not found.");
            }

            return Ok(result);
        }




        [HttpGet("categoryName={categoryName}")]
        public async Task<ActionResult<List<RecipeDTO>>> GetRecipesByCategory(string categoryName)
        {
            var query = new SearchByCategoryQuery(categoryName);
            var result = await _mediator.Send(query);

            if (result == null || result.Count == 0)
            {
                return NotFound($"No recipes found in the '{categoryName}' category.");
            }

            return Ok(result);
        }


    }
}




