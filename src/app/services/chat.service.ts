import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  urlBase = 'http://localhost:3000';

  constructor(private http: HttpClient){}

  read(): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.urlBase}/messages`, this.httpOptions);
  }

  create(msg: Message): Observable<Message[]> {
    return this.http.post<Message[]>(`${this.urlBase}/messages`, msg, this.httpOptions);
  }

  update(msg: Message): Observable<Message[]> {
    return this.http.put<Message[]>(`${this.urlBase}/messages/${msg.id}`, msg, this.httpOptions);
  }
}
