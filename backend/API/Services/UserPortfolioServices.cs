using System;
using FindataAPI.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using BCrypt;
using MongoDB.Bson;
namespace FindataAPI.Services
{
	public class UserPortfolioServices
	{
	   private readonly IMongoCollection<UserPortfolioList> _UserPortfoliosCollection;


        public UserPortfolioServices(IOptions<DbSettings> Dbsettings)
        {
            var mongoClient = new MongoClient(
                Dbsettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                Dbsettings.Value.DbName);

            _UserPortfoliosCollection = mongoDatabase.GetCollection<UserPortfolioList>(
                Dbsettings.Value.UserPortfoliosCollection);
        }

        //public async Task<List<UserPortfolioList>> GetAsync() =>
        //await _UserPortfoliosCollection.Find(_ => true).ToListAsync();

        public async Task<UserPortfolioList> GetUserPfAsync(string username) =>
            await _UserPortfoliosCollection.Find(result => result.Username == username).FirstOrDefaultAsync();




    //public async Task CreateAsync(Findata newBook) =>
    //await _FindataCollection.InsertOneAsync(newBook);

    //public async Task UpdateAsync(string id, Findata updatedBook) =>
    //await _FindataCollection.ReplaceOneAsync(x => x.Id == id, updatedBook);

    //public async Task RemoveAsync(string id) =>
    //await _FindataCollection.DeleteOneAsync(x => x.Id == id);

  }
}

