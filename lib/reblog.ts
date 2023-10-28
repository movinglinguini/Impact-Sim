import { Actor } from "./actors";
import { ActivityPubObject, ActivityPubObjectTypes } from "./object";
import { Post } from "./posts";

export class Reblog extends ActivityPubObject {
  protected _type: ActivityPubObjectTypes.reblog;

  constructor(public post: Post, public creator: Actor) {
    super();
  }
}