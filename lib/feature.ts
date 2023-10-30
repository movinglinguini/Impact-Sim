import { ActivityTypes } from "./activities";
import { ActivityPubObjectTypes } from "./object";

type FeatureRule = (activityType: ActivityTypes, objectType: ActivityPubObjectTypes) => boolean;
export class Feature {
  private _id: string;
  private _isImplemented: boolean;

  public activityType: ActivityTypes;
  public objectType: ActivityPubObjectTypes;


  get isImplemented() {
    return this._isImplemented;
  }
  
  constructor(
    public name: string,
    public description,
    acttivityType: ActivityTypes,
    objectType: ActivityPubObjectTypes) {}
}