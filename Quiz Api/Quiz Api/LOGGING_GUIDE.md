# 📝 Logging System Guide

## Overview

The Quiz API includes a comprehensive file-based logging system that automatically logs all requests, errors, and important events to date-wise log files.

## Log File Location

All logs are stored in the `Logs/` directory in the project root:

```
Quiz Api/
├── Logs/
│   ├── log_2025-10-04.txt
│   ├── log_2025-10-05.txt
│   └── log_2025-10-06.txt
├── Controllers/
├── Services/
└── ...
```

## Log File Format

Each log file is named with the date: `log_YYYY-MM-DD.txt`

**Example**: `log_2025-10-04.txt`

This ensures logs are automatically separated by date for easy management and archival.

## Log Entry Format

Each log entry includes:
- **Timestamp**: `[YYYY-MM-DD HH:mm:ss.fff]`
- **Log Level**: `[INFO]`, `[WARNING]`, or `[ERROR]`
- **Message**: Description of the event
- **Details**: Additional context (optional)

### Example Log Entries

```
[2025-10-04 20:15:30.123] [INFO] === Quiz API Starting ===

[2025-10-04 20:15:30.456] [INFO] Database initialized successfully

[2025-10-04 20:15:31.789] [INFO] Incoming Request: GET /api/quizzes
    Details: Query:  | IP: ::1

[2025-10-04 20:15:31.890] [INFO] Authentication Successful
    Details: Path: /api/quizzes | IP: ::1

[2025-10-04 20:15:31.950] [INFO] Fetching all quizzes

[2025-10-04 20:15:32.100] [INFO] Successfully fetched 3 quizzes

[2025-10-04 20:15:32.150] [INFO] GET /api/quizzes | Status: 200 | Duration: 361ms | IP: ::1

[2025-10-04 20:16:45.234] [WARNING] Authentication Failed: Missing API Key
    Details: Path: /api/quizzes/1 | IP: ::1

[2025-10-04 20:16:45.250] [WARNING] GET /api/quizzes/1 | Status: 401 | Duration: 16ms | IP: ::1

[2025-10-04 20:17:30.567] [ERROR] Error fetching quiz with ID: 999
    Details: 
Exception: InvalidOperationException
Message: Sequence contains no elements
StackTrace: at System.Linq.Enumerable.First...
```

## What Gets Logged

### 1. Application Startup
- API starting
- Environment (Development/Production)
- Database initialization
- Swagger UI status
- CORS configuration
- Listening URLs

### 2. HTTP Requests
- **All incoming requests**: Method, path, query string, client IP
- **Request completion**: Status code, duration in milliseconds
- **Failed requests**: Logged as WARNING if status >= 400

### 3. Authentication Events
- **Successful authentication**: Path and IP
- **Failed authentication**: Missing or invalid API key with details
- **Unauthorized access attempts**: Full details logged

### 4. Controller Actions
- **Fetching quizzes**: When data is requested
- **Success**: Number of items returned
- **Not found**: When quiz ID doesn't exist
- **Errors**: Full exception details with stack trace

### 5. Errors and Exceptions
- **Unhandled exceptions**: Full stack trace
- **Database errors**: Connection issues, query failures
- **Validation errors**: Invalid input data
- **System errors**: Any unexpected failures

## Log Levels

### INFO
- Normal operations
- Successful requests
- Data fetching operations
- Application lifecycle events

### WARNING
- Authentication failures
- Not found (404) errors
- Client errors (4xx status codes)
- Potential issues that don't stop execution

### ERROR
- Unhandled exceptions
- Database errors
- Server errors (5xx status codes)
- Critical failures

## Viewing Logs

### Real-time Monitoring (Windows)
```powershell
# Watch today's log file
Get-Content "Logs\log_$(Get-Date -Format 'yyyy-MM-dd').txt" -Wait -Tail 50
```

### View Specific Date
```powershell
# View logs from a specific date
Get-Content "Logs\log_2025-10-04.txt"
```

### Search Logs
```powershell
# Find all errors
Select-String -Path "Logs\*.txt" -Pattern "\[ERROR\]"

# Find authentication failures
Select-String -Path "Logs\*.txt" -Pattern "Authentication Failed"

# Find slow requests (>1000ms)
Select-String -Path "Logs\*.txt" -Pattern "Duration: [0-9]{4,}ms"
```

### Linux/Mac
```bash
# Watch today's log
tail -f Logs/log_$(date +%Y-%m-%d).txt

# Search for errors
grep "\[ERROR\]" Logs/*.txt

# Count requests by status code
grep "Status: 200" Logs/*.txt | wc -l
```

## Log Management

### Automatic Features
- ✅ **Date-wise separation**: New file created daily
- ✅ **Thread-safe**: Multiple requests logged safely
- ✅ **Auto-creation**: Logs directory created automatically
- ✅ **No size limit**: Files grow as needed

