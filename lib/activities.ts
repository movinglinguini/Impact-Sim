import { Actor } from "./actors";
import { ActivityPubObject } from "./object";
import { PolicyVerbs, lookupPolicy } from "./policy";

export enum ActivityTypes {
  create = 'create',
  delete = 'delete',
  follow = 'follow',
  like = 'like',
  add = 'add'
}

export class Activity {
  static timestamp: number = 0;
  
  constructor(private _type: ActivityTypes, private _actor: Actor, private _object: ActivityPubObject) {}

  /** */
  isRetrievable(retriever: Actor): boolean {
    return lookupPolicy(PolicyVerbs.retrieve, this._type, this._object.type, retriever, this._actor);
  }
}

export function follow(follower: Actor, toFollow: Actor) {
  follower.addFollow(toFollow);
  toFollow.addFollower(follower);
}

export function followEachOther(actor1: Actor, actor2: Actor) {
  follow(actor1, actor2);
  follow(actor2, actor1);
}

export function tryLike(actor: Actor, object: ActivityPubObject) {
  if (!lookupPolicy(PolicyVerbs.do, ActivityTypes.like, object.type, actor, object)) {
    console.log(actor.name, 'tried to like', object, 'but could not because the policy does not allow it.');
    return false;
  }


  actor.like(object);
  object.addLike(actor);
  return true;
}

export function trySend(sender: Actor, receiver: Actor, object: ActivityPubObject) {
  if (!lookupPolicy(PolicyVerbs.do, ActivityTypes.create, object.type, sender, object)) {
    console.log(sender.name, 'tried to create', object, 'but could not because the policy does not allow it.');
    return false;
  }

  sender.send(object);
  receiver.receive(object);
}

export function retrieveActivities(viewer: Actor, actor: Actor) {
  return actor.outbox.filter(ob => ob.isRetrievable(viewer));
}
