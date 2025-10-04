namespace Quiz_Api.DTOs;

public class QuestionDto
{
    public int Id { get; set; }
    public int QuizId { get; set; }
    public string QuestionText { get; set; } = string.Empty;
    public List<OptionDto> Options { get; set; } = new();
}
