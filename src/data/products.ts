export type SectionId = 'marketplace' | 'services' | 'membership';

export interface Category {
  id: string;
  name: string;
  section: SectionId;
  description: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  numericPrice: number;
  category: string;
  section: SectionId;
  format: string;
  ctaText: string;
  imageUrl: string;
  rating: number;
  reviews: number;
  sales: number;
  badge?: string;
  author: string;
}

export const categories: Category[] = [
  // Marketplace
  { id: 'books', name: 'Books & Publications', section: 'marketplace', description: 'E-books and print-on-demand physical books.' },
  { id: 'audio', name: 'Audio Products', section: 'marketplace', description: 'Audio reflections, series, and downloadable lectures.' },
  { id: 'video', name: 'Video Products', section: 'marketplace', description: 'Video lectures and standalone video series.' },
  { id: 'podcasts', name: 'Podcasts', section: 'marketplace', description: 'Premium podcast access and complete archives.' },
  { id: 'apparel', name: 'Apparel', section: 'marketplace', description: 'Themed apparel and merchandise.' },
  { id: 'toolkits', name: 'Toolkits', section: 'marketplace', description: 'Frameworks, templates, and assessment tools.' },
  { id: 'courses', name: 'Courses', section: 'marketplace', description: 'Comprehensive online masterclasses and guided learning.' },
  
  // Services
  { id: 'consulting', name: 'Consulting', section: 'services', description: '1-on-1 strategy sessions and organizational audits.' },
  { id: 'speaking', name: 'Speaking', section: 'services', description: 'Keynotes and executive workshops for events.' },
  { id: 'organizational-development', name: 'Organizational Development', section: 'services', description: 'Enterprise culture transformation and training.' },
  { id: 'faculty-services', name: 'Faculty Services', section: 'services', description: 'Academic program design and scholarly coaching.' },

  // Membership
  { id: 'membership', name: 'Membership', section: 'membership', description: 'Exclusive collective access and ongoing community.' },
];

const AUTHOR = "Dr. William Triplett";

