<template>
  <div>
    <PageLoading v-if="isPageLoading" />
    <Teleport to="body">
      <Alerts
        :title="alertTitle"
        :message="alertMessage"
        :isVisible="alertVisible"
        :type="alertType"
        @close="alertVisible = false"
      />
    </Teleport>
    <div class="min-h-screen bg-[#0a0005] py-8 max-lg:py-6">
      <div class="containerWid mx-auto max-w-6xl">
        <!-- Mobile Layout -->
        <div class="lg:hidden space-y-4">
          <!-- Header Card -->
          <div
            class="bg-gradient-to-r from-[#a1122d] to-[#c21b3a] rounded-xl p-4 shadow-lg shadow-red-500/20"
          >
            <h1
              class="text-xl font-bold text-white flex items-center gap-2 mb-3"
            >
              <Icon icon="mdi:calendar-check" class="text-2xl" />
              {{ $t("daily_check_in") }}
            </h1>

            <div
              class="bg-black/20 backdrop-blur-sm rounded-lg p-3 border border-white/10"
            >
              <div class="flex items-center gap-3">
                <div
                  class="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0"
                >
                  <Icon icon="mdi:clock-outline" class="text-xl text-white" />
                </div>
                <div class="flex-1">
                  <p
                    class="text-[10px] text-red-100/70 uppercase tracking-wide mb-0.5"
                  >
                    {{ $t("next_check_in_reset") }}
                  </p>
                  <p class="text-lg font-bold text-white font-mono">
                    {{ timeRemaining }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Calendar -->
          <div
            class="bg-[#15090e] rounded-xl p-4 shadow-lg border border-[#3b1c23]"
          >
            <div class="text-center mb-4">
              <h2 class="text-lg font-bold text-[#f0eaea]">
                {{ currentMonth }}
              </h2>
            </div>
            <div class="grid grid-cols-7 gap-1.5 mb-2">
              <div
                v-for="day in ['S', 'M', 'T', 'W', 'T', 'F', 'S']"
                :key="day"
                class="text-center text-[#b37a7a] text-xs font-semibold"
              >
                {{ day }}
              </div>
            </div>
            <div class="grid grid-cols-7 gap-1.5">
              <div
                v-for="date in calendarDates"
                :key="date.date"
                class="aspect-square relative"
              >
                <div
                  :class="[
                    'w-full h-full rounded-lg flex flex-col items-center justify-center transition-all text-xs font-medium',
                    getDateStyle(date),
                  ]"
                >
                  <span>{{ date.day }}</span>
                  <div
                    v-if="date.isToday"
                    class="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"
                  ></div>
                  <div v-if="date.isCheckedIn" class="absolute bottom-0.5">
                    <Icon
                      icon="mdi:check-circle"
                      class="text-green-400 text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Check-in Button -->
          <button
            @click="handleCheckIn"
            :disabled="isCheckedInToday"
            class="w-full group relative inline-flex items-center justify-center px-8 py-3 rounded-xl text-white font-bold overflow-hidden transition-all shadow-lg"
            :class="
              isCheckedInToday
                ? 'bg-[#241017] text-[#b37a7a] border border-[#3b1c23] cursor-not-allowed'
                : 'bg-gradient-to-r from-[#a1122d] to-[#c21b3a] active:scale-95 shadow-red-500/30'
            "
          >
            <span class="relative flex items-center gap-3">
              <Icon
                :icon="
                  isCheckedInToday
                    ? 'mdi:check-circle'
                    : 'mdi:hand-pointing-right'
                "
                class="text-xl"
              />
              <span class="text-base">
                {{
                  isCheckedInToday
                    ? $t("come_back_tomorrow")
                    : $t("check_in_now")
                }}
              </span>
            </span>
          </button>

          <!-- Rewards Info Cards -->
          <div class="grid grid-cols-3 max-md:grid-cols-1 gap-2">
            <div
              class="bg-[#15090e] rounded-lg p-3 border border-[#3b1c23] text-center"
            >
              <div
                class="w-10 h-10 mx-auto mb-2 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center border border-blue-500/30"
              >
                <Icon icon="mdi:gift" class="text-xl text-blue-400" />
              </div>
              <h3 class="text-xs font-semibold text-[#f0eaea] mb-1">
                {{ $t("daily_reward") }}
              </h3>
              <p class="text-[10px] text-[#b37a7a]">
                {{ $t("daily_reward_desc") }}
              </p>
            </div>

            <div
              class="bg-[#15090e] rounded-lg p-3 border border-[#3b1c23] text-center"
            >
              <div
                class="w-10 h-10 mx-auto mb-2 rounded-full bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center border border-purple-500/30"
              >
                <Icon icon="mdi:trophy" class="text-xl text-purple-400" />
              </div>
              <h3 class="text-xs font-semibold text-[#f0eaea] mb-1">
                {{ $t("weekly_reward") }}
              </h3>
              <p class="text-[10px] text-[#b37a7a]">
                {{ $t("weekly_reward_desc") }}
              </p>
            </div>

            <div
              class="bg-[#15090e] rounded-lg p-3 border border-[#3b1c23] text-center"
            >
              <div
                class="w-10 h-10 mx-auto mb-2 rounded-full bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 flex items-center justify-center border border-yellow-500/30"
              >
                <Icon icon="mdi:crown" class="text-xl text-yellow-400" />
              </div>
              <h3 class="text-xs font-semibold text-[#f0eaea] mb-1">
                {{ $t("monthly_reward") }}
              </h3>
              <p class="text-[10px] text-[#b37a7a]">
                {{ $t("monthly_reward_desc") }}
              </p>
            </div>
          </div>

          <!-- Terms & Conditions -->
          <div class="bg-[#15090e] rounded-xl p-4 border border-[#3b1c23]">
            <h3
              class="text-base font-bold text-[#f0eaea] mb-3 flex items-center gap-2"
            >
              <Icon icon="mdi:file-document" class="text-[#ff3344] text-lg" />
              {{ $t("terms_condition") }}
            </h3>
            <div class="text-[#b37a7a] space-y-2 text-xs">
              <div class="flex items-start gap-2">
                <Icon
                  icon="mdi:numeric-1-circle"
                  class="text-[#ff3344] text-base flex-shrink-0 mt-0.5"
                />
                <p>{{ $t("daily_check_in_terms_1") }}</p>
              </div>
              <div class="flex items-start gap-2">
                <Icon
                  icon="mdi:numeric-2-circle"
                  class="text-[#ff3344] text-base flex-shrink-0 mt-0.5"
                />
                <div>
                  <p class="mb-1.5">{{ $t("daily_check_in_terms_2") }}</p>
                  <ul class="list-disc pl-4 space-y-1">
                    <li>{{ $t("daily_check_in_terms_2_1") }}</li>
                    <li>{{ $t("daily_check_in_terms_2_2") }}</li>
                    <li>{{ $t("daily_check_in_terms_2_3") }}</li>
                  </ul>
                </div>
              </div>
              <div class="flex items-start gap-2">
                <Icon
                  icon="mdi:numeric-3-circle"
                  class="text-[#ff3344] text-base flex-shrink-0 mt-0.5"
                />
                <p>{{ $t("daily_check_in_terms_3") }}</p>
              </div>
              <div class="flex items-start gap-2">
                <Icon
                  icon="mdi:numeric-4-circle"
                  class="text-[#ff3344] text-base flex-shrink-0 mt-0.5"
                />
                <p>{{ $t("daily_check_in_terms_4") }}</p>
              </div>
              <div class="flex items-start gap-2">
                <Icon
                  icon="mdi:numeric-5-circle"
                  class="text-[#ff3344] text-base flex-shrink-0 mt-0.5"
                />
                <p>{{ $t("daily_check_in_terms_5") }}</p>
              </div>
            </div>
            <div class="text-center text-[10px] text-[#b37a7a] mt-3">
              <p>{{ $t("daily_check_in_reset_time") }}</p>
            </div>
          </div>
        </div>

        <!-- Desktop Layout -->
        <div class="hidden lg:grid grid-cols-3 gap-6">
          <!-- Left Column -->
          <div class="col-span-2 space-y-6">
            <!-- Header Card -->
            <div
              class="bg-gradient-to-r from-[#a1122d] to-[#c21b3a] rounded-xl p-6 shadow-lg shadow-red-500/20"
            >
              <div class="flex items-center justify-between mb-4">
                <h1
                  class="text-2xl font-bold text-white flex items-center gap-2"
                >
                  <Icon icon="mdi:calendar-check" class="text-3xl" />
                  {{ $t("daily_check_in") }}
                </h1>
              </div>

              <div
                class="bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-white/10"
              >
                <div class="flex items-center gap-3">
                  <div
                    class="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0"
                  >
                    <Icon
                      icon="mdi:clock-outline"
                      class="text-2xl text-white"
                    />
                  </div>
                  <div class="flex-1">
                    <p
                      class="text-xs text-red-100/70 uppercase tracking-wide mb-1"
                    >
                      {{ $t("next_check_in_reset") }}
                    </p>
                    <p class="text-2xl font-bold text-white font-mono">
                      {{ timeRemaining }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Rewards Info Cards -->
            <div class="grid grid-cols-3 gap-4">
              <div
                class="bg-[#15090e] rounded-xl p-5 border border-[#3b1c23] text-center"
              >
                <div
                  class="w-14 h-14 mx-auto mb-3 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center border border-blue-500/30"
                >
                  <Icon icon="mdi:gift" class="text-3xl text-blue-400" />
                </div>
                <h3 class="text-base font-semibold text-[#f0eaea] mb-2">
                  {{ $t("daily_reward") }}
                </h3>
                <p class="text-sm text-[#b37a7a]">
                  {{ $t("daily_reward_desc") }}
                </p>
              </div>

              <div
                class="bg-[#15090e] rounded-xl p-5 border border-[#3b1c23] text-center"
              >
                <div
                  class="w-14 h-14 mx-auto mb-3 rounded-full bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center border border-purple-500/30"
                >
                  <Icon icon="mdi:trophy" class="text-3xl text-purple-400" />
                </div>
                <h3 class="text-base font-semibold text-[#f0eaea] mb-2">
                  {{ $t("weekly_reward") }}
                </h3>
                <p class="text-sm text-[#b37a7a]">
                  {{ $t("weekly_reward_desc") }}
                </p>
              </div>

              <div
                class="bg-[#15090e] rounded-xl p-5 border border-[#3b1c23] text-center"
              >
                <div
                  class="w-14 h-14 mx-auto mb-3 rounded-full bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 flex items-center justify-center border border-yellow-500/30"
                >
                  <Icon icon="mdi:crown" class="text-3xl text-yellow-400" />
                </div>
                <h3 class="text-base font-semibold text-[#f0eaea] mb-2">
                  {{ $t("monthly_reward") }}
                </h3>
                <p class="text-sm text-[#b37a7a]">
                  {{ $t("monthly_reward_desc") }}
                </p>
              </div>
            </div>

            <!-- Terms & Conditions -->
            <div class="bg-[#15090e] rounded-xl p-6 border border-[#3b1c23]">
              <h3
                class="text-lg font-bold text-[#f0eaea] mb-4 flex items-center gap-2"
              >
                <Icon icon="mdi:file-document" class="text-[#ff3344] text-xl" />
                {{ $t("terms_condition") }}
              </h3>
              <div class="text-[#b37a7a] space-y-3 text-sm">
                <div class="flex items-start gap-2">
                  <Icon
                    icon="mdi:numeric-1-circle"
                    class="text-[#ff3344] text-lg flex-shrink-0 mt-0.5"
                  />
                  <p>{{ $t("daily_check_in_terms_1") }}</p>
                </div>
                <div class="flex items-start gap-2">
                  <Icon
                    icon="mdi:numeric-2-circle"
                    class="text-[#ff3344] text-lg flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <p class="mb-2">{{ $t("daily_check_in_terms_2") }}</p>
                    <ul class="list-disc pl-5 space-y-1">
                      <li>{{ $t("daily_check_in_terms_2_1") }}</li>
                      <li>{{ $t("daily_check_in_terms_2_2") }}</li>
                      <li>{{ $t("daily_check_in_terms_2_3") }}</li>
                    </ul>
                  </div>
                </div>
                <div class="flex items-start gap-2">
                  <Icon
                    icon="mdi:numeric-3-circle"
                    class="text-[#ff3344] text-lg flex-shrink-0 mt-0.5"
                  />
                  <p>{{ $t("daily_check_in_terms_3") }}</p>
                </div>
                <div class="flex items-start gap-2">
                  <Icon
                    icon="mdi:numeric-4-circle"
                    class="text-[#ff3344] text-lg flex-shrink-0 mt-0.5"
                  />
                  <p>{{ $t("daily_check_in_terms_4") }}</p>
                </div>
                <div class="flex items-start gap-2">
                  <Icon
                    icon="mdi:numeric-5-circle"
                    class="text-[#ff3344] text-lg flex-shrink-0 mt-0.5"
                  />
                  <p>{{ $t("daily_check_in_terms_5") }}</p>
                </div>
              </div>
              <div class="text-center text-xs text-[#b37a7a] mt-4">
                <p>{{ $t("daily_check_in_reset_time") }}</p>
              </div>
            </div>
          </div>

          <!-- Right Column -->
          <div class="col-span-1">
            <div class="sticky top-6 space-y-4">
              <!-- Calendar -->
              <div
                class="bg-[#15090e] rounded-xl p-6 shadow-lg border border-[#3b1c23]"
              >
                <div class="text-center mb-4">
                  <h2 class="text-xl font-bold text-[#f0eaea]">
                    {{ currentMonth }}
                  </h2>
                </div>
                <div class="grid grid-cols-7 gap-1.5 mb-2">
                  <div
                    v-for="day in ['S', 'M', 'T', 'W', 'T', 'F', 'S']"
                    :key="day"
                    class="text-center text-[#b37a7a] text-xs font-semibold"
                  >
                    {{ day }}
                  </div>
                </div>
                <div class="grid grid-cols-7 gap-1.5">
                  <div
                    v-for="date in calendarDates"
                    :key="date.date"
                    class="aspect-square relative"
                  >
                    <div
                      :class="[
                        'w-full h-full rounded-lg flex flex-col items-center justify-center transition-all text-xs font-medium',
                        getDateStyle(date),
                      ]"
                    >
                      <span>{{ date.day }}</span>
                      <div
                        v-if="date.isToday"
                        class="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"
                      ></div>
                      <div v-if="date.isCheckedIn" class="absolute bottom-0.5">
                        <Icon
                          icon="mdi:check-circle"
                          class="text-green-400 text-xs"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Check-in Button -->
              <button
                @click="handleCheckIn"
                :disabled="isCheckedInToday"
                class="w-full group relative inline-flex items-center justify-center px-8 py-4 rounded-xl text-white font-bold overflow-hidden transition-all shadow-lg"
                :class="
                  isCheckedInToday
                    ? 'bg-[#241017] text-[#b37a7a] border border-[#3b1c23] cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#a1122d] to-[#c21b3a] hover:brightness-110 hover:scale-105 shadow-red-500/30'
                "
              >
                <span class="relative flex items-center gap-3">
                  <Icon
                    :icon="
                      isCheckedInToday
                        ? 'mdi:check-circle'
                        : 'mdi:hand-pointing-right'
                    "
                    class="text-2xl"
                  />
                  <span class="text-lg">
                    {{
                      isCheckedInToday
                        ? $t("come_back_tomorrow")
                        : $t("check_in_now")
                    }}
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";

