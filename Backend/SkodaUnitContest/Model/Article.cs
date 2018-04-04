using System.Collections.Generic;

namespace SkodaUnitWebApi.Model
{
    public class Article
    {
        public int Id { get; set; }
        public string Text { get; set; }
        
        public virtual ICollection<Image> Images { get; set; } = new HashSet<Image>();
    }
}