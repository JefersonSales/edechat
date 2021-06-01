import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Message } from '../../models/message.model';
import { Contact } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: Message[] = [];
  contacts: Contact[] = []

  idOriginComponent: number = 0;
  idDestinyComponent: number = 0;
  chat: Message[] = [];
  message = "";

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService,
    private chatService: ChatService
  ) { }

  ngOnInit(): void {
    if(this.route.snapshot.params.id){
      this.idOriginComponent = this.route.snapshot.params.id;
    }

    this.readContacts();
  }

  readContacts(){
    this.contactService.read().subscribe(
      data => {
        this.contacts = data.filter(x => x.id != this.idOriginComponent);
      },
      error => {
        console.error(error);
      }
    )
  }

  send(){
    const msg = new Message();
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
