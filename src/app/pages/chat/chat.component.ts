import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  contacts = [
    {id: 1, name: 'Fulano'},
    {id: 2, name: 'Fulano'},
    {id: 3, name: 'Fulano'},
    {id: 4, name: 'Fulano'},
    {id: 5, name: 'Fulano'},
    {id: 6, name: 'Fulano'},
    {id: 7, name: 'Fulano'},
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
