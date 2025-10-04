namespace Quiz_Api.DTOs;

public class QuizDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public List<QuestionDto> Questions { get; set; } = new();
}
