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
                Description = "Test your general knowledge with these questions (5 minutes)",
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
                    },
                    new Question
                    {
                        QuestionText = "Who painted the Mona Lisa?",
                        Options = new List<Option>
                        {
                            new Option { OptionText = "Vincent van Gogh", IsCorrect = false },
                            new Option { OptionText = "Leonardo da Vinci", IsCorrect = true },
                            new Option { OptionText = "Pablo Picasso", IsCorrect = false },
                            new Option { OptionText = "Michelangelo", IsCorrect = false }
                        }
                    },
                    new Question
                    {
                        QuestionText = "What is the smallest country in the world?",
                        Options = new List<Option>
                        {
                            new Option { OptionText = "Monaco", IsCorrect = false },
                            new Option { OptionText = "Vatican City", IsCorrect = true },
                            new Option { OptionText = "San Marino", IsCorrect = false },
                            new Option { OptionText = "Liechtenstein", IsCorrect = false }
                        }
                    },
                    new Question
                    {
                        QuestionText = "How many continents are there?",
                        Options = new List<Option>
                        {
                            new Option { OptionText = "5", IsCorrect = false },
                            new Option { OptionText = "6", IsCorrect = false },
                            new Option { OptionText = "7", IsCorrect = true },
                            new Option { OptionText = "8", IsCorrect = false }
                        }
                    },
                    new Question
                    {
                        QuestionText = "What is the largest mammal in the world?",
                        Options = new List<Option>
                        {
                            new Option { OptionText = "African Elephant", IsCorrect = false },
                            new Option { OptionText = "Blue Whale", IsCorrect = true },
                            new Option { OptionText = "Giraffe", IsCorrect = false },
                            new Option { OptionText = "Polar Bear", IsCorrect = false }
                        }
                    },
                    new Question
                    {
                        QuestionText = "In which year did World War II end?",
                        Options = new List<Option>
                        {
                            new Option { OptionText = "1943", IsCorrect = false },
                            new Option { OptionText = "1944", IsCorrect = false },
                            new Option { OptionText = "1945", IsCorrect = true },
                            new Option { OptionText = "1946", IsCorrect = false }
                        }
                    },
                    new Question
                    {
                        QuestionText = "What is the chemical symbol for gold?",
                        Options = new List<Option>
                        {
                            new Option { OptionText = "Go", IsCorrect = false },
                            new Option { OptionText = "Au", IsCorrect = true },
                            new Option { OptionText = "Gd", IsCorrect = false },
                            new Option { OptionText = "Ag", IsCorrect = false }
                        }
                    },
                    new Question
                    {
                        QuestionText = "How many days are there in a leap year?",
                        Options = new List<Option>
                        {
                            new Option { OptionText = "364", IsCorrect = false },
                            new Option { OptionText = "365", IsCorrect = false },
                            new Option { OptionText = "366", IsCorrect = true },
                            new Option { OptionText = "367", IsCorrect = false }
                        }
                    }
                }
            },
            new Quiz
            {
                Title = "Programming Basics",
                Description = "Test your programming knowledge (5 minutes)",
                Questions = new List<Question>
                {
                    new Question
                    {
                        QuestionText = "What does HTML stand for?",
                        Options = new List<Option>
                        {
                            new Option { OptionText = "Hyper Text Markup Language", IsCorrect = true },
                            new Option { OptionText = "High Tech Modern Language", IsCorrect = false },
                            new Option { OptionText = "Home Tool Markup Language", IsCorrect = false },
                            new Option { OptionText = "Hyperlinks and Text Markup Language", IsCorrect = false }
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
                    },
                    new Question
                    {
                        QuestionText = "What does CSS stand for?",
                        Options = new List<Option>
                        {
                            new Option { OptionText = "Computer Style Sheets", IsCorrect = false },
                            new Option { OptionText = "Cascading Style Sheets", IsCorrect = true },
                            new Option { OptionText = "Creative Style Sheets", IsCorrect = false },
                            new Option { OptionText = "Colorful Style Sheets", IsCorrect = false }
                        }
                    },
                    new Question
                    {
                        QuestionText = "Which of these is a Python web framework?",
                        Options = new List<Option>
                        {
                            new Option { OptionText = "React", IsCorrect = false },
                            new Option { OptionText = "Angular", IsCorrect = false },
                            new Option { OptionText = "Django", IsCorrect = true },
                            new Option { OptionText = "Vue", IsCorrect = false }
                        }
                    },
                    new Question
                    {
                        QuestionText = "What is the correct syntax to output 'Hello World' in Python?",
                        Options = new List<Option>
                        {
                            new Option { OptionText = "echo('Hello World')", IsCorrect = false },
                            new Option { OptionText = "print('Hello World')", IsCorrect = true },
                            new Option { OptionText = "printf('Hello World')", IsCorrect = false },
                            new Option { OptionText = "console.log('Hello World')", IsCorrect = false }
                        }
                    },
                    new Question
                    {
                        QuestionText = "Which symbol is used for comments in JavaScript?",
                        Options = new List<Option>
                        {
                            new Option { OptionText = "#", IsCorrect = false },
                            new Option { OptionText = "//", IsCorrect = true },
                            new Option { OptionText = "/* */", IsCorrect = false },
                            new Option { OptionText = "Both // and /* */", IsCorrect = false }
                        }
                    },
                    new Question
                    {
                        QuestionText = "What does SQL stand for?",
                        Options = new List<Option>
                        {
                            new Option { OptionText = "Structured Query Language", IsCorrect = true },
                            new Option { OptionText = "Simple Question Language", IsCorrect = false },
                            new Option { OptionText = "Standard Query Language", IsCorrect = false },
                            new Option { OptionText = "System Query Language", IsCorrect = false }
                        }
                    },
                    new Question
                    {
                        QuestionText = "Which data type is used to store text in most programming languages?",
                        Options = new List<Option>
                        {
                            new Option { OptionText = "int", IsCorrect = false },
                            new Option { OptionText = "float", IsCorrect = false },
                            new Option { OptionText = "string", IsCorrect = true },
                            new Option { OptionText = "boolean", IsCorrect = false }
                        }
                    },
                    new Question
                    {
                        QuestionText = "What is the purpose of a 'for loop'?",
                        Options = new List<Option>
                        {
                            new Option { OptionText = "To make decisions", IsCorrect = false },
                            new Option { OptionText = "To repeat code multiple times", IsCorrect = true },
                            new Option { OptionText = "To define functions", IsCorrect = false },
                            new Option { OptionText = "To handle errors", IsCorrect = false }
                        }
                    },
                    new Question
                    {
                        QuestionText = "Which HTTP method is used to retrieve data from a server?",
                        Options = new List<Option>
                        {
                            new Option { OptionText = "POST", IsCorrect = false },
                            new Option { OptionText = "GET", IsCorrect = true },
                            new Option { OptionText = "PUT", IsCorrect = false },
                            new Option { OptionText = "DELETE", IsCorrect = false }
                        }
                    }
                }
            },
            new Quiz
            {
                Title = "Math Quiz",
                Description = "Simple math questions (5 minutes)",
                Questions = new List<Question>
                {
                    new Question
                    {
                        QuestionText = "What is 5 + 3?",
                        Options = new List<Option>
                        {
                            new Option { OptionText = "7", IsCorrect = false },
                            new Option { OptionText = "8", IsCorrect = true },
                            new Option { OptionText = "9", IsCorrect = false },
                            new Option { OptionText = "10", IsCorrect = false }
                        }
                    },
                    new Question
                    {
                        QuestionText = "What is 12 - 4?",
                        Options = new List<Option>
                        {
                            new Option { OptionText = "6", IsCorrect = false },
                            new Option { OptionText = "7", IsCorrect = false },
                            new Option { OptionText = "8", IsCorrect = true },
                            new Option { OptionText = "9", IsCorrect = false }
                        }
                    },
                    new Question
                    {
                        QuestionText = "What is 3 × 4?",
                        Options = new List<Option>
                        {
                            new Option { OptionText = "10", IsCorrect = false },
                            new Option { OptionText = "12", IsCorrect = true },
                            new Option { OptionText = "14", IsCorrect = false },
                            new Option { OptionText = "16", IsCorrect = false }
                        }
                    },
                    new Question
                    {
                        QuestionText = "What is 20 ÷ 5?",
                        Options = new List<Option>
                        {
                            new Option { OptionText = "3", IsCorrect = false },
                            new Option { OptionText = "4", IsCorrect = true },
                            new Option { OptionText = "5", IsCorrect = false },
                            new Option { OptionText = "6", IsCorrect = false }
                        }
                    },
                    new Question
                    {
                        QuestionText = "What is 7 × 8?",
                        Options = new List<Option>
                        {
                            new Option { OptionText = "54", IsCorrect = false },
                            new Option { OptionText = "56", IsCorrect = true },
                            new Option { OptionText = "58", IsCorrect = false },
                            new Option { OptionText = "60", IsCorrect = false }
                        }
                    },
                    new Question
                    {
                        QuestionText = "What is 15 + 27?",
                        Options = new List<Option>
                        {
                            new Option { OptionText = "40", IsCorrect = false },
                            new Option { OptionText = "41", IsCorrect = false },
                            new Option { OptionText = "42", IsCorrect = true },
                            new Option { OptionText = "43", IsCorrect = false }
                        }
                    },
                    new Question
                    {
                        QuestionText = "What is 100 - 37?",
                        Options = new List<Option>
                        {
                            new Option { OptionText = "61", IsCorrect = false },
                            new Option { OptionText = "62", IsCorrect = false },
                            new Option { OptionText = "63", IsCorrect = true },
                            new Option { OptionText = "64", IsCorrect = false }
                        }
                    },
                    new Question
                    {
                        QuestionText = "What is 9 × 9?",
                        Options = new List<Option>
                        {
                            new Option { OptionText = "79", IsCorrect = false },
                            new Option { OptionText = "80", IsCorrect = false },
                            new Option { OptionText = "81", IsCorrect = true },
                            new Option { OptionText = "82", IsCorrect = false }
                        }
                    },
                    new Question
                    {
                        QuestionText = "What is 144 ÷ 12?",
                        Options = new List<Option>
                        {
                            new Option { OptionText = "10", IsCorrect = false },
                            new Option { OptionText = "11", IsCorrect = false },
                            new Option { OptionText = "12", IsCorrect = true },
                            new Option { OptionText = "13", IsCorrect = false }
                        }
                    },
                    new Question
                    {
                        QuestionText = "What is 25% of 200?",
                        Options = new List<Option>
                        {
                            new Option { OptionText = "25", IsCorrect = false },
                            new Option { OptionText = "40", IsCorrect = false },
                            new Option { OptionText = "50", IsCorrect = true },
                            new Option { OptionText = "75", IsCorrect = false }
                        }
                    }
                }
            }
        };

        context.Quizzes.AddRange(quizzes);
        context.SaveChanges();
    }
}
