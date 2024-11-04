using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RecipeManagement.Application.DTO;
using RecipeManagement.Application.Requests.Queries;

namespace RecipeManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GetFavouritesController : ControllerBase
    {
        private readonly IMediator _mediator;
        public GetFavouritesController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpGet]

        public async Task<FavouritesDTO> Get(int userId)
        {
            return await _mediator.Send(new GetFavouritesQuery { UserId = userId });
        }
    }
}
