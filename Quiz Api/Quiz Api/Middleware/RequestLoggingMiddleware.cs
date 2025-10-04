using System.Diagnostics;
using Quiz_Api.Services;

namespace Quiz_Api.Middleware;

public class RequestLoggingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly IFileLoggerService _logger;

    public RequestLoggingMiddleware(RequestDelegate next, IFileLoggerService logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        // Start timing the request
        var stopwatch = Stopwatch.StartNew();
        
        // Get client IP address
        var clientIp = context.Connection.RemoteIpAddress?.ToString() ?? "Unknown";
        
        try
        {
            // Log incoming request
            _logger.LogInformation(
                $"Incoming Request: {context.Request.Method} {context.Request.Path}",
                $"Query: {context.Request.QueryString} | IP: {clientIp}"
            );

            // Continue to next middleware
            await _next(context);
            
            stopwatch.Stop();
            
            // Log completed request
            _logger.LogRequest(
                context.Request.Method,
                context.Request.Path,
                context.Response.StatusCode,
                stopwatch.ElapsedMilliseconds,
                clientIp
            );
        }
        catch (Exception ex)
        {
            stopwatch.Stop();
            
            // Log the exception
            _logger.LogError(
                $"Unhandled Exception in Request: {context.Request.Method} {context.Request.Path}",
                ex,
                $"IP: {clientIp} | Duration: {stopwatch.ElapsedMilliseconds}ms"
            );
            
            // Re-throw to let the exception handling middleware deal with it
            throw;
        }
    }
}
