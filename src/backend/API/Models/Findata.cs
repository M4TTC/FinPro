using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;


namespace FindataAPI.Models { 

    public class Findata
	{
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("Symbol")]
        public string? Symbol { get; set; }

        [BsonElement("Company")]
        public string? Company { get; set; }

        [BsonElement("HisData")]
        public IEnumerable<HisData>? HisData { get; set; }

    }

    public class HisData
    {
        [BsonElement("Date")]
        public string? Date { get; set; }
        [BsonElement("Var")]
        public string? Var { get; set; }

    }

    [BsonIgnoreExtraElements]
    public class UserPortfolioList
    {
        public string Username { get; set; }
        public IEnumerable<Pflist>? Pflist { get; set; }

    }

    public class Pflist
    {
        public string PfName { get; set; } = "DEFAULT NAME";
        public List<string>? Symbols { get; set; }

    }

}