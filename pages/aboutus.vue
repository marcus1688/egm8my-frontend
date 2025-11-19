<template>
  <ClientOnly>
    <div>
      <!-- Hero Section with Parallax Effect -->
      <section
        class="relative containerWid overflow-hidden bg-gradient-to-r from-[#a1122d] to-[#c21b3a]"
      >
        <!-- Background gradient overlay (reduced opacity to let symbols show through) -->
        <div
          class="absolute inset-0 bg-gradient-to-r from-[#a1122d]/80 to-[#c21b3a]/80 z-10"
        ></div>

        <!-- Casino symbol elements with stronger visibility -->
        <div class="absolute inset-0 overflow-hidden opacity-10 z-20">
          <div class="absolute top-10 left-10 animate-float-slow">
            <i class="bi bi-suit-spade-fill text-6xl"></i>
          </div>
          <div class="absolute top-20 right-20 animate-float-medium">
            <i class="bi bi-suit-heart-fill text-5xl"></i>
          </div>
          <div class="absolute bottom-10 left-1/4 animate-float-fast">
            <i class="bi bi-suit-club-fill text-7xl"></i>
          </div>
          <div class="absolute bottom-20 right-1/3 animate-float-medium">
            <i class="bi bi-suit-diamond-fill text-6xl"></i>
          </div>
          <div class="absolute top-1/3 left-1/3 animate-spin-slow">
            <i class="bi bi-dice-6-fill text-8xl"></i>
          </div>
        </div>

        <!-- Content - higher z-index to be on top of symbols -->
        <div class="mx-auto px-4 py-28 max-[660px]:py-16 relative z-30">
          <div class="max-w-3xl mx-auto">
            <div class="text-center">
              <h1 class="heroTitle1 font-bold text-white !mb-4 tracking-tight">
                About BM8
              </h1>
              <p
                class="heroTitle2 text-red-100 leading-relaxed mb-8 max-[480px]:mb-4 max-w-2xl mx-auto"
              >
                Your premier destination for online gaming entertainment with
                world-class games, exciting bonuses, and a secure gaming
                environment
              </p>

              <div
                class="flex heroTitle3 flex-wrap justify-center max-[660px]:gap-4 gap-8"
              >
                <div
                  v-for="(badge, index) in trustBadges"
                  :key="index"
                  class="flex items-center text-white/90"
                >
                  <span
                    class="w-10 h-10 max-[630px]:w-8 max-[630px]:h-8 rounded-full flex items-center justify-center bg-white/10 mr-3"
                  >
                    <i :class="badge.icon"></i>
                  </span>
                  <span>{{ badge.label }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Stats Counter Section -->
      <section class="py-16 max-[660px]:py-12 containerWid relative z-20">
        <div class="mx-auto">
          <div
            class="grid grid-cols-4 max-[1023px]:grid-cols-2 gap-4 max-[500px]:!gap-2 max-w-6xl mx-auto"
          >
            <div
              v-for="(stat, index) in stats"
              :key="index"
              class="rounded-xl p-8 text-center"
              :class="stat.class"
            >
              <div class="mb-4 max-[1023px]:!mb-3 flex justify-center">
                <span
                  class="w-16 h-16 max-[1023px]:w-14 max-[1023px]:h-14 homeMainTxt3 rounded-full flex items-center justify-center bg-white lg:group-hover:scale-110 transition-transform shadow-md"
                >
                  <i :class="stat.icon"></i>
                </span>
              </div>
              <h3 class="homeMainTxt3 font-bold text-[#f0eaea] mb-2">
                {{ stat.value }}
              </h3>
              <p class="text-[#b37a7a] font-medium homeSubTxt1">
                {{ stat.label }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Our Story Section -->
      <section class="py-16 max-[660px]:py-12 containerWid bg-[#1A0D13]">
        <div class="mx-auto px-4">
          <div class="max-w-6xl mx-auto">
            <div class="grid min-[900px]:grid-cols-2 gap-12 items-center">
              <div>
                <h2 class="homeMainTxt3 font-bold text-[#f0eaea] mb-6 relative">
                  Our Story
                  <span
                    class="absolute -bottom-3 left-0 w-20 h-1 bg-[#ff3344]"
                  ></span>
                </h2>
                <p class="text-[#b37a7a] mb-6 leading-relaxed homeMainTxt2">
                  Founded in 2015, BM8 was born from a simple yet powerful
                  vision: to create the most exciting and trusted online gaming
                  experience in Asia. Our journey began with a small team of
                  gaming enthusiasts and a curated selection of 50 premium
                  games.
                </p>
                <p class="text-[#b37a7a] mb-6 leading-relaxed homeMainTxt2">
                  Fast forward to today, and we've grown into one of Asia's
                  leading online casino platforms, serving over 5 million
                  players with a library of 2,000+ games from the world's top
                  providers. Our success stems from an unwavering commitment to
                  excellent service, innovative gaming solutions, and the trust
                  we've built with our player community.
                </p>
                <p class="text-[#b37a7a] leading-relaxed homeMainTxt2">
                  Along the way, we've received numerous industry awards and
                  recognitions for our platform, customer service excellence,
                  and dedication to responsible gaming practices. But what
                  matters most to us is the satisfaction of our players and the
                  thrilling gaming experiences we create every day.
                </p>
              </div>

              <div
                class="grid grid-cols-2 gap-6 max-[500px]:gap-4 max-[430px]:grid-cols-1"
              >
                <div class="timeline-item">
                  <div class="timeline-year homeSubTxt1">2015</div>
                  <h3 class="homeMainTxt4 font-bold text-[#f0eaea] mb-2">
                    The Beginning
                  </h3>
                  <p class="text-[#b37a7a] homeMainTxt2">
                    Launched with 50 games and a vision to revolutionize online
                    gaming in Asia
                  </p>
                </div>

                <div class="timeline-item">
                  <div class="timeline-year homeSubTxt1">2017</div>
                  <h3 class="homeMainTxt4 font-bold text-[#f0eaea] mb-2">
                    Expansion
                  </h3>
                  <p class="text-[#b37a7a] homeMainTxt2">
                    Added live dealer games and sports betting, partnering with
                    industry leaders
                  </p>
                </div>

                <div class="timeline-item">
                  <div class="timeline-year homeSubTxt1">2019</div>
                  <h3 class="homeMainTxt4 font-bold text-[#f0eaea] mb-2">
                    Innovation
                  </h3>
                  <p class="text-[#b37a7a] homeMainTxt2">
                    Released our mobile platform and improved security
                    infrastructure
                  </p>
                </div>

                <div class="timeline-item">
                  <div class="timeline-year homeSubTxt1">2023</div>
                  <h3 class="homeMainTxt4 font-bold text-[#f0eaea] mb-2">
                    Recognition
                  </h3>
                  <p class="text-[#b37a7a] homeMainTxt2">
                    Reached 5M+ active players and received multiple industry
                    awards
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Mission & Values Section -->
      <section class="py-16 max-[660px]:py-12 containerWid">
        <div class="mx-auto px-4">
          <div class="max-w-6xl mx-auto">
            <div class="text-center mb-14 max-[1023px]:mb-8">
              <h2 class="homeMainTxt3 font-bold text-[#f0eaea] mb-2">
                Our Mission & Values
              </h2>
              <p class="text-[#b37a7a] max-w-2xl mx-auto homeMainTxt2">
                Guiding principles that define everything we do
              </p>
            </div>

            <div
              class="grid grid-cols-2 max-[900px]:grid-cols-1 gap-12 max-[1023px]:gap-4 items-center"
            >
              <!-- Mission Side -->
              <div
                class="bg-[#1A0D13] rounded-2xl shadow-xl shadow-red-500/20 overflow-hidden border border-[#3b1c23]"
              >
                <div class="h-3 bg-[#ff3344]"></div>
                <div class="p-8">
                  <div
                    class="w-16 h-16 max-[1023px]:w-14 max-[1023px]:h-14 rounded-full bg-[#ff3344]/20 flex items-center justify-center text-[#ff3344] mb-6"
                  >
                    <i class="bi bi-rocket-takeoff homeMainTxt"></i>
                  </div>
                  <h3 class="homeMainTxt font-bold text-[#f0eaea] mb-3">
                    Our Mission
                  </h3>
                  <p class="text-[#b37a7a] leading-relaxed mb-4 homeMainTxt2">
                    To provide the most exciting, fair, and secure online gaming
                    experience in Asia, delivering innovative gaming solutions
                    that exceed player expectations while maintaining the
                    highest standards of integrity and customer service.
                  </p>
                  <p class="text-[#b37a7a] leading-relaxed homeMainTxt2">
                    We're committed to promoting responsible gaming practices
                    and creating an environment where players can enjoy their
                    favorite games with confidence, knowing they're supported by
                    a platform that prioritizes their security and enjoyment.
                  </p>
                </div>
              </div>

              <!-- Values Side -->
              <div>
                <div class="grid gap-6">
                  <div
                    v-for="(value, index) in coreValues"
                    :key="index"
                    class="value-card max-[660px]:!flex-col max-[660px]:!items-center max-[660px]:!text-center"
                  >
                    <div
                      class="value-icon max-[1023px]:!w-10 max-[1023px]:!h-10"
                    >
                      <i
                        :class="value.icon"
                        class="homeMainTxt5 text-[#ff3344]"
                      ></i>
                    </div>
                    <div>
                      <h3 class="homeMainTxt5 font-bold text-[#f0eaea] mb-2">
                        {{ value.title }}
                      </h3>
                      <p class="text-[#b37a7a] homeMainTxt2">
                        {{ value.description }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        class="py-16 max-[660px]:py-12 containerWid bg-[#1A0D13] relative overflow-hidden"
      >
        <!-- Subtle background pattern -->
        <div
          class="absolute inset-0 bg-gradient-to-b from-[#ff3344]/5 to-transparent"
        ></div>

        <!-- Subtle playing card symbols background -->
        <div class="absolute inset-0 z-0">
          <div class="card-symbol top-20 left-[10%] spade"></div>
          <div class="card-symbol top-[60%] left-[25%] heart"></div>
          <div class="card-symbol top-[30%] right-[15%] club"></div>
          <div class="card-symbol top-[70%] right-[20%] diamond"></div>
        </div>

        <div class="mx-auto px-4 relative z-10">
          <div class="max-w-6xl mx-auto">
            <!-- Clean, simple header -->
            <div class="text-center mb-8">
              <div class="chip-badge mx-auto mb-4">
                <div class="chip-inner">
                  <span>BM8</span>
                </div>
              </div>
              <h2 class="homeMainTxt3 font-bold text-[#f0eaea] mb-2">
                The BM8 Experience
              </h2>
              <p class="text-[#b37a7a] max-w-2xl mx-auto homeMainTxt2">
                What sets us apart from other online casinos
              </p>
            </div>

            <!-- Clean grid layout for features -->
            <div
              class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-[1023px]:gap-4"
            >
              <div
                v-for="(feature, index) in gamingFeatures"
                :key="index"
                class="feature-box hover-lift"
              >
                <div class="feature-icon" :class="feature.iconBg">
                  <i :class="feature.icon" class="homeMainTxt"></i>
                </div>
                <h3 class="homeMainTxt5 font-bold text-[#f0eaea] mb-2">
                  {{ feature.title }}
                </h3>
                <p class="text-[#b37a7a] mb-4 homeMainTxt2">
                  {{ feature.description }}
                </p>

                <div class="divider"></div>

                <div class="feature-highlights">
                  <div
                    v-for="(highlight, idx) in feature.highlights"
                    :key="idx"
                    class="highlight-item text-xs"
                  >
                    <span>{{ highlight }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Trust & Security Section - Minimalist Modern Design -->
      <section class="py-16 max-[660px]:py-12 containerWid relative">
        <div class="mx-auto px-4">
          <div class="max-w-6xl mx-auto">
            <!-- Clean header with subtle accent -->
            <div class="text-center mb-8">
              <div
                class="inline-block p-1 bg-gradient-to-r from-[#a1122d] to-[#c21b3a] rounded-lg mb-4"
              >
                <div class="bg-[#1A0D13] px-4 py-1 rounded">
                  <span
                    class="bg-clip-text text-transparent bg-gradient-to-r from-[#ff3344] to-[#c21b3a] font-semibold"
                  >
                    SECURE & TRUSTED
                  </span>
                </div>
              </div>
              <h2 class="homeMainTxt3 font-bold text-[#f0eaea] mb-2">
                Trust & Security
              </h2>
              <p class="text-[#b37a7a] max-w-2xl mx-auto homeMainTxt2">
                Your safety and security are our top priorities
              </p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div
                v-for="(card, index) in trustCards"
                :key="index"
                class="trust-card"
              >
                <div class="trust-card-header">
                  <div :class="['trust-icon', card.iconClass]">
                    <i :class="card.icon" class="homeMainTxt5"></i>
                  </div>
                  <div class="trust-title homeMainTxt5">
                    <h3>{{ card.title }}</h3>
                  </div>
                </div>

                <p class="text-[#b37a7a] my-4 homeMainTxt2">
                  {{ card.description }}
                </p>

                <!-- Inner Grid (for images or icons + labels) -->
                <div :class="card.gridClass">
                  <div
                    v-for="(item, i) in card.items"
                    :key="i"
                    :class="card.itemClass"
                  >
                    <template v-if="item.type === 'icon'">
                      <i :class="item.icon"></i>
                      <span>{{ item.label }}</span>
                    </template>
                    <template v-else-if="item.type === 'image'">
                      <img :src="item.src" :alt="item.alt" />
                      <span>{{ item.label }}</span>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Game Providers -->
      <TrustedPartners class="mb-12" />

      <!-- Responsible Gaming Section -->
      <section
        class="py-16 max-[660px]:py-12 containerWid bg-gradient-to-r from-[#a1122d] to-[#c21b3a] text-white relative overflow-hidden"
      >
        <!-- Decorative background elements -->
        <div class="absolute inset-0 overflow-hidden opacity-10">
          <div class="absolute top-10 left-1/4 animate-float-slow text-6xl">
            ♠
          </div>
          <div
            class="absolute bottom-10 right-1/4 animate-float-medium text-6xl"
          >
            ♥
          </div>
        </div>

        <div class="mx-auto px-4 relative z-10">
          <div class="max-w-6xl mx-auto">
            <div class="text-center mb-8">
              <h2 class="homeMainTxt3 font-bold mb-2">Responsible Gaming</h2>
              <p class="text-red-100 max-w-2xl mx-auto homeMainTxt2">
                We promote safe and responsible gambling practices
              </p>
            </div>

            <div class="grid grid-cols-3 max-[900px]:grid-cols-1 gap-8">
              <div
                v-for="(item, index) in responsibleFeatures"
                :key="index"
                class="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10"
              >
                <div
                  class="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white mb-3"
                >
                  <i :class="item.icon" class="homeMainTxt5"></i>
                </div>
                <h3 class="homeMainTxt5 font-bold text-white mb-2">
                  {{ item.title }}
                </h3>
                <p class="text-red-100 homeMainTxt2">
                  {{ item.description }}
                </p>
              </div>
            </div>

            <div class="mt-12 text-center homeMainTxt2">
              <p class="text-red-100 max-w-2xl mx-auto">
                At BM8, we believe that gambling should always be an enjoyable
                form of entertainment. If you or someone you know is struggling
                with gambling problems, please contact our responsible gaming
                team or reach out to professional help services.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </ClientOnly>
</template>

<script setup>
const stats = [
  {
    value: "5M+",
    label: "Active Players",
    icon: "bi bi-people-fill",
    class: "bg-[#ff3344]/10 text-[#ff3344] border border-[#ff3344]/20",
  },
  {
    value: "2000+",
    label: "Premium Games",
    icon: "bi bi-controller",
    class: "bg-[#ff3344]/10 text-[#ff3344] border border-[#ff3344]/20",
  },
  {
    value: "12+",
    label: "Years Experience",
    icon: "bi bi-calendar-check",
    class: "bg-[#ff3344]/10 text-[#ff3344] border border-[#ff3344]/20",
  },
  {
    value: "24/7",
    label: "Support Service",
    icon: "bi bi-headset",
    class: "bg-[#ff3344]/10 text-[#ff3344] border border-[#ff3344]/20",
  },
];

const coreValues = [
  {
    icon: "bi bi-trophy",
    title: "Excellence",
    description:
      "We strive for excellence in everything we do, from game selection to customer service and platform performance.",
  },
  {
    icon: "bi bi-shield-check",
    title: "Integrity",
    description:
      "We operate with complete transparency, ensuring fair play and trustworthy transactions for all our players.",
  },
  {
    icon: "bi bi-lightning-charge",
    title: "Innovation",
    description:
      "We continuously innovate and evolve, implementing the latest technologies to enhance your gaming experience.",
  },
  {
    icon: "bi bi-people",
    title: "Community",
    description:
      "We value our player community and create a safe, welcoming environment for players from all backgrounds.",
  },
];

const gamingFeatures = [
  {
    title: "Premium Game Selection",
    description:
      "Enjoy our massive library of 2,000+ games from the world's top providers.",
    icon: "bi bi-controller",
    iconBg: "bg-[#ff3344]/20",
    highlights: ["2,000+ Games", "Top Providers", "Live Casino", "High RTP"],
  },
  {
    title: "VIP Program",
    description:
      "Join our exclusive VIP program with personalized service and premium rewards.",
    icon: "bi bi-gem",
    iconBg: "bg-[#ff3344]/20",
    highlights: [
      "Personal Manager",
      "Exclusive Bonuses",
      "Higher Limits",
      "Special Events",
    ],
  },
  {
    title: "Mobile Gaming",
    description:
      "Play your favorite games anytime, anywhere with our seamless mobile platform.",
    icon: "bi bi-phone",
    iconBg: "bg-[#ff3344]/20",
    highlights: [
      "iOS & Android",
      "Instant Play",
      "Same Experience",
      "Fast Loading",
    ],
  },
  {
    title: "Fast Transactions",
    description:
      "Experience lightning-fast deposits and withdrawals with multiple payment options.",
    icon: "bi bi-wallet2",
    iconBg: "bg-[#ff3344]/20",
    highlights: ["E-wallets", "Credit Cards", "Crypto", "Bank Transfer"],
  },
  {
    title: "24/7 Support",
    description:
      "Our professional support team is available around the clock in multiple languages.",
    icon: "bi bi-headset",
    iconBg: "bg-[#ff3344]/20",
    highlights: ["Live Chat", "Email", "Phone", "Multi-language"],
  },
  {
    title: "Regular Promotions",
    description:
      "Enjoy our generous welcome packages, daily bonuses, and exciting tournaments.",
    icon: "bi bi-gift",
    iconBg: "bg-[#ff3344]/20",
    highlights: ["Welcome Bonus", "Free Spins", "Cashback", "Tournaments"],
  },
];

const trustBadges = [
  {
    icon: "bi bi-shield-check",
    label: "Licensed & Regulated",
  },
  {
    icon: "bi bi-lock",
    label: "100% Secure",
  },
  {
    icon: "bi bi-award",
    label: "Award Winning",
  },
];

const trustCards = [
  {
    title: "Licensed & Regulated",
    description:
      "BM8 operates with full licensing from trusted regulatory authorities, ensuring we meet the highest standards of fair gaming and player protection.",
    icon: "bi bi-shield-check",
    iconClass: "license-icon",
    gridClass: "license-grid",
    itemClass: "license-item",
    items: [
      {
        type: "image",
        src: "https://placehold.co/60x60/ff3344/FFFFFF/png?text=MGA",
        alt: "Malta Gaming Authority",
        label: "MGA",
      },
      {
        type: "image",
        src: "https://placehold.co/60x60/ff3344/FFFFFF/png?text=PAGCOR",
        alt: "PAGCOR",
        label: "PAGCOR",
      },
      {
        type: "image",
        src: "https://placehold.co/60x60/ff3344/FFFFFF/png?text=GRA",
        alt: "Gaming Regulatory Authority",
        label: "GRA",
      },
    ],
  },
  {
    title: "Advanced Security",
    description:
      "We use state-of-the-art encryption and security measures to protect your personal data and financial transactions at all times.",
    icon: "bi bi-lock",
    iconClass: "security-icon",
    gridClass: "security-grid",
    itemClass: "security-item",
    items: [
      { type: "icon", icon: "bi bi-shield-lock", label: "SSL Encryption" },
      { type: "icon", icon: "bi bi-database-lock", label: "Secure Data" },
      { type: "icon", icon: "bi bi-fingerprint", label: "ID Verification" },
      { type: "icon", icon: "bi bi-bank", label: "Secure Banking" },
    ],
  },
  {
    title: "Fair Gaming",
    description:
      "All our games use certified random number generators and are regularly audited by independent testing agencies to ensure complete fairness.",
    icon: "bi bi-dice-6",
    iconClass: "fairplay-icon",
    gridClass: "fairplay-grid",
    itemClass: "fairplay-item",
    items: [
      {
        type: "image",
        src: "https://placehold.co/60x60/ff3344/FFFFFF/png?text=RNG",
        alt: "Random Number Generation",
        label: "Certified RNG",
      },
      {
        type: "image",
        src: "https://placehold.co/60x60/ff3344/FFFFFF/png?text=eCOGRA",
        alt: "eCOGRA",
        label: "eCOGRA",
      },
      {
        type: "image",
        src: "https://placehold.co/60x60/ff3344/FFFFFF/png?text=iTech",
        alt: "iTech Labs",
        label: "iTech Labs",
      },
      {
        type: "image",
        src: "https://placehold.co/60x60/ff3344/FFFFFF/png?text=GLI",
        alt: "Gaming Laboratories International",
        label: "GLI Tested",
      },
    ],
  },
];

const responsibleFeatures = [
  {
    icon: "bi bi-clock-history",
    title: "Time Limits",
    description:
      "Set daily, weekly, or monthly time limits to help you maintain healthy playing habits and ensure gaming remains a form of entertainment.",
  },
  {
    icon: "bi bi-wallet2",
    title: "Deposit Limits",
    description:
      "Control your spending by setting custom deposit limits that match your budget and personal comfort level for gaming expenditures.",
  },
  {
    icon: "bi bi-pause-circle",
    title: "Self-Exclusion",
    description:
      "Take a break from gaming with our self-exclusion options, ranging from short cooling-off periods to longer terms if needed.",
  },
];
</script>

<style scoped>
/* Casino Symbols */
.casino-symbol {
  font-size: 5rem;
  color: #ffffff;
  opacity: 0.7;
}

/* Timeline Styles */
.timeline-item {
  position: relative;
  padding: 1.5rem;
  background-color: #241017;
  border-radius: 1rem;
  border: 1px solid #3b1c23;
  box-shadow: 0 4px 6px -1px rgba(255, 51, 68, 0.1);
  transition: all 0.3s ease;
}

.timeline-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px -3px rgba(255, 51, 68, 0.2);
  border-color: #ff3344;
}

.timeline-year {
  display: inline-block;
  padding: 0.25rem 1rem;
  background-color: #ff3344;
  color: white;
  border-radius: 9999px;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

/* Value Card Styles */
.value-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background-color: #241017;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(255, 51, 68, 0.1);
  border: 1px solid #3b1c23;
}

.value-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  background-color: rgba(255, 51, 68, 0.2);
  color: #ff3344;
  border-radius: 9999px;
  font-size: 1.25rem;
  flex-shrink: 0;
}

/* Casino chip badge */
.chip-badge {
  width: 60px;
  height: 60px;
  background: repeating-conic-gradient(
    from 0deg,
    #ff3344 0deg 30deg,
    #a1122d 30deg 60deg
  );
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  position: relative;
}

.chip-inner {
  width: 70%;
  height: 70%;
  background: #1a0d13;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #ff3344;
}

/* Feature boxes */
.feature-box {
  background: #241017;
  border-radius: 0.75rem;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(255, 51, 68, 0.1);
  transition: all 0.3s ease;
  height: 100%;
  position: relative;
  border: 1px solid #3b1c23;
}

.hover-lift:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px -5px rgba(255, 51, 68, 0.2);
  border-color: #ff3344;
}

.feature-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  font-size: 1.25rem;
  color: #ff3344;
}

