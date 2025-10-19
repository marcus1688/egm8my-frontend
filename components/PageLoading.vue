<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-black/70 to-blue-900/70 backdrop-blur-sm z-[10001]"
  >
    <div class="flex flex-col items-center">
      <!-- 主要加载动画 -->
      <div class="relative w-24 h-24 mb-6">
        <!-- 外环 -->
        <div
          class="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-indigo-600 opacity-20 animate-pulse-slow"
        ></div>

        <!-- 旋转光环 -->
        <div
          class="absolute inset-1 rounded-full border-4 border-transparent border-t-white border-r-blue-300 opacity-80 animate-spin-slow"
        ></div>

        <!-- 中间环 -->
        <div
          class="absolute inset-2 rounded-full border-4 border-transparent border-l-indigo-500 border-b-blue-500 opacity-90 animate-spin-reverse"
        ></div>

        <!-- 内环 -->
        <div
          class="absolute inset-4 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 animate-pulse"
        ></div>

        <!-- 中心点 -->
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="w-4 h-4 bg-white rounded-full animate-ping"></div>
        </div>
      </div>

      <!-- 加载文字 -->
      <div class="text-center">
        <p class="text-white text-xl font-medium tracking-wider mb-2">
          {{ $t("loading") }}
        </p>
        <div class="flex justify-center space-x-1">
          <span
            class="w-2 h-2 bg-blue-300 rounded-full animate-bounce"
            style="animation-delay: 0ms"
          ></span>
          <span
            class="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
            style="animation-delay: 150ms"
          ></span>
          <span
            class="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
            style="animation-delay: 300ms"
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
@keyframes spin-slow {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes spin-reverse {
  0% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

@keyframes pulse-slow {
  0%,
  100% {
    opacity: 0.2;
    transform: scale(0.95);
  }
  50% {
    opacity: 0.4;
    transform: scale(1);
  }
}

.animate-spin-slow {
  animation: spin-slow 3s linear infinite;
}

.animate-spin-reverse {
  animation: spin-reverse 2s linear infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 2s ease-in-out infinite;
}

.animate-spin {
  animation: spin-slow 1s linear infinite;
}

.animate-pulse {
  animation: pulse-slow 1.5s ease-in-out infinite;
}

.animate-ping {
  animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes ping {
  0% {
    transform: scale(0.8);
    opacity: 1;
  }
  75%,
  100% {
    transform: scale(1.2);
    opacity: 0;
  }
}

.animate-bounce {
  animation: bounce 1s infinite;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}
</style>
