/**
 * Meant for use in the Impact game ONLY.
 * List of features that the player can choose to implement.
 */

import { ActivityTypes } from "../lib/activities";
import { Feature } from "../lib/feature";
import { ActivityPubObject, ActivityPubObjectTypes } from "../lib/object";

const features = [
  // Create Posts
  new Feature(
    'Create a Post',
    'The ability to create text posts.',
    ActivityTypes.create,
    ActivityPubObjectTypes.post
  ),
  // Delete posts
  new Feature(
    'Delete a Post',
    'The ability to delete text posts.',
    ActivityTypes.delete,
    ActivityPubObjectTypes.post
  ),
  // Like posts
  new Feature(
    'Like a Post',
    'The ability to like text posts.',
    ActivityTypes.like,
    ActivityPubObjectTypes.post
  ),

  // Make friends
  new Feature(
    'Friend',
    'The ability to friend another person.',
    ActivityTypes.create,
    ActivityPubObjectTypes.friendship,
  ),
  // Unfriend
  new Feature(
    'Unfriend',
    'The ability to unfriend.',
    ActivityTypes.delete,
    ActivityPubObjectTypes.friendship
  ),
  // Create direct messages
  new Feature(
    'Create Direct Message',
    'The ability to create direct messags to another person.',
    ActivityTypes.create,
    ActivityPubObjectTypes.directMessage
  ),
  // Delete direct messages
  new Feature(
    'Delete Direct Message',
    'The ability to delete direct messages made to another person.',
    ActivityTypes.delete,
    ActivityPubObjectTypes.directMessage,
  )
];
