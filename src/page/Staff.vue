<template>
  <div>
    <div class="h-full ">
      <div class="m-5">
        <v-date-picker v-model="date" is-expanded
                       :value=[1,2,3]
                       color="red"
                       is-dark
                       is-range
                       trim-weeks
        />
      </div>
      <div>
        {{Date.parse(this.date.start)}}
      </div>
      <div class="flex justify-evenly text-xl ">
        <div>
          <button class="w-64 h-10 rounded-lg bg-blue-400" @click="Timekeeping()">Chấm công</button>
        </div>
        <div>
          <button class="w-64 h-10 rounded-lg bg-blue-400">Xin đi muộn</button>
        </div>
        <div>
          <button class="w-64 h-10 rounded-lg bg-blue-400">Xin nghỉ</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Calendar from 'v-calendar/lib/components/calendar.umd'
import DatePicker from 'v-calendar/lib/components/date-picker.umd'
import {staffService} from "@/service/staffService"
export default {
  name: "Staff",
  data() {
    return {
      date:"",
    }
  },
  methods: {
    async Timekeeping(){
      if(this.date === ""){
        alert("Please select a date");
        return;
      }
      try{
        const data = await staffService.postStaff({
          note:"chấm công",
          staff:1,
          timeIn:Date.parse(this.date.start)
        })
      }catch (e){
        console.log(e)
      }
    }
  },
  components: {

  }
}
</script>

<style scoped>

</style>