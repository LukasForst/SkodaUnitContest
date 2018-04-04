using System;

namespace SkodaUnitWebApi.Model
{
    public class Image
    {
        public int Id { get; set; }

        public DateTime UpDateTime { get; set; }

        public string Name { get; set; }

        public byte[] Data { get; set; }
    }
}