import { ActivityPubObject } from "./object";
import { Activity } from "./outbox";
import { PolicyActivities, PolicyObjectTypes } from "./policy";

export const ActorsDB = new Map();

export class Actor extends ActivityPubObject {
  protected _type = PolicyObjectTypes.actor;

  private _name: string;
  private _username: string;
  private _summary: string;
  private _icon: string;
  private _following: Actor[] = [];
  private _followers: Actor[] = [];
  private _liked: ActivityPubObject[] = [];
  private _outbox: Activity[] = [];

  get id(): string | number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get outbox(): Activity[] {
    return this._outbox;
  }
  
  constructor(name: string, username: string, summary: string, icon: string, following?: Actor[], followers?: Actor[]) {
    super();

    this._id = Math.random() * 200000;
    this._name = name;
    this._summary = summary;
    this._icon = icon;

    this._following = following || [];
    this._followers = followers || [];

    ActorsDB.set(this._id, this);
  }

  public addFollower(follower: Actor) {
    this._followers.push(follower);
  }

  public addFollow(follow: Actor) {
    this._following.push(follow);
    this._outbox.push(new Activity(
      this,
      PolicyActivities.followed,
      follow,
    ));
  }

  public like(object: ActivityPubObject) {
    this._liked.push(object);
    this._outbox.push(new Activity(
      this,
      PolicyActivities.liked,
      object,
    ))
  }

  isFollowing(actor: Actor) {
    return Boolean(this._following.find(a => a.id === actor.id))
  }
}

