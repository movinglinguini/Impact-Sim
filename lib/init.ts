import { Actor } from "./actors";
import * as Activities from './activities';
import { Post } from "./posts";
import { PolicyActivities, PolicyVerbs, setPolicy } from "./policy";

/**
 * Initiate privacy policy
 */
setPolicy(
  PolicyVerbs.retrieve,
  PolicyActivities.followed,
  (retriever, originator) => {
    return true;
  }
);

setPolicy(
  PolicyVerbs.retrieve,
  PolicyActivities.liked,
  (retriever: Actor, originator: Actor) => {
    return retriever.isFollowing(originator);
  }
)

setPolicy(
  PolicyVerbs.do,
  PolicyActivities.liked,
  (liker, object: Post) => {
    return liker.isFollowing(object.creator)
  }
)

/** Initiate new actors */
const marissa = new Actor('Marissa', 'marbar', '', '');
const damien = new Actor('Damien', 'damiron', '', '');
const altRightGuy = new Actor('Roderick', 'wolf', '', '');
Activities.followEachOther(marissa, damien);
Activities.follow(damien, altRightGuy);

/**
 * Initiate posts
 */
const post = new Post('Lorem ipsum ipsum ipsum something alt-right', altRightGuy);
Activities.tryLike(damien, post);

const activities = Activities.retrieveActivities(marissa, damien);
console.log('Marissa can see the following of Damien\'s activities:', activities)
