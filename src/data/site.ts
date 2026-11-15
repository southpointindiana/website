// ─────────────────────────────────────────────────────────────────────────────
// SINGLE SOURCE OF TRUTH for church-wide facts.
//
// Service times, address, phone, links, leadership, and navigation all live
// here and are reused on every page. Change something once in this file and
// it updates everywhere. Never hard-code these values in a page or component.
// ─────────────────────────────────────────────────────────────────────────────

export const site = {
  name: 'South Point Church',
  shortName: 'South Point',
  location: 'New Albany, Indiana',
  description:
    'South Point Church is an elder-led, congregational Baptist church in New Albany, Indiana — encouraging and equipping one another to grow, serve, and go for the glory of God.',

  /** The mission statement. `**double asterisks**` are not supported here; the
   *  words grow / serve / go are highlighted automatically where it is shown. */
  mission: 'Encouraging and equipping one another to grow, serve, and go for the glory of God.',
  vision:
    'To see members of South Point leveraging their lives for Christ, as they are sent out to proclaim the glory of God and the transforming power of the gospel, in every place they are called to go.',

  contact: {
    street: '7315 County Line Rd',
    cityStateZip: 'New Albany, IN 47150',
    mapUrl: 'https://goo.gl/maps/kvhcC3aJL8BDx6j76',
    phone: '(812) 202-6050',
    phoneHref: 'tel:+18122026050',
    email: 'office@southpointindiana.org',
  },

  /** YouTube channel ID (starts with "UC"). Powers the embedded sermon player. */
  youtubeChannelId: 'UC29SYQwyV5q4uxfqbcZtqfw',

  links: {
    events: 'https://southpointindiana.churchcenter.com/calendar?view=gallery',
    give: 'https://southpointindiana.churchcenter.com/giving',
    sermons: 'https://www.youtube.com/@southpointsermons',
    facebook: 'https://www.facebook.com/people/South-Point-Church/61565726974054/',
    prayerForm: 'https://forms.gle/uiGKK592dvfhvqFx8',
    beliefs: 'https://bfm.sbc.net/bfm2000/',
  },
} as const;

/** Top navigation. `external: true` opens in a new tab and shows an arrow. */
export const nav = [
  { label: 'About', href: '/about' },
  { label: 'Ministries', href: '/ministries' },
  { label: 'Events', href: site.links.events, external: true },
  { label: 'Pray', href: '/pray' },
] as const;

/** Weekly gatherings. Shown on the home page (short) and About page (full). */
export const gatherings = [
  {
    id: 'south-point-university',
    day: 'Sundays',
    time: '9:00am',
    name: 'Discipleship Classes',
    kicker: 'South Point University',
    short: 'Structured, multi-week journeys through Scripture for every age.',
    extraTimes: [] as string[],
    body: [
      'Engage in a structured journey through Scripture that unfolds over several weeks, designed to equip you with practical skills in reading the Bible and following Jesus. These courses invite you to deepen your understanding of God’s Word and apply its truths to everyday life.',
    ],
  },
  {
    id: 'worship-service',
    day: 'Sundays',
    time: '10:30am',
    name: 'Worship Service',
    kicker: 'Our main gathering',
    short: 'Christ-centered preaching, prayer, Scripture reading, and song.',
    extraTimes: ['First Sunday evening of each month at 6:30pm'],
    body: [
      'In our worship services, we desire to worship the Triune God through the preaching and application of His Word, prayer, Scripture reading, song, and enjoying the unity of Christian fellowship.',
      'Since Christ is our Great High Priest and Mediator, and since He is the focal point of Scripture and all of history, our time together is Christ-centered. We preach Christ, we proclaim Christ, we worship Christ, we pray to Christ, we trust in Christ, and therefore we submit to Christ.',
      'While everyone is welcome and encouraged to attend, the service is directed to God, and serves to encourage and equip the saints.',
    ],
  },
  {
    id: 'midweek',
    day: 'Wednesdays',
    time: '6:30pm',
    name: 'Midweek at South Point',
    kicker: 'Singing · Prayer · Scripture · Fellowship',
    short: 'Putting into practice what we learn from Scripture, together.',
    extraTimes: [] as string[],
    body: [
      'Each week, we engage in a variety of disciplines that will equip and encourage you to live as followers of Christ. From focused prayer, to instruction and discussion, to community engagement and Christian fellowship, Midweek at South Point is designed to put into practice what we learn from Scripture.',
    ],
  },
];

/** Leadership. Photos live in src/assets/leaders/<photo>.jpg */
export const leaders = [
  { name: 'Dan Conrades', role: 'Lead Pastor', photo: 'dan-conrades' },
  { name: 'Dusty Feldmann', role: 'Operations Pastor', photo: 'dusty-feldmann' },
  { name: 'Elliot Cameron', role: 'Elder', photo: 'elliot-cameron' },
  { name: 'Michael Bailey', role: 'Elder', photo: 'michael-bailey' },
];

/** Ministries and organizations we support or align with. */
export const affiliations = ['9Marks', 'RTIM', 'Cru', 'Re:Center Ministries', 'Practical Shepherding'];

/** The Manger Shop — schedule shown on /ministries/manger-shop. */
export const mangerShop = {
  tagline: 'Providing basics for babies and encouragement for caregivers.',
  hours: [
    { when: 'First Wednesday of each month', time: '4:00 – 6:00pm' },
    { when: 'Third Friday of each month', time: '10:00am – 12:00pm' },
  ],
};
