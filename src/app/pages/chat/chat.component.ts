import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Message } from '../../models/message.model';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: Message[] = [];
  contacts: Contact[] = [
    { id: 1, name: 'Carlos' },
    { id: 2, name: 'Sérgio' },
    { id: 3, name: 'Jeferson' },
  ];

  idOriginComponent: number = 0;
  idDestinyComponent: number = 0;
  chat: Message[] = [];
  message = "";

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    if(this.route.snapshot.params.id){
      this.idOriginComponent = this.route.snapshot.params.id;
    }
  }

  makeId(){
    return ( this.messages.length || 0 ) + 1;
  }

  send(){
    const msg = new Message();
    msg.id = this.makeId();
    msg.description = this.message;
    msg.idDestiny = this.idDestinyComponent;
    msg.idOrigin = this.idOriginComponent;
    msg.hour = ( new Date()).toISOString().split('T')[1];
    msg.date = ( new Date()).toISOString().split('T')[0];
    this.messages.push( msg );
    this.updateChat();
    this.message = "";
  }

  selectContact(contact: Contact){
    this.idDestinyComponent = contact.id;
    this.updateChat();
  }

  updateChat() {
    this.chat = this.messages.filter(x => x.id === this.idOriginComponent || x.id === this.idDestinyComponent)
  }

}