### Manual Management

#### Archive Old Logs
```powershell
# Move logs older than 30 days to archive
$archiveDate = (Get-Date).AddDays(-30)
Get-ChildItem "Logs\log_*.txt" | 
    Where-Object { $_.LastWriteTime -lt $archiveDate } |
    Move-Item -Destination "Logs\Archive\"
```

#### Delete Old Logs
```powershell
# Delete logs older than 90 days
$deleteDate = (Get-Date).AddDays(-90)
Get-ChildItem "Logs\log_*.txt" | 
    Where-Object { $_.LastWriteTime -lt $deleteDate } |
    Remove-Item
```

#### Compress Logs
```powershell
# Compress last month's logs
Compress-Archive -Path "Logs\log_2025-09-*.txt" -DestinationPath "Logs\Archive\2025-09.zip"
```

## Troubleshooting with Logs

### Issue: API Not Responding
**Check**: Look for startup errors
```powershell
Select-String -Path "Logs\log_*.txt" -Pattern "Starting|Failed"
```

### Issue: Authentication Failures
**Check**: Look for auth-related logs
```powershell
Select-String -Path "Logs\log_*.txt" -Pattern "Authentication Failed"
```

### Issue: Slow Performance
**Check**: Find slow requests
```powershell
Select-String -Path "Logs\log_*.txt" -Pattern "Duration: [0-9]{3,}ms"
```

### Issue: Database Errors
**Check**: Look for database-related errors
```powershell
Select-String -Path "Logs\log_*.txt" -Pattern "database|Database|ERROR.*quiz"
```

### Issue: CORS Problems
**Check**: Look for CORS configuration
```powershell
Select-String -Path "Logs\log_*.txt" -Pattern "CORS"
```

## Configuration

### Change Log Directory
Edit `Services/FileLoggerService.cs`:
```csharp
_logDirectory = Path.Combine(Directory.GetCurrentDirectory(), "CustomLogs");
```

### Change Log File Format
Edit `GetLogFilePath()` method:
```csharp
var fileName = $"app_{DateTime.Now:yyyyMMdd}.log";
```

### Disable Logging
Remove or comment out in `Program.cs`:
```csharp
// builder.Services.AddSingleton<IFileLoggerService, FileLoggerService>();
```

## Best Practices

### ✅ Do
- Monitor logs regularly for errors
- Archive old logs periodically
- Use log search to troubleshoot issues
- Check logs after deployment
- Review authentication failures

### ❌ Don't
- Commit log files to source control (add to .gitignore)
- Store sensitive data in logs (passwords, full API keys)
- Let logs grow indefinitely
- Ignore WARNING level logs
- Delete recent logs

## Log Rotation Strategy

### Recommended Approach
1. **Keep current month**: All logs from current month
2. **Archive previous month**: Compress and move to archive
3. **Delete after 90 days**: Remove logs older than 3 months

### Example Script (PowerShell)
```powershell
# Run this monthly
$currentMonth = Get-Date -Format "yyyy-MM"
$archiveMonth = (Get-Date).AddMonths(-1).ToString("yyyy-MM")
$deleteDate = (Get-Date).AddDays(-90)

# Archive last month
Compress-Archive -Path "Logs\log_$archiveMonth-*.txt" `
                 -DestinationPath "Logs\Archive\$archiveMonth.zip"

# Delete old archives
Get-ChildItem "Logs\Archive\*.zip" | 
    Where-Object { $_.LastWriteTime -lt $deleteDate } |
    Remove-Item
```

## Integration with Monitoring Tools

### Export to CSV
```powershell
# Convert logs to CSV for analysis
Get-Content "Logs\log_*.txt" | 
    Select-String -Pattern "\[(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{3})\] \[(\w+)\] (.+)" |
    ForEach-Object {
        [PSCustomObject]@{
            Timestamp = $_.Matches.Groups[1].Value
            Level = $_.Matches.Groups[2].Value
            Message = $_.Matches.Groups[3].Value
        }
    } | Export-Csv -Path "log_analysis.csv" -NoTypeInformation
```

### Send Alerts
Monitor for critical errors and send notifications (requires additional setup).

## Summary

✅ **Automatic**: Logs created automatically, no configuration needed  
✅ **Date-wise**: Separate file for each day  
✅ **Comprehensive**: All requests, errors, and events logged  
✅ **Thread-safe**: Safe for concurrent requests  
✅ **Easy to search**: Plain text format  
✅ **Production-ready**: Suitable for production use  

---

**Location**: `Logs/log_YYYY-MM-DD.txt`  
**Format**: Plain text with timestamps  
**Rotation**: Daily (automatic)  
**Retention**: Manual (recommended: 90 days)
