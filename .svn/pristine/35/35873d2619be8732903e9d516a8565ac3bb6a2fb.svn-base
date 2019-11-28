import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.css']
})
export class SwitchComponent implements OnInit {
  
  @Input() value:boolean=false;
  @Output() valueChange = new EventEmitter<boolean>();
  @Output() change = new EventEmitter<void>();
  @Input() inactiveColor = "white";
  @Input() activeColor = "rgb(83, 200, 253)";
  @Input() toggleColor = "white";
  constructor() { }

  switch(){
    this.value=!this.value;
    this.valueChange.emit(this.value);
    this.change.emit();
  }

  ngOnInit() {
  }

}
