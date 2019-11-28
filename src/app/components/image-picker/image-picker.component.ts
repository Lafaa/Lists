import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.css']
})
export class ImagePickerComponent implements OnInit {
  selecting=false;
  icons: Array<string> = [];
  @Input() icon=0;
  @Input() big=false;
  @Output("iconSelected") iconSelected = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {
    for (let i=1; i<96;i++)
      this.icons.push('./assets/icons/icon('+i+').png');
  }

  select(i:number){
  this.icon=i+1;
  this.iconSelected.emit(i+1);
  this.selecting=false;
  }

}
