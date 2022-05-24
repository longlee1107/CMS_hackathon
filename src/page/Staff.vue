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

      </div>
      <div class="flex justify-evenly text-xl ">
        <div>
          <button class="w-64 h-10 rounded-lg bg-blue-400" @click="Timekeeping()">Chấm công</button>
        </div>
        <div>
          <button class="w-64 h-10 rounded-lg bg-blue-400" @click="showLateForWork()">Xin đi muộn</button>
        </div>
        <div>
          <button class="w-64 h-10 rounded-lg bg-blue-400" @click="showTakeOff()">Xin nghỉ</button>
        </div>

      </div>
    </div>
    <div class="fixed top-0 w-[100vw] h-[100vh] z-[10] flex items-center background" v-if="this.showModal === true">
      <div class=" absolute right-2 top-2 text-white text-4xl cursor-pointer" @click="()=>{this.showModal = false}">x</div>
      <div class="w-1/2 h-2/3 mx-auto flex items-center justify-center bg-white  opacity-100 z-[1000]">
        <form @submit.prevent="takeOff()">
            <div class=" bg-white rounded-md px-6 py-10 max-w-2xl mx-auto ">
              <h1 class="text-center text-2xl font-bold text-gray-500 mb-10">Bảng lý do xin nghỉ</h1>
              <div class="space-y-4">
                <div>
                  <label for="name" class="text-lx font-serif">take off:</label>
                  <input type="text" placeholder="take off" id="name" v-model="contentTakeOff" class="ml-2 outline-none py-1 px-2 text-md border-2 rounded-md" />
                </div>
                <button class=" px-6 py-2 mx-auto block rounded-md text-lg font-semibold text-indigo-100 bg-indigo-600  ">SUBMIT</button>
              </div>
            </div>
        </form>
      </div>
    </div>

    <div class="fixed top-0 w-[100vw] h-[100vh] z-[10] flex items-center background" v-if="this.showModalLateForWork === true">
      <div class=" absolute right-2 top-2 text-white text-4xl cursor-pointer" @click="()=>{this.showModalLateForWork = false}">x</div>
      <div class="w-1/2 h-2/3 mx-auto flex items-center justify-center bg-white  opacity-100 z-[1000]">
        <form @submit.prevent="lateForWork()">
          <div class=" bg-white rounded-md px-6 py-10 max-w-2xl mx-auto ">
            <h1 class="text-center text-2xl font-bold text-gray-500 mb-10">Bảng lý do xin đi muộn</h1>
            <div class="space-y-4">
              <div>
                <label for="number" class="text-lx font-serif">minutes late:</label>
                <input type="number" placeholder="minutes late" id="number" v-model="dateLateForWork" class="ml-2 outline-none py-1 px-2 text-md border-2 rounded-md" />
              </div>
              <div>
                <label for="name" class="text-lx font-serif">take off:</label>
                <input type="text" placeholder="take off" id="name" v-model="contentTakeOff" class="ml-2 outline-none py-1 px-2 text-md border-2 rounded-md" />
              </div>
              <button class=" px-6 py-2 mx-auto block rounded-md text-lg font-semibold text-indigo-100 bg-indigo-600  ">SUBMIT</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Calendar from 'v-calendar/lib/components/calendar.umd'
import DatePicker from 'v-calendar/lib/components/date-picker.umd'
import {staffService} from "@/service/staffService"
import {authService} from "@/service/authService"
import {UserService} from "@/service/UserService";
export default {
  name: "Staff",
  data() {
    return {
      date:"",
      dateLateForWork:"",
      showModal:false,
      showModalLateForWork:false,
      contentTakeOff:"",
      dataUser:[],
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
    async getUser (){
      const res = await UserService.getProfileOfCurrentUser();
      this.dataUser = res.data.data;
    },
    showTakeOff(){
      if(this.date === ""){
        alert("Please select a date");
        return;
      }
      this.showModal = true;
    },
    async takeOff(){
      try{
        const data = await authService.takeOff({
            note:this.contentTakeOff,
            staff: this.dataUser.staffId,
            status: "PENDING",
            time_created: Date.parse(Date()),
            time_end: Date.parse(this.date.end),
            time_start: Date.parse(this.date.start),
        });
        this.contentTakeOff = ""
        alert("request sent successfully")
      }catch (e){
        console.log(e)
        alert("Submit request failed")
      }
    },
    showLateForWork(){
      this.showModalLateForWork = true;
    },
    async lateForWork(){
      try{
        const data = await authService.lateForWork({
          note: this.contentTakeOff,
          staff: this.dataUser.staffId,
          status: "PENDING",
          timeIn: Number(this.dateLateForWork)*60000,
        });
        this.contentTakeOff ="";
        this.dateLateForWork ="";
        alert("request sent successfully")
      }catch (e){
        console.log(e)
        alert("Submit request failed")
      }
    }
  },
  components: {

  },
  mounted() {
    this.getUser();
  }
}
</script>

<style scoped>
.background{
  background-color: rgba(0, 0, 0, 0.68);
}
</style>