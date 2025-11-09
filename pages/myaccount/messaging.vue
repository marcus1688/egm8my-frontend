<template>
  <UserAccountLayout>
    <div class="text-[#f0eaea]">
      <div class="mb-6 max-lg:mb-4">
        <h1 class="text-xl font-bold mb-1 max-lg:text-lg max-sm:text-base">
          {{ $t("messaging") }}
        </h1>
        <p class="text-[#b37a7a] text-sm max-lg:text-xs">
          {{ $t("view_messages") }}
        </p>
      </div>

      <div>
        <div class="mb-6 max-lg:mb-4">
          <div class="flex border-b border-[#3b1c23]">
            <button
              class="py-3 px-6 max-lg:py-2 max-lg:px-4 font-medium text-sm max-lg:text-xs transition-colors"
              :class="
                activeTab === 'notification'
                  ? 'text-[#ff3344] border-b-2 border-[#ff3344]'
                  : 'text-[#b37a7a] lg:hover:text-[#f0eaea]'
              "
              @click="activeTab = 'notification'"
            >
              {{ $t("notifications") }}
              <span
                v-if="getUnreadCount() > 0"
                class="ml-2 px-2 py-0.5 max-lg:px-1.5 max-lg:py-0 text-xs max-lg:text-[10px] bg-red-500 text-white rounded-full"
              >
                {{ getUnreadCount() }}
              </span>
            </button>
            <button
              class="py-3 px-6 max-lg:py-2 max-lg:px-4 font-medium text-sm max-lg:text-xs transition-colors"
              :class="
                activeTab === 'announcement'
                  ? 'text-[#ff3344] border-b-2 border-[#ff3344]'
                  : 'text-[#b37a7a] lg:hover:text-[#f0eaea]'
              "
              @click="activeTab = 'announcement'"
            >
              {{ $t("announcements") }}
            </button>
          </div>
        </div>

        <!-- Notifications Tab Content -->
        <div v-if="activeTab === 'notification'">
          <!-- Actions Section -->
          <div
            class="flex justify-between items-center mb-4 max-lg:mb-3 max-sm:flex-col max-sm:items-start max-lg:gap-2"
          >
            <div class="relative">
              <button
                @click="showFilter = !showFilter"
                class="flex items-center justify-between gap-2 px-4 max-sm:px-2.5 py-2.5 bg-[#15090e] text-[#f0eaea] rounded-lg border border-[#3b1c23] hover:border-[#ff3344] transition-all text-sm min-w-[200px]"
              >
                <div class="flex items-center gap-2">
                  <Icon
                    icon="mdi:filter-variant"
                    class="w-4 h-4 text-[#ff3344]"
                  />
                  <span>{{
                    currentFilter === "all"
                      ? $t("all_messages")
                      : currentFilter === "read"
                      ? $t("read_messages")
                      : $t("unread_messages")
                  }}</span>
                </div>
                <Icon icon="mdi:chevron-down" class="w-4 h-4 text-[#b37a7a]" />
              </button>

              <!-- Dropdown Menu -->
              <Transition name="fade">
                <div
                  v-if="showFilter"
                  class="absolute left-0 top-full mt-2 w-full bg-[#241017] border border-[#3b1c23] rounded-lg shadow-lg z-50 max-h-40 overflow-y-auto scrollbar-thin"
                >
                  <button
                    @click="
                      filterMails('all');
                      showFilter = false;
                    "
                    class="w-full p-3 text-left text-[#f0eaea] text-[0.9rem] lg:hover:bg-[#15090e] transition-colors border-b border-[#3b1c23] max-lg:p-2.5"
                    :class="{
                      'bg-[#ff3344]/10 text-[#ff3344]': currentFilter === 'all',
                    }"
                  >
                    {{ $t("all_messages") }}
                  </button>
                  <button
                    @click="
                      filterMails('read');
                      showFilter = false;
                    "
                    class="w-full p-3 text-left text-[#f0eaea] text-[0.9rem] lg:hover:bg-[#15090e] transition-colors border-b border-[#3b1c23] max-lg:p-2.5"
                    :class="{
                      'bg-[#ff3344]/10 text-[#ff3344]':
                        currentFilter === 'read',
                    }"
                  >
                    {{ $t("read_messages") }}
                  </button>
                  <button
                    @click="
                      filterMails('unread');
                      showFilter = false;
                    "
                    class="w-full p-3 text-left text-[#f0eaea] text-[0.9rem] lg:hover:bg-[#15090e] transition-colors border-b border-[#3b1c23] last:border-b-0 max-lg:p-2.5"
                    :class="{
                      'bg-[#ff3344]/10 text-[#ff3344]':
                        currentFilter === 'unread',
                    }"
                  >
                    {{ $t("unread_messages") }}
                  </button>
                </div>
              </Transition>
            </div>

            <button
              @click="markAllAsRead"
              class="flex items-center gap-2 max-sm:px-2.5 text-[#ff3344] lg:hover:text-[#c21b3a] text-sm transition-colors"
            >
              <Icon icon="mdi:check-all" class="w-4 h-4" />
              <span>{{ $t("mark_all_read") }}</span>
            </button>
          </div>

          <!-- Messages Table -->
          <div class="space-y-2">
            <div class="border border-[#3b1c23] rounded-lg overflow-hidden">
              <div class="overflow-x-auto scrollbar-thin">
                <table class="w-full min-w-[600px]">
                  <thead>
                    <tr
                      class="border-b bg-gradient-to-r from-[#15090e] via-[#1a0d13] to-[#15090e] border-[#3b1c23]"
                    >
                      <th
                        class="px-4 py-4 max-lg:px-3 max-lg:py-3 text-left text-[0.8rem] max-lg:text-xs font-bold text-[#f0eaea] uppercase tracking-wider"
                      >
                        <div class="flex items-center gap-2 whitespace-nowrap">
                          {{ $t("time") }}
                        </div>
                      </th>
                      <th
                        class="px-4 py-4 max-lg:px-3 max-lg:py-3 text-left text-[0.8rem] max-lg:text-xs font-bold text-[#f0eaea] uppercase tracking-wider"
                      >
                        <div class="flex items-center gap-2 whitespace-nowrap">
                          {{ $t("title") }}
                        </div>
                      </th>
                      <th
                        class="px-4 py-4 max-lg:px-3 max-lg:py-3 text-left text-[0.8rem] max-lg:text-xs font-bold text-[#f0eaea] uppercase tracking-wider hidden md:table-cell"
                      >
                        <div class="flex items-center gap-2 whitespace-nowrap">
                          {{ $t("content") }}
                        </div>
                      </th>
                      <th
                        class="px-4 py-4 max-lg:px-3 max-lg:py-3 text-center text-[0.8rem] max-lg:text-xs font-bold text-[#f0eaea] uppercase tracking-wider"
                      >
                        <div
                          class="flex items-center justify-center gap-2 whitespace-nowrap"
                        >
                          {{ $t("status") }}
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="mail in paginatedMails"
                      :key="mail._id"
                      @click="openMail(mail)"
                      class="group border-b border-[#3b1c23] last:border-b-0 lg:hover:bg-gradient-to-r lg:hover:from-[#ff3344]/5 lg:hover:to-transparent transition-all duration-300 cursor-pointer"
                    >
                      <!-- Date Column -->
                      <td class="px-4 py-5 max-lg:px-3 max-lg:py-4">
                        <div class="flex items-center gap-3 max-lg:gap-2">
                          <div class="relative flex-shrink-0">
                            <div
                              class="w-11 h-11 max-lg:w-9 max-lg:h-9 rounded-xl bg-gradient-to-br from-[#ff3344] to-[#cc2a3a] flex items-center justify-center text-white font-bold text-sm max-lg:text-xs shadow-lg shadow-[#ff3344]/30 group-hover:scale-110 transition-transform"
                            >
                              <Icon
                                icon="mdi:email"
                                class="w-5 h-5 max-lg:w-4 max-lg:h-4"
                              />
                            </div>
                          </div>
                          <div class="min-w-0">
                            <span
                              class="text-sm max-lg:text-xs font-bold text-[#f0eaea] block truncate"
                              :class="!mail.isRead ? 'text-[#ff3344]' : ''"
                            >
                              {{ formatDate(mail.createdAt) }}
                            </span>
                          </div>
                        </div>
                      </td>

                      <!-- Title Column -->
                      <td class="px-4 py-5 max-lg:px-3 max-lg:py-4">
                        <span
                          class="text-sm max-lg:text-xs font-medium text-[#f0eaea]"
                          :class="!mail.isRead ? 'font-bold' : ''"
                        >
                          {{ truncateText(getLocalizedTitle(mail), 30) }}
                        </span>
                      </td>

                      <!-- Content Column -->
                      <td
                        class="px-4 py-5 max-lg:px-3 max-lg:py-4 hidden md:table-cell"
                      >
                        <span class="text-sm text-[#b37a7a]">
                          {{ truncateText(getLocalizedContent(mail), 50) }}
                        </span>
                      </td>

                      <!-- Status Column -->
                      <td class="px-4 py-5 max-lg:px-3 max-lg:py-4">
                        <div class="flex justify-center">
                          <div
                            class="inline-flex items-center gap-2 max-lg:gap-1.5 px-3 py-1.5 max-lg:px-2.5 max-lg:py-1 rounded-lg"
                            :class="
                              mail.isRead
                                ? 'bg-green-500/10'
                                : 'bg-amber-500/10'
                            "
                          >
                            <div
                              class="relative flex items-center justify-center"
                            >
                              <div
                                class="w-2 h-2 max-lg:w-1.5 max-lg:h-1.5 rounded-full"
                                :class="
                                  mail.isRead ? 'bg-green-400' : 'bg-amber-400'
                                "
                              ></div>
                              <div
                                v-if="!mail.isRead"
                                class="absolute w-2 h-2 max-lg:w-1.5 max-lg:h-1.5 rounded-full animate-ping"
                                :class="
                                  mail.isRead ? 'bg-green-400' : 'bg-amber-400'
                                "
                              ></div>
                            </div>
                            <span
                              class="text-xs max-lg:text-[11px] font-bold uppercase tracking-wide whitespace-nowrap"
                              :class="
                                mail.isRead
                                  ? 'text-green-400'
                                  : 'text-amber-400'
                              "
                            >
                              {{ mail.isRead ? $t("read") : $t("unread") }}
                            </span>
                          </div>
                        </div>
                      </td>
                    </tr>

                    <!-- Empty State -->
                    <tr v-if="paginatedMails.length === 0">
                      <td colspan="4" class="px-4 py-16 max-lg:py-12">
                        <div class="flex flex-col items-center">
                          <div
                            class="w-20 h-20 max-lg:w-16 max-lg:h-16 rounded-2xl bg-[#ff3344]/10 flex items-center justify-center mb-5 max-lg:mb-4"
                          >
                            <Icon
                              icon="mdi:email-outline"
                              class="w-10 h-10 max-lg:w-8 max-lg:h-8 text-[#ff3344]"
                            />
                          </div>
                          <h3
                            class="text-[#f0eaea] font-bold mb-2 text-base max-lg:text-sm"
                          >
                            {{ $t("no_messages_found") }}
                          </h3>
                          <p
                            class="text-[#b37a7a] text-sm max-lg:text-xs mb-6 max-lg:mb-5 text-center max-w-sm px-4"
                          >
                            {{ $t("no_messages_category") }}
                          </p>
                          <button
                            v-if="currentFilter !== 'all'"
                            @click="filterMails('all')"
                            class="flex items-center gap-2 px-6 py-3 max-lg:px-5 max-lg:py-2.5 bg-[#ff3344] text-white rounded-xl font-semibold lg:hover:bg-[#cc2a3a] transition-all text-sm max-lg:text-xs"
                          >
                            <Icon
                              icon="mdi:refresh"
                              class="w-5 h-5 max-lg:w-4 max-lg:h-4"
                            />
                            {{ $t("view_all_messages") }}
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <div v-if="paginatedMails.length > 0">
            <div
              class="flex justify-between items-center gap-4 mt-4 max-lg:flex-col max-lg:gap-3"
            >
              <div
                class="flex items-center gap-3 max-lg:order-2 max-lg:w-full max-lg:justify-center"
              >
                <div class="px-3 py-1.5">
                  <span
                    class="text-sm max-lg:text-xs text-[#b37a7a] font-medium"
                  >
                    {{ $t("page") }}
                    <span class="text-[#ff3344] font-bold mx-1">{{
                      currentPage
                    }}</span>
                    {{ $t("of") }}
                    <span class="text-[#f0eaea] font-bold mx-1">{{
                      totalPages
                    }}</span>
                  </span>
                </div>
              </div>

              <div
                class="flex items-center gap-2 max-lg:gap-1.5 max-lg:order-1"
              >
                <button
                  @click="currentPage = 1"
                  :disabled="currentPage === 1"
                  class="w-9 h-9 max-lg:w-8 max-lg:h-8 rounded-lg border border-[#3b1c23] bg-[#15090e] flex items-center justify-center text-[#b37a7a] lg:hover:text-[#ff3344] lg:hover:border-[#ff3344] transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-[#b37a7a] disabled:hover:border-[#3b1c23]"
                >
                  <Icon
                    icon="mdi:chevron-double-left"
                    class="w-5 h-5 max-lg:w-4 max-lg:h-4"
                  />
                </button>

                <button
                  @click="prevPage"
                  :disabled="currentPage === 1"
                  class="w-9 h-9 max-lg:w-8 max-lg:h-8 rounded-lg border border-[#3b1c23] bg-[#15090e] flex items-center justify-center text-[#b37a7a] lg:hover:text-[#ff3344] lg:hover:border-[#ff3344] transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-[#b37a7a] disabled:hover:border-[#3b1c23]"
                >
                  <Icon
                    icon="mdi:chevron-left"
                    class="w-5 h-5 max-lg:w-4 max-lg:h-4"
                  />
                </button>

                <div class="hidden lg:flex gap-1.5">
                  <button
                    v-for="page in displayedPages"
                    :key="page"
                    @click="currentPage = page"
                    :class="[
                      'w-9 h-9 rounded-lg font-bold text-sm transition-all',
                      currentPage === page
                        ? 'bg-[#ff3344] text-white shadow-lg shadow-[#ff3344]/30'
                        : 'bg-[#15090e] text-[#b37a7a] border border-[#3b1c23] lg:hover:text-[#ff3344] lg:hover:border-[#ff3344]',
                    ]"
                  >
                    {{ page }}
                  </button>
                </div>

                <div class="flex lg:hidden gap-1">
                  <button
                    v-for="page in mobileDisplayedPages"
                    :key="page"
                    @click="currentPage = page"
                    :class="[
                      'w-8 h-8 rounded-lg font-bold text-xs transition-all',
                      currentPage === page
                        ? 'bg-[#ff3344] text-white shadow-lg shadow-[#ff3344]/30'
                        : 'bg-[#15090e] text-[#b37a7a] border border-[#3b1c23]',
                    ]"
                  >
                    {{ page }}
                  </button>
                </div>

                <button
                  @click="nextPage"
                  :disabled="currentPage === totalPages"
                  class="w-9 h-9 max-lg:w-8 max-lg:h-8 rounded-lg border border-[#3b1c23] bg-[#15090e] flex items-center justify-center text-[#b37a7a] lg:hover:text-[#ff3344] lg:hover:border-[#ff3344] transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-[#b37a7a] disabled:hover:border-[#3b1c23]"
                >
                  <Icon
                    icon="mdi:chevron-right"
                    class="w-5 h-5 max-lg:w-4 max-lg:h-4"
                  />
                </button>

                <button
                  @click="currentPage = totalPages"
                  :disabled="currentPage === totalPages"
                  class="w-9 h-9 max-lg:w-8 max-lg:h-8 rounded-lg border border-[#3b1c23] bg-[#15090e] flex items-center justify-center text-[#b37a7a] lg:hover:text-[#ff3344] lg:hover:border-[#ff3344] transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-[#b37a7a] disabled:hover:border-[#3b1c23]"
                >
                  <Icon
                    icon="mdi:chevron-double-right"
                    class="w-5 h-5 max-lg:w-4 max-lg:h-4"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Announcements Tab Content -->
        <div v-if="activeTab === 'announcement'">
          <!-- Category Tabs -->
          <div class="mb-6 max-lg:mb-4 border-b border-[#3b1c23]">
            <div
              class="flex overflow-x-auto pb-2 gap-2 max-lg:pb-1 max-lg:gap-1 max-lg:scrollbar-hide"
            >
              <button
                v-for="category in ['All', ...categories.map((c) => c.name)]"
                :key="category"
                @click="selectedAnnouncementTab = category"
                class="py-2 px-4 max-lg:py-1.5 max-lg:px-3 text-sm max-lg:text-xs font-medium whitespace-nowrap transition-colors"
                :class="
                  selectedAnnouncementTab === category
                    ? 'text-[#ff3344] border-b-2 border-[#ff3344]'
                    : 'text-[#b37a7a] lg:hover:text-[#f0eaea] lg:hover:border-b-2 '
                "
              >
                {{ category }}
              </button>
            </div>
          </div>

          <!-- Announcements Table -->
          <div class="space-y-2">
            <div class="border border-[#3b1c23] rounded-lg overflow-hidden">
              <div class="overflow-x-auto scrollbar-thin">
                <table class="w-full min-w-[600px]">
                  <thead>
                    <tr
                      class="border-b bg-gradient-to-r from-[#15090e] via-[#1a0d13] to-[#15090e] border-[#3b1c23]"
                    >
                      <th
                        class="px-4 py-4 max-lg:px-3 max-lg:py-3 text-left text-[0.8rem] max-lg:text-xs font-bold text-[#f0eaea] uppercase tracking-wider"
                      >
                        <div class="flex items-center gap-2 whitespace-nowrap">
                          {{ $t("date") }}
                        </div>
                      </th>
                      <th
                        class="px-4 py-4 max-lg:px-3 max-lg:py-3 text-left text-[0.8rem] max-lg:text-xs font-bold text-[#f0eaea] uppercase tracking-wider"
                      >
                        <div class="flex items-center gap-2 whitespace-nowrap">
                          {{ $t("title") }}
                        </div>
                      </th>
                      <th
                        class="px-4 py-4 max-lg:px-3 max-lg:py-3 text-center text-[0.8rem] max-lg:text-xs font-bold text-[#f0eaea] uppercase tracking-wider"
                      >
                        <div
                          class="flex items-center justify-center gap-2 whitespace-nowrap"
                        >
                          {{ $t("action") }}
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="announcement in paginatedAnnouncements"
                      :key="announcement._id"
                      class="group border-b border-[#3b1c23] last:border-b-0 lg:hover:bg-gradient-to-r lg:hover:from-[#ff3344]/5 lg:hover:to-transparent transition-all duration-300"
                    >
                      <!-- Date Column -->
                      <td class="px-4 py-5 max-lg:px-3 max-lg:py-4">
                        <div class="flex items-center gap-3 max-lg:gap-2">
                          <div class="relative flex-shrink-0">
                            <div
                              class="w-11 h-11 max-lg:w-9 max-lg:h-9 rounded-xl bg-gradient-to-br from-[#ff3344] to-[#cc2a3a] flex items-center justify-center text-white font-bold text-sm max-lg:text-xs"
                            >
                              <Icon
                                icon="mdi:bullhorn"
                                class="w-5 h-5 max-lg:w-4 max-lg:h-4"
                              />
                            </div>
                          </div>
                          <div class="min-w-0">
                            <span
                              class="text-sm max-lg:text-xs font-bold text-[#f0eaea] block truncate"
                            >
                              {{ formatDate(announcement.createdAt) }}
                            </span>
                          </div>
                        </div>
                      </td>

                      <!-- Title Column -->
                      <td class="px-4 py-5 max-lg:px-3 max-lg:py-4">
                        <span
                          class="text-sm max-lg:text-xs font-medium text-[#f0eaea]"
                        >
                          {{
                            truncateText(
                              getLocalizedAnnouncementTitle(announcement),
                              60
                            )
                          }}
                        </span>
                      </td>

                      <!-- Action Column -->
                      <td class="px-4 py-5 max-lg:px-3 max-lg:py-4">
                        <div class="flex justify-center">
                          <button
                            @click="openMailModal(announcement)"
                            class="inline-flex items-center gap-1 px-2.5 py-1 max-lg:px-2 max-lg:py-0.5 bg-gradient-to-r from-[#ff3344]/10 to-[#ff3344]/20 border border-[#ff3344]/40 rounded-lg text-xs max-lg:text-[10px] font-bold text-[#ff3344] shadow-sm whitespace-nowrap lg:hover:shadow-md transition-all"
                          >
                            <Icon
                              icon="mdi:eye"
                              class="w-3 h-3 max-lg:w-2.5 max-lg:h-2.5"
                            />
                            {{ $t("view") }}
                          </button>
                        </div>
                      </td>
                    </tr>

                    <!-- Empty State -->
                    <tr v-if="paginatedAnnouncements.length === 0">
                      <td colspan="3" class="px-4 py-16 max-lg:py-12">
                        <div class="flex flex-col items-center">
                          <div
                            class="w-20 h-20 max-lg:w-16 max-lg:h-16 rounded-2xl bg-[#ff3344]/10 flex items-center justify-center mb-5 max-lg:mb-4"
                          >
                            <Icon
                              icon="mdi:bullhorn-outline"
                              class="w-10 h-10 max-lg:w-8 max-lg:h-8 text-[#ff3344]"
                            />
                          </div>
                          <h3
                            class="text-[#f0eaea] font-bold mb-2 text-base max-lg:text-sm"
                          >
                            {{ $t("no_announcements_found") }}
                          </h3>
                          <p
                            class="text-[#b37a7a] text-sm max-lg:text-xs mb-6 max-lg:mb-5 text-center max-w-sm px-4"
                          >
                            {{ $t("no_announcements_category") }}
                          </p>
                          <button
                            v-if="selectedAnnouncementTab !== 'All'"
                            @click="selectedAnnouncementTab = 'All'"
                            class="flex items-center gap-2 px-6 py-3 max-lg:px-5 max-lg:py-2.5 bg-[#ff3344] text-white rounded-xl font-semibold lg:hover:bg-[#cc2a3a] transition-all text-sm max-lg:text-xs shadow-lg shadow-[#ff3344]/30"
                          >
                            <Icon
                              icon="mdi:refresh"
                              class="w-5 h-5 max-lg:w-4 max-lg:h-4"
                            />
                            {{ $t("view_all_announcements") }}
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <div v-if="paginatedAnnouncements.length > 0">
            <div
              class="flex justify-between items-center gap-4 mt-4 max-lg:flex-col max-lg:gap-3"
            >
              <div
                class="flex items-center gap-3 max-lg:order-2 max-lg:w-full max-lg:justify-center"
              >
                <div class="px-3 py-1.5">
                  <span
                    class="text-sm max-lg:text-xs text-[#b37a7a] font-medium"
                  >
                    {{ $t("page") }}
                    <span class="text-[#ff3344] font-bold mx-1">{{
                      announcementCurrentPage
                    }}</span>
                    {{ $t("of") }}
                    <span class="text-[#f0eaea] font-bold mx-1">{{
                      announcementTotalPages
                    }}</span>
                  </span>
                </div>
              </div>

              <div
                class="flex items-center gap-2 max-lg:gap-1.5 max-lg:order-1"
              >
                <button
                  @click="announcementCurrentPage = 1"
                  :disabled="announcementCurrentPage === 1"
                  class="w-9 h-9 max-lg:w-8 max-lg:h-8 rounded-lg border border-[#3b1c23] bg-[#15090e] flex items-center justify-center text-[#b37a7a] lg:hover:text-[#ff3344] lg:hover:border-[#ff3344] transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-[#b37a7a] disabled:hover:border-[#3b1c23]"
                >
                  <Icon
                    icon="mdi:chevron-double-left"
                    class="w-5 h-5 max-lg:w-4 max-lg:h-4"
                  />
                </button>

                <button
                  @click="prevAnnouncementPage"
                  :disabled="announcementCurrentPage === 1"
                  class="w-9 h-9 max-lg:w-8 max-lg:h-8 rounded-lg border border-[#3b1c23] bg-[#15090e] flex items-center justify-center text-[#b37a7a] lg:hover:text-[#ff3344] lg:hover:border-[#ff3344] transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-[#b37a7a] disabled:hover:border-[#3b1c23]"
                >
                  <Icon
                    icon="mdi:chevron-left"
                    class="w-5 h-5 max-lg:w-4 max-lg:h-4"
                  />
                </button>

                <div class="hidden lg:flex gap-1.5">
                  <button
                    v-for="page in displayedAnnouncementPages"
                    :key="page"
                    @click="announcementCurrentPage = page"
                    :class="[
                      'w-9 h-9 rounded-lg font-bold text-sm transition-all',
                      announcementCurrentPage === page
                        ? 'bg-[#ff3344] text-white shadow-lg shadow-[#ff3344]/30'
                        : 'bg-[#15090e] text-[#b37a7a] border border-[#3b1c23] lg:hover:text-[#ff3344] lg:hover:border-[#ff3344]',
                    ]"
                  >
                    {{ page }}
                  </button>
                </div>

                <div class="flex lg:hidden gap-1">
                  <button
                    v-for="page in mobileAnnouncementPages"
                    :key="page"
                    @click="announcementCurrentPage = page"
                    :class="[
                      'w-8 h-8 rounded-lg font-bold text-xs transition-all',
                      announcementCurrentPage === page
                        ? 'bg-[#ff3344] text-white shadow-lg shadow-[#ff3344]/30'
                        : 'bg-[#15090e] text-[#b37a7a] border border-[#3b1c23]',
                    ]"
                  >
                    {{ page }}
                  </button>
                </div>

                <button
                  @click="nextAnnouncementPage"
                  :disabled="announcementCurrentPage === announcementTotalPages"
                  class="w-9 h-9 max-lg:w-8 max-lg:h-8 rounded-lg border border-[#3b1c23] bg-[#15090e] flex items-center justify-center text-[#b37a7a] lg:hover:text-[#ff3344] lg:hover:border-[#ff3344] transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-[#b37a7a] disabled:hover:border-[#3b1c23]"
                >
                  <Icon
                    icon="mdi:chevron-right"
                    class="w-5 h-5 max-lg:w-4 max-lg:h-4"
                  />
                </button>

                <button
                  @click="announcementCurrentPage = announcementTotalPages"
                  :disabled="announcementCurrentPage === announcementTotalPages"
                  class="w-9 h-9 max-lg:w-8 max-lg:h-8 rounded-lg border border-[#3b1c23] bg-[#15090e] flex items-center justify-center text-[#b37a7a] lg:hover:text-[#ff3344] lg:hover:border-[#ff3344] transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-[#b37a7a] disabled:hover:border-[#3b1c23]"
                >
                  <Icon
                    icon="mdi:chevron-double-right"
                    class="w-5 h-5 max-lg:w-4 max-lg:h-4"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <MessageModal
      :isVisible="showModal"
      :title="currentMail ? getLocalizedTitle(currentMail) : ''"
      :content="currentMail ? getLocalizedContent(currentMail) : ''"
      @close="showModal = false"
    />
  </UserAccountLayout>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import UserAccountLayout from "~/layouts/UserAccountLayout.vue";