const userData = useState("userData");
const { get, post } = useApiEndpoint();
const isPageLoading = ref(true);

const checkInData = ref({
  currentStreak: 0,
  lastCheckIn: null,
  monthlyCheckIns: {},
  dailyRewards: [],
});

const isCheckedInToday = ref(false);
const timeRemaining = ref("");

const alertVisible = ref(false);
const alertTitle = ref("");
const alertMessage = ref("");
const alertType = ref("");

function showAlert(title, message, type = "info") {
  alertTitle.value = title;
  alertMessage.value = message;
  alertType.value = type;
  alertVisible.value = true;
}

const getMalaysiaTime = () => {
  return new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Kuala_Lumpur" })
  );
};

const calendarDates = computed(() => {
  const today = getMalaysiaTime();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  let dates = [];
  const firstDayOfWeek = firstDay.getDay();

  for (let i = 0; i < firstDayOfWeek; i++) {
    dates.push({
      date: null,
      day: "",
      isCurrentMonth: false,
    });
  }

  for (let i = 1; i <= lastDay.getDate(); i++) {
    const currentDate = new Date(today.getFullYear(), today.getMonth(), i);
    dates.push({
      date: currentDate,
      day: i,
      isCurrentMonth: true,
      isToday: i === today.getDate(),
      isCheckedIn:
        checkInData.value.monthlyCheckIns?.[today.getMonth()]?.includes(i),
    });
  }

  return dates;
});

