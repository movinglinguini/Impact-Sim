import { Actor } from "./actors";
import { ActivityPubObject } from "./object";
import { PolicyObjectTypes } from "./policy";

export class Post extends ActivityPubObject {
  protected _type: PolicyObjectTypes.post;

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