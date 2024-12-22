<template>
  <ConfirmModal />
  <Toaster />

  <!-- Hiển thị Loading Spinner nếu đang tải -->
  <div
    v-if="loadingStore.getLoading"
    class="fixed top-0 left-0 w-full h-full flex justify-center items-center z-[999] loading-overlay"
  >
    <Icon
      icon="svg-spinners:90-ring-with-bg"
      class="w-10 h-10"
    />
  </div>

  <!-- Hiển thị Poll ngay khi vào app -->
  <FoodPollForm v-if="showPoll" @close="closePoll" />

  <!-- Dynamic Layout -->
  <component :is="layout">
    <RouterView />
  </component>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import Toaster from '@/components/ui/toast/Toaster.vue'
import ConfirmModal from './components/base/ConfirmDialog.vue'
import { useLoadingStore } from './stores/loading'
import { showToast } from './utils/toast'
import { useConfirmDialog } from './stores/modal'
import FoodPollForm from './components/ui/form/FoodPollForm.vue' 

const route = useRoute()

const layout = computed(() => {
  return route.meta.layout || 'Defaulayout'
})

const loadingStore = useLoadingStore()

const accessToken = localStorage.getItem('access_token')

if (accessToken) {
  console.log('Token đã được lưu:', accessToken)
} else {
  console.log('Chưa có token trong localStorage')
}

<<<<<<< HEAD
=======
// Toast chào mừng
>>>>>>> e2b2ecde3e3ed11680674e7f2c48b5f1ac56d3f5
onMounted(() => {
  showToast({
    title: 'Chào mừng đến với Cooking Dev',
    description: 'Thỏa thích học hỏi, chia sẻ công thức nấu ăn',
    variant: 'default',
    duration: 5000,
  })
})

const confirmDialog = useConfirmDialog()
const openConfirm = async () => {
  const result = await confirmDialog.open({
    title: 'Are you sure?',
    question: 'Do you really want to delete this item?',
  })
  if (result) {
    console.log('Item deleted')
  } else {
    console.log('Action canceled')
  }
}

// // Poll form state   // đừng xóa ni
// const showPoll = ref(true)

// // Hàm đóng Poll
// const closePoll = () => {
//   showPoll.value = false
// }
</script>

<<<<<<< HEAD
<template>
  <ConfirmModal />

  <Toaster />

  <div
    v-if="loadingStore.getLoading"
    class="fixed top-0 left-0 w-full h-full flex justify-center items-center z-[999] loading-overlay"
  >
    <Icon
      icon="svg-spinners:90-ring-with-bg"
      class="w-10 h-10"
    />
  </div>

  <component :is="layout">
    <RouterView />
  </component>
</template>

=======
>>>>>>> e2b2ecde3e3ed11680674e7f2c48b5f1ac56d3f5
<style scoped>
.loading-overlay {
  background-color: rgba(76, 76, 76, 0.38);
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
