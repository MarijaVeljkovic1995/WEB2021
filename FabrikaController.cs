using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjekatWebServer.Models;

namespace ProjekatWebServer.Controllers
{
     [ApiController]
     [Route("[controller]")]

    public class FabrikaController : ControllerBase
    {
      public FabrikaContext Context{get;set;}
      
       public FabrikaController(FabrikaContext context )
       {
           Context=context;
       }
	    
		[Route("UpisiFabriku")]
        [HttpPut]
        public async Task UpisiFabriku([FromBody] Fabrika fabrika)
        {
            Context.Fabrika.Add(fabrika);
            await Context.SaveChangesAsync();
        }


        [Route("UpisiSilos/{idFabrika}")]
        [HttpPut]
		public async Task UpisiSilos(int idFabrika,[FromBody] Silos silos)
        {
            Fabrika fr = await Context.Fabrika.FindAsync(idFabrika);
            silos.Fabrika = fr;
            Context.Silos.Add(silos);
            await Context.SaveChangesAsync();
        }

		
        [Route("PreuzmiFabriku")]
        [HttpGet]
        public async Task<List<Fabrika>> PreuzmiFabriku()
        {
				return await Context.Fabrika.Include(s => s.silosi).ToListAsync();
		}

    
        [Route("AzurirajFabriku")]
        [HttpPut]
        public async Task AzurirajFabriku([FromBody] Fabrika fabrika)
        {
			Context.Update<Fabrika>(fabrika);
            await Context.SaveChangesAsync();
        }
		
		[Route("AzurirajSilos/{idFabrika}")]
        [HttpPost]
        public async Task<IActionResult> AzurirajSilos(int idFabrika,[FromBody] Silos silos)
        {
             var xy = Context.Silos.Where(p => p.Fabrika.ID == idFabrika && p.Oznaka == silos.Oznaka).FirstOrDefault();

            if (Context.Silos.Any(p => p.Fabrika.ID == idFabrika && p.Oznaka == silos.Oznaka ))
            {
              
                Silos si = Context.Silos.Where(p => p.Fabrika.ID == idFabrika && p.Oznaka == silos.Oznaka).FirstOrDefault();
            
                if(( Int32.Parse(si.TrenutnaKolicina) + Int32.Parse(silos.TrenutnaKolicina)) < Int32.Parse(si.Kapacitet ))
                {
                int kolicina =Int32.Parse(  si.TrenutnaKolicina ) +  Int32.Parse( silos.TrenutnaKolicina);         
                 si.TrenutnaKolicina= kolicina.ToString();
                 
                 Context.Update<Silos>(si);
                 await Context.SaveChangesAsync();
                 return Ok();

                }
                else
                {
                     return StatusCode(406);
                }
            }
            else
            {
              return  BadRequest(new { Oznaka = xy?.Oznaka });
            }
       
        }
		
		
         [Route("IzbrisiSilos/{idSilos}")]
         [HttpDelete]
        public async Task IzbrisiSilos(int idSilos)
        {
            Silos silos = await Context.Silos.FindAsync(idSilos);
            Context.Remove(silos);
            await Context.SaveChangesAsync();
        }

         [Route("IzbrisiFabriku/{idFabrika}")]
         [HttpDelete]
        public async Task IzbrisiFabriku(int idFabrika)
        {
            Fabrika fabrika = await Context.Fabrika.FindAsync(idFabrika);
            Context.Remove(fabrika);
            await Context.SaveChangesAsync();
        }

       }
}