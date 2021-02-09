/* Fabrika pored naziva sadrži listu
silosa kao i neophodne metode za rad sa njima. Za rad opisane aplikacije kreirati klase sa
odgovarajućim metodama.  */

import { Silos } from "./silos.js";

export class Fabrika {
  constructor(id,naziv) {
    this.id = id;
    this.naziv = naziv;
    this.silosi = [];

    if (this.naziv === undefined) this.naziv = "";
  }

  dodajSilos(silos) {
    this.silosi.push(silos);
  }


AzurirajSilos(silosi)
{
  for(let i =0; i<silosi.length;i++)
  {  
      this.dodajSilos( new Silos( parseInt(silosi[i].id ), silosi[i].oznaka,parseInt(silosi[i].kapacitet),parseInt (silosi[i].trenutnaKolicina)));
  }
}

  // host->body
  crtajFabriku(host) {
    // that=> scope klase
    const that = this;
    // glavni kontejner
    const kontejner = document.createElement("div");
    kontejner.classList.add("kontejner");
    host.appendChild(kontejner);
    // fabrika
    const fabrika = document.createElement("div");
    fabrika.classList.add("fabrika");
    kontejner.appendChild(fabrika);
    // ime fabrike
    let labela = document.createElement("label");
    labela.innerHTML = this.naziv;
    labela.classList.add("naziv");
    fabrika.appendChild(labela);
    // silosi kontejner
    const silosi = document.createElement("div");
    silosi.classList.add("silosi");
    fabrika.appendChild(silosi);

    // crtanje silosa
    this.silosi.forEach((s) => {
      // silos kontejner
      const silos = document.createElement("div");
      silos.classList.add("silos");
      silosi.appendChild(silos);
      // labele: -oznaka
      labela = document.createElement("label");
      labela.classList.add("oznaka");
      labela.innerHTML = "Silos ";
      silos.appendChild(labela);
      // span
      let span = document.createElement("span");
      span.classList.add("span");
      span.innerHTML = s.oznaka;
      labela.appendChild(span);
      // -status
      labela = document.createElement("label");
      labela.classList.add("status");
      labela.innerHTML =
        s.trenutnaKolicinaMaterijala + "t/" + s.kapacitet + "t";
      silos.appendChild(labela);
      // popunaDiv
      const popunaDiv = document.createElement("div");
      popunaDiv.classList.add("popunaDiv");
      silos.appendChild(popunaDiv);
      // popuna
      const popuna = document.createElement("div");
      popuna.classList.add("popuna");
      popuna.style.flexGrow = parseFloat(
        parseFloat(s.trenutnaKolicinaMaterijala) / parseFloat(s.kapacitet)
      );
      popunaDiv.appendChild(popuna);
    });

    // forma
    const forma = document.createElement("div");
    forma.classList.add("forma");
    kontejner.appendChild(forma);
    // silosDiv
    const silosDiv = document.createElement("div");
    silosDiv.classList.add("silos-div");
    forma.appendChild(silosDiv);
    // labela silos
    labela = document.createElement("label");
    labela.classList.add("silos-labela");
    labela.innerHTML = "Silos:";
    silosDiv.appendChild(labela);
    // select silos
    const select = document.createElement("select");
    select.classList.add("select");
    this.silosi.forEach((s) => {
      let opcija = document.createElement("option");
      opcija.text = s.oznaka;
      select.add(opcija);
    });
    silosDiv.appendChild(select);
    // kolicinaDiv
    const kolicinaDiv = document.createElement("div");
    kolicinaDiv.classList.add("kolicina-div");
    forma.appendChild(kolicinaDiv);
    // labela kolicina
    labela = document.createElement("label");
    labela.innerHTML = "Kolicina:";
    labela.classList.add("kolicina");
    kolicinaDiv.appendChild(labela);
    // input kolicina
    const input = document.createElement("input");
    input.classList.add("input");
    kolicinaDiv.appendChild(input);
    // dugme
    const dugme = document.createElement("button");
    dugme.classList.add("dugme");
    dugme.innerHTML = "Sipaj u silos";
    dugme.addEventListener("click", function () {

      const silos = document.querySelectorAll(".select");
      const kolicina = document.querySelectorAll(".input");

      let s= silos[that.id-1].value.toString();
      let k= kolicina[that.id-1].value.toString();


      fetch("https://localhost:5001/Fabrika/AzurirajSilos/" + that.id , {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    oznaka: s,
                    trenutnaKolicina: k,
                })
            }).then(p => {    
                if (p.ok) {     
                  that.azurirajKolicinu(silos[that.id-1].value,kolicina[that.id-1].value);
                
                }
                else if (p.status === 400) {
                    // BadRequest vraća lokaciju kao json. Zato čitamo taj json ispod i upisujemo u greskaLokacija, koju ispisujemo u alert-u.
                    let greskaOznake = { oznaka : "" };
                    p.json().then(q => {
                        greskaOznake = s;
                        alert("Ne postoji silos sa zadatom oznakom! Oznaka  je ("+ greskaOznake+ ")");
                    });
                }
                else {
                    alert("Greška prilikom upisa.");
                }
            }).catch(p => {
                alert("Greška prilikom upisa.");
            });
    });
    forma.appendChild(dugme);
  }

  azurirajKolicinu(id,kolicina)
  {
    const silosiKontejner = document.querySelectorAll(".silos");
    silosiKontejner.forEach((element, index) => {
      let span = element.querySelector(".span");
      if ( parseInt(span.innerHTML) === parseInt(id)) {
        const popuna = element.querySelector(".popuna");
        let trenutniSilos = this.silosi[index];
        if (trenutniSilos.sipaj(parseInt(kolicina))) {
          popuna.style.flexGrow = parseFloat(
            parseFloat(trenutniSilos.trenutnaKolicinaMaterijala) /
              parseFloat(trenutniSilos.kapacitet)
          );
          let labela = element.querySelector(".status");
          labela.innerHTML =
            trenutniSilos.trenutnaKolicinaMaterijala +
            "t/" +
            trenutniSilos.kapacitet +
            "t";
        } else alert("Ne moze");
      }
    });
  }




}
