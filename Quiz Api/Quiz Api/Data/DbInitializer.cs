namespace Quiz_Api.Data;

public static class DbInitializer
{
    public static void Initialize(IServiceProvider serviceProvider)
    {
        using var scope = serviceProvider.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<QuizDbContext>();

        // Create database if it doesn't exist
        context.Database.EnsureCreated();

        // Seed sample data
        SampleDataSeeder.SeedData(context);
    }
}
