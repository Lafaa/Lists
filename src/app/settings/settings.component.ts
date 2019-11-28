import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../manager.service';
import { Settings, ServerResponse } from '../model';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  myBool = false;
  settings:Settings;
  changing=false;

  constructor(private router: Router, public ms:ManagerService, private location: Location) { }


  changePassword(){
    this.changing=true;
  }

  ngOnInit() {
    if(this.ms.getSettings())
      this.settings = JSON.parse(JSON.stringify(this.ms.getSettings()));
    else
      this.ms.getSettingsFromServer().subscribe((response:ServerResponse)=>{
        if (response.esito==0){
          this.ms.setSettings(new Settings(response.data));
          this.settings = JSON.parse(JSON.stringify(this.ms.getSettings()));
        }
        else if (response.esito === 1) {
         
        }
      });
  }

  save(){
    this.ms.saveSettings(this.settings).subscribe((data:ServerResponse)=>{
      if (data.esito==0){
        this.ms.setSettings(this.settings);
        this.ms.AlertEmitter.emit({msg:'Impostazioni salvate!', color:'lightskyblue'});
        this.location.back();        
      }
      else
        this.ms.AlertEmitter.emit({'msg':'Non sono riuscito a salvare le impostazioni', 'color':'red'});
    });
  }

  reset(){
    this.location.back();
    // this.ngOnInit();
  }

}
