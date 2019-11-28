import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../manager.service';
import { ListaInfo, ServerResponse } from '../model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-world',
  templateUrl: './world.component.html',
  styleUrls: ['./world.component.css']
})
export class WorldComponent implements OnInit {

  liste:Array<ListaInfo>=[];
  private adding=false;
  constructor(private ms:ManagerService, private router:Router) { 
  }

  vote(id){
    this.ms.voteList(id).subscribe((data:ServerResponse)=>{
      if (data.esito==0){
        this.liste.find(x=>x.id = id).likes++;
      }
      else{
        if (data.messaggio=='ALREADYVOTED'){
      }
      }
      
    });
  }

  ngOnInit() {
    this.liste = this.ms.listePubbliche;
  }

  deleteList(i:number){
    if (confirm('Sei sicuro di voler cancellare la lista '+this.liste[i].name+"?"))
      this.ms.deleteList(i).subscribe((response:ServerResponse)=>{
        if (response.esito===0){
          this.ms.liste.splice(i,1);
          this.ms.AlertEmitter.emit({msg:'Lista cancellata con successo', color:'lightblue'})
        }
        else if (response.esito===1){
           
          }
      }); 
  }

}
