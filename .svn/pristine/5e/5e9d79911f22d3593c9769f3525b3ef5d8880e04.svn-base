import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { ServerResponse } from './model';
import { ManagerService } from './manager.service';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  private ms : ManagerService;
  constructor(private inj: Injector) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    return next.handle(request).do((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
            // console.log("Richiesta intercettata:\nUrl "+request.url+" \nParams "+request.serializeBody());
            // console.log(event.body);
            let response:ServerResponse = event.body;
            if (response.esito==1 && response.messaggio =='SESSIONEXPIRED'){
                this.inj.get(ManagerService).SessionExpiredEmitter.emit();                
            }
        }
      }, (err: any) => {
        // if (err instanceof HttpErrorResponse) {
        //   if (err.status === 401) {
        //     // redirect to the login route
        //     // or show a modal
        //   }
        // }
      });
    }
}