import { not } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { Client } from 'src/app/interfaces/client';
import { ClientService } from 'src/app/services/client.service';



@Component({
  selector: 'app-liste-client',
  templateUrl: './liste-client.component.html',
  styleUrls: ['./liste-client.component.scss']
})



export class ListeClientComponent implements OnInit {
  clt: Client[] = []
  //sets
  CatTarif: any
  Com: any
  Reg: any
  //selected data
  selectedCat: string[] = [];
  selectedCom: string[] = [];
  selectedReg: string[] = [];
  //
  auxClt: Client[] = []


  constructor(private ser: ClientService) { }

  ngOnInit(): void {
    
    this.ser.getAllClients().subscribe(
      res => {
          this.clt = res,
          this.CatTarif = [... new Set(this.clt.map(obj => obj.Categorie_Tarifaire))],
          this.Com = [...new Set(this.clt.map(item => item.Nom_Commercial))].filter(elem => elem != null)
          this.Reg = [... new Set(this.clt.map(obj => obj.Region))].filter(elem => elem != '')
      },
      err => console.log(err)
    )
   
      
  }

  clear(table: Table) {
    table.clear();

  }

  GetSelectedCat() {
    //Filtrer les commerciaux et les régions selon les catégories tarifaires
    this.Com = []
    this.Reg = []
    var auxCom:any[]
    var auxReg:any[]
    console.log("cat 1")
    console.log(this.Com)
    console.log(this.Reg)
    for (let cat of this.selectedCat) {
      this.auxClt = this.clt.filter(elem => elem.Categorie_Tarifaire == cat)
      auxCom = [...new Set(this.auxClt.map(item => item.Nom_Commercial))].filter(elem => elem != null)
      auxReg = [... new Set(this.auxClt.map(obj => obj.Region))].filter(elem => elem != '')
      this.Com=([... this.Com,...auxCom]).filter((v,i)=>([... this.Com,...auxCom]).indexOf(v)=== i)
      this.Reg=([... this.Reg,...auxReg]).filter((v,i)=>([... this.Reg,...auxReg]).indexOf(v)=== i)
    }
    if (this.selectedCat.length == 0)
      this.ngOnInit()
  }

  GetSelectedCom() {
    //Filtrer les catégories tarifaires et les régions selon les commerciaux
    //console.log(this.selectedCom)
    this.CatTarif = []
    this.Reg = []
    console.log("comm 1")
    console.log(this.CatTarif)
    console.log(this.Reg)
    for (let com of this.selectedCom) {
      this.auxClt = this.clt.filter(elem => elem.Nom_Commercial == com)
      let auxCat = [...new Set(this.auxClt.map(item => item.Categorie_Tarifaire))]
      let auxReg = [...new Set(this.auxClt.map(obj => obj.Region))].filter(elem => elem != '')
      this.Reg = ([... this.Reg, ...auxReg]).filter((v,i)=>([... this.Reg, ...auxReg]).indexOf(v)=== i)
      this.CatTarif = ([... this.CatTarif, ...auxCat]).filter((v,i)=>([... this.CatTarif, ...auxCat]).indexOf(v)=== i)

    }
    console.log("comm 2")
    console.log(this.Reg)
    console.log(this.CatTarif)
    if (this.selectedCom.length == 0)
      this.ngOnInit()
  }

  GetSelectedReg() {
    //Filtrer les commerciaux et les régions selon les catégories tarifaires
    this.Com = []
    this.CatTarif = []
    console.log("cat 1")
    console.log(this.Com)
    console.log(this.CatTarif)
    for (let reg of this.selectedReg) {
      this.auxClt = this.clt.filter(elem => elem.Region == reg)
      let auxCat = [...new Set(this.auxClt.map(item => item.Categorie_Tarifaire))]
      let auxCom = [...new Set(this.auxClt.map(obj => obj.Nom_Commercial))].filter(elem => elem != null)
      this.Com = ([... this.Com, ...auxCom]).filter((v,i)=>([... this.Com, ...auxCom]).indexOf(v)=== i)
      this.CatTarif = ([... this.CatTarif, ...auxCat]).filter((v,i)=>([... this.CatTarif, ...auxCat]).indexOf(v)=== i)


    }
    console.log("cat 2")
    console.log(this.CatTarif)
    console.log(this.Com)
    console.log(this.selectedReg)
    if (this.selectedReg.length == 0)
      this.ngOnInit()
  }



}
