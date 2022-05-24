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
        {{this.date}}
      </div>
      <div class="flex justify-evenly text-xl ">
        <div>
          <button class="w-64 h-10 rounded-lg bg-blue-400" @click="Timekeeping()">Chấm công</button>
        </div>
        <div>
          <button class="w-64 h-10 rounded-lg bg-blue-400" >Xin đi muộn</button>
        </div>
        <div>
          <button class="w-64 h-10 rounded-lg bg-blue-400" @click="TakeOff()">Xin nghỉ</button>
        </div>

      </div>
    </div>
    <div class="fixed top-0 w-[100vw] h-[100vh] z-[10] flex items-center background" v-if="this.showModal === true">
      <div class=" absolute right-2 top-2 text-white text-4xl cursor-pointer" @click="()=>{this.showModal = false}">x</div>
      <div class="w-1/2 h-2/3 mx-auto flex items-center bg-white  opacity-100 z-[1000]">
        <label for="" class="opacity-100 m-auto w-96 h-64 block">
          <textarea class="opacity-100 w-full h-full text-2xl pl-2 pt-2 border border-yellow-500 rounded" name="content" id="content" cols="30" rows="10" placeholder="reason for taking leave"></textarea>
        </label>
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
      showModal:false,
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
        alert("request sent successfully")
      }catch (e){
        console.log(e)
        alert("Submit request failed")
      }
    },
    TakeOff(){
      this.showModal = true;
    }
  },
  components: {

  }
}
</script>

<style scoped>
.background{
  background-color: rgba(0, 0, 0, 0.68);
}
</style>