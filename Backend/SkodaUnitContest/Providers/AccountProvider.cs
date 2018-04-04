using System;
using log4net;
using Microsoft.AspNetCore.Identity;
using SkodaUnitWebApi.Authentification;
using SkodaUnitWebApi.Dto.Authentification;

namespace SkodaUnitWebApi.Providers
{
    public class AccountProvider : IAccountProvider
    {
        private static readonly ILog Log = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        private readonly UserManager<ApplicationUser> userManager;
        private readonly SignInManager<ApplicationUser> signInManager;

        public AccountProvider(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
        }

        public Tuple<bool, AccountDto> Register(AccountCreationDto dto)
        {
            Log.Info($"Register request for new user: {dto.UserName}");
            var user = new ApplicationUser {UserName = dto.UserName, Email = dto.Email};
            var result = userManager.CreateAsync(user, dto.Password).Result;
            if (result.Succeeded)
            {
                signInManager.SignInAsync(user, isPersistent: false).Wait();
                Log.Info($"User: {user.UserName} succesfully registered.");
                return new Tuple<bool, AccountDto>(true, new AccountDto {UserId = user.Id, UserName = user.UserName, Email = user.Email});
            }

            Log.Error("User could not be registered.");
            foreach (var identityError in result.Errors)
            {
                Log.Error(identityError);
            }

            return new Tuple<bool, AccountDto>(false, null);
        }

        public bool Login(AccountLogin dto)
        {
            Log.Info($"Login request for: {dto.UserName}");
            var result = signInManager.PasswordSignInAsync(dto.UserName, dto.Password, dto.RememberMe, lockoutOnFailure: false).Result;
            Log.Info($"Login result for: {dto.UserName} - {result.Succeeded}");
            return result.Succeeded;
        }
    }
}