import { Actor } from "./actors";
import { ActivityPubObject } from "./object";
import { ActivityTypes } from "./outbox";

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

export enum PolicyObjectTypes {
  actor = 'actor',
  post = 'post',
  activity = 'activity',
  directMessage = 'directMessage'
}

export function setPolicy(verb: PolicyVerbs, activityType: ActivityTypes, policyFn: (actor: Actor, object: ActivityPubObject) => boolean) {
  PrivacyPolicy.set(makePolicyKey(verb, activityType), policyFn);
}

export function lookupPolicy(verb: PolicyVerbs, activityType: ActivityTypes, actor: Actor, object: ActivityPubObject) {
  console.log('POLICY LOOKUP:', makePolicyKey(verb, activityType))
  const fn = PrivacyPolicy.get(makePolicyKey(verb, activityType));
  return fn ? fn(actor, object) : true;
}

const PrivacyPolicy: Map<string, (actor: Actor, object: ActivityPubObject) => boolean> = new Map();

function makePolicyKey(verb: PolicyVerbs, activityType: ActivityTypes) {
  return `${verb}.${activityType}`;
}