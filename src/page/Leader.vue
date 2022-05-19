<template>

  <div x-data="setup()" :class="{ 'dark': isDark }">
    <Header/>
    <SideBar/>
    <div
        class="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white">

      <div class="h-full ml-14 mt-14 mb-10 md:ml-64">
        m lại k duọc di

      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import SideBar from '@/components/SideBar.vue';
export default {
    name: "Leader",
    components: { Header, SideBar }
}
</script>
<style scoped src="../assets/css/pageAdmin.css">
</style>
