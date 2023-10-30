import { Actor } from "./actors";
import { ActivityPubObject, ActivityPubObjectTypes } from "./object";

export class Friendship extends ActivityPubObject {
  protected _type: ActivityPubObjectTypes.friendship;

  constructor(
    public actor1: Actor,
    public actor2: Actor,
  ) {
    super();
  }
}