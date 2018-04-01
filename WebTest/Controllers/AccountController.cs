using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WebTest.Dto;
using WebTest.Providers;

namespace WebTest.Controllers
{
    public class AccountController : Controller
    {
        private readonly IAccountProvider accountProvider;

        public AccountController(IAccountProvider accountProvider)
        {
            this.accountProvider = accountProvider;
        }

        [HttpGet]
        [AllowAnonymous]
        public Tuple<bool, AccountDto> Register(AccountCreationDto dto)
        {
            return accountProvider.Register(dto);
        }


        [HttpGet]
        [AllowAnonymous]
        public IActionResult Login(AccountLogin accountLogin, string returnUrl = null)
        {
            // Clear the existing external cookie to ensure a clean login process
            HttpContext.SignOutAsync(IdentityConstants.ExternalScheme).Wait();

            return accountProvider.Login(accountLogin) ? Ok() : (IActionResult) Unauthorized();
        }
    }
}