<template>
  <div
    class="bg-gradient-to-br from-[#1A0D13] via-gray-950 to-[#241017] py-8 min-h-screen max-lg:pt-2"
  >
    <div class="max-w-7xl mx-auto px-4 max-lg:px-0">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div class="md:col-span-1 max-lg:hidden">
          <UserSidebar />
        </div>
        <div class="md:col-span-3">
          <div
            class="bg-[#160a0f] max-lg:bg-inherit rounded-lg border border-[#3b1c23] max-lg:!border-none min-h-[700px] max-lg:min-h-[500px] p-6 max-lg:p-4"
          >
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import UserSidebar from "~/components/UserSideBar.vue";

const isConfirmAlertVisible = ref(false);
const confirmAlertTitle = ref("");
const confirmAlertMessage = ref("");
const confirmAlertType = ref("warning");
const isUserLoggedIn = useState("isUserLoggedIn");
const { t } = useI18n();
const localePath = useLocalePath();
</script>
