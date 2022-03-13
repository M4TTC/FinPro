using FindataAPI.Models;

namespace FindataAPI
{
    public class DbSettings
    {
        public string ConnectionString { get; set; } = null!;
        public string DbName { get; set; } = null!;
        public string? DataCollection { get; set; }
        public string? TkCollecion { get; set; }
        public string? UsersCollection { get; set; }
        public string? UserPortfoliosCollection { get; set; }

    }
}

