using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ProjekatWebServer.Models
{
  [Table("Fabrika")]
    public class Fabrika
    {
		[Key]
		[Column("ID_F")]
        public int ID { get; set; }

		
		[Column("Naziv")]
		public string naziv { get; set; }
	
	
		public virtual List<Silos> silosi { get; set; }
		
		
    }
}