export const products: Product[] = [
  // Books
  {
    id: 'book-sacred-resistance-ebook',
    title: 'Sacred Resistance (eBook)',
    description: 'A comprehensive guide to ethical leadership and sacred resistance in the modern world.',
    price: '$29.99',
    numericPrice: 29.99,
    category: 'books',
    section: 'marketplace',
    format: 'Digital Download',
    ctaText: 'Buy Now',
    imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviews: 128,
    sales: 1450,
    badge: 'Bestseller',
    author: AUTHOR
  },
  {
    id: 'book-sacred-resistance-paperback',
    title: 'Sacred Resistance (Paperback)',
    description: 'Print-on-demand paperback edition of Sacred Resistance.',
    price: '$39.99',
    numericPrice: 39.99,
    category: 'books',
    section: 'marketplace',
    format: 'Print-on-Demand',
    ctaText: 'Buy Now',
    imageUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviews: 85,
    sales: 890,
    author: AUTHOR
  },
  
  // Audio
  {
    id: 'audio-sacred-resistance',
    title: 'Sacred Resistance – Audio Reflections Series',
    description: 'Audio reflections exploring the themes of Sacred Resistance.',
    price: '$59.00',
    numericPrice: 59.00,
    category: 'audio',
    section: 'marketplace',
    format: 'Audio Series',
    ctaText: 'Buy Now',
    imageUrl: 'https://images.unsplash.com/photo-1619983081563-430f63602796?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    reviews: 42,
    sales: 320,
    author: AUTHOR
  },
  {
    id: 'audio-leadership-ethics',
    title: 'Leadership Ethics Audio Course',
    description: 'An in-depth audio course on ethical leadership principles.',
    price: '$149.00',
    numericPrice: 149.00,
    category: 'audio',
    section: 'marketplace',
    format: 'Audio Series',
    ctaText: 'Buy Now',
    imageUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviews: 215,
    sales: 1100,
    badge: 'Highly Rated',
    author: AUTHOR
  },

  // Video
  {
    id: 'video-ethical-leadership',
    title: 'Ethical Leadership in a Digital Age',
    description: 'Comprehensive video course on navigating ethical challenges in the digital era.',
    price: '$349.00',
    numericPrice: 349.00,
    category: 'video',
    section: 'marketplace',
    format: 'Video Course',
    ctaText: 'Buy Now',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
    rating: 5.0,
    reviews: 89,
    sales: 450,
    badge: 'Premium',
    author: AUTHOR
  },
  {
    id: 'video-sacred-resistance-lecture',
    title: 'Sacred Resistance Lecture Series',
    description: 'A series of video lectures expanding on the Sacred Resistance framework.',
    price: '$199.00',
    numericPrice: 199.00,
    category: 'video',
    section: 'marketplace',
    format: 'Video Course',
    ctaText: 'Buy Now',
    imageUrl: 'https://images.unsplash.com/photo-1475721025505-231223114ce3?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviews: 64,
    sales: 280,
    author: AUTHOR
  },

  // Podcasts
  {
    id: 'podcast-sacred-resistance-monthly',
    title: 'Sacred Resistance Podcast (Monthly)',
    description: 'Premium monthly access to the Sacred Resistance Podcast.',
    price: '$15.00 / month',
    numericPrice: 15.00,
    category: 'podcasts',
    section: 'marketplace',
    format: 'Subscription',
    ctaText: 'Subscribe',
    imageUrl: 'https://images.unsplash.com/photo-1589903308904-1010c2294adc?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviews: 142,
    sales: 850,
    author: AUTHOR
  },
  {
    id: 'podcast-sacred-resistance-yearly',
    title: 'Sacred Resistance Podcast (Yearly Premium)',
    description: 'Premium yearly access to the Sacred Resistance Podcast.',
    price: '$149.00 / year',
    numericPrice: 149.00,
    category: 'podcasts',
    section: 'marketplace',
    format: 'Subscription',
    ctaText: 'Subscribe',
    imageUrl: 'https://images.unsplash.com/photo-1589903308904-1010c2294adc?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviews: 312,
    sales: 2100,
    badge: 'Popular',
    author: AUTHOR
  },
  {
    id: 'podcast-archive',
    title: 'Podcast Archive Access',
    description: 'Lifetime access to the complete podcast archive.',
    price: '$79.00',
    numericPrice: 79.00,
    category: 'podcasts',
    section: 'marketplace',
    format: 'Digital Download',
    ctaText: 'Buy Now',
    imageUrl: 'https://images.unsplash.com/photo-1559523182-a284c3fb7cff?auto=format&fit=crop&q=80&w=800',
    rating: 4.6,
    reviews: 45,
    sales: 190,
    author: AUTHOR
  },

  // Apparel
  {
    id: 'apparel-sacred-resistance',
    title: '"Sacred Resistance" T-Shirt',
    description: 'Premium print-on-demand t-shirt from the Sacred Resistance Collection.',
    price: '$34.99',
    numericPrice: 34.99,
    category: 'apparel',
    section: 'marketplace',
    format: 'Print-on-Demand',
    ctaText: 'Buy Now',
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800',
    rating: 4.5,
    reviews: 28,
    sales: 150,
    author: AUTHOR
  },
  {
    id: 'apparel-faith-justice',
    title: '"Faith. Justice. Action." T-Shirt',
    description: 'Premium print-on-demand t-shirt.',
    price: '$34.99',
    numericPrice: 34.99,
    category: 'apparel',
    section: 'marketplace',
    format: 'Print-on-Demand',
    ctaText: 'Buy Now',
    imageUrl: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviews: 15,
    sales: 85,
    author: AUTHOR
  },

  // Academy: Courses
  {
    id: 'course-ethical-leadership',
    title: 'Ethical Leadership in a Digital Age',
    description: 'A comprehensive online course.',
    price: '$299.00',
    numericPrice: 299.00,
    category: 'courses',
    section: 'marketplace',
    format: 'Video Course',
    ctaText: 'Enroll Now',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviews: 115,
    sales: 520,
    author: AUTHOR
  },
  {
    id: 'course-human-centered',
    title: 'Human-Centered Leadership Masterclass',
    description: 'Advanced masterclass on human-centered leadership approaches.',
    price: '$399.00',
    numericPrice: 399.00,
    category: 'courses',
    section: 'marketplace',
    format: 'Video Course',
    ctaText: 'Enroll Now',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
    rating: 5.0,
    reviews: 142,
    sales: 680,
    badge: 'Masterclass',
    author: AUTHOR
  },

  // Market: Toolkits
  {
    id: 'toolkit-ethical-decision',
    title: 'Ethical Decision-Making Toolkit',
    description: 'Practical tools and frameworks for ethical decision making.',
    price: '$129.00',
    numericPrice: 129.00,
    category: 'toolkits',
    section: 'marketplace',
    format: 'Digital Download',
    ctaText: 'Buy Now',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    reviews: 56,
    sales: 420,
    author: AUTHOR
  },
  {
    id: 'toolkit-leadership-assessment',
    title: 'Leadership Assessment Framework',
    description: 'Comprehensive framework for assessing leadership capabilities.',
    price: '$149.00',
    numericPrice: 149.00,
    category: 'toolkits',
    section: 'marketplace',
    format: 'Digital Download',
    ctaText: 'Buy Now',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviews: 88,
    sales: 610,
    author: AUTHOR
  },

  // Consulting
  {
    id: 'consulting-strategy-session',
    title: 'Leadership Strategy Session (60 mins)',
    description: 'One-on-one leadership strategy and coaching session.',
    price: '$350.00',
    numericPrice: 350.00,
    category: 'consulting',
    section: 'services',
    format: 'Live Session',
    ctaText: 'Book Session',
    imageUrl: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800',
    rating: 5.0,
    reviews: 84,
    sales: 210,
    badge: '1-on-1',
    author: AUTHOR
  },
  {
    id: 'consulting-culture-audit',
    title: 'Organizational Ethics & Culture Audit',
    description: 'Comprehensive audit of organizational ethics and culture.',
    price: 'Starting at $3,500',
    numericPrice: 3500.00,
    category: 'consulting',
    section: 'services',
    format: 'Institutional Engagement',
    ctaText: 'Request Proposal',
    imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=800',
    rating: 5.0,
    reviews: 12,
    sales: 35,
    badge: 'Enterprise',
    author: AUTHOR
  },

  // Consulting: Speaking
  {
    id: 'speaking-keynote',
    title: 'Keynote Address',
    description: 'Inspiring keynote address for your next event or conference.',
    price: 'Starting at $5,000',
    numericPrice: 5000.00,
    category: 'speaking',
    section: 'services',
    format: 'Live Session',
    ctaText: 'Request Booking',
    imageUrl: 'https://images.unsplash.com/photo-1475721025505-231223114ce3?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviews: 48,
    sales: 120,
    author: AUTHOR
  },
  {
    id: 'speaking-executive-workshop',
    title: 'Executive Workshop',
    description: 'Interactive workshop designed for executive teams.',
    price: 'Starting at $7,500',
    numericPrice: 7500.00,
    category: 'speaking',
    section: 'services',
    format: 'Live Session',
    ctaText: 'Request Booking',
    imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800',
    rating: 5.0,
    reviews: 32,
    sales: 85,
    author: AUTHOR
  },

  // Institutional: Organizational Development
  {
    id: 'od-training-engagement',
    title: 'Organizational Development & Training Engagement',
    description: 'Customized organizational assessment, leadership alignment, and training implementation.',
    price: 'Starting at $7,500',
    numericPrice: 7500.00,
    category: 'organizational-development',
    section: 'services',
    format: 'Institutional Engagement',
    ctaText: 'Request Engagement',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
    rating: 5.0,
    reviews: 18,
    sales: 42,
    badge: 'Institutional',
    author: AUTHOR
  },
  {
    id: 'od-culture-transformation',
    title: 'Leadership & Culture Transformation Program',
    description: 'Multi-session leadership development and culture transformation initiative.',
    price: 'Starting at $12,000',
    numericPrice: 12000.00,
    category: 'organizational-development',
    section: 'services',
    format: 'Institutional Engagement',
    ctaText: 'Request Engagement',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
    rating: 5.0,
    reviews: 9,
    sales: 24,
    badge: 'Institutional',
    author: AUTHOR
  },
  {
    id: 'od-cyber-ethics',
    title: 'Cyber, Ethics, & Digital Transformation Advisory',
    description: 'Advisory services focused on ethics, cybersecurity leadership, and digital change management.',
    price: 'Starting at $15,000',
    numericPrice: 15000.00,
    category: 'organizational-development',
    section: 'services',
    format: 'Institutional Engagement',
    ctaText: 'Request Engagement',
    imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800',
    rating: 5.0,
    reviews: 5,
    sales: 14,
    badge: 'Institutional',
    author: AUTHOR
  },

  // Institutional: Faculty Services
  {
    id: 'faculty-development-workshop',
    title: 'Faculty Development Workshop',
    description: 'Professional development workshops on AI-enhanced teaching, ethics, curriculum innovation, and leadership.',
    price: 'Starting at $4,500',
    numericPrice: 4500.00,
    category: 'faculty-services',
    section: 'services',
    format: 'Live Session',
    ctaText: 'Request Booking',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviews: 34,
    sales: 85,
    author: AUTHOR
  },
  {
    id: 'faculty-learning-series',
    title: 'Faculty Learning Series (3–5 Sessions)',
    description: 'Cohort-based faculty development series delivered across a semester or academic year.',
    price: 'Starting at $9,500',
    numericPrice: 9500.00,
    category: 'faculty-services',
    section: 'services',
    format: 'Institutional Engagement',
    ctaText: 'Request Engagement',
    imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800',
    rating: 5.0,
    reviews: 11,
    sales: 28,
    badge: 'Cohort',
    author: AUTHOR
  },
  {
    id: 'faculty-mentoring',
    title: 'Faculty Mentoring & Scholarly Coaching Program',
    description: 'Guided faculty support for writing, publishing, promotion, and leadership growth.',
    price: '$2,500 per faculty cohort',
    numericPrice: 2500.00,
    category: 'faculty-services',
    section: 'services',
    format: 'Live Session',
    ctaText: 'Enroll Faculty',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800',
    rating: 5.0,
    reviews: 22,
    sales: 45,
    author: AUTHOR
  },
  {
    id: 'faculty-program-design',
    title: 'Academic Program Design & Review',
    description: 'Degree program design, curriculum mapping, accreditation alignment, and interdisciplinary program review.',
    price: 'Starting at $18,000',
    numericPrice: 18000.00,
    category: 'faculty-services',
    section: 'services',
    format: 'Institutional Engagement',
    ctaText: 'Request Proposal',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
    rating: 5.0,
    reviews: 4,
    sales: 12,
    badge: 'Institutional',
    author: AUTHOR
  },

  // Academy: Membership
  {
    id: 'membership-monthly',
    title: 'Leadership & Ethics Collective (Monthly)',
    description: 'Monthly membership to the Leadership & Ethics Collective.',
    price: '$59.00 / month',
    numericPrice: 59.00,
    category: 'membership',
    section: 'membership',
    format: 'Subscription',
    ctaText: 'Join Now',
    imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviews: 45,
    sales: 320,
    author: AUTHOR
  },
  {
    id: 'membership-yearly',
    title: 'Leadership & Ethics Collective (Yearly)',
    description: 'Yearly membership to the Leadership & Ethics Collective.',
    price: '$599.00 / year',
    numericPrice: 599.00,
    category: 'membership',
    section: 'membership',
    format: 'Subscription',
    ctaText: 'Join Now',
    imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviews: 156,
    sales: 890,
    badge: 'Best Value',
    author: AUTHOR
  }
];
