import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';

export interface Message {
  from: string;
  message: string;
}

export class AddMessage {
  static type = '[Chat] Add message';
  constructor(public from: string, public message: string) {}
}

@State<Message[]>({
  name: 'messages',
  defaults: [],
})
@Injectable()
export class MessagesState {
  @Action(AddMessage)
  addMessage(ctx: StateContext<Message[]>, { from, message }: AddMessage) {
    const state = ctx.getState();
    // omit `type` property that server socket sends
    ctx.setState([...state, { from, message }]);
  }
}
