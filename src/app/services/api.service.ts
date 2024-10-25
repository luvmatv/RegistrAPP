import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IpService {
  private apiUrl = 'http://ip-api.com/json/?fields=61439';  
  constructor(private http: HttpClient) {}

 
  getIpInfo(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