import moment from "moment-timezone";

const pageLoading = useState("pageLoading");
const { get, patch } = useApiEndpoint();
const { alertVisible, alertTitle, alertMessage, alertType, showAlert } =
  useAlert();

const formatDate = (date) => {
  if (!date) return "-";
  return moment(date).tz("Asia/Kuala_Lumpur").format("DD/MM/YYYY");
};
const mails = useState("mails", () => []);
const unreadCount = useState("unreadCount");
const currentFilter = ref("all");
const currentPage = ref(1);
const mailsPerPage = ref(10);
const showFilter = ref(false);
const showModal = ref(false);
const currentMail = ref(null);

const announcements = ref([]);
const categories = ref([]);
const selectedAnnouncementTab = ref("All");
const announcementCurrentPage = ref(1);
const announcementsPerPage = ref(10);

const activeTab = ref("notification");

const displayedPages = computed(() => {
  if (totalPages.value <= 5) {
    return Array.from({ length: totalPages.value }, (_, i) => i + 1);
  }

  if (currentPage.value <= 3) {
    return [1, 2, 3, 4, 5];
  }

  if (currentPage.value >= totalPages.value - 2) {
    return [
      totalPages.value - 4,
      totalPages.value - 3,
      totalPages.value - 2,
      totalPages.value - 1,
      totalPages.value,
    ];
  }

  return [
    currentPage.value - 2,
    currentPage.value - 1,
    currentPage.value,
    currentPage.value + 1,
    currentPage.value + 2,
  ];
});

