import { Actor } from "./actors";
import { ActivityPubObject } from "./object";
import { PolicyActivities, PolicyObjectTypes, PolicyVerbs, lookupPolicy } from "./policy";

/**@TODO: Move this stuff to activities.ts */
export enum ActivityTypes {
  create = 'create',
  follow = 'follow',
  like = 'like',
  add = 'add'
}

export class Activity {
  static timestamp: number = 0;
  
  constructor(private _type: ActivityTypes, private _actor: Actor, private _object: ActivityPubObject) {}

  /** */
  isRetrievable(retriever: Actor): boolean {
    return lookupPolicy(PolicyVerbs.retrieve, this._type, retriever, this._actor);
  }
}