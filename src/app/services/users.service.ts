import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface User {
  name?: string;
  username: string;
  lastName?: string;
  firstName?: string;
  email?: string;
  type?: string;
  id?: number;
  password?: string;
  repeatPassword?: string;
}

@Injectable({providedIn:'root'})

export class UserService{
  constructor(private _http:HttpClient ) {}

  public fetchUsers():Observable<User[]>{
    return this._http.get<User[]>('https://jsonplaceholder.typicode.com/users')
  }

  public addUser(user:User):Observable<User> {
    return this._http.post<User>('https://jsonplaceholder.typicode.com/users', user)
  }

  public removeUser(id:number):Observable<void> {
    return this._http.delete<void>(`https://jsonplaceholder.typicode.com/users/${ id }`)
  }

  public userExists(username: string): Observable<boolean> {
    return this._http
      .get<User[]>('https://jsonplaceholder.typicode.com/users', { params: { username } })
      .pipe(map((matchingUsers) => matchingUsers.length > 0));
  }
}