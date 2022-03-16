import { Component, Input, OnInit } from '@angular/core';
import { NotificationService } from 'app/services/notification.service';



@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  @Input() notification = {
    nid: '',
    fromProfileId: '',
    toProfileId: '',
    cid: '',
    pid: '',
    isRead: '',
    nTimestamp : ''
  }
  dialog: any;

  constructor(private notificationService : NotificationService) { }


  viewNotification() {
    console.log(this.notification)
    this.dialog.open(NotificationComponent, {
      data: {
        nid :this.notification.nid,
        fromProfileId :this.notification.fromProfileId,
        toProfileId : this.notification.toProfileId,
        cid : this.notification.cid,
        pid : this.notification.pid,
        isRead : this.notification.isRead,
        nTimestamp : this.notification.nTimestamp,
      }
    })
  }

  ngOnInit(): void {
  }

  

}
