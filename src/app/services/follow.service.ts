import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FollowService {
  token = sessionStorage.getItem("Authorization");

  constructor(private http: HttpClient,) {  }

  followUserByEmail(email: string): Observable<HttpResponse<string>>
  {
    return this.http.post<string>
    (
      "http://localhost:8082/profile/follow",
      { "email":email },
      { observe: 'response', headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': `${this.token}`}}
    );
  }
  
  followUserById(id: number): Observable<HttpResponse<string>>
  {
    return this.http.post<string>
    (
      "http://localhost:8082/profile/follow",
      { "id":id },
      { observe: 'response', headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': `${this.token}`}}
    );
  }

  unfollowUserByEmail(email: string): Observable<HttpResponse<string>>
  {
    return this.http.post<string>
    (
      "http://localhost:8082/profile/unfollow",
      { "id":email },
      { observe: 'response', headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': `${this.token}`}}
    )
  }

  unfollowUserById(id: number): Observable<HttpResponse<string>>
  {
    return this.http.post<string>
    (
      "http://localhost:8082/profile/unfollow",
      { "id":id },
      { observe: 'response', headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': `${this.token}`}}
    )
  }
}
