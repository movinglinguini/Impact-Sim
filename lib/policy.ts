import { Actor } from "./actors";
import { ActivityPubObject } from "./object";

export enum PolicyVerbs {
  retrieve = 'retrieve',
  do = 'do'
}

export enum PolicyActivities {
  followed = 'followed',
  liked = 'liked',
}

export enum PolicyObjectTypes {
  actor = 'actor',
  post = 'post',
  activity = 'activity'
}


export function setPolicy(verb: PolicyVerbs, activity: PolicyActivities, policyFn: (actor: Actor, object: ActivityPubObject) => boolean) {
  PrivacyPolicy.set(makePolicyKey(verb, activity), policyFn);
}

export function lookupPolicy(verb: PolicyVerbs, activity: PolicyActivities, actor: Actor, object: ActivityPubObject) {
  console.log('POLICY LOOKUP:', makePolicyKey(verb, activity))
  const fn = PrivacyPolicy.get(makePolicyKey(verb, activity));
  return fn ? fn(actor, object) : true;
}

const PrivacyPolicy: Map<string, (actor: Actor, object: ActivityPubObject) => boolean> = new Map();

function makePolicyKey(verb: PolicyVerbs, activity: PolicyActivities) {
  return `${verb}.${activity}`;
}