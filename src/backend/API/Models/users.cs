using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;



namespace FindataAPI.Models
{
    [BsonIgnoreExtraElements]
    public class Users
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        [BsonElement("Username")]
        public string? Username { get; set; }
        [BsonElement("Password")]
        public string? Password { get; set; }
        [BsonElement("Role")]
        public string? Role { get; set; }

    }

    public class UserLogin
    {

        public string? Username { get; set; }
        public string? Password { get; set; }

    }

    public class UserSignup
    {
        public string? Username { get; set; }
        public string? Password { get; set; }
    }

    public class AppUserAuth
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = String.Empty;
        public string UserName { get; set; } = "Not authorized";
        public string BearerToken { get; set; } = String.Empty;
        public bool IsAuthenticated { get; set; } = false;
        public string Role { get; set; } = String.Empty;
    }

    public class ChangePassword
    {
        public string UserName { get; set; } = String.Empty;
        public string CPassword { get; set; } = String.Empty;
        public string NPassword { get; set; } = String.Empty;
}


}