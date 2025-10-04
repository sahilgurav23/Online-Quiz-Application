using System.Net;
using System.Text.Json;
using Quiz_Api.Services;

namespace Quiz_Api.Middleware;

public class ExceptionHandlingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly IFileLoggerService _logger;

    public ExceptionHandlingMiddleware(RequestDelegate next, IFileLoggerService logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            await HandleExceptionAsync(context, ex);
        }
    }

    private async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        // Log the exception
        _logger.LogError(
            $"Global Exception Handler: {exception.Message}",
            exception,
            $"Path: {context.Request.Path} | Method: {context.Request.Method}"
        );

        // Prepare error response
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

        object response;

        // In development, include more details
        if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development")
        {
            response = new
            {
                error = "Internal Server Error",
                message = exception.Message,
                stackTrace = exception.StackTrace,
                timestamp = DateTime.UtcNow,
                path = context.Request.Path.ToString()
            };
        }
        else
        {
            response = new
            {
                error = "Internal Server Error",
                message = "An unexpected error occurred. Please try again later.",
                timestamp = DateTime.UtcNow,
                path = context.Request.Path.ToString()
            };
        }

        var jsonResponse = JsonSerializer.Serialize(response);
        await context.Response.WriteAsync(jsonResponse);
    }
}