const getDateStyle = (date) => {
  if (!date.isCurrentMonth) return "bg-[#241017] text-[#b37a7a]/50";
  if (date.isCheckedIn)
    return "bg-[#ff3344]/20 text-white border border-[#ff3344]";
  if (date.isToday) return "bg-[#241017] text-white border-2 border-blue-400";
  return "bg-[#241017] text-[#b37a7a] border border-[#3b1c23]";
};

const updateTimeRemaining = () => {
  const now = getMalaysiaTime();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  const diff = tomorrow - now;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  timeRemaining.value = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

const handleCheckIn = async () => {
  if (isCheckedInToday.value) {
    showAlert($t("already_checked_in"), $t("already_checked_in_text"), "info");
    return;
  }

  if (!userData.value) {
    showAlert(
      $t("login_required"),
      $t("please_login_to_continue_check_in"),
      "info"
    );
    return;
  }

  try {
    const { data } = await post("checkin");

    if (data.success) {
      checkInData.value = {
        ...data.checkInData,
        monthlyCheckIns: data.checkInData.monthlyCheckIns || {},
      };
      isCheckedInToday.value = true;

      if (data.isMonthlyComplete) {
        showAlert(
          $t("monthly_complete_title"),
          $t("monthly_complete_text"),
          "success"
        );
      } else if (data.isWeeklyComplete) {
        showAlert(
          $t("weekly_complete_title"),
          $t("weekly_complete_text"),
          "success"
        );
      } else {
        showAlert($t("success"), $t("checkin_success_text"), "success");
      }
    } else {
      showAlert(
        $t("info"),
        data.message[$locale.value] || data.message.en,
        "info"
      );
    }
  } catch (error) {
    console.error("Error checking in:", error);
    showAlert(
      $t("error"),
      error.response?.data?.message?.[$locale.value] ||
        error.response?.data?.message?.en ||
        $t("network_error"),
      "error"
    );
  }
};

const checkTodayStatus = async () => {
  try {
    const { data, error } = await get("checkin/status");
    if (error) throw error;

    if (data.success) {
      const today = getMalaysiaTime();
      const lastCheckIn = new Date(data.checkInData.lastCheckIn);
      const isSameDay =
        lastCheckIn.getFullYear() === today.getFullYear() &&
        lastCheckIn.getMonth() === today.getMonth() &&
        lastCheckIn.getDate() === today.getDate();

      isCheckedInToday.value = isSameDay;
      checkInData.value = {
        ...data.checkInData,
        monthlyCheckIns: data.checkInData.monthlyCheckIns || {},
      };
    }
  } catch (error) {
    console.error("Error checking status:", error);
  }
};

const currentMonth = computed(() => {
  const myTime = getMalaysiaTime();
  return myTime
    .toLocaleString("en-US", {
      month: "long",
      year: "numeric",
      timeZone: "Asia/Kuala_Lumpur",
    })
    .toUpperCase();
});

onMounted(async () => {
  try {
    if (userData.value) await checkTodayStatus();
    updateTimeRemaining();
    const timer = setInterval(updateTimeRemaining, 1000);
    onUnmounted(() => {
      clearInterval(timer);
    });
  } finally {
    isPageLoading.value = false;
  }
});

useHead({
  title: "EGM8 | Daily Check-In - Earn Rewards",
});
</script>

<style scoped>
.containerWid {
  max-width: 1920px;
}
</style>
