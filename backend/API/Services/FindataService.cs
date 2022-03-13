using FindataAPI.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace FindataAPI.Services;

	public class FindataService
	{
	private readonly IMongoCollection<Findata> _FindataCollection;

	public FindataService(IOptions<DbSettings> Dbsettings)
    {
        var mongoClient = new MongoClient(
            Dbsettings.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(
            Dbsettings.Value.DbName);

        _FindataCollection = mongoDatabase.GetCollection<Findata>(
            Dbsettings.Value.DataCollection);
    }

    public async Task<List<Findata>> GetAsync() =>
    await _FindataCollection.Find(_ => true).ToListAsync();

    public async Task<List<Findata>> GetAsync(string[] sym) =>
    await _FindataCollection.Find(Builders<Findata>.Filter.In(a=>a.Symbol,sym)).ToListAsync();



    //public async Task CreateAsync(Findata newBook) =>
    //await _FindataCollection.InsertOneAsync(newBook);

    //public async Task UpdateAsync(string id, Findata updatedBook) =>
    //await _FindataCollection.ReplaceOneAsync(x => x.Id == id, updatedBook);

    //public async Task RemoveAsync(string id) =>
    //await _FindataCollection.DeleteOneAsync(x => x.Id == id);

}


