/* Silos ima oznaku,
kapacitet i trenutnu količinu materijala i odgovarajuće metode. Pri kreiranju silosa proveriti atribute,
ukoliko bilo koji atribut nije definisan setovati proizvoljnu vrednost. */

export class Silos 
{
  constructor(id,oznaka, kapacitet, trenutnaKolicinaMaterijala) {
    this.id= id;
    this.oznaka = oznaka;
    this.kapacitet = kapacitet;
    this.trenutnaKolicinaMaterijala = trenutnaKolicinaMaterijala;

    if (this.oznaka === undefined) this.oznaka = "";
    if (this.kapacitet === undefined) this.kapacitet = "";
    if (this.trenutnaKolicinaMaterijala === undefined)
      this.trenutnaKolicinaMaterijala = "";
  }

  sipaj = (materijal) => {
    if (this.kapacitet < materijal + this.trenutnaKolicinaMaterijala) {
      return false;
    }
    this.trenutnaKolicinaMaterijala += materijal;
    return true;
  };
}
