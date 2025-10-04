namespace Quiz_Api.Models;

public class Question
{
    public int Id { get; set; }
    public int QuizId { get; set; }
    public string QuestionText { get; set; } = string.Empty;

    // Navigation properties
    public Quiz Quiz { get; set; } = null!;
    public ICollection<Option> Options { get; set; } = new List<Option>();
}
