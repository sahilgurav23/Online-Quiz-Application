namespace Quiz_Api.Models;

public class Quiz
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }

    // Navigation properties
    public ICollection<Question> Questions { get; set; } = new List<Question>();
}
