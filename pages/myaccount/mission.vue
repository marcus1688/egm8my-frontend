<template>
  <UserAccountLayout>
    <div class="text-[#f0eaea]">
      <div class="mb-6 max-lg:mb-4">
        <h1 class="text-xl font-bold mb-1 max-lg:text-lg max-sm:text-base">
          {{ $t("daily_missions") }}
        </h1>
        <p class="text-[#b37a7a] text-sm max-lg:text-xs">
          {{ $t("daily_missions_desc") }}
        </p>
      </div>

      <div
        class="bg-[#241017] border border-[#3b1c23] rounded-xl overflow-hidden mb-6 max-lg:mb-4"
      >
        <div
          class="p-4 bg-gradient-to-r from-[#ff3344]/5 to-transparent border-b border-[#3b1c23]"
        >
          <h3 class="font-bold text-[#f0eaea] text-base max-lg:text-sm">
            {{ $t("today_progress") }}
          </h3>
        </div>
        <div class="p-6 max-lg:p-4">
          <div class="grid grid-cols-3 gap-4 max-md:gap-3">
            <div class="text-center">
              <div
                class="w-24 h-24 mx-auto flex items-center justify-center mb-2 max-lg:w-16 max-lg:h-16"
              >
                <img
                  src="/images/daily-mission/turnover.png"
                  alt="Turnover"
                  class="w-full h-full object-contain"
                />
              </div>
              <p class="text-xs text-[#b37a7a] mb-1 max-lg:text-[10px]">
                {{ $t("total_turnover") }}
              </p>
              <p class="text-lg font-bold text-blue-400 max-lg:text-base">
                {{ formatAmount(todayStats.totalTurnover) }}
              </p>
            </div>
            <div class="text-center">
              <div
                class="w-24 h-24 mx-auto flex items-center justify-center mb-2 max-lg:w-16 max-lg:h-16"
              >
                <img
                  src="/images/daily-mission/withdraw.png"
                  alt="Withdraw"
                  class="w-full h-full object-contain"
                />
              </div>
              <p class="text-xs text-[#b37a7a] mb-1 max-lg:text-[10px]">
                {{ $t("withdrawals") }}
              </p>
              <p class="text-lg font-bold text-green-400 max-lg:text-base">
                {{ todayStats.withdrawCount }}
              </p>
            </div>
            <div class="text-center">
              <div
                class="w-24 h-24 mx-auto flex items-center justify-center mb-2 max-lg:w-16 max-lg:h-16"
              >
                <img
                  src="/images/daily-mission/deposit.png"
                  alt="Deposit"
                  class="w-full h-full object-contain"
                />
              </div>
              <p class="text-xs text-[#b37a7a] mb-1 max-lg:text-[10px]">
                {{ $t("deposits") }}
              </p>
              <p class="text-lg font-bold text-purple-400 max-lg:text-base">
                {{ todayStats.depositCount }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="lg:grid lg:grid-cols-3 gap-6 max-lg:gap-4">
        <div class="lg:col-span-2 space-y-4">
          <div
            v-if="isLoading"
            class="bg-[#241017] border border-[#3b1c23] rounded-xl p-8 text-center"
          >
            <Icon
              icon="mdi:loading"
              class="w-12 h-12 text-[#ff3344] mx-auto mb-4 animate-spin"
            />
            <p class="text-[#b37a7a] text-sm">{{ $t("loading_missions") }}</p>
          </div>

          <div
            v-else-if="missions.length > 0"
            v-for="mission in missions"
            :key="mission._id"
            class="bg-[#241017] border border-[#3b1c23] rounded-xl overflow-hidden lg:hover:border-[#ff3344]/50 transition-all duration-300"
          >
            <div class="p-5 max-lg:p-4">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-3">
                  <div
                    class="w-12 h-12 rounded-lg bg-[#15090e] border border-[#3b1c23] flex items-center justify-center p-2"
                  >
                    <img
                      src="/images/daily-mission/mission.png"
                      alt="Mission"
                      class="w-full h-full object-contain"
                    />
                  </div>

                  <div>
                    <h3
                      class="font-bold text-[#f0eaea] text-base max-lg:text-sm"
                    >
                      {{
                        $i18n.locale === "zh"
                          ? mission.titleCN
                          : $i18n.locale === "ms"
                          ? mission.titleMS
                          : mission.title
                      }}
                    </h3>
                    <p class="text-xs text-[#b37a7a] mt-0.5">
                      {{ getMissionTypeIcon(mission.missionType) }}
                    </p>
                  </div>
                </div>

                <div class="text-right">
                  <div class="text-xs text-[#b37a7a]">{{ $t("reward") }}</div>
                  <div
                    class="text-base font-bold text-[#ff3344] max-lg:text-sm"
                  >
                    +{{ mission.rewardPoints }} {{ $t("points") }}
                  </div>
                </div>
              </div>

              <p
                v-if="
                  mission.description ||
                  mission.descriptionCN ||
                  mission.descriptionMS
                "
                class="text-xs text-[#b37a7a] mb-4 max-lg:text-[11px]"
              >
                {{
                  $i18n.locale === "zh"
                    ? mission.descriptionCN
                    : $i18n.locale === "ms"
                    ? mission.descriptionMS
                    : mission.description
                }}
              </p>

              <!-- Progress -->
              <div class="mb-4">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-xs text-[#b37a7a]">{{
                    $t("progress")
                  }}</span>
                  <div class="flex items-center gap-2">
                    <span class="text-sm font-medium text-[#f0eaea]">
                      {{ mission.currentProgress || 0 }} /
                      {{ mission.targetValue || 0 }}
                    </span>
                  </div>
                </div>

                <div
                  class="w-full bg-[#15090e] rounded-full opacity-90 h-2 overflow-hidden relative"
                >
                  <div
                    class="h-full rounded-full transition-all duration-500 overflow-hidden relative bg-[#ff3344]"
                    :style="{
                      width:
                        mission.targetValue > 0
                          ? `${Math.min(
                              (mission.currentProgress / mission.targetValue) *
                                100,
                              100
                            )}%`
                          : '0%',
                    }"
                  >
                    <img
                      src="/images/daily-mission/lightning.gif"
                      alt="Progress"
                      class="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-80"
                    />
                  </div>
                </div>

                <span class="text-xs font-bold text-[#ff3344]">
                  {{
                    mission.targetValue > 0
                      ? Math.min(
                          Math.round(
                            (mission.currentProgress / mission.targetValue) *
                              100
                          ),
                          100
                        )
                      : 0
                  }}%
                </span>
              </div>

              <button
                v-if="mission.isCompleted && !mission.isClaimed"
                @click="claimMission(mission._id)"
                :disabled="claimingMissionId === mission._id"
                class="w-full py-3 bg-[#ff3344] text-white font-semibold rounded-lg lg:hover:bg-[#ff4455] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 max-lg:py-2.5 max-lg:text-sm"
              >
                <Icon
                  v-if="claimingMissionId !== mission._id"
                  icon="mdi:gift"
                  class="w-5 h-5 max-lg:w-4 max-lg:h-4"
                />
                <Icon
                  v-else
                  icon="mdi:loading"
                  class="w-5 h-5 max-lg:w-4 max-lg:h-4 animate-spin"
                />
                <span>{{
                  claimingMissionId === mission._id
                    ? $t("claiming")
                    : $t("claim_reward")
                }}</span>
              </button>

              <div
                v-else-if="mission.isClaimed"
                class="w-full py-3 bg-[#15090e] border border-[#3b1c23] text-[#5a9367] font-semibold rounded-lg flex items-center justify-center gap-2 max-lg:py-2.5 max-lg:text-sm"
              >
                <Icon
                  icon="mdi:check-circle"
                  class="w-5 h-5 max-lg:w-4 max-lg:h-4"
                />
                <span>{{ $t("claimed") }}</span>
              </div>

              <div
                v-else
                class="w-full py-3 bg-[#15090e] border border-[#3b1c23] text-[#b37a7a] font-semibold rounded-lg flex items-center justify-center gap-2 max-lg:py-2.5 max-lg:text-sm"
              >
                <Icon icon="mdi:lock" class="w-5 h-5 max-lg:w-4 max-lg:h-4" />
                <span>{{ $t("incomplete") }}</span>
              </div>
            </div>
          </div>

          <div
            v-else
            class="bg-[#241017] border border-[#3b1c23] rounded-xl p-16 text-center max-lg:p-12"
          >
            <div
              class="w-20 h-20 max-lg:w-16 max-lg:h-16 bg-[#ff3344]/20 rounded-full flex items-center justify-center mb-4 mx-auto"
            >
              <Icon
                icon="mdi:clipboard-list"
                class="w-10 h-10 max-lg:w-8 max-lg:h-8 text-[#ff3344]"
              />
            </div>
            <h3 class="text-[#f0eaea] font-medium mb-1 max-lg:text-sm">
              {{
                userData ? $t("no_missions_available") : $t("login_required")
              }}
            </h3>
            <p class="text-[#b37a7a] text-sm max-lg:text-xs">
              {{
                userData ? $t("check_back_later") : $t("login_to_view_missions")
              }}
            </p>
          </div>
        </div>

        <div class="space-y-4 max-lg:mt-4">
          <div
            class="bg-[#241017] border border-[#3b1c23] rounded-xl overflow-hidden"
          >
            <div
              class="p-4 bg-gradient-to-r from-[#ff3344]/5 to-transparent border-b border-[#3b1c23]"
            >
              <h3 class="text-sm font-bold text-[#f0eaea]">
                {{ $t("how_it_works") }}
              </h3>
            </div>
            <div class="p-4">
              <ul class="text-xs text-[#f0eaea] space-y-3">
                <li class="flex items-start gap-2">
                  <Icon
                    icon="mdi:numeric-1-circle"
                    class="w-5 h-5 text-[#ff3344] flex-shrink-0 mt-0.5"
                  />
                  <span>{{ $t("mission_step_1") }}</span>
                </li>
                <li class="flex items-start gap-2">
                  <Icon
                    icon="mdi:numeric-2-circle"
                    class="w-5 h-5 text-[#ff3344] flex-shrink-0 mt-0.5"
                  />
                  <span>{{ $t("mission_step_2") }}</span>
                </li>
                <li class="flex items-start gap-2">
                  <Icon
                    icon="mdi:numeric-3-circle"
                    class="w-5 h-5 text-[#ff3344] flex-shrink-0 mt-0.5"
                  />
                  <span>{{ $t("mission_step_3") }}</span>
                </li>
                <li class="flex items-start gap-2">
                  <Icon
                    icon="mdi:numeric-4-circle"
                    class="w-5 h-5 text-[#ff3344] flex-shrink-0 mt-0.5"
                  />
                  <span>{{ $t("mission_step_4") }}</span>
                </li>
              </ul>
            </div>
          </div>

          <div
            class="bg-[#241017] border border-[#3b1c23] rounded-xl overflow-hidden"
          >
            <div
              class="p-4 bg-gradient-to-r from-amber-500/5 to-transparent border-b border-[#3b1c23]"
            >
              <h3 class="text-sm font-bold text-amber-400">
                {{ $t("important_notice") }}
              </h3>
            </div>
            <div class="p-4">
              <ul class="text-xs text-[#f0eaea] space-y-2.5">
                <li class="flex items-start gap-2">
                  <Icon
                    icon="mdi:alert-circle"
                    class="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5"
                  />
                  <span>{{ $t("mission_notice_1") }}</span>
                </li>
                <li class="flex items-start gap-2">
                  <Icon
                    icon="mdi:alert-circle"
                    class="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5"
                  />
                  <span>{{ $t("mission_notice_2") }}</span>
                </li>
                <li class="flex items-start gap-2">
                  <Icon
                    icon="mdi:alert-circle"
                    class="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5"
                  />
                  <span>{{ $t("mission_notice_3") }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </UserAccountLayout>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import UserAccountLayout from "~/layouts/UserAccountLayout.vue";

const { alertVisible, alertTitle, alertMessage, alertType, showAlert } =
  useAlert();
const pageLoading = useState("pageLoading");
const missionreminder = useState("missionreminder");
const userData = useState("userData");
const { get, post } = useApiEndpoint();

const isLoading = ref(true);
const missions = ref([]);
const todayStats = ref({
  totalTurnover: 0,
  withdrawCount: 0,
  depositCount: 0,
});
const claimingMissionId = ref(null);

const getMissionTypeIcon = (type) => {
  const types = {
    totalTurnover:
      $locale.value === "zh"
        ? "流水"
        : $locale.value === "ms"
        ? "Pusing Ganti"
        : "Turnover",
    withdrawCount:
      $locale.value === "zh"
        ? "提款"
        : $locale.value === "ms"
        ? "Pengeluaran"
        : "Withdraw",
    depositCount:
      $locale.value === "zh"
        ? "存款"
        : $locale.value === "ms"
        ? "Deposit"
        : "Deposit",
  };
  return types[type] || type;
};

async function fetchMissionReminder() {
  try {
    const { data } = await get("missions/reminder");
    if (data.success) {
      missionreminder.value = data.reminder;
      console.log(missionreminder.value);
    }
  } catch (error) {
    console.error("Error fetching carousels:", error);
  }
}

const formatAmount = (value) => {
  if (!value && value !== 0) return "0.00";
  const number = parseFloat(value);
  if (isNaN(number)) return "0.00";
  return number.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const fetchMissionsProgress = async () => {
  try {
    isLoading.value = true;
    const { data } = await get("user/missions/progress");
    if (data.success) {
      missions.value = data.data.missions;
      todayStats.value = data.data.todayStats;
    }
  } catch (error) {
    console.error("Error fetching missions:", error);
    showAlert(
      $t("alert_error"),
      error.response?.data?.message?.[$locale.value] ||
        error.response?.data?.message?.en ||
        $t("network_error"),
      "error"
    );
  } finally {
    isLoading.value = false;
  }
};

const fetchUserData = async () => {
  try {
    const { data } = await get("userdata");
    if (data.success) {
      userData.value = data.user;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

const claimMission = async (missionId) => {
  claimingMissionId.value = missionId;
  try {
    const { data } = await post("user/missions/claim", {
      missionId: missionId,
    });

    if (data.success) {
      showAlert(
        $t("alert_success"),
        data.message[$locale.value] || data.message.en,
        "success"
      );
      await fetchMissionsProgress();
      await fetchUserData();
    } else {
      showAlert(
        $t("alert_info"),
        data.message[$locale.value] || data.message.en,
        "info"
      );
    }
  } catch (error) {
    console.error("Claim mission error:", error);
    showAlert(
      $t("alert_error"),
      error.response?.data?.message?.[$locale.value] ||
        error.response?.data?.message?.en ||
        $t("network_error"),
      "error"
    );
  } finally {
    claimingMissionId.value = null;
  }
};

onMounted(async () => {
  if (!userData.value) {
    isLoading.value = false;
    pageLoading.value = false;
    return;
  }
  pageLoading.value = true;
  try {
    await fetchMissionsProgress();
  } catch (error) {
    console.error("Error during initialization:", error);
  } finally {
    pageLoading.value = false;
  }
});
</script>

<style scoped></style>
