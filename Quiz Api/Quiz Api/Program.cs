using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Quiz_Api.Data;
using Quiz_Api.Middleware;
using Quiz_Api.Services;

var builder = WebApplication.CreateBuilder(args);

// Register File Logger Service as Singleton
builder.Services.AddSingleton<IFileLoggerService, FileLoggerService>();

// Configure CORS to allow frontend access
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "http://localhost:3001")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

// Add services to the container.
builder.Services.AddControllers();

// Configure SQLite Database
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") 
    ?? "Data Source=quiz.db";

builder.Services.AddDbContext<QuizDbContext>(options =>
    options.UseSqlite(connectionString));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo 
    { 
        Title = "Quiz API", 
        Version = "v1",
        Description = "A simple API for fetching quiz data with API Key authentication"
    });
    
    // Add API Key authentication to Swagger
    c.AddSecurityDefinition("ApiKey", new OpenApiSecurityScheme
    {
        Description = "API Key needed to access the endpoints. X-API-Key: your-api-key",
        In = ParameterLocation.Header,
        Name = "X-API-Key",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "ApiKeyScheme"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "ApiKey"
                }
            },
            new string[] { }
        }
    });
});

var app = builder.Build();

// Get logger service for startup logging
var logger = app.Services.GetRequiredService<IFileLoggerService>();
logger.LogInformation("=== Quiz API Starting ===");
logger.LogInformation($"Environment: {app.Environment.EnvironmentName}");

// Initialize database
try
{
    DbInitializer.Initialize(app.Services);
    logger.LogInformation("Database initialized successfully");
}
catch (Exception ex)
{
    logger.LogError("Failed to initialize database", ex);
    throw;
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    logger.LogInformation("Swagger UI enabled at /swagger");
}

app.UseHttpsRedirection();

// Enable CORS (must be before authentication)
app.UseCors("AllowFrontend");
logger.LogInformation("CORS enabled for http://localhost:3000 and http://localhost:3001");

// Add Exception Handling Middleware (must be first)
app.UseMiddleware<ExceptionHandlingMiddleware>();

// Add Request Logging Middleware
app.UseMiddleware<RequestLoggingMiddleware>();

// Add API Key Authentication Middleware
app.UseMiddleware<ApiKeyAuthMiddleware>();

app.UseAuthorization();

app.MapControllers();

logger.LogInformation("Quiz API started successfully");
logger.LogInformation($"Listening on: {string.Join(", ", app.Urls)}");

app.Run();
