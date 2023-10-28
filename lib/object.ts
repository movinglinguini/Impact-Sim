import { Actor } from "./actors";

export enum ActivityPubObjectTypes {
  actor = 'actor',
  post = 'post',
  activity = 'activity',
  directMessage = 'directMessage',
  reblog = 'reblog',
  favorite = 'favorite',
}


export class ActivityPubObject {
  protected _id: string;
  protected _type: ActivityPubObjectTypes;
  protected _likes: Actor[] = [];

  get type() {
    return this._type;
  }

  constructor() {
    this._id = `${Math.random() * 123456789}`;
  }

  addLike(actor: Actor) {
    this._likes.push(actor);
  }
}