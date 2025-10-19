<template>
  <div class="bg-gray-50 py-8 min-h-screen max-lg:pt-2">
    <div class="max-w-7xl mx-auto px-4">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div class="md:col-span-1 max-lg:hidden">
          <UserSidebar />
        </div>
        <div class="md:col-span-3">
          <div
            class="bg-white rounded-lg shadow-md border border-gray-100 min-h-[700px] p-6 max-lg:p-4"
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
