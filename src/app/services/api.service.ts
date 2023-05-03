import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  postPassword(data: any) {
    return this.http.post<any>('https://localhost:7190/api/Demo', data);
  }

  getPassword() {
    return this.http.get<any>('https://localhost:7190/api/Demo');
  }

  putPassword(data: any) {
    return this.http.put<any>('https://localhost:7190/api/Demo', data);
  }

  deletePassword(id: number) {
    return this.http.delete<any>('https://localhost:7190/api/Demo/' + id);
  }
}
