import { Actor } from "./actors";
import { ActivityPubObject, ActivityPubObjectTypes } from "./object";

export class Block extends ActivityPubObject {
  protected _type = ActivityPubObjectTypes.block;

  constructor(
    public actor1: Actor,
    public actor2: Actor,
  ) {
    super();
  }
}