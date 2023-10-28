import { Actor } from "./actors";
import { ActivityPubObject, ActivityPubObjectTypes } from "./object";
import { Post } from "./posts";

export class Favorite extends ActivityPubObject {
  protected _type: ActivityPubObjectTypes.favorite;

  constructor(public post: Post, public creator: Actor) {
    super();
  }
}