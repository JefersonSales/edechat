import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  contacts: Contact[] = [];
  chat: Message[] = [];

  idOriginComponent: number = 0;
  idDestinyComponent: number = 0;
  message = "";

  @ViewChild('chatScroll') chatScroll!: ElementRef;

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
    setInterval(() => this.readMessages(), 2000);
  }

  readContacts(): void {
    this.contactService.read().subscribe(
      data => {
        this.contacts = data.filter(x => x.id != this.idOriginComponent);
      },
      error => {
        console.error(error);
      }
    )
  }

  readMessages(): void {
    this.chatService.read().subscribe(
      data => {
       const filterMessage = data.filter(x => x.idOrigin == this.idOriginComponent && x.idDestiny == this.idDestinyComponent
                                          || x.idOrigin == this.idDestinyComponent && x.idDestiny == this.idOriginComponent );

       if(filterMessage.length > this.chat.length){
         this.chat = filterMessage;
         this.scroll();
       }

       if(filterMessage.length == 0){
        this.chat = [];

      }
       this.setRead(filterMessage);
      }
    )
  }

  send(){
    const msg = new Message();
    msg.description = this.message;
    msg.idDestiny = this.idDestinyComponent;
    msg.idOrigin = this.idOriginComponent;
    msg.hour = ( new Date()).toISOString().split('T')[1].substring(0,5);
    msg.date = ( new Date()).toISOString().split('T')[0];

    this.chatService.create(msg).subscribe(
      data => {
        this.readMessages();
        this.message = "";
      },
      error => {
        console.error(error);
      }
    )
  }

  selectContact(contact: Contact){
    this.idDestinyComponent = contact.id;
    this.readMessages();
    this.scroll();
  }

  private setRead(messages: Message[]){
    messages.map(x => {
      if(x.read == false && x.idDestiny == this.idOriginComponent){
        x.read = true;
        this.chatService.update(x).subscribe;
      }
    })
  }

  private scroll(){
    setTimeout(() => this.chatScroll.nativeElement.scrollTop = 1000000,500);
  }
}
