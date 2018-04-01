using System;
using System.IO;
using System.Reflection;
using log4net;
using log4net.Config;

namespace WebTest.Configuration
{
    public static class LoggerConfiguration
    {
        private static readonly ILog Log = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);

        public static void Configure()
        {
            var logRepository = LogManager.GetRepository(Assembly.GetEntryAssembly());
            XmlConfigurator.Configure(logRepository, new FileInfo("log4net.config"));

            var basedir = AppDomain.CurrentDomain.BaseDirectory;
            Directory.CreateDirectory(Path.Combine(basedir, "logs"));

            // Unhandled exception logging on Application level (for ThreadExceptions etc)
            AppDomain.CurrentDomain.UnhandledException += AppDomainUnhandledExceptionHandler;
        }

        // Helper method for Application level unhandled exception logging
        private static void AppDomainUnhandledExceptionHandler(object sender, UnhandledExceptionEventArgs args)
        {
            Log.Fatal($"The exception was thrown and not caught in the application\n{args.ExceptionObject}");
        }
    }
}