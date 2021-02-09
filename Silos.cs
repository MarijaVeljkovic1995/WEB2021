using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ProjekatWebServer.Models
{
  [Table("Silos")]
    public class Silos
    {
        [Key]
		[Column("ID")]
        public int ID { get; set; }
		
		[Column("Oznaka")]
		public string Oznaka { get; set; }

		[Column("Kapacitet")]
		public string Kapacitet { get; set; }

		[Column("TrenutnaKolicina")]
		public string TrenutnaKolicina { get; set; }

		[JsonIgnore]
		
		public Fabrika Fabrika {get; set;}
		
		
	   
	   

    }
}