.divider {
  height: 1px;
  background: linear-gradient(to right, #3b1c23 0%, #ff3344 50%, #3b1c23 100%);
  margin: 1rem 0;
}

.feature-highlights {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.highlight-item {
  padding: 0.25rem 0.75rem;
  background: #15090e;
  border-radius: 9999px;
  color: #b37a7a;
  transition: all 0.2s ease;
}

.highlight-item:hover {
  background: #ff3344;
  color: white;
}

/* Trust cards */
.trust-card {
  background: #241017;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(255, 51, 68, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
  height: 100%;
  border: 1px solid #3b1c23;
}

.trust-card:hover {
  box-shadow: 0 10px 25px -5px rgba(255, 51, 68, 0.2);
  border-color: #ff3344;
}

.trust-card-header {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #3b1c23;
}

.trust-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  font-size: 1.25rem;
  flex-shrink: 0;
}

.license-icon {
  background: #ff3344;
  background-opacity: 0.2;
  color: #ff3344;
}

.security-icon {
  background: #ff3344;
  background-opacity: 0.2;
  color: #ff3344;
}

.fairplay-icon {
  background: #ff3344;
  background-opacity: 0.2;
  color: #ff3344;
}

.trust-title h3 {
  font-weight: 600;
  color: #f0eaea;
}

.trust-card p {
  padding: 0 1.5rem;
}

/* License grid */
.license-grid,
.security-grid,
.fairplay-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  padding: 0 1.5rem 1.5rem;
}

