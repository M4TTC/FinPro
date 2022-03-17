using FindataAPI.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using BCrypt;
using MongoDB.Bson;

namespace FindataAPI.Services
{
	public class UsersService
	{
		private readonly IMongoCollection<Users> _UsersCollection;


		public UsersService(IOptions<DbSettings> Dbsettings)
		{
			var mongoClient = new MongoClient(
			Dbsettings.Value.ConnectionString);

			var mongoDatabase = mongoClient.GetDatabase(
				Dbsettings.Value.DbName);

			_UsersCollection = mongoDatabase.GetCollection<Users>(
				Dbsettings.Value.UsersCollection);
		}

		public async Task<List<Users>> GetAsync() =>
		await _UsersCollection.Find(_ => true).ToListAsync();

		public async Task<Users> GetAsync(string id) =>
		await _UsersCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

		public async Task<Users> PostAsync(string username, string? password) =>
		await _UsersCollection.Find(x => x.Username == username && x.Password == password).FirstOrDefaultAsync();


		public async Task<bool> IsUserExistAsync(string username)
        {
			var user = await _UsersCollection.Find(x => x.Username == username).FirstOrDefaultAsync();

			if (user is null)
            {
				return false;
            }
			else
			{
				return true;
			}
        }

		public async Task<Users?> CheckCredentialsAsync(string username, string password)
		{
			var user = await _UsersCollection.Find(x => x.Username == username).FirstOrDefaultAsync();
			if (user !=null && BCrypt.Net.BCrypt.Verify(password, user.Password))
			{
				return user;
			}
			else
			{
				return null;
			}

		}

		public async Task<bool> Changepwd(string username,string cpwd,string npwd)
		{
			var user = await _UsersCollection.Find(x => x.Username == username).FirstOrDefaultAsync();
			if (user != null && BCrypt.Net.BCrypt.Verify(cpwd, user.Password))
            {
				var CryptPassowrd = BCrypt.Net.BCrypt.HashPassword(npwd);
				var filter = new BsonDocument("Username", username);
				var update = Builders<Users>.Update.Set("Password", CryptPassowrd);
				var result = await _UsersCollection.FindOneAndUpdateAsync(filter, update);

				if (result is null)
				{
					return false;
				}
				else
				{
					return true;
				}
          } else
            {return false;
            }

		}

		public async Task CreateAsync(string username, string? password) {
			var CryptPassowrd = BCrypt.Net.BCrypt.HashPassword(password);
			var newUser = new Users
			{
				Username = username,
				Password = CryptPassowrd,
				Role="user"
			};
			await _UsersCollection.InsertOneAsync(newUser);
			}



		//public async Task CreateAsync(Findata newBook) =>
		//await _FindataCollection.InsertOneAsync(newBook);

		//public async Task UpdateAsync(string id, Findata updatedBook) =>
		//await _FindataCollection.ReplaceOneAsync(x => x.Id == id, updatedBook);

		//public async Task RemoveAsync(string id) =>
		//await _FindataCollection.DeleteOneAsync(x => x.Id == id);

	}
}

