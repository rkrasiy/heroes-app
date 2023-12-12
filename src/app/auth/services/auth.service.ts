import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { enviroments } from '../../../enviroments/enviroments';
import { User } from '../interfaces/user.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {
  private baseUrl: string = enviroments.baseUrl;
  private user?: User;

  constructor(
    private http: HttpClient
  ) {

  }

  get currentUser():User|undefined {
    if( !this.user ) return undefined;
    return structuredClone( this.user );
  }

  login( email: string, password: string ):Observable<User>{
    return this.http.get<User>(`${ this.baseUrl }/users/1`)
      .pipe(
        tap( user => this.user = user),
        tap( user => localStorage.setItem('token', 'awdqdaASDawafawawfad.awdaw.dadawd'))
      )
  }

  logout():void{
    this.user = undefined;
    localStorage.clear();
  }

  checkAuth():Observable<boolean> {
    const token = localStorage.getItem('token');

    if( !token ) return of(false);

    return this.http.get<User>(`${ this.baseUrl }/users/1`)
      .pipe(
        tap( user => this.user = user),
        map( user => !!user),
        catchError( error => of(false))
      )
  }
}
