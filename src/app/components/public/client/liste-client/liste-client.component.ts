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
   CatTarif :any
   Com:any
   Reg:any
   value:string=''
   cars: any[]=[];

   //cli:any
  constructor(private ser: ClientService) { }

  ngOnInit(): void {
    this.ser.getAllClients().subscribe(
      res=>{
        this.clt=res,console.log(res),
        this.CatTarif=[...new Set( this.clt.map(obj => obj.Categorie_Tarifaire)) ],
        //this.CatTarif = this.clt
       // console.log(this.CatTarif)
        
        
        //this.Com=[...new Set( this.clt.map(obj => obj.Nom_Commercial)) ],
      // console.log(this.Com)
        this.Reg=[...new Set( this.clt.map(obj => obj.Region ))]
        //this.cli=[...new Set( this.clt.map(obj => obj.Nom_Client))],
      },
     err=>console.log(err)
    )

    this.cars = [
      { "brand": "VW", "year": 1000000000, "color": "Orange", "vin": "dsad231ff" },
      { "brand": "Audi", "year": 2000000000, "color": "Black", "vin": "gwregre345" },
      { "brand": "Renault", "year": 3000000000, "color": "Gray", "vin": "h354htr" },
      { "brand": "BMW", "year": 4000000000, "color": "Blue", "vin": "j6w54qgh" },
      { "brand": "Mercedes", "year": 2500000000, "color": "Orange", "vin": "hrtwy34" },
      { "brand": "Volvo", "year": 5000000000, "color": "Black", "vin": "jejtyj" },
      { "brand": "Honda", "year": 6800000000, "color": "Yellow", "vin": "g43gr" },
      { "brand": "Jaguar", "year": 1200000000, "color": "Orange", "vin": "greg34" },
      { "brand": "Ford", "year": 9000000000, "color": "Black", "vin": "h54hw5" },
      { "brand": "Fiat", "year": 120000000000, "color": "Red", "vin": "245t2s" }
    ];
  }

  clear(table: Table) {
    table.clear();
}



}
 