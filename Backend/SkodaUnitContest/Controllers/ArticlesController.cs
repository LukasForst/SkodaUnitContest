using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SkodaUnitWebApi.Dto;
using SkodaUnitWebApi.Providers;

namespace SkodaUnitWebApi.Controllers
{
    [Route("api/articles")]
    public class ArticlesController : Controller
    {
        private readonly IArticlesProvider articlesProvider;

        public ArticlesController(IArticlesProvider articlesProvider)
        {
            this.articlesProvider = articlesProvider;
        }

        [HttpGet]
        [AllowAnonymous]
        public ICollection<ArticleDto> GetAll()
        {
            return articlesProvider.GetAll().Select(x => new ArticleDto {Text = x.Text}).ToList();
        }

        
        [HttpGet("{id}")]
        [AllowAnonymous]
        public ArticleDto GetArticle([FromRoute] int id)
        {
            var article = articlesProvider.GetArticle(id);
            return new ArticleDto {Text = article.Text};
        }

        [HttpPost("add")]
        [AllowAnonymous]
        public IActionResult AddArticle([FromBody] ArticleDto dto)
        {
            var stored = articlesProvider.AddArticle(dto);
            return stored == null ? (IActionResult) BadRequest() : Ok();
        }
    }
}