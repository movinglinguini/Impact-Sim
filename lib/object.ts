import { Actor } from "./actors";
import { PolicyObjectTypes } from "./policy";

export class ActivityPubObject {
  protected _id: string | number;
  protected _type: PolicyObjectTypes;
  protected _likes: Actor[] = [];

  addLike(actor: Actor) {
    this._likes.push(actor);
  }
}