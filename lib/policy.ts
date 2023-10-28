import { Actor } from "./actors";
import { ActivityPubObject, ActivityPubObjectTypes } from "./object";
import { ActivityTypes } from "./activities";

export enum PolicyVerbs {
  retrieve = 'retrieve',
  do = 'do'
}

export enum PolicyActivities {
  followed = 'followed',
  liked = 'liked',
  received = 'received',
  sent = 'sent'
}

export function setPolicy(
  verb: PolicyVerbs,
  activityType: ActivityTypes,
  objectType: ActivityPubObjectTypes,
  policyFn: (actor: Actor, object: ActivityPubObject) => boolean
) {
  PrivacyPolicy.set(makePolicyKey(verb, activityType, objectType), policyFn);
}

export function lookupPolicy(verb: PolicyVerbs, activityType: ActivityTypes, objectType: ActivityPubObjectTypes, actor: Actor, object: ActivityPubObject) {
  console.log('POLICY LOOKUP:', makePolicyKey(verb, activityType, objectType))
  const fn = PrivacyPolicy.get(makePolicyKey(verb, activityType, objectType));
  return fn ? fn(actor, object) : true;
}

const PrivacyPolicy: Map<string, (actor: Actor, object: ActivityPubObject) => boolean> = new Map();

function makePolicyKey(verb: PolicyVerbs, activityType: ActivityTypes, objectType: ActivityPubObjectTypes) {
  return `${verb}.${activityType}.${objectType}`;
}