import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private url = "http://localhost:5000";

  notification: any[] = [];
  allNotifications:Subject<any[]> = new Subject<any[]>();
  

  findAllNotifications(): void {
    this.http.get<any[]>(`${this.url}/notification`)
    .pipe(catchError((e)=> {
      return throwError(e);
    })
    ).subscribe((data) => {
      this.notification = data;
      this.allNotifications.next(this.notification)
    });

  }



  constructor(private http:HttpClient) { }
}