const mobileDisplayedPages = computed(() => {
  if (totalPages.value <= 3) {
    return Array.from({ length: totalPages.value }, (_, i) => i + 1);
  }
  if (currentPage.value === 1) {
    return [1, 2, 3];
  }
  if (currentPage.value === totalPages.value) {
    return [totalPages.value - 2, totalPages.value - 1, totalPages.value];
  }
  return [currentPage.value - 1, currentPage.value, currentPage.value + 1];
});

const displayedAnnouncementPages = computed(() => {
  if (announcementTotalPages.value <= 5) {
    return Array.from(
      { length: announcementTotalPages.value },
      (_, i) => i + 1
    );
  }

  if (announcementCurrentPage.value <= 3) {
    return [1, 2, 3, 4, 5];
  }

  if (announcementCurrentPage.value >= announcementTotalPages.value - 2) {
    return [
      announcementTotalPages.value - 4,
      announcementTotalPages.value - 3,
      announcementTotalPages.value - 2,
      announcementTotalPages.value - 1,
      announcementTotalPages.value,
    ];
  }

  return [
    announcementCurrentPage.value - 2,
    announcementCurrentPage.value - 1,
    announcementCurrentPage.value,
    announcementCurrentPage.value + 1,
    announcementCurrentPage.value + 2,
  ];
});

