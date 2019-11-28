import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ManagerService } from '../../manager.service';
import { ServerResponse } from '../../model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-permission',
  templateUrl: './manage-permission.component.html',
  styleUrls: ['./manage-permission.component.css']
})
export class ManagePermissionComponent implements OnInit {

  ready = false;
  @Output() close = new EventEmitter<void>();
  @Input() idLista: number = -1;
  error: string;
  writingUsers:string[] = [];
  writingGroups:string[] = [];
  readingUsers:string[] = [];
  readingGroups:string[] = [];
  pubblica: boolean;
  edited=false;
  edit:boolean[]=[];

  constructor(private ms: ManagerService, private router:Router) {
    this.edit.fill(false);
  }

  salva(){
    if (this.edit.find(x=>x==true) ===undefined)
      this.exit();
    else
      {
        let data = [];
        if (this.edit[0]){
          data.push({'n':'p', 'v':this.pubblica});
          if (this.pubblica){
              if(!this.ms.listePubbliche.find(x=>x.id==this.idLista))
                this.ms.listePubbliche.push(this.ms.liste.find(x=>x.id==this.idLista));
          }
          else{
            if(this.ms.listePubbliche.find(x=>x.id==this.idLista))
              this.ms.listePubbliche = this.ms.listePubbliche.filter((l)=>{
                return l.id !== this.idLista;
              });
          }
        }
        if (this.edit[1] || this.edit[2]){
          let newUsers:{'name':string, 'v':string}[] = [];
          this.readingUsers.forEach(u=>{
            newUsers.push({'name':u, 'v':'R'});
          });
          this.writingUsers.forEach(u=>{
            newUsers.push({'name':u, 'v':'W'});
          });
          data.push({'n':'u', 'v':newUsers});
        }
        if (this.edit[3] || this.edit[4]){
          let newGroups:{'name':string, 'v':string}[] =[];
          this.readingGroups.forEach(g=>{
            newGroups.push({'name':g, 'v':'R'});
          });
          this.writingGroups.forEach(g=>{
            newGroups.push({'name':g, 'v':'W'});
          });
          data.push({'n':'g', 'v':newGroups});
        }
        this.ms.changeListPermissions(data, this.idLista).subscribe((data:ServerResponse)=>{
          if (data.esito ==0){
            let msg = "Permessi aggiornati con successo!";
            if (data.data.u.length >0){
              msg+=" I seguenti utenti non sono stati trovati: " +data.data.u.join(', ')+".";
            }
            if (data.data.g.length >0){
              msg+=" I seguenti gruppi non sono stati trovati: " +data.data.g.join(', ')+".";
            }
            this.ms.AlertEmitter.emit({'msg':msg, 'color':'green'});
            this.exit();
          }
          
        });     
      }
  }

  ngOnInit() {
    this.ms.getListPermission(this.idLista).subscribe((res:ServerResponse) => {
      if (res.esito === 0) {
        this.pubblica = res.data.public;
        if (res.data.users !== null)
          res.data.users.forEach(user => {
            if (user.perm == 'R')
              this.readingUsers.push(user.name);
            else
              this.writingUsers.push(user.name);
          });
        if (res.data.groups !== null)
          res.data.groups.forEach(group => {
            if (group.perm == 'R')
              this.readingGroups.push(group.name);
            else
              this.writingGroups.push(group.name);
          });
        this.ready=true;
      }
      else if (res.esito===1){
        
      }
    })
  }

  cambiato(){
    this.edit[0] = !this.edit[0];
    this.edited=true;
  }

  exit() {
    this.close.emit();
  }

  save(event: string[], arrayNumber:number){
    this.edit[arrayNumber] = true;
    this.edited=true;
    switch (arrayNumber){
      case 1:
        this.readingUsers = event; this.checkReadersNotWriters(1);break;
      case 2:
        this.writingUsers = event; this.checkReadersNotWriters(2);break;
      case 3:
        this.readingGroups = event; this.checkReadersNotWriters(3);break;
      case 4:
        this.writingGroups = event; this.checkReadersNotWriters(4);break;
    }
  }

  checkReadersNotWriters(userGroup:number){
    let count=0;
    if(userGroup===1){
      for (let i=0; i<this.readingUsers.length; i++){
        if (this.writingUsers.find(x=>x==this.readingUsers[i]) || !this.readingUsers[i].match(/^[0-9a-zA-Z]+$/)){
          this.readingUsers.splice(i,1);
          count++;
        }
      }
    }
    else if (userGroup===2){
      for (let i=0; i<this.writingUsers.length; i++){
        if (!this.writingUsers[i].match(/^[0-9a-zA-Z]+$/)){
          this.writingUsers.splice(i,1);
          count++;
        }
      }
    }
    else if (userGroup===3){
      for (let i=0; i<this.readingGroups.length; i++){
        if (this.writingGroups.find(x=>x==this.readingGroups[i]) || !this.readingGroups[i].match(/^[0-9a-zA-Z]+$/)){
          this.readingGroups.splice(i,1);
          count++;
        }
      }
    }
    else if (userGroup===4){
      for (let i=0; i<this.writingGroups.length; i++){
        if (!this.writingGroups[i].match(/^[0-9a-zA-Z]+$/)){
          this.writingGroups.splice(i,1);
          count++;
        }
      }
    }
    if (count!==0){
      this.ms.AlertEmitter.emit({msg:'Nomi non validi tagliati: '+count, color:'red'});
    }
  }

}
