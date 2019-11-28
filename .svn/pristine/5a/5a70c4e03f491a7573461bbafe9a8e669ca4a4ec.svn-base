import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { ManagerService } from '../manager.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServerResponse } from '../model';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.css']
})
export class RecoverComponent implements OnInit {
  recoverForm: FormGroup;
  error = '';
  loginError = false;
  resetting :boolean = null;
  token:string;
  constructor(private ms: ManagerService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    if (this.activatedRoute.snapshot.params["token"]){
      this.token = this.activatedRoute.snapshot.params["token"];
      this.ms.checkToken(this.token).subscribe((response:ServerResponse)=>{
        if (response.esito===0){
          this.recoverForm = new FormGroup({
            'password': new FormControl('', [Validators.required,Validators.minLength(5)]),
            'password2': new FormControl('', [Validators.required, this.samePassword.bind(this)])
          });
          this.resetting=true;
        }
        else{
          this.ms.AlertEmitter.emit({msg:"Token invalido o scaduto", color:'red'});
          this.initRecover();
        }
    })
      
    }
    else
      this.initRecover();

    
  }

  initRecover(){
    this.recoverForm = new FormGroup({
      'email': new FormControl(this.ms.getUser(), [Validators.required, this.mailFormat])
    });
    this.resetting=false;
  }

  back() {
    this.router.navigate(['/']);
  }

  resetPassword(){
    let values = this.recoverForm.value;
    this.ms.resetPassword(values.password, this.token).subscribe((data: ServerResponse) => {
      if (data.esito == 0) {
        this.ms.AlertEmitter.emit({ msg: "Password cambiata con successo", color: "green" });
        this.back()
      }
      else {
        this.ms.AlertEmitter.emit({ msg: "Qualcosa è andato storto", color: "red" });
      }
    });
  }

  recoverPassword() {
    let values = this.recoverForm.value;
    this.ms.recoverPassword(values.email).subscribe((data: ServerResponse) => {
      if (data.esito == 0) {
        this.ms.AlertEmitter.emit({ msg: "Un'Email è stata inviata per recuperare la password", color: "green" });
        this.back()
      }
      else {
        if (data.messaggio == 'WRONGEMAIL')
          this.ms.AlertEmitter.emit({ msg: "Email non registrata", color: "red" });
        else if (data.messaggio == 'MAILERROR')
          this.ms.AlertEmitter.emit({ msg: "Errore nell'invio dell'email, riprova più tardi", color: "red" });          
        else
          this.ms.AlertEmitter.emit({ msg: "Qualcosa è andato storto", color: "red" });
      }
    });
  }

  mailFormat(control: FormControl): { [s: string]: boolean } {
    const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (control.value !== "" && (control.value.length <= 5 || !EMAIL_REGEXP.test(control.value))) {
      return { "invalidEmail": true };
    }
    return null;
  }
  samePassword(control: FormControl): { [s: string]: boolean } {
    if (this.recoverForm && control.value!=='' && control.value !== this.recoverForm.get('password').value)
      return { 'differentPassword': true };
    return null;
  }

}