const mobileAnnouncementPages = computed(() => {
  if (announcementTotalPages.value <= 3) {
    return Array.from(
      { length: announcementTotalPages.value },
      (_, i) => i + 1
    );
  }
  if (announcementCurrentPage.value === 1) {
    return [1, 2, 3];
  }
  if (announcementCurrentPage.value === announcementTotalPages.value) {
    return [
      announcementTotalPages.value - 2,
      announcementTotalPages.value - 1,
      announcementTotalPages.value,
    ];
  }
  return [
    announcementCurrentPage.value - 1,
    announcementCurrentPage.value,
    announcementCurrentPage.value + 1,
  ];
});

const filteredMails = computed(() => {
  if (!mails.value) return [];

  if (currentFilter.value === "unread") {
    return mails.value.filter((mail) => !mail.isRead);
  }
  if (currentFilter.value === "read") {
    return mails.value.filter((mail) => mail.isRead);
  }
  return mails.value;
});

const paginatedMails = computed(() => {
  const start = (currentPage.value - 1) * mailsPerPage.value;
  const end = start + mailsPerPage.value;
  return filteredMails.value.slice(start, end);
});

const totalPages = computed(() =>
  Math.ceil(filteredMails.value.length / mailsPerPage.value)
);

const filteredAnnouncements = computed(() => {
  if (!announcements.value) return [];
  return announcements.value.filter(
    (a) =>
      a.isVisible &&
      (selectedAnnouncementTab.value === "All" ||
        a.category === selectedAnnouncementTab.value)
  );
});

