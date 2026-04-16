type InputJsonValue = string | number | boolean | InputJsonValue[] | { [key: string]: InputJsonValue } | { toJSON(): unknown };

type SingletonSeed = { key: string; value: InputJsonValue };
type CollectionSeed = {
  collection: string;
  slug?: string;
  title: string;
  subtitle?: string;
  body?: string;
  imageUrl?: string;
  linkUrl?: string;
  metadata?: InputJsonValue;
  sortOrder: number;
};

export const DEFAULT_SINGLETONS: SingletonSeed[] = [
  {
    key: "site.config",
    value: {
      siteTitle: "Kuleta",
      siteDescription:
        "Shop authentic African products. Kuleta connects you directly with women-led businesses across the continent.",
      shopBaseUrl: "https://shop.kuleta.io",
      contactEmail: "info@kuleta.io",
      socials: {
        instagram: "https://www.instagram.com/kuleta.io/",
        linkedin: "https://www.linkedin.com/company/kuleta/",
      },
    },
  },
  {
    key: "navigation.header",
    value: {
      menu: [
        { label: "Home", path: "/" },
        { label: "Shop", path: "https://shop.kuleta.io" },
        { label: "About Us", path: "/about" },
        { label: "Kuza Dada", path: "/kuza-dada" },
        { label: "Contact", path: "/contact" },
      ],
      dropdown: [
        { label: "Shop", path: "https://shop.kuleta.io" },
        { label: "Join Our Newsletter", path: "/get-involved" },
        { label: "Meet the Team", path: "/team" },
        { label: "Advisory Board", path: "/advisory-board" },
        { label: "FAQ", path: "/faq" },
      ],
    },
  },
  {
    key: "navigation.footer",
    value: {
      shopLinks: [
        { label: "Shop", path: "https://shop.kuleta.io" },
        { label: "Categories", path: "/#categories" },
        { label: "Featured Products", path: "/#featured-products" },
        { label: "About", path: "/about" },
      ],
      contactLinks: [{ label: "Contact", path: "/contact" }],
    },
  },
  {
    key: "footer.brand",
    value: {
      logoUrl: "/assets/logo.png",
      tagline: "Bringing the local African Market to the world",
      copyright: "2026 Kuleta Inc. All rights reserved.",
      newsletterTitle: "Newsletter",
      newsletterPlaceholder: "Your email",
    },
  },
  {
    key: "home.announcement",
    value: { message: "" },
  },
  {
    key: "home.hero",
    value: {
      headlineBefore: "Bringing the local",
      highlighted: "African Market",
      headlineAfter: "to the world",
      backgroundImage: "/assets/b968a02aa95c98f64d11bb742ce5b76a609a84a9.png",
    },
  },
  {
    key: "home.content",
    value: {
      categoriesTitle: "Shop by Category",
      categoriesCtaLabel: "Shop Now",
      featuredTitle: "Featured Products",
      ourStoryTitle: "Our Story",
      kuzaTitle: "Kuza Dada",
      reviewQuote:
        "",
      reviewAuthor: "Kuleta Customer",
    },
  },
  {
    key: "about.page",
    value: {
      heroTitle: "About Kuleta",
      heroSubtitle:
        "Connecting the vibrant markets of Africa with the world through authentic products and empowered communities.",
      missionTitle: "Our Mission",
      missionText:
        "To deliver authentic, high-quality African products to global consumers through a trusted marketplace connecting customers directly to women-led businesses, ensuring fair value, reliable delivery, and meaningful impact with every purchase.",
      visionTitle: "Our Vision",
      visionText:
        "A global marketplace where customers everywhere can easily access authentic African goods they trust, through expanded market reach, sustainable income, and long-term economic opportunity.",
      ctaTitle: "Join Our Journey",
      ctaText:
        "Whether you're a customer looking for authentic African products or a vendor wanting to share your craft with the world, we'd love to have you be part of the Kuleta family.",
      ctaLabel: "Start Shopping",
      ctaLink: "https://shop.kuleta.io",
    },
  },
  {
    key: "about.story",
    value: {
      heading: "Our Story",
      paragraphs: [
        "Kuleta was born from a deeply personal and common experience that revealed a larger gap faced by millions who shop in, the global market.",
        "When Manda's mother was preparing for his eldest brother's wedding, she wanted a dress that reflected who she was, something authentic, culturally rooted, and made back home. What should have been a simple process turned into weeks of uncertainty.",
        "This was a reminder of how disconnected global commerce still is from the lived realities of global communities. Despite strong demand, purchasing meaningful products from Africa often relies on informal channels, personal favors, or suitcase trade.",
        "Kuleta was created to change that.",
        "Today, Kuleta enables customers in the U.S. to shop intentionally, accessing authentic, shelf-stable goods and cultural products with confidence.",
      ],
    },
  },
  {
    key: "contact.page",
    value: {
      heroTitle: "Get In Touch",
      heroSubtitle:
        "Have a question or want to learn more about Kuleta? We'd love to hear from you!",
      formTitle: "Send Us a Message",
      formSuccessMessage: "Thank you for contacting us! We'll get back to you within 24 hours.",
      mapEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2970.7346729171893!2d-87.64153892346498!3d41.86973297124021!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e2cb9c4f4f4f5%3A0x4b4b4b4b4b4b4b4b!2s1130%20S%20Canal%20St%2C%20Chicago%2C%20IL%2060607!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus",
      faqTitle: "Frequently Asked Questions",
      faqDescription:
        "Looking for quick answers? Check out our FAQ section for common questions about orders, shipping, and more.",
      socialTitle: "Follow Us",
      socialDescription:
        "Stay connected with us on social media for updates, new products, and community stories.",
      subjectOptions: ["general", "order", "partnership", "other"],
    },
  },
  {
    key: "faq.page",
    value: {
      title: "Frequently Asked Questions",
      subtitle:
        "Find answers to common questions about Kuleta, our products, shipping, and more.",
    },
  },
  {
    key: "team.page",
    value: {
      title: "Meet The Team",
      subtitle:
        "Our passionate team is dedicated to revolutionizing African commerce and connecting businesses with customers worldwide.",
    },
  },
  {
    key: "advisory.page",
    value: {
      title: "Advisory Board",
      subtitle:
        "World-class advisors guiding our mission to transform African commerce and create lasting impact across the continent.",
      quote:
        "Our advisory board represents decades of combined experience in finance, international trade, diplomacy, and sustainable development.",
      quoteAuthor: "Kuleta Leadership Team",
    },
  },
  {
    key: "kuza.page",
    value: {
      heroTitle: "Kuza Dada",
      heroSubtitle: "Building a new wave of women entrepreneurs across Africa",
      heroBody:
        "Kuza Dada, the non-profit arm of Kuleta, is dedicated to empowering African women through entrepreneurship training, mentorship, and direct market access.",
      heroImage: "/assets/29d4542c8b108e0389991c23b1a793f7d500fb00.png",
      videoUrl: "",
      missionTitle: "Our Mission",
      missionBody:
        "To empower African women with the skills, resources, and opportunities they need to build successful businesses, create economic independence, and drive positive change in their communities.",
      getInvolvedTitle: "Get Involved",
      getInvolvedBody:
        "Join us in empowering the next generation of African women entrepreneurs.",
      getInvolvedLabel: "Get Involved",
    },
  },
  {
    key: "get-involved.page",
    value: {
      title: "Join Our Community",
      subtitle:
        "Be part of our movement. Share your information to get involved with Kuleta and learn about exclusive opportunities, updates, and ways to make an impact.",
      successMessage: "Thank you for joining our waitlist! We'll be in touch soon.",
      privacyMessage:
        "We respect your privacy and will never share your information with third parties.",
      expectationTitle: "What to Expect:",
      interestOptions: [
        { value: "buyer", label: "I want to buy African products" },
        { value: "seller", label: "I want to sell my products" },
        { value: "volunteer", label: "I want to volunteer" },
        { value: "donate", label: "I want to donate/support" },
        { value: "mentor", label: "I want to be a mentor" },
        { value: "partnership", label: "I'm interested in partnership opportunities" },
        { value: "other", label: "Other" },
      ],
      expectations: [
        "Updates on new products and collections",
        "Exclusive subscriber discounts and special offers",
        "Behind-the-scenes stories from African artisans",
        "Early access to sales and limited edition items",
      ],
    },
  },
];

