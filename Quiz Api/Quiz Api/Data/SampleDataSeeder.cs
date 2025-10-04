using Quiz_Api.Models;

namespace Quiz_Api.Data;

public static class SampleDataSeeder
{
    public static void SeedData(QuizDbContext context)
    {
        // Check if data already exists
        if (context.Quizzes.Any())
        {
            return; // Database already seeded
        }

        // Create sample quizzes
        var quizzes = new List<Quiz>
        {
            new Quiz
            {
                Title = "General Knowledge Quiz",
                Description = "Test your general knowledge with these questions",
                Questions = new List<Question>
                {
                    new Question
                    {
                        QuestionText = "What is the capital of France?",
                        Options = new List<Option>
                        {
                            new Option { OptionText = "London", IsCorrect = false },
                            new Option { OptionText = "Paris", IsCorrect = true },
                            new Option { OptionText = "Berlin", IsCorrect = false },
                            new Option { OptionText = "Madrid", IsCorrect = false }
                        }
                    },
                    new Question
                    {
                        QuestionText = "Which planet is known as the Red Planet?",
                        Options = new List<Option>
                        {
                            new Option { OptionText = "Venus", IsCorrect = false },
                            new Option { OptionText = "Mars", IsCorrect = true },
                            new Option { OptionText = "Jupiter", IsCorrect = false },
                            new Option { OptionText = "Saturn", IsCorrect = false }
                        }
                    },
                    new Question
                    {
                        QuestionText = "What is the largest ocean on Earth?",
                        Options = new List<Option>
                        {
                            new Option { OptionText = "Atlantic Ocean", IsCorrect = false },
                            new Option { OptionText = "Indian Ocean", IsCorrect = false },
                            new Option { OptionText = "Pacific Ocean", IsCorrect = true },
                            new Option { OptionText = "Arctic Ocean", IsCorrect = false }
                        }
                    }
                }
            },
            new Quiz
            {
                Title = "Programming Basics",
                Description = "Test your programming knowledge",
                Questions = new List<Question>
                {
                    new Question
                    {
                        QuestionText = "What does HTML stand for?",
                        Options = new List<Option>
                        {
                            new Option { OptionText = "Hyper Text Markup Language", IsCorrect = true },
                            new Option { OptionText = "High Tech Modern Language", IsCorrect = false },
                            new Option { OptionText = "Home Tool Markup Language", IsCorrect = false }
                        }
                    },
                    new Question
                    {
                        QuestionText = "Which language is known as the language of the web?",
                        Options = new List<Option>
                        {
                            new Option { OptionText = "Python", IsCorrect = false },
                            new Option { OptionText = "JavaScript", IsCorrect = true },
                            new Option { OptionText = "Java", IsCorrect = false },
                            new Option { OptionText = "C++", IsCorrect = false }
                        }
                    }
                }
            },
            new Quiz
            {
                Title = "Math Quiz",
                Description = "Simple math questions",
                Questions = new List<Question>
                {
                    new Question
                    {
                        QuestionText = "What is 5 + 3?",
                        Options = new List<Option>
                        {
                            new Option { OptionText = "7", IsCorrect = false },
                            new Option { OptionText = "8", IsCorrect = true },
                            new Option { OptionText = "9", IsCorrect = false }
                        }
                    },
                    new Question
                    {
                        QuestionText = "What is 12 - 4?",
                        Options = new List<Option>
                        {
                            new Option { OptionText = "6", IsCorrect = false },
                            new Option { OptionText = "7", IsCorrect = false },
                            new Option { OptionText = "8", IsCorrect = true }
                        }
                    },
                    new Question
                    {
                        QuestionText = "What is 3 × 4?",
                        Options = new List<Option>
                        {
                            new Option { OptionText = "10", IsCorrect = false },
                            new Option { OptionText = "12", IsCorrect = true },
                            new Option { OptionText = "14", IsCorrect = false }
                        }
                    }
                }
            }
        };

        context.Quizzes.AddRange(quizzes);
        context.SaveChanges();
    }
}
