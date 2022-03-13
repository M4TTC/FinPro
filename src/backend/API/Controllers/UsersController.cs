using FindataAPI.Services;
using Microsoft.AspNetCore.Mvc;
using FindataAPI.Models;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;



namespace FindataAPI.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private readonly UsersService _usersService;
        public UsersController(UsersService usersService) => _usersService = usersService;

        [HttpGet]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "AdminOnly")]
        public async Task<List<Users>> Get() =>
        await _usersService.GetAsync();

        [HttpGet("{id}")]
        public async Task<ActionResult<Users>> Get(string id)
        {
            var user = await _usersService.GetAsync(id);

            if (user is null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpPost("login")]
        public async Task<ActionResult<Users>> Post([FromBody] UserLogin param)
        {
            if (param.Username == null|| param.Password == null)
            {
                return BadRequest("Invalid Client Request");
            }
            else
            {
                var authUser = await _usersService.CheckCredentialsAsync(param.Username, param.Password);

                if (authUser is null)
                {
                    return NotFound();
                }
                else 
                {
                    var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));
                    var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

                    var tokeOptions = new JwtSecurityToken(
                    issuer: "http://localhost:5281",
                    audience: "http://localhost:5281",
                    expires: DateTime.Now.AddMinutes(60),
                    signingCredentials: signinCredentials
                    );

                    var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);

                    AppUserAuth ret = new();

                    ret.Id = authUser.Id;
                    ret.UserName = param.Username;
                    ret.BearerToken = tokenString;
                    ret.IsAuthenticated = true;
                    ret.Role = authUser.Role;

                    return Ok(ret);

                }

            }
        }

        [HttpPost("signup")]
        public async Task<ActionResult> Post([FromBody] UserSignup param)
        {
            if (param.Username == null || param.Password == null)
            {
                return BadRequest("Invalid Client Request");
            }
            else
            {
                var user = await _usersService.IsUserExistAsync(param.Username);
                if (user)
                {
                    return BadRequest("The Username Already Exists!");
                }
                else
                {
                    await _usersService.CreateAsync(param.Username,param.Password);
                    return Ok();

                }
            }

        }

        [HttpPut("changepwd")]
        public async Task<ActionResult> Put([FromBody] ChangePassword changePassword)
        {
            if (changePassword.UserName == null ||changePassword.CPassword == null || changePassword.NPassword == null)
            {
                return BadRequest("Invalid Client Request");
            }
            else
            {
                var user = await _usersService.CheckCredentialsAsync(changePassword.UserName, changePassword.CPassword);

                if (user is null)
                {
                    return BadRequest("The Request Is Invalid!");
                }
                else
                {
                    var  isPwdChanged = await _usersService.Changepwd(changePassword.UserName, changePassword.CPassword,changePassword.NPassword);
                    if (! isPwdChanged)
                    {
                        return BadRequest("The Username Already Exists!");
                    }
                    else
                    {
                        return Ok();
                    }
                }

            }

        }

    }
}



    


