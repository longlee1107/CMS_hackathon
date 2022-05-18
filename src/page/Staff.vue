<template>
  <div>
    <div x-data="setup()" :class="{ 'dark': isDark }">
      <div class="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white">
        <div class="h-full ml-14 mt-14 mb-10 md:ml-64">
          m lại k duọc di
          <v-calendar is-expanded
              :value="null"
              color="red"
              is-dark
              is-range
          />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Calendar from 'v-calendar/lib/components/calendar.umd'
import DatePicker from 'v-calendar/lib/components/date-picker.umd'

export default {
  name: "Staff",
  methods: {

  },
  components: {

  }
}
</script>

<style scoped>

</style>