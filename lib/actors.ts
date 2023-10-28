import { ActivityPubObject, ActivityPubObjectTypes } from "./object";
import { Activity, ActivityTypes } from "./activities";

export const ActorsDB = new Map();
export enum ActorRoles {
  authenticatedUser,
  unauthenticatedUser,
  admins
};

export class Actor extends ActivityPubObject {
  protected _type = ActivityPubObjectTypes.actor;
  
  private _following: Actor[] = [];
  private _followers: Actor[] = [];
  private _liked: ActivityPubObject[] = [];
  private _outbox: Activity[] = [];
  private _inbox: Activity[] = [];

  get id(): string | number {
    return this._id;
  }

  get outbox(): Activity[] {
    return this._outbox;
  }
  
  constructor(
    public name: string,
    public username: string,
    public summary: string,
    public icon: string,
    public roles: ActorRoles[],
    following?: Actor[],
    followers?: Actor[]
  ) {
    super();

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
      ActivityTypes.follow,
      this,
      follow,
    ));
  }

  public like(object: ActivityPubObject) {
    this._liked.push(object);
    this._outbox.push(new Activity(
      ActivityTypes.add,
      this,
      object,
    ))
  }

  public receive(object: ActivityPubObject) {
    this._inbox.push(new Activity(
      ActivityTypes.create,
      this,
      object
    ));
  }

  public send(object: ActivityPubObject) {
    this._outbox.push(new Activity(
      ActivityTypes.create,
      this,
      object
    ));
  }

  isFollowing(actor: Actor) {
    return Boolean(this._following.find(a => a.id === actor.id))
  }

  is(actor: Actor) {
    return this.id === actor.id;
  }
}

