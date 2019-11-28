import { Component, OnInit } from '@angular/core';
import { ListaInfo, ServerResponse } from '../model';
import { ManagerService } from '../manager.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-recover-list',
  templateUrl: './recover-list.component.html',
  styleUrls: ['./recover-list.component.css']
})
export class RecoverListComponent implements OnInit {

  liste: Array<ListaInfo> = [];
  constructor(private ms: ManagerService, private router: Router) {
  }

  ripristina(id:number){
    this.ms.ripristinaLista(id).subscribe((data:ServerResponse)=>{
      if (data.esito===0){
        this.ms.AlertEmitter.emit({msg:'Lista Recuperata!', color:'green'});
        let i;
        for(i=0; i<this.liste.length; i++){
          if (this.liste[i].id===id)
            break;
        }
        this.ms.liste.push(this.liste[i]);
        this.liste.splice(i,1);
      }
    })
  }

  ngOnInit() {
    this.ms.getOldListe().subscribe((response:ServerResponse)=> {
      if (response.esito === 0) {
        response.data.forEach(element => {
          this.liste.push(new ListaInfo(JSON.parse(element.fields), element.nome, element.desc, element.icon, element.id, element.owner, element.likes));
        });
      }
    });
  }

}
