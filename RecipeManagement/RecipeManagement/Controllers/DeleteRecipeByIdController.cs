using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RecipeManagement.API.Controllers;
using RecipeManagement.Application.DTO;
using RecipeManagement.Application.Requests.Queries;
using RecipeManagement.Application.Requets.Querries;

namespace RecipeManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeleteRecipeByIdController : ControllerBase
    {

        private readonly IMediator _mediator;

        public DeleteRecipeByIdController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpDelete]
        public async Task<ActionResult<bool>> DeleteRecipeById(int recipeId)
        {
            var query = new DeleteRecipeByIdQuery(recipeId);
            var result = await _mediator.Send(query);

            if (result == null)
            {
                return NotFound($"Recipe with ID {recipeId} not found.");
            }

            return Ok(result);
        }

    }
}



