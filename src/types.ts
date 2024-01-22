export interface Keyed {
  id: number;
}

export type Url = string;

export interface Category extends Keyed {
  name: string;
}

export interface User extends Keyed {
  uid: Url;
}

export interface Site extends Keyed {
  url: Url;
}

export interface Address {
  'street-address'?: string;
  'extended-address'?: string;
  'post-office-box'?: string;
  locality?: string;
  region?: string;
  'postal-code'?: string;
  'country-name'?: string;
}

export interface Card extends Keyed, Address {
  name?: string;
  uid?: Url;
  url?: Url;
  email?: Url;
  note?: string;
}

export interface RichContent {
  text?: string;
  html?: string;
}

export interface Entry extends Keyed {
  type?: string;
  uid?: Url;
  name?: string;
  summary?: string;
  content?: string | RichContent;
  url?: Url;
  author?: string | Url | Card;
  category?: string[] | Category[];
  location?: string | Address | Card | Url;
  syndication?: Url | Url[];
  'in-reply-to'?: Url;
  'like-of'?: Url;
  'repost-of'?: Url;
  photo: Url | Url[];
  'bookmark-of'?: Url;
  'read-of'?: Url;
  'review-of'?: Url;
}
