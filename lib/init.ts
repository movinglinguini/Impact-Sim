import { Actor, ActorRoles } from "./actors";
import * as Activities from './activities';
import { Post } from "./posts";
import {  PolicyVerbs, setPolicy } from "./policy";
import { DirectMessage } from "./direct-message";
import { ActivityPubObjectTypes } from "./object";

/**
 * Initiate privacy policy
 */
// setPolicy(
//   PolicyVerbs.retrieve,
//   Activities.ActivityTypes.follow,
//   ActivityPubObjectTypes.actor,
//   (retriever: Actor, originator: Actor) => {
//     return retriever.isFollowing(originator);
//   }
// );

// setPolicy(
//   PolicyVerbs.do,
//   ActivityTypes.like,
//   (liker, object: Post) => {
//     return liker.isFollowing(object.creator)
//   }
// );

// setPolicy(
//   PolicyVerbs.do,
//   ActivityTypes.create,
//   (sender, object: DirectMessage) => {
//     if (object.type != PolicyObjectTypes.directMessage) {
//       return true;
//     }

//     return sender.isFollowing(object.receiver);
//   }
// );

// setPolicy(
//   PolicyVerbs.retrieve,
//   ActivityTypes.create,
//   (retriever, object: DirectMessage) => {
//     if (object.type != PolicyObjectTypes.directMessage) {
//       return true;
//     }

//     return retriever.id == object.receiver.id || object.sender.id == object.sender.id;
//   }
// )

/** Initiate new actors */
const marissa = new Actor('Marissa', 'marbar', '', '', [ActorRoles.authenticatedUser]);
const damien = new Actor('Damien', 'damiron', '', '', [ActorRoles.authenticatedUser]);
const altRightGuy = new Actor('Roderick', 'wolf', '', '', [ActorRoles.authenticatedUser]);
const pepper = new Actor('Pepper', 'pepperdapeeg', '', '', [ActorRoles.authenticatedUser]);
const peppersFriend = new Actor('Salt', 'saltydog', '', '', [ActorRoles.authenticatedUser]);

/** Initiate actor follows */
Activities.followEachOther(marissa, damien);
Activities.follow(damien, altRightGuy);
Activities.followEachOther(pepper, peppersFriend);

/**
 * Initiate posts
 */
const post = new Post('Lorem ipsum ipsum ipsum something alt-right', altRightGuy);

/** Initiate post likes */
Activities.tryLike(damien, post);

/**
 * Initiate messages
 */
Activities.trySend(peppersFriend, pepper, new DirectMessage(peppersFriend, pepper, 'Send this to 5 other people by the end of your week. If you don\'t your house will burn down!'));
Activities.trySend(pepper, peppersFriend, new DirectMessage(pepper, peppersFriend, 'ugh don\'t tell me you were hacked...'))

let activities = Activities.retrieveActivities(marissa, damien);
console.log('Marissa can see the following of Damien\'s activities:', activities);

activities = Activities.retrieveActivities(marissa, pepper);
console.log('Marissa cannot see that Pepper received a message from Salt.', activities);

activities = Activities.retrieveActivities(pepper, peppersFriend);
console.log('Pepper can see that she received a message from Salt.', activities);
