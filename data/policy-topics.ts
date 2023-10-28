import { Actor, ActorRoles } from "../lib/actors";
import { ActivityPubObject, ActivityPubObjectTypes } from "../lib/object";
import { ActivityTypes } from "../lib/activities";
import { PolicyVerbs } from "../lib/policy";
import { Reblog } from "../lib/reblog";
import { Favorite } from "../lib/favorite";
import { PolicyTopic } from "../lib/policy-topic";
import { Post } from "../lib/posts";

/**
 * List of premade topics to be added as choices in the privacy policy
 * template.
 * */
const topics = [
  new PolicyTopic('posts.direct.admin-privilege')
    .addChoice(
      'Please keep in mind that the operators of the server and any receiving server may view private messages.',
      {
        verb: PolicyVerbs.retrieve,
        activity: ActivityTypes.create,
        objectType: ActivityPubObjectTypes.directMessage,
        fn: (actor: Actor, object: ActivityPubObject) => {
          return actor.roles.includes(ActorRoles.admins);
        }
      }
    )
    .addChoice(
      'Operators of this server are not able to view private messages. However, operators of receiving servers may have different policies.',
      {
        verb: PolicyVerbs.retrieve,
        activity: ActivityTypes.create,
        objectType: ActivityPubObjectTypes.directMessage,
        fn: (actor: Actor, object: ActivityPubObject) => {
          return !actor.roles.includes(ActorRoles.admins);
        }
      }
    ),

  new PolicyTopic('posts.reblogging')
    .addChoice(
      'Reblogging posts is always public.',
      {
        verb: PolicyVerbs.retrieve,
        activity: ActivityTypes.create,
        objectType: ActivityPubObjectTypes.reblog,
        fn: (actor: Actor, object: ActivityPubObject) => {
          return true;
        }
      }
    )
    .addChoice(
      'Reblogging posts is only broadcasted to your followers and the creator of the post.',
      {
        verb: PolicyVerbs.retrieve,
        activity: ActivityTypes.create,
        objectType: ActivityPubObjectTypes.reblog,
        fn: (actor: Actor, object: Reblog) => {
          return actor.isFollowing(object.creator) || actor.is(object.post.creator);
        }
      }
    )
    .addChoice(
      'Reblogging posts is only broadcasted to the creator of the post.',
      {
        verb: PolicyVerbs.retrieve,
        activity: ActivityTypes.create,
        objectType: ActivityPubObjectTypes.reblog,
        fn: (actor: Actor, object: Reblog) => {
          return actor.is(object.post.creator);
        }
      }
    ),

  new PolicyTopic('posts.favoriting')
    .addChoice(
      'Favoriting posts is always public.',
      {
        verb: PolicyVerbs.retrieve,
        activity: ActivityTypes.create,
        objectType: ActivityPubObjectTypes.favorite,
        fn: (actor: Actor, object: Favorite) => {
          return true;
        }
      }
    )
    .addChoice(
      'Favoriting posts is only broadcasted to your followers and the creator of the post.',
      {
        verb: PolicyVerbs.retrieve,
        activity: ActivityTypes.create,
        objectType: ActivityPubObjectTypes.favorite,
        fn: (actor: Actor, object: Favorite) => {
          return actor.isFollowing(object.creator) || actor.is(object.post.creator);
        }
      }
    )
    .addChoice(
      'Favoriting posts is only broadcasted to the creator of the post.',
      {
        verb: PolicyVerbs.retrieve,
        activity: ActivityTypes.create,
        objectType: ActivityPubObjectTypes.favorite,
        fn: (actor: Actor, object: Favorite) => {
          return actor.is(object.post.creator);
        }
      }
    ),

  new PolicyTopic('posts.delete.follower-privileges')
      .addChoice('When you delete posts, your followers will be notified.',
      {
        verb: PolicyVerbs.retrieve,
        activity: ActivityTypes.delete,
        objectType: ActivityPubObjectTypes.post,
        fn: (actor: Actor, post: Post) => {
          return actor.isFollowing(post.creator);
        }
      })
      .addChoice('When you delete posts, your followers will not be notified',
      {
        verb: PolicyVerbs.retrieve,
        activity: ActivityTypes.delete,
        objectType: ActivityPubObjectTypes.post,
        fn: (actor: Actor, post: Post) => {
          return false;
        }
      }),

  new PolicyTopic('followers.public')
      .addChoice('The list of people you follow is listed publicly.',
      {
        verb: PolicyVerbs.retrieve,
        activity: ActivityTypes.follow,
        objectType: ActivityPubObjectTypes.actor,
        fn: (actor: Actor, follower: Actor) => {
          return true;
        }
      })
      .addChoice('The list of people you follow is not listed publicly.',
      {
        verb: PolicyVerbs.retrieve,
        activity: ActivityTypes.follow,
        objectType: ActivityPubObjectTypes.actor,
        fn: (actor: Actor, follower: Actor) => {
          return actor.is(follower) || actor.isFollowing(follower);
        }
      }),
  
  new PolicyTopic('posts.public.nonauth-privileges')
      .addChoice(
        'You can only interact with other people\'s content and post your own content when you are logged in.',
        {
          verb: PolicyVerbs.do,
          activity: ActivityTypes.create,
          objectType: ActivityPubObjectTypes.post,
          fn: (actor: Actor, post: Post) => {
            return actor.roles.includes(ActorRoles.authenticatedUser);
          }
        },
      )
];

export const topicsMap = new Map<string, PolicyTopic>();
topics.forEach(t => topicsMap.set(t.tag, t));
