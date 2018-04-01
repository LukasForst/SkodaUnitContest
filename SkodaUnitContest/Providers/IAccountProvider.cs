﻿using System;
using System.Threading.Tasks;
using WebTest.Dto;
using WebTest.Dto.Authentification;

namespace WebTest.Providers
{
    public interface IAccountProvider
    {
        Tuple<bool, AccountDto> Register(AccountCreationDto dto);

        bool Login(AccountLogin dto);
    }
}