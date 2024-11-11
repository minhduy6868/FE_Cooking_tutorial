<script setup lang="ts">
const menus = ref([
  {
    
    children: [
      {
        class: 'i-solar-user-linear group-hover:i-solar-user-bold-duotone',
        title: 'Người dùng',
        link: '/users-manage',
      },
    ],
  },
  {
    title: 'THÔNG TIN VÀ ĐIỀU KHOẢN',
    children: [
      {
        class: 'i-solar-money-bag-broken group-hover:i-solar-money-bag-bold-duotone',
        title: 'Về Website',
        link: '/inforadmin',
      },
    ],
  },
])
</script>
<template>
  <div class="mt-5">
    <RouterLink
      to="/admin"
      class="flex items-center gap-2 group cursor-pointer hover:text-[#0061ff] hover:bg-[#eff7ff] py-3 px-2 rounded-xl transition-all duration-200"
    >
      <span class="group-hover:i-solar-graph-bold-duotone i-solar-graph-linear text-xl"></span>
      <span class="font-medium">Quản lí chung</span>
    </RouterLink>

    <template
      v-for="menu in menus"
      :key="menu.title"
    >
      <p class="mt-5 ml-5 text-xs">{{ menu.title }}</p>

      <div class="flex flex-col mt-2">
        <RouterLink
          v-for="sub in menu.children"
          :key="sub.title"
          :to="sub.link"
          class="flex items-center gap-2 mb-[2px] group cursor-pointer hover:text-[#0061ff] hover:bg-[#eff7ff] py-3 px-2 rounded-xl transition-all ease-in-out duration-500"
        >
          <span
            class="text-xl"
            :class="sub.class"
          ></span>
          <span class="font-medium">{{ sub.title }}</span>
        </RouterLink>
      </div>
    </template>
  </div>
</template>
<style scoped>
</style>
