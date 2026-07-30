export type GalleryCategory =
  | "Athletics"
  | "Research & Recognition"
  | "Programs"
  | "Travel"
  | "Behind the Scenes";

export interface GalleryPhoto {
  slug: string;
  category: GalleryCategory;
  /** ~600px longest edge, used for the grid tiles. */
  thumbSrc: string;
  /** ~1920px longest edge, used for the full-screen view. */
  fullSrc: string;
  alt: string;
  // Captions only where the subject is self-evident or already documented
  // elsewhere on the site. Undefined captions render nothing.
  caption?: string;
  /** width / height of the displayed image, so tiles reserve space before load. */
  aspectRatio: number;
}

// Grid order is grouped by category so related photos cluster.
export const galleryPhotos: GalleryPhoto[] = [
  // Athletics
  {
    slug: "club-volleyball-double-block",
    category: "Athletics",
    thumbSrc: "/gallery/thumb/club-volleyball-double-block.jpg",
    fullSrc: "/gallery/full/club-volleyball-double-block.jpg",
    alt: "Two club volleyball teammates jumping together to block at the net",
    caption: "Club volleyball",
    aspectRatio: 1.4972,
  },
  {
    slug: "volleyball-block-action",
    category: "Athletics",
    thumbSrc: "/gallery/thumb/volleyball-block-action.jpg",
    fullSrc: "/gallery/full/volleyball-block-action.jpg",
    alt: "Granite Bay Grizzlies volleyball players jumping to block at the net",
    caption: "Volleyball",
    aspectRatio: 0.8006,
  },
  {
    slug: "volleyball-celebration",
    category: "Athletics",
    thumbSrc: "/gallery/thumb/volleyball-celebration.jpg",
    fullSrc: "/gallery/full/volleyball-celebration.jpg",
    alt: "Volleyball teammates celebrating a point on the court",
    aspectRatio: 1.2821,
  },
  {
    slug: "granite-bay-jersey-swap",
    category: "Athletics",
    thumbSrc: "/gallery/thumb/granite-bay-jersey-swap.jpg",
    fullSrc: "/gallery/full/granite-bay-jersey-swap.jpg",
    alt: "Two Granite Bay volleyball players holding each other's numbered jerseys",
    caption: "Granite Bay volleyball",
    aspectRatio: 0.75,
  },
  {
    slug: "granite-bay-spike",
    category: "Athletics",
    thumbSrc: "/gallery/thumb/granite-bay-spike.jpg",
    fullSrc: "/gallery/full/granite-bay-spike.jpg",
    alt: "Granite Bay volleyball player number 29 reaching over the net to spike",
    caption: "Granite Bay volleyball",
    aspectRatio: 0.686,
  },
  {
    slug: "granite-bay-volleyball-net",
    category: "Athletics",
    thumbSrc: "/gallery/thumb/granite-bay-volleyball-net.jpg",
    fullSrc: "/gallery/full/granite-bay-volleyball-net.jpg",
    alt: "Granite Bay volleyball players standing behind the net during a match",
    caption: "Granite Bay volleyball",
    aspectRatio: 1.5,
  },
  {
    slug: "aspire-volleyball-huddle",
    category: "Athletics",
    thumbSrc: "/gallery/thumb/aspire-volleyball-huddle.jpg",
    fullSrc: "/gallery/full/aspire-volleyball-huddle.jpg",
    alt: "Aspire Volleyball Club team huddled together on the court",
    caption: "Aspire Volleyball Club",
    aspectRatio: 1.4967,
  },
  {
    slug: "volleyball-first-place",
    category: "Athletics",
    thumbSrc: "/gallery/thumb/volleyball-first-place.jpg",
    fullSrc: "/gallery/full/volleyball-first-place.jpg",
    alt: "Youth volleyball team posing with a first-place tournament banner",
    caption: "First place",
    aspectRatio: 1.3333,
  },
  {
    slug: "youth-volleyball-action",
    category: "Athletics",
    thumbSrc: "/gallery/thumb/youth-volleyball-action.jpg",
    fullSrc: "/gallery/full/youth-volleyball-action.jpg",
    alt: "Youth volleyball player passing the ball during a match",
    aspectRatio: 1.5009,
  },

  // Research & Recognition
  {
    slug: "clearpolicy-presentation-board",
    category: "Research & Recognition",
    thumbSrc: "/gallery/thumb/clearpolicy-presentation-board.jpg",
    fullSrc: "/gallery/full/clearpolicy-presentation-board.jpg",
    alt: "Tri-fold presentation board for ClearPolicy.org",
    caption: "ClearPolicy",
    aspectRatio: 1.4623,
  },
  {
    slug: "clearpolicy-conversation",
    category: "Research & Recognition",
    thumbSrc: "/gallery/thumb/clearpolicy-conversation.jpg",
    fullSrc: "/gallery/full/clearpolicy-conversation.jpg",
    alt: "Discussing ClearPolicy with a visitor beside the project display",
    caption: "Presenting ClearPolicy",
    aspectRatio: 1.7774,
  },
  {
    slug: "recognition-ceremony",
    category: "Research & Recognition",
    thumbSrc: "/gallery/thumb/recognition-ceremony.jpg",
    fullSrc: "/gallery/full/recognition-ceremony.jpg",
    alt: "Standing with a certificate folder in a formal chamber",
    caption: "Recognition ceremony",
    aspectRatio: 1.3333,
  },
  {
    slug: "award-presentation",
    category: "Research & Recognition",
    thumbSrc: "/gallery/thumb/award-presentation.jpg",
    fullSrc: "/gallery/full/award-presentation.jpg",
    alt: "Receiving a certificate folder during an award presentation",
    caption: "Award presentation",
    aspectRatio: 1.0102,
  },

  // Programs
  {
    slug: "gset-closing-ceremony",
    category: "Programs",
    thumbSrc: "/gallery/thumb/gset-closing-ceremony.jpg",
    fullSrc: "/gallery/full/gset-closing-ceremony.jpg",
    alt: "At the UCI GATI GSET 2024 closing ceremony",
    caption: "GSET closing ceremony",
    aspectRatio: 0.7531,
  },
  {
    slug: "gset-closing-group",
    category: "Programs",
    thumbSrc: "/gallery/thumb/gset-closing-group.jpg",
    fullSrc: "/gallery/full/gset-closing-group.jpg",
    alt: "Group photo at the GSET 2024 closing ceremony",
    aspectRatio: 1.3289,
  },
  {
    slug: "cosmos-fountain-group",
    category: "Programs",
    thumbSrc: "/gallery/thumb/cosmos-fountain-group.jpg",
    fullSrc: "/gallery/full/cosmos-fountain-group.jpg",
    alt: "Four COSMOS students standing together in front of a fountain",
    caption: "COSMOS",
    aspectRatio: 1.3333,
  },
  {
    slug: "summer-program-boba-group",
    category: "Programs",
    thumbSrc: "/gallery/thumb/summer-program-boba-group.jpg",
    fullSrc: "/gallery/full/summer-program-boba-group.jpg",
    alt: "A group of students posing together inside a boba shop",
    aspectRatio: 1.3333,
  },
  {
    slug: "tech-for-seniors-presentation",
    category: "Programs",
    thumbSrc: "/gallery/thumb/tech-for-seniors-presentation.jpg",
    fullSrc: "/gallery/full/tech-for-seniors-presentation.jpg",
    alt: "Presenting Tech for Seniors with a laptop demo to residents",
    caption: "Tech for Seniors",
    aspectRatio: 1.7778,
  },
  {
    slug: "tech-for-seniors-workshop",
    category: "Programs",
    thumbSrc: "/gallery/thumb/tech-for-seniors-workshop.jpg",
    fullSrc: "/gallery/full/tech-for-seniors-workshop.jpg",
    alt: "Sharing photos with residents during a Tech for Seniors visit",
    aspectRatio: 1.3278,
  },
  {
    slug: "seniors-phone-session",
    category: "Programs",
    thumbSrc: "/gallery/thumb/seniors-phone-session.jpg",
    fullSrc: "/gallery/full/seniors-phone-session.jpg",
    alt: "Helping an older adult with a smartphone in a community lounge",
    aspectRatio: 1.3333,
  },

  // Travel
  {
    slug: "san-francisco-bay-view",
    category: "Travel",
    thumbSrc: "/gallery/thumb/san-francisco-bay-view.jpg",
    fullSrc: "/gallery/full/san-francisco-bay-view.jpg",
    alt: "Looking across the water toward the San Francisco skyline from a ship",
    caption: "San Francisco",
    aspectRatio: 1.3333,
  },
  {
    slug: "waterway-overlook",
    category: "Travel",
    thumbSrc: "/gallery/thumb/waterway-overlook.jpg",
    fullSrc: "/gallery/full/waterway-overlook.jpg",
    alt: "Looking out over a waterway with ferries from a terrace",
    aspectRatio: 1.7774,
  },
  {
    slug: "mountain-overlook",
    category: "Travel",
    thumbSrc: "/gallery/thumb/mountain-overlook.jpg",
    fullSrc: "/gallery/full/mountain-overlook.jpg",
    alt: "Arms outstretched at a mountain overlook above a lake",
    aspectRatio: 0.75,
  },
  {
    slug: "beach-pier",
    category: "Travel",
    thumbSrc: "/gallery/thumb/beach-pier.jpg",
    fullSrc: "/gallery/full/beach-pier.jpg",
    alt: "Standing on a beach with a pier across the water",
    aspectRatio: 0.75,
  },
  {
    slug: "hilton-hawaiian-village",
    category: "Travel",
    thumbSrc: "/gallery/thumb/hilton-hawaiian-village.jpg",
    fullSrc: "/gallery/full/hilton-hawaiian-village.jpg",
    alt: "Taking a selfie beside the Hilton Hawaiian Village waterfall sign",
    caption: "Hilton Hawaiian Village",
    aspectRatio: 1.3333,
  },
  {
    slug: "travel-square-portrait",
    category: "Travel",
    thumbSrc: "/gallery/thumb/travel-square-portrait.jpg",
    fullSrc: "/gallery/full/travel-square-portrait.jpg",
    alt: "Standing in a large public square with twin-domed churches behind",
    aspectRatio: 0.75,
  },
  {
    slug: "market-street-walk",
    category: "Travel",
    thumbSrc: "/gallery/thumb/market-street-walk.jpg",
    fullSrc: "/gallery/full/market-street-walk.jpg",
    alt: "Walking down a narrow market street lined with shops and colorful umbrellas",
    aspectRatio: 1.7774,
  },
  {
    slug: "sunset-overlook",
    category: "Travel",
    thumbSrc: "/gallery/thumb/sunset-overlook.jpg",
    fullSrc: "/gallery/full/sunset-overlook.jpg",
    alt: "Silhouette against a sunset over a valley",
    aspectRatio: 1.3333,
  },
  {
    slug: "museum-gallery",
    category: "Travel",
    thumbSrc: "/gallery/thumb/museum-gallery.jpg",
    fullSrc: "/gallery/full/museum-gallery.jpg",
    alt: "Standing in a museum gallery between colorful exhibit walls",
    aspectRatio: 1.7774,
  },
  {
    slug: "night-flight-laptop",
    category: "Travel",
    thumbSrc: "/gallery/thumb/night-flight-laptop.jpg",
    fullSrc: "/gallery/full/night-flight-laptop.jpg",
    alt: "Laptop open to a code editor on a night flight",
    aspectRatio: 0.75,
  },

  // Behind the Scenes
  {
    slug: "violin-performance",
    category: "Behind the Scenes",
    thumbSrc: "/gallery/thumb/violin-performance.jpg",
    fullSrc: "/gallery/full/violin-performance.jpg",
    alt: "Playing violin in formal concert attire",
    caption: "Violin",
    aspectRatio: 0.6675,
  },
  {
    slug: "piano-under-stage-lights",
    category: "Behind the Scenes",
    thumbSrc: "/gallery/thumb/piano-under-stage-lights.jpg",
    fullSrc: "/gallery/full/piano-under-stage-lights.jpg",
    alt: "Playing a grand piano under colorful stage lights",
    caption: "Piano",
    aspectRatio: 1.3333,
  },
  {
    slug: "orchestra-performance",
    category: "Behind the Scenes",
    thumbSrc: "/gallery/thumb/orchestra-performance.jpg",
    fullSrc: "/gallery/full/orchestra-performance.jpg",
    alt: "Violin section during an orchestra performance",
    aspectRatio: 0.667,
  },
  {
    slug: "dog-at-home",
    category: "Behind the Scenes",
    thumbSrc: "/gallery/thumb/dog-at-home.jpg",
    fullSrc: "/gallery/full/dog-at-home.jpg",
    alt: "Relaxing at home with a small dog",
    aspectRatio: 0.75,
  },
  {
    slug: "beach-friends",
    category: "Behind the Scenes",
    thumbSrc: "/gallery/thumb/beach-friends.jpg",
    fullSrc: "/gallery/full/beach-friends.jpg",
    alt: "Friends standing together at the edge of the ocean",
    aspectRatio: 1.3394,
  },
  {
    slug: "clothing-donation",
    category: "Behind the Scenes",
    thumbSrc: "/gallery/thumb/clothing-donation.jpg",
    fullSrc: "/gallery/full/clothing-donation.jpg",
    alt: "Standing beside boxes of donated clothing outside a community building",
    caption: "Clothing donation",
    aspectRatio: 1.3333,
  },
  {
    slug: "group-coding-session",
    category: "Behind the Scenes",
    thumbSrc: "/gallery/thumb/group-coding-session.jpg",
    fullSrc: "/gallery/full/group-coding-session.jpg",
    alt: "Students working together around a table with laptops",
    aspectRatio: 1.3333,
  },
  {
    slug: "community-cleanup",
    category: "Behind the Scenes",
    thumbSrc: "/gallery/thumb/community-cleanup.jpg",
    fullSrc: "/gallery/full/community-cleanup.jpg",
    alt: "Friends carrying trash bags during a community cleanup",
    caption: "Community cleanup",
    aspectRatio: 1.3333,
  },
  {
    slug: "raspberry-pi-prototype",
    category: "Behind the Scenes",
    thumbSrc: "/gallery/thumb/raspberry-pi-prototype.jpg",
    fullSrc: "/gallery/full/raspberry-pi-prototype.jpg",
    alt: "Raspberry Pi wired to a breadboard and ultrasonic sensor",
    aspectRatio: 0.75,
  },
];
