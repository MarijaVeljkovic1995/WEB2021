/* U glavnom programu povući podatke o dostupnim fabrikama i njihovim silosima iz baze
podataka (korišćenjem web api-ja). Pored silosa dodati opciju za sipanje materijala u silos (ažurirati
podatke u bazi). Korisnik iz liste silosa bira silos u koji dodaje materijal, u polje „Količina“ upisuje
količinu materijala koju sipa u odabrani silos. Klikom na dugme „Sipaj u silos“ ažurira se trenutna
količina materijala u silosu, prikaz silosa i podaci u bazi korišćenjem web api-ja. Ukoliko korisnik pokuša
da sipa u silos veću količinu materijala od preostalog raspoloživog kapaciteta prikazati poruku o grešci. 
*/

import { Silos } from "./silos.js";
import { Fabrika } from "./fabrika.js";


fetch("https://localhost:5001/Fabrika/PreuzmiFabriku").then(p => {
    p.json().then(data => {
          data.forEach(fabrika => {
         
           let fab =  new Fabrika(fabrika.id,fabrika.naziv);
      
           fab.AzurirajSilos(fabrika.silosi);
           
           fab.crtajFabriku(document.body);
          });
       });
    });
