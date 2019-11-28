import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ManagerService } from '../../manager.service';
import { ServerResponse } from '../../model';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  @Output() close = new EventEmitter<void>();
  changePwdForm: FormGroup;
  error: string;

  constructor(private ms: ManagerService) { }

  ngOnInit() {
    this.changePwdForm = new FormGroup({
      'oldP': new FormControl('', [Validators.required, Validators.minLength(5)]),
      'newP': new FormControl('', [Validators.required, Validators.minLength(5)]),
      'confP': new FormControl('', [Validators.required, this.samePassword.bind(this)])
    });
  }

  exit() {
    this.close.emit();
  }

  samePassword(control: FormControl): { [s: string]: boolean } {
    if (this.changePwdForm && control.value !== '' && control.value !== this.changePwdForm.get('newP').value)
      return { 'differentPassword': true };
    return null;
  }

  changePwd() {
    let values = this.changePwdForm.value;
    this.ms.changePwd(values.oldP, values.newP)
      .subscribe((data:ServerResponse)=> {
        if (data.esito === 0) {
          this.ms.AlertEmitter.emit({ msg: 'Password cambiata con successo!', color: 'green' });
          this.close.emit();
        }
        else {
          if (data.messaggio === "WRONGPWD")
            this.error = "Vecchia password errata";
          else if (data.messaggio === "SAMEPWD")
            this.error = "La vecchia e la nuova password non possono coincidere";
          else
            this.error = data.messaggio;
        }
      });
  }

}
