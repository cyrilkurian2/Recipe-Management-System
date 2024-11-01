using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RecipeManagement.Application.DTO;
using RecipeManagement.Application.Requets.Commands.CategoryCommands;
using RecipeManagement.Application.Requets.Commands.UserCommands;
using RecipeManagement.Application.Requets.Querries;

namespace RecipeManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddCategoryController : ControllerBase
    {
        private readonly IMediator _mediator;
        public AddCategoryController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpPost]
        public async Task<int> AddCategory(AddCategoryCommand command)
        {
            return await _mediator.Send(command);
        }

        [HttpGet]

        public async Task<CategoryDTO> Get(int categoryID)
        {
            return await _mediator.Send(new GetCategoryQuerry { CategoryId=categoryID});
        }
    }
}