const paginatedAnnouncements = computed(() => {
  const start =
    (announcementCurrentPage.value - 1) * announcementsPerPage.value;
  const end = start + announcementsPerPage.value;
  return filteredAnnouncements.value.slice(start, end);
});

const announcementTotalPages = computed(() =>
  Math.ceil(filteredAnnouncements.value.length / announcementsPerPage.value)
);

function getUnreadCount() {
  return mails.value.filter((mail) => !mail.isRead).length;
}

function filterMails(type) {
  currentFilter.value = type;
  currentPage.value = 1;
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}

function prevAnnouncementPage() {
  if (announcementCurrentPage.value > 1) {
    announcementCurrentPage.value--;
  }
}

function nextAnnouncementPage() {
  if (announcementCurrentPage.value < announcementTotalPages.value) {
    announcementCurrentPage.value++;
  }
}

const truncateText = (text, length) => {
  if (!text) return "";
  if (text.length <= length) return text;
  return text.substring(0, length) + "...";
};

async function openMail(mail) {
  currentMail.value = mail;
  showModal.value = true;

  if (!mail.isRead) {
    try {
      const { data } = await patch(`mails/${mail._id}/read`);
      if (data.success) {
        mail.isRead = true;
        const { data: countResponse } = await get("mails/unreadcount");
        if (countResponse.success) {
          unreadCount.value = countResponse.data.count;
        }
      }
    } catch (error) {
      console.error("Error marking mail as read:", error);
    }
  }
}

