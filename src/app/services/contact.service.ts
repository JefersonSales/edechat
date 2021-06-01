import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Message } from '../models/message.model';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  urlBase = 'http://localhost:3000';

  constructor(private http: HttpClient){}

  read(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.urlBase}/contacts`, this.httpOptions);
  }


}
