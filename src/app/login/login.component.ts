import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { ManagerService } from '../manager.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Settings, ServerResponse } from '../model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'Benvenuto!';
  loginForm: FormGroup;
  error = '';
  loginError = false;
  showLoading = false;
  constructor(private ms: ManagerService, private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem("session")) {
      this.showLoading = true;
      this.ms.tryToRecoverSession().then(data => {
        if (data)
          this.router.navigate(['/home']);
        else
          this.showLoading = false;
      });
    }
    this.loginForm = new FormGroup({
      'username': new FormControl(this.ms.getUser(), Validators.required),
      'password': new FormControl('', [Validators.required, Validators.minLength(5)])
    });
    let savedUser = localStorage.getItem('user');
    if (savedUser !== null)
      this.loginForm.patchValue({ 'username': savedUser });
    this.ms.fromLogin = true;
  }

  login() {
    let values = this.loginForm.value;
    this.ms.login(values.username, values.password).subscribe((response: ServerResponse) => {
      if (response.esito === 0) {
        localStorage.setItem('user', 'response.data.name');
        this.ms.setUser(response.data.name);
        this.ms.setSettings(new Settings(response.data.settings));
        this.ms.setSessionId(response.data.sessionId);
        if (this.ms.url)
          this.router.navigate([this.ms.url]);
        else
          this.router.navigate(['/home']);
      } else {
        this.loginError = true;
        switch (response.messaggio) {
          case 'WRONGPWD':
            this.error = 'Password errata';
            break;
          case 'WRONGFIELD':
            this.error = 'Utente sconosciuto';
            break;
          case 'TOOMANYTRIES':
            this.error = 'Hai provato troppe volte, rallenta un po\'';
            break;
          default:
            this.error = response.messaggio;
        }
      };
    });
  }

}
