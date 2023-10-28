import { Actor } from "./actors";
import { ActivityPubObject, ActivityPubObjectTypes } from "./object";

export class Post extends ActivityPubObject {
  protected _type: ActivityPubObjectTypes.post;

  private _content: string;
  private _creator: Actor;

  get creator() {
    return this._creator;
  }

  constructor(content: string, creator: Actor) {
    super();
    this._content = content;
    this._creator = creator;
  }
}