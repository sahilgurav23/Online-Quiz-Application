using Quiz_Api.Services;

namespace Quiz_Api.Middleware;

public class ApiKeyAuthMiddleware
{
    private readonly RequestDelegate _next;
    private readonly IConfiguration _configuration;
    private readonly IFileLoggerService _logger;
    private const string API_KEY_HEADER = "X-API-Key";

    public ApiKeyAuthMiddleware(RequestDelegate next, IConfiguration configuration, IFileLoggerService logger)
    {
        _next = next;
        _configuration = configuration;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        // Skip authentication for Swagger UI
        if (context.Request.Path.StartsWithSegments("/swagger"))
        {
            await _next(context);
            return;
        }

        var clientIp = context.Connection.RemoteIpAddress?.ToString() ?? "Unknown";

        // Check if API key is provided in header
        if (!context.Request.Headers.TryGetValue(API_KEY_HEADER, out var extractedApiKey))
        {
            _logger.LogWarning(
                $"Authentication Failed: Missing API Key",
                $"Path: {context.Request.Path} | IP: {clientIp}"
            );

            context.Response.StatusCode = 401;
            await context.Response.WriteAsJsonAsync(new
            {
                error = "Unauthorized",
                message = "API Key is missing. Please provide X-API-Key header."
            });
            return;
        }

        // Get valid API key from configuration
        var validApiKey = _configuration.GetValue<string>("ApiKey");

        // Validate API key
        if (string.IsNullOrEmpty(validApiKey) || !validApiKey.Equals(extractedApiKey))
        {
            _logger.LogWarning(
                $"Authentication Failed: Invalid API Key",
                $"Path: {context.Request.Path} | IP: {clientIp} | Provided Key: {extractedApiKey.ToString().Substring(0, Math.Min(10, extractedApiKey.ToString().Length))}..."
            );

            context.Response.StatusCode = 401;
            await context.Response.WriteAsJsonAsync(new
            {
                error = "Unauthorized",
                message = "Invalid API Key."
            });
            return;
        }

        // API key is valid, continue to next middleware
        _logger.LogInformation(
            $"Authentication Successful",
            $"Path: {context.Request.Path} | IP: {clientIp}"
        );

        await _next(context);
    }
}
