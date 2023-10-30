import { Actor } from "../lib/actors";
import { ActivityPubObject, ActivityPubObjectTypes } from "../lib/object";
import { ActivityTypes } from "../lib/activities";
import { PolicyVerbs, setPolicy } from "../lib/policy";

export class PolicyTopic {
  // Array of choices
  private _choices: { text: string, apply: () => void }[];

  constructor(public tag: string) {}

  addChoice(
    text: string,
    policyRep: {
      verb: PolicyVerbs,
      activity: ActivityTypes,
      objectType: ActivityPubObjectTypes,
      fn: (actor: Actor, object: ActivityPubObject) => boolean
    }) {
      this._choices.push({
        apply: () => setPolicy(policyRep.verb, policyRep.activity, policyRep.objectType, policyRep.fn),
        text,
      });

      return this;
    }

    applyChoice(choiceIndex: number) {
      this._choices[choiceIndex].apply();
    }
}
