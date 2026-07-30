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
    slug: "recognition-ceremony",
    category: "Research & Recognition",
    thumbSrc: "/gallery/thumb/recognition-ceremony.jpg",
    fullSrc: "/gallery/full/recognition-ceremony.jpg",
    alt: "Standing with a certificate folder in a formal chamber",
    caption: "Recognition ceremony",
    aspectRatio: 1.3333,
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
    slug: "travel-square-portrait",
    category: "Travel",
    thumbSrc: "/gallery/thumb/travel-square-portrait.jpg",
    fullSrc: "/gallery/full/travel-square-portrait.jpg",
    alt: "Standing in a large public square with twin-domed churches behind",
    aspectRatio: 0.75,
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
    slug: "orchestra-performance",
    category: "Behind the Scenes",
    thumbSrc: "/gallery/thumb/orchestra-performance.jpg",
    fullSrc: "/gallery/full/orchestra-performance.jpg",
    alt: "Violin section during an orchestra performance",
    aspectRatio: 0.667,
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
