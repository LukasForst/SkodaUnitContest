﻿namespace WebTest.Dto
{
    public class AccountLogin
    {
        public string UserName { get; set; }

        public string Password { get; set; }
        
        public bool RememberMe { get; set; }
    }
}