<template>
    <div>
      <Header/>
      <SideBar/>
      <div x-data="setup()" :class="{ 'dark': isDark }">
      <div
          class="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white">
        <div class="h-full ml-14 mt-14 mb-10 md:ml-64">

          <!--Calendar-->
          <div class="m-5">
            <v-date-picker is-expanded
                           :value="null"
                           color="red"
                           is-dark
                           is-range
                           trim-weeks
            />
          </div>
          <!--Calendar-->

        </div>
      </div>
    </div>
    </div>
</template>

<script>
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";

export default {
  components: {SideBar, Header},

}
</script>
<style scoped src="../assets/css/pageAdmin.css">
</style>
