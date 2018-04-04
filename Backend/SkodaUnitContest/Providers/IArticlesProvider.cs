using System.Collections.Generic;
using SkodaUnitWebApi.Dto;
using SkodaUnitWebApi.Model;

namespace SkodaUnitWebApi.Providers
{
    public interface IArticlesProvider
    {
        ICollection<Article> GetAll();
        
        Article AddArticle(ArticleDto dto);

        Article GetArticle(int id);
    }
}