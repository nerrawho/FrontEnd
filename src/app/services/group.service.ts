import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Group } from 'app/models/group';
import { Profile } from 'app/models/profile';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';

const baseUrl = `${environment.url}`;
const groupUrl = `${baseUrl}/groups`;

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private groupsSubject = new BehaviorSubject<Group[]>([]);
  private _unsubscribeAll = new Subject<any>();
  public currentGroup: Group = {};

  constructor(private httpClient: HttpClient) {}

  getGroups(): Observable<any> {
    return this.groupsSubject.asObservable();
  }

  //Paginated All Groups result
  getGroupsByPage(pageNumber: number): any {
    const requestOptions = {
      headers: new HttpHeaders({
        Authorization: `${sessionStorage.getItem('Authorization')}`,
      }),
    };
    this.httpClient
      .get<Group[]>(`${groupUrl}/page/${pageNumber}`, requestOptions)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((data) => {
        if (data) {
          const currentValue = this.groupsSubject.value;
          const updatedValue = currentValue.concat(data);
          this.groupsSubject.next(updatedValue);
        }
        return null;
      });
  }

  //Get Group by ID from Back end Return Observable<Group>
  getGroupByID(id: number): Observable<Group> {
    const requestOptions = {
      headers: new HttpHeaders({
        Authorization: `${sessionStorage.getItem('Authorization')}`,
      }),
    };
    return this.httpClient
      .get<Group>(`${groupUrl}/${id}`, requestOptions)
      .pipe(catchError(this.handleError));
  }

  //Search for groups by groupName field,, returns group
  SearchGroupbyName(name: string): Observable<Group> {
    const requestOptions = {
      headers: new HttpHeaders({
        Authorization: `${sessionStorage.getItem('Authorization')}`,
      }),
    };
    return this.httpClient
      .get<Group>(`${groupUrl}/search/${name}`, requestOptions)
      .pipe(catchError(this.handleError));
  }

  //Add user to group, returns group
  joinGroup(gId: number, uId: number): Observable<Group> {
    const requestOptions = {
      headers: new HttpHeaders({
        Authorization: `${sessionStorage.getItem('Authorization')}`,
      }),
    };
    return this.httpClient
      .post<Group>(`${groupUrl}/${gId}/join/${uId}`, requestOptions)
      .pipe(catchError(this.handleError));
  }

  //Remove user from group, returns group after change
  leaveGroup(gId: number, uId: number): Observable<Group> {
    const requestOptions = {
      headers: new HttpHeaders({
        Authorization: `${sessionStorage.getItem('Authorization')}`,
      }),
    };
    return this.httpClient
      .post<Group>(`${groupUrl}/${gId}/leave/${uId}`, requestOptions)
      .pipe(catchError(this.handleError));
  }

  //Get a list of members of a group, returns an array of profiles
  getGroupMembers(gId: number): Observable<Profile[]> {
    const requestOptions = {
      headers: new HttpHeaders({
        Authorization: `${sessionStorage.getItem('Authorization')}`,
      }),
    };
    return this.httpClient
      .post<Profile[]>(`${groupUrl}/${gId}/members`, requestOptions)
      .pipe(catchError(this.handleError));
  }

  //create a new group, sets groupName as the name, owner as the owner and first member,
  //and generates a new ID. Returns the new group object
  createGroup(owner: Profile, groupName: string): Observable<Group> {
    let initialMember: Profile[] = [];
    initialMember.push(owner);
    let newGroup = {
      groupName: groupName,
      owner: owner,
      members: initialMember,
    };
    const requestOptions = {
      headers: new HttpHeaders({
        Authorization: `${sessionStorage.getItem('Authorization')}`,
      }),
    };
    return this.httpClient
      .post<Group>(`${groupUrl}/save`, newGroup, requestOptions)
      .pipe(catchError(this.handleError));
  }

  getGroupId(group: Group){
    return group.groupId;
  }

  //set group cover photo img
  setImg(group: Group, img: any) {
    group.imgurl = img;
  }

  private handleError(httpError: HttpErrorResponse) {
    if (httpError.error instanceof ErrorEvent) {
      console.log('An error occurred: ', httpError.error.message);
    } else {
      console.error(`
      Backend returned code ${httpError.status},
      body was: ${httpError.error},
      ${httpError.message}
    `);
    }

    return throwError(
      () => new Error('Something really bad happened, please try again later')
    );
  }



}
