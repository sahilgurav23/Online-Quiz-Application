using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Quiz_Api.Data;
using Quiz_Api.DTOs;
using Quiz_Api.Services;

namespace Quiz_Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class QuizzesController : ControllerBase
{
    private readonly QuizDbContext _context;
    private readonly IFileLoggerService _logger;

    public QuizzesController(QuizDbContext context, IFileLoggerService logger)
    {
        _context = context;
        _logger = logger;
    }

    // GET: api/quizzes - Fetch all quizzes with questions and options (without correct answers)
    [HttpGet]
    public async Task<ActionResult<IEnumerable<QuizDto>>> GetQuizzes()
    {
        try
        {
            _logger.LogInformation("Fetching all quizzes");

            var quizzes = await _context.Quizzes
                .Include(q => q.Questions)
                .ThenInclude(q => q.Options)
                .Select(q => new QuizDto
                {
                    Id = q.Id,
                    Title = q.Title,
                    Description = q.Description,
                    Questions = q.Questions.Select(question => new QuestionDto
                    {
                        Id = question.Id,
                        QuizId = question.QuizId,
                        QuestionText = question.QuestionText,
                        Options = question.Options.Select(option => new OptionDto
                        {
                            Id = option.Id,
                            QuestionId = option.QuestionId,
                            OptionText = option.OptionText,
                            IsCorrect = false // Hide correct answers for quiz takers
                        }).ToList()
                    }).ToList()
                })
                .ToListAsync();

            _logger.LogInformation($"Successfully fetched {quizzes.Count} quizzes");
            return Ok(quizzes);
        }
        catch (Exception ex)
        {
            _logger.LogError("Error fetching all quizzes", ex);
            throw;
        }
    }

    // GET: api/quizzes/{id} - Fetch single quiz with questions and options (without correct answers)
    [HttpGet("{id}")]
    public async Task<ActionResult<QuizDto>> GetQuiz(int id)
    {
        try
        {
            _logger.LogInformation($"Fetching quiz with ID: {id}");

            var quiz = await _context.Quizzes
                .Include(q => q.Questions)
                .ThenInclude(q => q.Options)
                .FirstOrDefaultAsync(q => q.Id == id);

            if (quiz == null)
            {
                _logger.LogWarning($"Quiz not found with ID: {id}");
                return NotFound(new { message = $"Quiz with ID {id} not found" });
            }

            var quizDto = new QuizDto
            {
                Id = quiz.Id,
                Title = quiz.Title,
                Description = quiz.Description,
                Questions = quiz.Questions.Select(question => new QuestionDto
                {
                    Id = question.Id,
                    QuizId = question.QuizId,
                    QuestionText = question.QuestionText,
                    Options = question.Options.Select(option => new OptionDto
                    {
                        Id = option.Id,
                        QuestionId = option.QuestionId,
                        OptionText = option.OptionText,
                        IsCorrect = false // Hide correct answers for quiz takers
                    }).ToList()
                }).ToList()
            };

            _logger.LogInformation($"Successfully fetched quiz: {quiz.Title} (ID: {id})");
            return Ok(quizDto);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error fetching quiz with ID: {id}", ex);
            throw;
        }
    }

    // GET: api/quizzes/{id}/answers - Fetch quiz with correct answers
    [HttpGet("{id}/answers")]
    public async Task<ActionResult<QuizDto>> GetQuizWithAnswers(int id)
    {
        try
        {
            _logger.LogInformation($"Fetching quiz with answers for ID: {id}");

            var quiz = await _context.Quizzes
                .Include(q => q.Questions)
                .ThenInclude(q => q.Options)
                .FirstOrDefaultAsync(q => q.Id == id);

            if (quiz == null)
            {
                _logger.LogWarning($"Quiz not found with ID: {id} (answers endpoint)");
                return NotFound(new { message = $"Quiz with ID {id} not found" });
            }

            var quizDto = new QuizDto
            {
                Id = quiz.Id,
                Title = quiz.Title,
                Description = quiz.Description,
                Questions = quiz.Questions.Select(question => new QuestionDto
                {
                    Id = question.Id,
                    QuizId = question.QuizId,
                    QuestionText = question.QuestionText,
                    Options = question.Options.Select(option => new OptionDto
                    {
                        Id = option.Id,
                        QuestionId = option.QuestionId,
                        OptionText = option.OptionText,
                        IsCorrect = option.IsCorrect // Show correct answers
                    }).ToList()
                }).ToList()
            };

            _logger.LogInformation($"Successfully fetched quiz with answers: {quiz.Title} (ID: {id})");
            return Ok(quizDto);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error fetching quiz with answers for ID: {id}", ex);
            throw;
        }
    }
}
