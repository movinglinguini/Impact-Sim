import { Actor } from "./actors";
import { ActivityPubObject } from "./object";
import { PolicyActivities, PolicyObjectTypes, PolicyVerbs, lookupPolicy } from "./policy";

export class Activity extends ActivityPubObject {
  static timestamp: number = 0;
  protected _type: PolicyObjectTypes.activity;

  constructor(private _actor: Actor, private _activity: PolicyActivities,  private _object: ActivityPubObject) {
    super();
  }

  /** */
  isRetrievable(retriever: Actor): boolean {
    return lookupPolicy(PolicyVerbs.retrieve, this._activity, retriever, this._actor);
  }
}