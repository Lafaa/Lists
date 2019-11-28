import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css']
})
export class PermissionsComponent implements OnInit {
  
  @Input() names: string[] = [];
  @Input() editable: boolean = true;
  @Input() reduceOnly: boolean = false;
  @Output() saved = new EventEmitter<string[]>();
  tmp: string[];
  addedName: string = '';
  editing = false;
  showButtons = false;
  constructor() { }

  ngOnInit() {
  }

  edit() {
    this.editing = true;
    this.tmp = this.names.slice();
  }
  save() {
    this.editing = false;
    this.showButtons = false;
    let equals = this.names.length === this.tmp.length;
    if (equals) {
      for (let i = 0; i < this.names.length; i++) {
        if (this.names[i] != this.tmp[i]) {
          equals = false; break;
        }
      }
    }
    if (!equals)
      this.saved.emit(this.names);
    this.tmp = undefined;
  }
  cancel() {
    this.editing = false;
    this.names = this.tmp;
    this.tmp = undefined;
    this.showButtons = false;
  }
  delete(i: number) {
    this.names.splice(i, 1);
  }

  add() {
    if(this.addedName==='')
      return;
    this.names.push(this.addedName);
    this.addedName = '';
  }

}