function openMailModal(announcement) {
  currentMail.value = {
    titleEN: getLocalizedAnnouncementTitle(announcement),
    contentEN: getLocalizedAnnouncementContent(announcement),
  };

  showModal.value = true;
}

async function markAllAsRead() {
  try {
    const { data } = await patch("mails/allread");
    if (data.success) {
      mails.value = mails.value.map((mail) => ({
        ...mail,
        isRead: true,
      }));
      unreadCount.value = 0;
      showAlert($t("alert_success"), $t("all_marked_read"), "success");
    } else {
      showAlert(
        $t("alert_info"),
        data.message[$locale.value] || data.message.en,
        "info"
      );
    }
  } catch (error) {
    console.error("Error marking all mails as read:", error);
    showAlert("Error", "Failed to mark messages as read", "error");
  }
}

const fetchMails = async () => {
  try {
    const { data } = await get("user/mails");
    if (data.success) {
      mails.value = data.data;
    }
  } catch (error) {
    console.error("Error fetching mails:", error);
  }
};

const fetchAnnouncements = async () => {
  try {
    const { data } = await get("announcements");
    if (data.success) {
      announcements.value = data.data;
    }
  } catch (error) {
    console.error("Error fetching announcements:", error);
  }
};

const fetchCategories = async () => {
  try {
    const { data } = await get("categories");
    if (data.success) {
      categories.value = data.data;
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

const getLocalizedTitle = (mail) => {
  if ($locale.value === "en" && mail.titleEN) return mail.titleEN;
  if ($locale.value === "ms" && mail.titleMS) return mail.titleMS;
  if ($locale.value === "zh" && mail.titleCN) return mail.titleCN;
  return mail.titleEN || mail.title || "No Title";
};

const getLocalizedContent = (mail) => {
  if ($locale.value === "en" && mail.contentEN) return mail.contentEN;
  if ($locale.value === "ms" && mail.contentMS) return mail.contentMS;
  if ($locale.value === "zh" && mail.contentCN) return mail.contentCN;
  return mail.contentEN || mail.content || "No Content";
};

const getLocalizedAnnouncementTitle = (announcement) => {
  if ($locale.value === "en" && announcement.titleEN)
    return announcement.titleEN;
  if ($locale.value === "ms" && announcement.titleMS)
    return announcement.titleMS;
  if ($locale.value === "zh" && announcement.titleCN)
    return announcement.titleCN;
  return announcement.titleEN || announcement.title || "No Title";
};

const getLocalizedAnnouncementContent = (announcement) => {
  if ($locale.value === "en" && announcement.contentEN)
    return announcement.contentEN;
  if ($locale.value === "ms" && announcement.contentMS)
    return announcement.contentMS;
  if ($locale.value === "zh" && announcement.contentCN)
    return announcement.contentCN;
  return announcement.contentEN || announcement.content || "No Content";
};

watch([activeTab, selectedAnnouncementTab], () => {
  if (activeTab.value === "notification") {
    currentPage.value = 1;
  } else {
    announcementCurrentPage.value = 1;
  }
});

watch([currentFilter], () => {
  currentPage.value = 1;
});

onMounted(async () => {
  pageLoading.value = true;
  try {
    await fetchMails();
    await fetchAnnouncements();
    await fetchCategories();
  } catch (error) {
    console.error("Error during initialization:", error);
  } finally {
    pageLoading.value = false;
  }
});
</script>

<style scoped>
.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: #15090e;
  border-radius: 3px;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background: #3b1c23;
  border-radius: 3px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: #ff3344;
}

.scrollbar-thin {
  scrollbar-width: thin;
  scrollbar-color: #3b1c23 #15090e;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
