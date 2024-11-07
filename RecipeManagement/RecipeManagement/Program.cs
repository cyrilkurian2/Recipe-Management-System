using Microsoft.EntityFrameworkCore;
using RecipeManagement.Infrastructure.Data;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


//builder.Services.AddCors(options =>
//{
//    options.AddPolicy(name: "_myAllowSpecificOrigins",
//                      builder =>
//                      {
//                          builder.AllowAnyOrigin()
//                                  .AllowAnyMethod()
//                                  .AllowAnyHeader();
//                      });
//});


builder.Services.AddDbContext<RecipeManagementContext>(x =>
{
    x.UseSqlServer(@"Server=localhost;Database=RecipeManagement;User Id=sa;Password=Pass@123;TrustServerCertificate=true");
});
builder.Services.AddScoped<RecipeManagementContext>();

builder.Services.AddMediatR(x =>
{
    x.RegisterServicesFromAssembly(Assembly.Load("RecipeManagement.Application"));

    // x.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors(origin=>origin.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
