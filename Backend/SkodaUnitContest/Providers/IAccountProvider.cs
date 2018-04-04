using System;
using SkodaUnitWebApi.Dto.Authentification;

namespace SkodaUnitWebApi.Providers
{
    public interface IAccountProvider
    {
        Tuple<bool, AccountDto> Register(AccountCreationDto dto);

        bool Login(AccountLogin dto);
    }
}