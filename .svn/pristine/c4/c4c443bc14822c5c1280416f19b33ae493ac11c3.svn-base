import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../manager.service';
import { ServerResponse, UserInfo } from '../model';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userInfo: UserInfo = new UserInfo();
  display = false;
  name: string = "";  
  yours: boolean = true;

  constructor(private router: Router, public ms: ManagerService, private location: Location) { }

  ngOnInit() {
    if(this.ms.getUser()){
      this.name = this.ms.getUser();
      if(this.ms.userInfo != undefined)
        this.userInfo = this.ms.userInfo;
      else
      this.ms.getUserInfos(this.name).subscribe((response: ServerResponse) => {
        if (response.esito === 0) 
          this.ms.userInfo = this.userInfo = 
          new UserInfo(
            response.data.lists != null ? response.data.lists.split(','): [], 
            response.data.groups != null ? response.data.groups.split(','): [], 
            response.data.read != null ? response.data.read.split(','): [],
            response.data.write != null ? response.data.write.split(','): [],
            response.data.icon != null ? response.data.icon : 0);
      });
    }
    else
      this.router.navigate(['/home']);

  }

  selectIcon(icon: number) {
    this.userInfo.icon = icon;
    this.ms.saveAvatar(icon).subscribe();
  }

  close(event: Event) {
    this.display = false;
  }
  dontClose(event: Event) {
    event.stopPropagation();
  }

  save(event: string[], arrayNumber:number){
    // this.edit[arrayNumber] = true;
    // this.edited=true;
    switch (arrayNumber){
      case 1:
      this.userInfo.groups = event; this.ms.editUserInfo(event, 'g');break;
      case 2:
      this.userInfo.read = event; this.ms.editUserInfo(event, 'r');break;
      case 3:
        this.userInfo.write = event; this.ms.editUserInfo(event, 'w');break;
    }
  }

}
