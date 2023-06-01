import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _http:HttpClient    
  ) { }

  apiUrl = "http://localhost:3000/users"

  getAll(){
    return this._http.get(this.apiUrl)
  }

  getById(id: any){
    return this._http.get(`${this.apiUrl}/${id}`)
  }

  proceedRegister(data: any){
    return this._http.post(this.apiUrl, data)
  }

  updateUser(id: any, data: any){
    return this._http.put(`${this.apiUrl}/${id}`, data)
  }

  isLoggedIn(){
    return sessionStorage.getItem('id') !== null
  }

  getUserRole(){
    return sessionStorage.getItem('role') !== null ? sessionStorage.getItem('role')?.toString() : ""
  }
}
