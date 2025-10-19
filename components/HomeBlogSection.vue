<template>
  <section class="py-10 containerWid bg-white">
    <div class="mx-auto px-4">
      <div class="flex justify-between items-center mb-10">
        <h2 class="homeMainTxt3 font-bold text-gray-900 flex items-center">
          <i class="bi bi-journal-richtext text-blue-600 mr-2"></i>
          Latest from Our Blog
        </h2>
        <div class="flex gap-3">
          <button
            class="blog-prev-btn w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 lg:hover:bg-gray-200 transition-colors"
          >
            <i class="bi bi-chevron-left"></i>
          </button>
          <button
            class="blog-next-btn w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 lg:hover:bg-gray-200 transition-colors"
          >
            <i class="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>

      <swiper
        :modules="[Navigation, Autoplay]"
        :slidesPerView="1"
        :spaceBetween="24"
        :loop="true"
        :autoplay="{
          delay: 4000,
          disableOnInteraction: false,
        }"
        :navigation="{
          nextEl: '.blog-next-btn',
          prevEl: '.blog-prev-btn',
        }"
        :breakpoints="{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1280: {
            slidesPerView: 4,
          },
        }"
        class="blog-swiper"
      >
        <swiper-slide v-for="post in blogPosts" :key="post.id">
          <div
            class="bg-white rounded-lg overflow-hidden border border-gray-100 h-full"
          >
            <div class="relative overflow-hidden">
              <img
                :src="post.imgUrl"
                :alt="post.title"
                class="w-full h-48 object-cover"
              />
              <div
                class="absolute top-3 left-3 text-white subtitletext px-3 py-1 rounded-full font-medium"
                :class="post.categoryColor"
              >
                {{ post.category }}
              </div>
            </div>
            <div class="py-4 px-4">
              <div class="flex items-center subtitletext text-gray-500 mb-3">
                <div class="flex items-center mr-3">
                  <i class="bi bi-calendar3 mr-1"></i>
                  <span>{{ post.date }}</span>
                </div>
              </div>
              <h3
                class="font-bold text-gray-900 mb-2 homeMainTxt4 line-clamp-2"
              >
                {{ post.title }}
              </h3>
              <p class="subtitletext text-gray-600 mb-4 line-clamp-3">
                {{ post.desc }}
              </p>
              <a
                :href="post.link"
                class="text-blue-600 subtitletext font-medium inline-flex items-center gap-1"
              >
                Read more
                <i class="bi bi-arrow-right"></i>
              </a>
            </div>
          </div>
        </swiper-slide>
      </swiper>

      <div class="text-center mt-10">
        <a
          href="/blog"
          class="titletext inline-flex items-center gap-2 px-6 py-3 bg-blue-600 lg:hover:bg-blue-700 text-white rounded-lg font-medium"
        >
          View All Articles
          <i class="bi bi-journal-text"></i>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const blogPosts = [
  {
    id: 1,
    title: "Top 10 Football Betting Strategies for Beginners",
    category: "Sports",
    categoryColor: "bg-blue-600",
    date: "March 15, 2025",
    readTime: "5 min read",
    imgUrl: "https://placehold.co/800x500/e2e8f0/475569/png?text=Blog+Post+1",
    link: "/blog/football-betting-strategies",
    desc: "Learn the essential betting strategies that can help beginners make more informed decisions when betting on football matches.",
  },
  {
    id: 2,
    title: "Understanding Slot Volatility: High vs. Low Risk Games",
    category: "Slots",
    categoryColor: "bg-purple-600",
    date: "March 10, 2025",
    readTime: "4 min read",
    imgUrl: "https://placehold.co/800x500/e2e8f0/475569/png?text=Blog+Post+2",
    link: "/blog/slot-volatility-guide",
    desc: "Discover the differences between high and low volatility slots and how to choose the right games based on your playing style.",
  },
  {
    id: 3,
    title: "Crypto Gambling: Benefits of Using Bitcoin and Ethereum",
    category: "Crypto",
    categoryColor: "bg-green-600",
    date: "March 5, 2025",
    readTime: "6 min read",
    imgUrl: "https://placehold.co/800x500/e2e8f0/475569/png?text=Blog+Post+3",
    link: "/blog/crypto-gambling-benefits",
    desc: "Explore the advantages of using cryptocurrencies for online gambling, including faster transactions and enhanced privacy.",
  },
  {
    id: 4,
    title: "Live Casino Tips: How to Win at Baccarat",
    category: "Casino",
    categoryColor: "bg-red-600",
    date: "February 28, 2025",
    readTime: "3 min read",
    imgUrl: "https://placehold.co/800x500/e2e8f0/475569/png?text=Blog+Post+4",
    link: "/blog/baccarat-winning-tips",
    desc: "Master the game of Baccarat with these expert tips and strategies to improve your chances of winning in live casino games.",
  },
  {
    id: 5,
    title: "Beginner's Guide to Online Poker: Rules and Strategies",
    category: "Guides",
    categoryColor: "bg-yellow-600",
    date: "February 20, 2025",
    readTime: "7 min read",
    imgUrl: "https://placehold.co/800x500/e2e8f0/475569/png?text=Blog+Post+5",
    link: "/blog/poker-guide-beginners",
    desc: "Learn the basics of online poker, including hand rankings, betting structures, and fundamental strategies for new players.",
  },
];
</script>
