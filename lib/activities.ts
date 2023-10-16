import { Actor } from "./actors";
import { ActivityPubObject } from "./object";
import { PolicyActivities, PolicyVerbs, lookupPolicy } from "./policy";

export function follow(follower: Actor, toFollow: Actor) {
  follower.addFollow(toFollow);
  toFollow.addFollower(follower);
}

export function followEachOther(actor1: Actor, actor2: Actor) {
  follow(actor1, actor2);
  follow(actor2, actor1);
}

export function tryLike(actor: Actor, object: ActivityPubObject) {
  if (!lookupPolicy(PolicyVerbs.do, PolicyActivities.liked, actor, object)) {
    console.log(actor.name, 'tried to like', object, 'but could not because the policy does not allow it.');
    return false;
  }


  actor.like(object);
  object.addLike(actor);
  return true;
}

export function retrieveActivities(viewer: Actor, actor: Actor) {
  return actor.outbox.filter(ob => ob.isRetrievable(viewer));
}