.security-grid {
  grid-template-columns: repeat(2, 1fr);
}

.license-item,
.fairplay-item,
.security-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.75rem;
  background: #15090e;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

.license-item:hover,
.fairplay-item:hover,
.security-item:hover {
  background: #3b1c23;
}

.license-item img,
.fairplay-item img {
  width: 36px;
  height: 36px;
  margin-bottom: 0.5rem;
}

.license-item span,
.fairplay-item span,
.security-item span {
  font-size: 0.75rem;
  color: #b37a7a;
  text-align: center;
}

.security-item i {
  font-size: 1.25rem;
  color: #ff3344;
  margin-bottom: 0.5rem;
}

.card-symbol {
  position: absolute;
  width: 60px;
  height: 60px;
  opacity: 0.05;
  z-index: 0;
}

.card-symbol::before {
  font-size: 60px;
  position: absolute;
  color: #ff3344;
}

.spade::before {
  content: "♠";
}

.heart::before {
  content: "♥";
}

.club::before {
  content: "♣";
}

.diamond::before {
  content: "♦";
}

/* Animation definitions */
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.animate-float-slow {
  animation: float 8s ease-in-out infinite;
}

.animate-float-medium {
  animation: float 6s ease-in-out infinite;
}

.animate-float-fast {
  animation: float 4s ease-in-out infinite;
}

.animate-spin-slow {
  animation: spin 15s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .trust-card {
    margin-bottom: 1rem;
  }

  .license-grid,
  .fairplay-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 640px) {
  .feature-box {
    padding: 1.5rem;
  }

  .trust-card-header {
    padding: 1rem;
  }

  .license-grid,
  .fairplay-grid,
  .security-grid {
    grid-template-columns: repeat(2, 1fr);
    padding: 0 1rem 1rem;
  }
}
</style>
