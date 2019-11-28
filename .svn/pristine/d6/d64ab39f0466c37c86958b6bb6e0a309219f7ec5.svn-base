import { Component, OnChanges, AfterViewInit, OnInit, EventEmitter, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ManagerService } from '../manager.service';

@Component({
  selector: 'app-nice-alert',
  templateUrl: './nice-alert.component.html',
  styleUrls: ['./nice-alert.component.css']
})
export class NiceAlertComponent implements OnDestroy, AfterViewInit {

  timeout2;  
  closeIconTop='0px';
  msg:string;
  opacity=1;
  top='';
  timeoutNumber;
  startTime:number;
  queue = 0;


  alertColor:string;

  constructor(private ms:ManagerService) {
  }

  
  ngAfterViewInit(){
    this.ms.AlertEmitter.subscribe((data:any)=>{
      this.msg=data.msg;   //#5cb85c
      switch (data.color) {
        case 'green': data.color='#5cb85c'; break; //default lightblue, red, khaki, lavender
      }      
      this.alertColor = data.color;
      this.top='30px';
      this.timeoutNumber = setTimeout(()=> {
        this.close();
      }, 4000);
      
    });
  }

  ngOnDestroy(){
    if (this.timeoutNumber!==undefined)
          this.clear();    
  }

  closeImmediate(){
    this.clear();
    this.close();
  }

  clear(){
    clearTimeout(this.timeoutNumber);
    clearTimeout(this.timeout2);
  }

  close(){
    this.top='-150px';
    this.timeout2 = setTimeout(()=>{
      this.msg = '';
    }, 1000)
  }

}