export const DEFAULT_COLLECTION_ITEMS: CollectionSeed[] = [
  {
    collection: "contact.cards",
    slug: "email",
    title: "Email",
    subtitle: "info@kuleta.io",
    body: "Send us an email anytime",
    linkUrl: "mailto:info@kuleta.io",
    metadata: { icon: "mail" },
    sortOrder: 1,
  },
  {
    collection: "contact.cards",
    slug: "phone",
    title: "Phone",
    subtitle: "+1 (502)319-2096",
    body: "Mon-Fri from 9am to 6pm CST",
    linkUrl: "tel:+15023192096",
    metadata: { icon: "phone" },
    sortOrder: 2,
  },
  {
    collection: "contact.cards",
    slug: "office",
    title: "Office",
    subtitle: "1130 South Canal Street, #1591 Chicago, IL 60607",
    body: "Visit our headquarters",
    linkUrl: "#",
    metadata: { icon: "mapPin" },
    sortOrder: 3,
  },
  {
    collection: "contact.cards",
    slug: "business-hours",
    title: "Business Hours",
    subtitle: "Monday - Friday: 9:00 AM - 6:00 PM CST",
    body: "We're here to help",
    linkUrl: "#",
    metadata: { icon: "clock" },
    sortOrder: 4,
  },
  {
    collection: "faq.items",
    slug: "what-is-kuleta",
    title: "What is Kuleta?",
    body: "Kuleta is an online marketplace that connects U.S. customers with women vendors of non-perishable goods that are authentic and sourced directly from the African continent.",
    sortOrder: 1,
  },
  {
    collection: "faq.items",
    slug: "how-are-products-priced",
    title: "How are products priced?",
    body: "Product prices on Kuleta are determined by the sellers, who set their own prices based on factors such as materials, craftsmanship, and market demand.",
    sortOrder: 2,
  },
  {
    collection: "faq.items",
    slug: "support-contact",
    title: "Who do I contact for support?",
    body: "For any questions, concerns, or assistance with your order, please contact Kuleta customer support via email at info@kuleta.io or by phone at +1 (502)319-2096.",
    sortOrder: 3,
  },
  {
    collection: "categories",
    slug: "clothing",
    title: "Clothing",
    imageUrl: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    linkUrl: "https://shop.kuleta.io/category/clothing",
    metadata: { id: 1 },
    sortOrder: 1,
  },
  {
    collection: "categories",
    slug: "phone",
    title: "Phone",
    imageUrl: "https://shop.kuleta.io/public/uploads/all/tBT8DUAdwQS4gJcvFvbmdVo5ANKjtFxZdiw4T1pq.jpg",
    linkUrl: "https://shop.kuleta.io/category/phone",
    metadata: { id: 2 },
    sortOrder: 2,
  },
  {
    collection: "categories",
    slug: "household",
    title: "Household",
    imageUrl: "https://shop.kuleta.io/public/uploads/all/D2BxgPSl8GT2sjxiAu8H5Zbjle6Bn4UOR1o6I8H4.webp",
    linkUrl: "https://shop.kuleta.io/category/household",
    metadata: { id: 3 },
    sortOrder: 3,
  },
  {
    collection: "categories",
    slug: "accessories",
    title: "Accessories",
    imageUrl: "https://images.unsplash.com/photo-1566793474285-2decf0fc182a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    linkUrl: "https://shop.kuleta.io/category/accessories",
    metadata: { id: 4 },
    sortOrder: 4,
  },
  {
    collection: "products",
    slug: "disney-mens-shirt",
    title: "Disney Men's Mickey and Friends Button Down Shirt",
    subtitle: "Clothing",
    imageUrl: "https://shop.kuleta.io/public/uploads/all/kqLfBbxkuqENusRCswMlRZprKxcsnv2pTAMkIBoZ.webp",
    metadata: { id: "1", price: 12, originalPrice: 12, discount: 0, rating: 4.8, reviews: 0 },
    sortOrder: 1,
  },
  {
    collection: "products",
    slug: "xiaomi-redmi-a3x",
    title: "XIAOMI Redmi A3X 6.71\" 8GB RAM/128GB ROM Android 12 - Black",
    subtitle: "Phone",
    imageUrl: "https://shop.kuleta.io/public/uploads/all/tBT8DUAdwQS4gJcvFvbmdVo5ANKjtFxZdiw4T1pq.jpg",
    metadata: { id: "2", price: 1350, originalPrice: 1350, discount: 0, rating: 4.6, reviews: 892 },
    sortOrder: 2,
  },
  {
    collection: "products",
    slug: "philips-rice-cooker",
    title: "Philips Rice Cooker 0.6L",
    subtitle: "Household",
    imageUrl: "https://shop.kuleta.io/public/uploads/all/D2BxgPSl8GT2sjxiAu8H5Zbjle6Bn4UOR1o6I8H4.webp",
    metadata: { id: "3", price: 12, rating: 4.9, reviews: 2156 },
    sortOrder: 3,
  },
  {
    collection: "products",
    slug: "mens-hoody",
    title: "Mens Hoody",
    subtitle: "clothing",
    imageUrl: "https://shop.kuleta.io/public/uploads/all/e0WCWtjYhsXpuDtiZlMZETOy8cOYBFm6WE6aVGHM.webp",
    metadata: { id: "4", price: 12.34, originalPrice: 13.43, discount: 1.09, rating: 4.9, reviews: 3421 },
    sortOrder: 4,
  },
  {
    collection: "home.review",
    slug: "main",
    title: "Kuleta Customer",
    body:
      "",
    sortOrder: 1,
  },
  {
    collection: "home.sponsors",
    slug: "uchicago-rustandy",
    title: "UChicago Booth Rustandy Center",
    imageUrl: "https://www.chicagobooth.edu/-/media/enterprise/centers/rustandy/what-we-do/module-imgs500/rustandy-center-logo-vert-rgb_web.jpg?h=10%25&w=33%25&hash=E7D671F6CC7AC8DA8C231F4A5931FA08",
    sortOrder: 1,
  },
  {
    collection: "home.partners",
    slug: "obama-foundation-scholars",
    title: "Obama Foundation Scholars",
    imageUrl: "/assets/c765af3d8366941d8c4bbc789d42f7b0d0e6179f.png",
    sortOrder: 1,
  },
  {
    collection: "home.featured-in",
    slug: "media-1",
    title: "Media 1",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJEkmrwnLBubIeRmnIrkMMGq0DoPoa0XG_TQ&s",
    sortOrder: 1,
  },
  {
    collection: "about.values",
    slug: "global-connection",
    title: "Global Connection",
    body: "We believe that commerce should connect people, cultures, and markets without compromising quality or trust.",
    metadata: { icon: "globe" },
    sortOrder: 1,
  },
  {
    collection: "about.values",
    slug: "access",
    title: "Access",
    body: "We create pathways for customers to purchase authentic products from Africa with confidence and ease.",
    metadata: { icon: "key" },
    sortOrder: 2,
  },
  {
    collection: "about.values",
    slug: "authenticity",
    title: "Authenticity",
    body: "Every product we offer is vetted, verified, and sourced directly from trusted vendors across the continent.",
    metadata: { icon: "target" },
    sortOrder: 3,
  },
  {
    collection: "about.values",
    slug: "timeliness",
    title: "Timeliness & Reliability",
    body: "Our customers can count on us to deliver on time, every time.",
    metadata: { icon: "clock" },
    sortOrder: 4,
  },
  {
    collection: "about.values",
    slug: "pricing",
    title: "Fair & Dignified Pricing",
    body: "We ensure fair value for customers while supporting sustainable income for vendors.",
    metadata: { icon: "dollarSign" },
    sortOrder: 5,
  },
  {
    collection: "about.values",
    slug: "empowerment",
    title: "Empowerment",
    body: "We empower women-led businesses by giving them tools, platforms, and opportunities to grow with dignity.",
    metadata: { icon: "heart" },
    sortOrder: 6,
  },
  {
    collection: "about.stats",
    slug: "vendors",
    title: "500+",
    subtitle: "Women Vendors Supported",
    sortOrder: 1,
  },
  {
    collection: "about.stats",
    slug: "markets",
    title: "10+",
    subtitle: "Markets We Source From",
    sortOrder: 2,
  },
  {
    collection: "about.stats",
    slug: "delivery",
    title: "7 days",
    subtitle: "Average Delivery Time",
    sortOrder: 3,
  },
  {
    collection: "about.founders",
    slug: "manda-bwerevu",
    title: "Manda Bwerevu",
    subtitle: "Co-Founder & CEO",
    body: "Manda leads Kuleta's vision, strategy, and customer growth.",
    imageUrl: "/assets/c3fb5af5eb9b460f4206a2cc93c7b7f159a5893c.png",
    linkUrl: "https://www.linkedin.com/in/manda-bwerevu/",
    sortOrder: 1,
  },
  {
    collection: "about.founders",
    slug: "judith-nguli",
    title: "Judith",
    subtitle: "Co-Founder & COO",
    body: "Judith leads Kuleta's operations, vendor partnerships, and program execution.",
    imageUrl: "/assets/0781dbd8f8e47b7b7a2635ca5190583ab69776e2.png",
    linkUrl: "https://www.linkedin.com/in/judith-nguli/",
    sortOrder: 2,
  },
  {
    collection: "team.members",
    slug: "manda-bwerevu",
    title: "Manda Bwerevu",
    subtitle: "Co-Founder & CEO",
    body: "Leads Kuleta's vision and strategy with experience across global supply chains, public policy, and entrepreneurship.",
    imageUrl: "/assets/f023eede0d58ad39ef886df4299294f1c3e4312c.png",
    linkUrl: "https://www.linkedin.com/in/manda-bwerevu/",
    metadata: { email: "manda@kuleta.io" },
    sortOrder: 1,
  },
  {
    collection: "team.members",
    slug: "judith-nguli",
    title: "Judith Nguli",
    subtitle: "Co-Founder & COO",
    body: "Leads operations, vendor partnerships, and program execution.",
    imageUrl: "/assets/4279e38172a19781e32b3d1f3a65bdbe7652f897.png",
    linkUrl: "https://www.linkedin.com/in/judith-nguli/",
    metadata: { email: "judith@kuleta.io" },
    sortOrder: 2,
  },
  {
    collection: "advisory.members",
    slug: "therese-kayikwamba-wagner",
    title: "Therese Kayikwamba Wagner",
    subtitle: "Minister of Foreign Affairs",
    body: "Therese brings deep diplomatic, policy, and economic development experience with a focus on Africa's global engagement.",
    imageUrl: "/assets/images/therese-kayikwamba-wagner.png",
    linkUrl: "https://www.linkedin.com/in/therese-kayikwamba-wagner/",
    metadata: { company: "Democratic Republic of the Congo" },
    sortOrder: 1,
  },
  {
    collection: "kuza.programs",
    slug: "training-education",
    title: "Training & Education",
    body: "Comprehensive business skills training covering e-commerce, financial literacy, and digital marketing for women entrepreneurs.",
    metadata: { icon: "bookOpen" },
    sortOrder: 1,
  },
  {
    collection: "kuza.programs",
    slug: "mentorship-network",
    title: "Mentorship Network",
    body: "Connect with experienced business mentors and successful entrepreneurs who guide you through your journey.",
    metadata: { icon: "users" },
    sortOrder: 2,
  },
  {
    collection: "kuza.programs",
    slug: "certification-programs",
    title: "Certification Programs",
    body: "Earn recognized certifications in various business and technical skills to boost your credibility and capabilities.",
    metadata: { icon: "award" },
    sortOrder: 3,
  },
  {
    collection: "kuza.programs",
    slug: "market-access",
    title: "Market Access",
    body: "Direct access to Kuleta's platform and international markets, helping you reach customers worldwide.",
    metadata: { icon: "trendingUp" },
    sortOrder: 4,
  },
  {
    collection: "kuza.impact",
    slug: "women-trained",
    title: "1,000+",
    subtitle: "Women Trained",
    sortOrder: 1,
  },
  {
    collection: "kuza.impact",
    slug: "countries",
    title: "15",
    subtitle: "African Countries",
    sortOrder: 2,
  },
  {
    collection: "kuza.impact",
    slug: "success-rate",
    title: "85%",
    subtitle: "Success Rate",
    sortOrder: 3,
  },
  {
    collection: "kuza.impact",
    slug: "revenue",
    title: "$2M+",
    subtitle: "Revenue Generated",
    sortOrder: 4,
  },
  {
    collection: "kuza.stories",
    slug: "fatima-ahmed",
    title: "Fatima Ahmed",
    subtitle: "Lagos, Nigeria",
    body: "Through Kuza Dada, I learned how to market my handmade jewelry online. Now I ship to customers in 5 countries!",
    imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    sortOrder: 1,
  },
  {
    collection: "kuza.stories",
    slug: "grace-mwangi",
    title: "Grace Mwangi",
    subtitle: "Nairobi, Kenya",
    body: "The mentorship program connected me with experienced entrepreneurs who helped me scale my textile business.",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    sortOrder: 2,
  },
  {
    collection: "kuza.stories",
    slug: "adama-diallo",
    title: "Adama Diallo",
    subtitle: "Accra, Ghana",
    body: "I now employ 10 women in my community, all thanks to the skills I gained from Kuza Dada's training programs.",
    imageUrl: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    sortOrder: 3,
  },
];
