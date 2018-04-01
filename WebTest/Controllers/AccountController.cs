using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WebTest.Dto;
using WebTest.Dto.Authentification;
using WebTest.Providers;

namespace WebTest.Controllers
{
    [Route("api/account")]
    public class AccountController : Controller
    {
        private readonly IAccountProvider accountProvider;

        public AccountController(IAccountProvider accountProvider)
        {
            this.accountProvider = accountProvider;
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public Tuple<bool, AccountDto> Register([FromBody] AccountCreationDto dto)
        {
            return accountProvider.Register(dto);
        }


        [HttpPost("login")]
        [AllowAnonymous]
        public IActionResult Login([FromBody] AccountLogin accountLogin, string returnUrl = null)
        {
            // Clear the existing external cookie to ensure a clean login process
            HttpContext.SignOutAsync(IdentityConstants.ExternalScheme).Wait();

            return accountProvider.Login(accountLogin) ? Ok() : (IActionResult) Unauthorized();
        }

        [HttpGet("access-denied")]
        [AllowAnonymous]
        public IActionResult AccessDenied(string returnUrl = null)
        {
            return Ok("Access denied!");
        }

        [HttpGet("test")]
        [Authorize]
        public string SayHello()
        {
            
            return $"Hello boy! You have access.\nYou are: {User.FindFirst(ClaimTypes.NameIdentifier).Value}";
        }
    }
}