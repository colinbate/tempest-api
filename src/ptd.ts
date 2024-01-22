import { Entry } from './types';

const basePostTypes = new Map<string, string>([
  ['rsvp', 'rsvp'],
  ['in-reply-to', 'reply'],
  ['repost-of', 'repost'],
  ['bookmark-of', 'bookmark'],
  ['quotation-of', 'quotation'],
  ['like-of', 'like'],
  ['checkin', 'checkin'],
  ['listen-of', 'listen'],
  ['read-of', 'read'],
  ['watch-of', 'watch'],
  ['video', 'video'],
  ['audio', 'audio'],
  ['photo', 'photo'],
]);

/**
 * Accepts a JF2 object and attempts to determine the post type
 * @param {Entry} properties - JF2 properties
 * @returns {string} The post type or 'note' if unknown
 */
export const getPostType = (properties: Entry): string => {
  // If already has a type that’s not entry, return that value
  if (properties.type && properties.type !== 'entry') {
    return properties.type;
  }

  // Then continue to base post type discovery
  for (const basePostType of basePostTypes) {
    if (basePostType[0] in properties) {
      return basePostType[1];
    }
  }

  // If has `children` property that is populated, is collection type
  // if (
  //   properties.children &&
  //   Array.isArray(properties.children) &&
  //   properties.children.length > 0
  // ) {
  //   return "collection";
  // }

  // Check that `name` value is not a prefix of processed `content` value
  let content = '';
  if ('content' in properties && properties.content != null) {
    content = typeof properties.content === 'string' ? properties.content : (properties.content.text || properties.content.html) ?? '';
  } else if ('summary' in properties) {
    content = properties.summary ?? '';
  }

  // Check if post could be an article
  if ('name' in properties && 'content' in properties && content && properties.name) {
    const name = properties.name.trim();
    if (!content.startsWith(name)) {
      return 'article';
    }
  }

  return 'note';
};
