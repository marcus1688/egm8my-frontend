<template>
  <UserAccountLayout>
    <div class="bg-white text-gray-800 rounded-lg">
      <div class="mb-4 max-lg:mb-3">
        <h1 class="text-lg font-bold max-lg:text-base">
          {{ $t("messaging") }}
        </h1>
        <p class="text-gray-500 text-sm max-lg:text-xs">
          {{ $t("view_messages") }}
        </p>
      </div>

      <div>
        <!-- Tab navigations -->
        <div class="mb-6 max-lg:mb-4">
          <div class="flex border-b border-gray-200">
            <button
              class="py-3 px-6 max-lg:py-2 max-lg:px-4 font-medium text-sm max-lg:text-xs transition-colors"
              :class="
                activeTab === 'notification'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 lg:hover:text-gray-700'
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
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 lg:hover:text-gray-700'
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
            class="flex justify-between items-center mb-4 max-lg:mb-3 max-lg:flex-col max-lg:items-start max-lg:gap-2"
          >
            <div class="relative">
              <button
                @click="showFilter = !showFilter"
                class="flex items-center gap-2 text-gray-600 lg:hover:text-blue-600 bg-gray-100 lg:hover:bg-gray-200 px-3 py-2 max-lg:px-2 max-lg:py-1.5 rounded-md transition-colors max-lg:text-sm"
              >
                <Icon
                  icon="mdi:filter-variant"
                  class="w-5 h-5 max-lg:w-4 max-lg:h-4"
                />
                <span>{{
                  currentFilter === "all"
                    ? $t("all_messages")
                    : currentFilter === "read"
                    ? $t("read_messages")
                    : $t("unread_messages")
                }}</span>
                <Icon
                  icon="mdi:chevron-down"
                  class="w-4 h-4 max-lg:w-3 max-lg:h-3"
                />
              </button>
              <div
                v-if="showFilter"
                class="absolute left-0 top-full mt-1 bg-white rounded-md shadow-lg z-10 border border-gray-200 w-48 max-lg:w-full"
              >
                <button
                  @click="
                    filterMails('all');
                    showFilter = false;
                  "
                  class="block w-full text-left px-4 py-2 max-lg:px-3 max-lg:py-1.5 text-sm max-lg:text-xs text-gray-700 lg:hover:bg-blue-50 lg:hover:text-blue-600"
                  :class="{
                    'bg-blue-50 text-blue-600': currentFilter === 'all',
                  }"
                >
                  {{ $t("all_messages") }}
                </button>
                <button
                  @click="
                    filterMails('read');
                    showFilter = false;
                  "
                  class="block w-full text-left px-4 py-2 max-lg:px-3 max-lg:py-1.5 text-sm max-lg:text-xs text-gray-700 lg:hover:bg-blue-50 lg:hover:text-blue-600"
                  :class="{
                    'bg-blue-50 text-blue-600': currentFilter === 'read',
                  }"
                >
                  {{ $t("read_messages") }}
                </button>
                <button
                  @click="
                    filterMails('unread');
                    showFilter = false;
                  "
                  class="block w-full text-left px-4 py-2 max-lg:px-3 max-lg:py-1.5 text-sm max-lg:text-xs text-gray-700 lg:hover:bg-blue-50 lg:hover:text-blue-600"
                  :class="{
                    'bg-blue-50 text-blue-600': currentFilter === 'unread',
                  }"
                >
                  {{ $t("unread_messages") }}
                </button>
              </div>
            </div>

            <button
              @click="markAllAsRead"
              class="flex items-center gap-2 text-blue-600 lg:hover:text-blue-700 max-lg:text-sm"
            >
              <Icon
                icon="mdi:check-all"
                class="w-5 h-5 max-lg:w-4 max-lg:h-4"
              />
              <span>{{ $t("mark_all_read") }}</span>
            </button>
          </div>

          <!-- Messages Table -->
          <div
            class="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm mb-6 max-lg:mb-4"
          >
            <div class="overflow-x-auto">
              <table class="w-full text-left">
                <thead>
                  <tr class="bg-gray-50 border-b border-gray-200">
                    <th
                      class="py-3 px-4 max-lg:py-2 max-lg:px-3 text-sm max-lg:text-xs font-medium text-gray-600 uppercase w-1/4"
                    >
                      {{ $t("time") }}
                    </th>
                    <th
                      class="py-3 px-4 max-lg:py-2 max-lg:px-3 text-sm max-lg:text-xs font-medium text-gray-600 uppercase w-1/4"
                    >
                      {{ $t("title") }}
                    </th>
                    <th
                      class="py-3 px-4 max-lg:py-2 max-lg:px-3 text-sm max-lg:text-xs font-medium text-gray-600 uppercase w-2/5 hidden md:table-cell"
                    >
                      {{ $t("content") }}
                    </th>
                    <th
                      class="py-3 px-4 max-lg:py-2 max-lg:px-3 text-sm max-lg:text-xs font-medium text-gray-600 uppercase w-1/6 text-center"
                    >
                      {{ $t("status") }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(mail, index) in paginatedMails"
                    :key="mail._id"
                    :class="[
                      'border-b border-gray-200 lg:hover:bg-blue-50 transition-colors cursor-pointer',
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50',
                      !mail.isRead ? 'font-medium' : '',
                    ]"
                    @click="openMail(mail)"
                  >
                    <td
                      class="py-3 px-4 max-lg:py-2 max-lg:px-3 text-sm max-lg:text-xs text-gray-700"
                    >
                      {{ formatDate(mail.createdAt) }}
                    </td>
                    <td
                      class="py-3 px-4 max-lg:py-2 max-lg:px-3 text-sm max-lg:text-xs text-gray-700"
                    >
                      {{ truncateText(getLocalizedTitle(mail), 30) }}
                    </td>
                    <td
                      class="py-3 px-4 max-lg:py-2 max-lg:px-3 text-sm max-lg:text-xs text-gray-500 hidden md:table-cell"
                    >
                      {{ truncateText(getLocalizedContent(mail), 50) }}
                    </td>
                    <td class="py-3 px-4 max-lg:py-2 max-lg:px-3 text-center">
                      <span
                        class="px-2 py-1 max-lg:px-1.5 max-lg:py-0.5 rounded-full text-xs max-lg:text-[10px] font-medium"
                        :class="
                          mail.isRead
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        "
                      >
                        {{ mail.isRead ? $t("read") : $t("unread") }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Empty State -->
          <div
            v-if="paginatedMails.length === 0"
            class="py-16 max-lg:py-10 text-center"
          >
            <div class="flex flex-col items-center">
              <div
                class="w-20 h-20 max-lg:w-16 max-lg:h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 max-lg:mb-3"
              >
                <Icon
                  icon="mdi:email-outline"
                  class="w-10 h-10 max-lg:w-8 max-lg:h-8 text-gray-400"
                />
              </div>
              <h3 class="text-gray-500 font-medium mb-1 max-lg:text-sm">
                {{ $t("no_messages_found") }}
              </h3>
              <p
                class="text-gray-400 text-sm max-lg:text-xs mb-4 max-lg:mb-3 max-lg:px-4"
              >
                {{ $t("no_messages_category") }}
              </p>
              <button
                v-if="currentFilter !== 'all'"
                @click="filterMails('all')"
                class="px-4 py-2 max-lg:px-3 max-lg:py-1.5 bg-blue-600 text-white rounded-lg lg:hover:bg-blue-700 transition-colors max-lg:text-sm"
              >
                {{ $t("view_all_messages") }}
              </button>
            </div>
          </div>

          <!-- Pagination -->
          <div
            v-if="paginatedMails.length > 0"
            class="flex justify-between items-center mt-4 max-lg:flex-col max-lg:gap-3"
          >
            <div
              class="text-gray-500 text-sm max-lg:text-xs max-lg:order-2 max-lg:hidden"
            >
              {{
                $t("showing_entries_messages", {
                  start: getStartEntry(),
                  end: getEndEntry(),
                  total: filteredMails.length,
                })
              }}
            </div>

            <div
              class="flex items-center gap-2 max-lg:order-1 max-lg:w-full max-lg:justify-end"
            >
              <button
                @click="prevPage"
                :disabled="currentPage === 1"
                class="px-3 py-2 max-lg:px-2 max-lg:py-1.5 rounded-md border border-gray-300 bg-white text-gray-700 shadow-sm transition-colors lg:hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                <Icon
                  icon="mdi:chevron-left"
                  class="w-4 h-4 max-lg:w-3 max-lg:h-3"
                />
              </button>

              <span
                v-for="page in displayedPages"
                :key="page"
                @click="currentPage = page"
                :class="[
                  'w-8 h-8 max-lg:w-7 max-lg:h-7 flex items-center justify-center rounded-md font-medium cursor-pointer text-sm max-lg:text-xs',
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 border border-gray-300 lg:hover:bg-gray-50',
                ]"
              >
                {{ page }}
              </span>

              <button
                @click="nextPage"
                :disabled="currentPage === totalPages"
                class="px-3 py-2 max-lg:px-2 max-lg:py-1.5 rounded-md border border-gray-300 bg-white text-gray-700 shadow-sm transition-colors lg:hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                <Icon
                  icon="mdi:chevron-right"
                  class="w-4 h-4 max-lg:w-3 max-lg:h-3"
                />
              </button>
            </div>
          </div>
        </div>

        <!-- Announcements Tab Content -->
        <div v-if="activeTab === 'announcement'">
          <!-- Category Tabs -->
          <div class="mb-6 max-lg:mb-4 border-b border-gray-200">
            <div
              class="flex overflow-x-auto pb-2 gap-2 max-lg:pb-1 max-lg:gap-1 max-lg:scrollbar-hide"
            >
              <button
                v-for="category in ['All', ...categories.map((c) => c.name)]"
                :key="category"
                @click="selectedAnnouncementTab = category"
                class="py-2 px-4 max-lg:py-1.5 max-lg:px-3 text-sm max-lg:text-xs font-medium whitespace-nowrap"
                :class="
                  selectedAnnouncementTab === category
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 lg:hover:text-gray-700 lg:hover:border-b-2 lg:hover:border-gray-200'
                "
              >
                {{ category }}
              </button>
            </div>
          </div>

          <!-- Announcements Table -->
          <div
            class="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm mb-6 max-lg:mb-4"
          >
            <div class="overflow-x-auto">
              <table class="w-full text-left">
                <thead>
                  <tr class="bg-gray-50 border-b border-gray-200">
                    <th
                      class="py-3 px-4 max-lg:py-2 max-lg:px-3 text-sm max-lg:text-xs font-medium text-gray-600 uppercase w-1/4"
                    >
                      {{ $t("date") }}
                    </th>
                    <th
                      class="py-3 px-4 max-lg:py-2 max-lg:px-3 text-sm max-lg:text-xs font-medium text-gray-600 uppercase w-2/3"
                    >
                      {{ $t("title") }}
                    </th>
                    <th
                      class="py-3 px-4 max-lg:py-2 max-lg:px-3 text-sm max-lg:text-xs font-medium text-gray-600 uppercase w-1/6 text-center"
                    >
                      {{ $t("action") }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(announcement, index) in paginatedAnnouncements"
                    :key="announcement._id"
                    :class="[
                      'border-b border-gray-200 lg:hover:bg-blue-50 transition-colors',
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50',
                    ]"
                  >
                    <td
                      class="py-3 px-4 max-lg:py-2 max-lg:px-3 text-sm max-lg:text-xs text-gray-700"
                    >
                      {{ formatDate(announcement.createdAt) }}
                    </td>
                    <td
                      class="py-3 px-4 max-lg:py-2 max-lg:px-3 text-sm max-lg:text-xs text-gray-700"
                    >
                      {{
                        truncateText(
                          getLocalizedAnnouncementTitle(announcement),
                          60
                        )
                      }}
                    </td>
                    <td class="py-3 px-4 max-lg:py-2 max-lg:px-3 text-center">
                      <button
                        @click="openMailModal(announcement)"
                        class="px-3 py-2 max-lg:px-2 max-lg:py-1 text-xs max-lg:text-[10px] bg-blue-600 text-white rounded lg:hover:bg-blue-700 transition-colors"
                      >
                        {{ $t("view") }}
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Empty State -->
          <div
            v-if="paginatedAnnouncements.length === 0"
            class="py-16 max-lg:py-10 text-center"
          >
            <div class="flex flex-col items-center">
              <div
                class="w-20 h-20 max-lg:w-16 max-lg:h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 max-lg:mb-3"
              >
                <Icon
                  icon="mdi:bullhorn-outline"
                  class="w-10 h-10 max-lg:w-8 max-lg:h-8 text-gray-400"
                />
              </div>
              <h3 class="text-gray-500 font-medium mb-1 max-lg:text-sm">
                {{ $t("no_announcements_found") }}
              </h3>
              <p
                class="text-gray-400 text-sm max-lg:text-xs mb-4 max-lg:mb-3 max-lg:px-4"
              >
                {{ $t("no_announcements_category") }}
              </p>
              <button
                v-if="selectedAnnouncementTab !== 'All'"
                @click="selectedAnnouncementTab = 'All'"
                class="px-4 py-2 max-lg:px-3 max-lg:py-1.5 bg-blue-600 text-white rounded-lg lg:hover:bg-blue-700 transition-colors max-lg:text-sm"
              >
                {{ $t("view_all_announcements") }}
              </button>
            </div>
          </div>

          <!-- Pagination -->
          <div
            v-if="paginatedAnnouncements.length > 0"
            class="flex justify-between items-center mt-4 max-lg:flex-col max-lg:gap-3"
          >
            <div
              class="text-gray-500 text-sm max-lg:text-xs max-lg:order-2 max-lg:hidden"
            >
              {{
                $t("showing_entries_announcements", {
                  start: getAnnouncementStartEntry(),
                  end: getAnnouncementEndEntry(),
                  total: filteredAnnouncements.length,
                })
              }}
            </div>

            <div
              class="flex items-center gap-2 max-lg:order-1 max-lg:w-full max-lg:justify-end"
            >
              <button
                @click="prevAnnouncementPage"
                :disabled="announcementCurrentPage === 1"
                class="px-3 py-2 max-lg:px-2 max-lg:py-1.5 rounded-md border border-gray-300 bg-white text-gray-700 shadow-sm transition-colors lg:hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                <Icon
                  icon="mdi:chevron-left"
                  class="w-4 h-4 max-lg:w-3 max-lg:h-3"
                />
              </button>

              <span
                v-for="page in displayedAnnouncementPages"
                :key="page"
                @click="announcementCurrentPage = page"
                :class="[
                  'w-8 h-8 max-lg:w-7 max-lg:h-7 flex items-center justify-center rounded-md font-medium cursor-pointer text-sm max-lg:text-xs',
                  announcementCurrentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 border border-gray-300 lg:hover:bg-gray-50',
                ]"
              >
                {{ page }}
              </span>

              <button
                @click="nextAnnouncementPage"
                :disabled="announcementCurrentPage === announcementTotalPages"
                class="px-3 py-2 max-lg:px-2 max-lg:py-1.5 rounded-md border border-gray-300 bg-white text-gray-700 shadow-sm transition-colors lg:hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                <Icon
                  icon="mdi:chevron-right"
                  class="w-4 h-4 max-lg:w-3 max-lg:h-3"
                />
              </button>
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
import { LoremIpsum } from "lorem-ipsum";

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

const modalTitle = ref("");
const modalContent = ref("");

const activeTab = ref("notification");
const lorem = new LoremIpsum();

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

function getStartEntry() {
  return filteredMails.value.length === 0
    ? 0
    : (currentPage.value - 1) * mailsPerPage.value + 1;
}

function getEndEntry() {
  return Math.min(
    currentPage.value * mailsPerPage.value,
    filteredMails.value.length
  );
}

function getAnnouncementStartEntry() {
  return filteredAnnouncements.value.length === 0
    ? 0
    : (announcementCurrentPage.value - 1) * announcementsPerPage.value + 1;
}

function getAnnouncementEndEntry() {
  return Math.min(
    announcementCurrentPage.value * announcementsPerPage.value,
    filteredAnnouncements.value.length
  );
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
