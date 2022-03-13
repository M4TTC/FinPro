using System;
using Microsoft.AspNetCore.Mvc;
using FindataAPI.Models;
using FindataAPI.Services;

namespace FindataAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserPortfoliosController : Controller
    {
        private readonly UserPortfolioServices _userportfolioServices;

    public UserPortfoliosController(UserPortfolioServices userportfolioServices) => _userportfolioServices = userportfolioServices;


    [HttpGet()]
    public async Task<UserPortfolioList> Get(string username) =>
      await _userportfolioServices.GetUserPfAsync(username);

        //[HttpGet("{sym}")]
        //public async Task<List<Findata>> Get(string sym) =>
        //    await _findataService.GetAsync(sym.Split(','));

        //[HttpGet("{sym}")]
        //public async Task<List<Findata>> Get(string sym) =>
        //    await _findataService.GetAsync(sym.Split(','));

    }
}

