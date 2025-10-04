using System.Text;

namespace Quiz_Api.Services;

public interface IFileLoggerService
{
    void LogInformation(string message, string? additionalInfo = null);
    void LogWarning(string message, string? additionalInfo = null);
    void LogError(string message, Exception? exception = null, string? additionalInfo = null);
    void LogRequest(string method, string path, int statusCode, long elapsedMs, string? clientIp = null);
}

public class FileLoggerService : IFileLoggerService
{
    private readonly string _logDirectory;
    private static readonly object _lockObject = new object();

    public FileLoggerService()
    {
        // Create Logs directory in the project root
        _logDirectory = Path.Combine(Directory.GetCurrentDirectory(), "Logs");
        
        if (!Directory.Exists(_logDirectory))
        {
            Directory.CreateDirectory(_logDirectory);
        }
    }

    private string GetLogFilePath()
    {
        // Create date-wise log files: log_2025-10-04.txt
        var fileName = $"log_{DateTime.Now:yyyy-MM-dd}.txt";
        return Path.Combine(_logDirectory, fileName);
    }

    private void WriteLog(string logLevel, string message, string? additionalInfo = null)
    {
        try
        {
            var logFilePath = GetLogFilePath();
            var timestamp = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss.fff");
            
            var logBuilder = new StringBuilder();
            logBuilder.AppendLine($"[{timestamp}] [{logLevel}] {message}");
            
            if (!string.IsNullOrEmpty(additionalInfo))
            {
                logBuilder.AppendLine($"    Details: {additionalInfo}");
            }
            
            logBuilder.AppendLine(); // Empty line for readability

            // Thread-safe file writing
            lock (_lockObject)
            {
                File.AppendAllText(logFilePath, logBuilder.ToString());
            }
        }
        catch (Exception ex)
        {
            // If logging fails, write to console as fallback
            Console.WriteLine($"Failed to write to log file: {ex.Message}");
        }
    }

    public void LogInformation(string message, string? additionalInfo = null)
    {
        WriteLog("INFO", message, additionalInfo);
    }

    public void LogWarning(string message, string? additionalInfo = null)
    {
        WriteLog("WARNING", message, additionalInfo);
    }

    public void LogError(string message, Exception? exception = null, string? additionalInfo = null)
    {
        var details = additionalInfo ?? string.Empty;
        
        if (exception != null)
        {
            details += $"\nException: {exception.GetType().Name}\nMessage: {exception.Message}\nStackTrace: {exception.StackTrace}";
            
            if (exception.InnerException != null)
            {
                details += $"\nInner Exception: {exception.InnerException.Message}";
            }
        }
        
        WriteLog("ERROR", message, details);
    }

    public void LogRequest(string method, string path, int statusCode, long elapsedMs, string? clientIp = null)
    {
        var ipInfo = !string.IsNullOrEmpty(clientIp) ? $" | IP: {clientIp}" : string.Empty;
        var message = $"{method} {path} | Status: {statusCode} | Duration: {elapsedMs}ms{ipInfo}";
        
        // Log as warning if status code indicates an error
        if (statusCode >= 400)
        {
            WriteLog("WARNING", message);
        }
        else
        {
            WriteLog("INFO", message);
        }
    }
}
