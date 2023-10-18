import { Actor } from "./actors";
import { ActivityPubObject } from "./object";
import { PolicyObjectTypes } from "./policy";

export class DirectMessage extends ActivityPubObject {
  protected _type = PolicyObjectTypes.directMessage;

  get sender() {
    return this._sender;
  }

  get receiver() {
    return this._receiver;
  }

  constructor(private _sender: Actor, private _receiver: Actor, private _content: string) {
    super();
  }
}
