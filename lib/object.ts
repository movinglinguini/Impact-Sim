import { Actor } from "./actors";
import { PolicyObjectTypes } from "./policy";

export class ActivityPubObject {
  protected _id: string | number;
  protected _type: PolicyObjectTypes;
  protected _likes: Actor[] = [];

  get type() {
    return this._type;
  }

  constructor() {
    this._id = Math.random() * 123456789;
  }

  addLike(actor: Actor) {
    this._likes.push(actor);
  }
}