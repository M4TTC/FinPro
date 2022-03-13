using Microsoft.AspNetCore.Mvc;
using FindataAPI.Models;
using FindataAPI.Services;


namespace FindataAPI
{
    [ApiController]
    [Route("api/[controller]")]
    public class FindataController : Controller
    {
        private readonly FindataService _findataService;
        public FindataController(FindataService findataService) => _findataService = findataService;


        [HttpGet]
        public async Task<List<Findata>> Get() =>
            await _findataService.GetAsync();

        [HttpGet("{sym}")]
        public async Task<List<Findata>> Get(string sym) =>
            await _findataService.GetAsync(sym.Split(','));

        //[HttpGet("{sym}")]
        //public async Task<List<Findata>> Get(string sym) =>
        //    await _findataService.GetAsync(sym.Split(','));

    }
}

