using System.Collections.Generic;
using System.Linq;
using SkodaUnitWebApi.Dto;
using SkodaUnitWebApi.Model;

namespace SkodaUnitWebApi.Providers
{
    public class ArticlesProvider : IArticlesProvider
    {
        private readonly DataDbContext dbContext;

        public ArticlesProvider(DataDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public ICollection<Article> GetAll()
        {
            return dbContext.Articles.ToList();
        }
        
        public Article GetArticle(int id)
        {
            return dbContext.Articles.FirstOrDefault(x => x.Id == id);
        }

        public Article AddArticle(ArticleDto dto)
        {
            var articleToAdd = new Article
            {
                Text = dto.Text
            };
            var a = dbContext.Articles.Add(articleToAdd);
            dbContext.SaveChanges();
            return a.Entity;
        }
    }
}