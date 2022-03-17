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

    [HttpPost("saveportfolio")]
    public async Task<IActionResult> Post([FromBody] UserPortfolioList userPfList)
    {
      // Verify input username is not null
      if (String.IsNullOrEmpty(userPfList.Username))
      {
        return BadRequest("Request is invalid due to lack of Username");
      }
      else
      {
        //check whether input Pfname exists or not
        var res = await _userportfolioServices.GetUserPfAsync(userPfList.Username);

         if (res.Pflist.Find(ele=>ele.PfName == userPfList.Pflist[0].PfName) is not null)
        {
          //if Pfname has existed, return err.
          return BadRequest("The Porfolio's name has been already existed");
        }
        else
        { if (String.IsNullOrEmpty(res.Username))
          {
            await _userportfolioServices.CeateUserPfAsync(userPfList);
            return Ok();
          }
          else
          {
            await _userportfolioServices.UpdateUserPfAsync(userPfList);
            return Ok();
          }
        }

      }

    }




    //[HttpGet("{sym}")]
    //public async Task<List<Findata>> Get(string sym) =>
    //    await _findataService.GetAsync(sym.Split(','));

    //[HttpGet("{sym}")]
    //public async Task<List<Findata>> Get(string sym) =>
    //    await _findataService.GetAsync(sym.Split(','));

  }
}

