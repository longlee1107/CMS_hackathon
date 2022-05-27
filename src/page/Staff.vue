<template>
  <div>
    <!-- Header -->
    <CompoStaffPage/>
    <!-- ./Sidebar -->
    <div x-data="setup()">
      <div class="
          min-h-screen
          flex flex-col flex-auto flex-shrink-0
          antialiased
          bg-white
          dark:bg-gray-700
          text-black
          dark:text-white">
        <div class="h-full w-5/6 mx-auto mt-14 mb-10">
          <div class="m-5">
            <v-date-picker 
              v-model="date" 
              :attributes="attributes" 
              is-expanded 
              :value=[1,2,3] 
              is-dark 
              is-range
              trim-weeks />
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
            <div>
              <button class="w-64 h-10 rounded-lg bg-blue-400" @click="showOT()">OT</button>
            </div>

          </div>
          <!-- Client Table -->
          <div class="
          mt-4
              gap-2
              rounded-xl">
            <RequestPoint />
            <div class="mt-4 mx-4" v-if="this.myRequest.length > 0">
              <div class="w-full overflow-hidden rounded-lg shadow-xs">
                <div class="w-full overflow-x-auto">
                  <table class="w-full">
                    <thead>
                      <tr class="
                            text-xs
                            font-semibold
                            tracking-wide
                            text-left text-gray-500
                            uppercase
                            border-b
                            dark:border-gray-700
                            bg-gray-50
                            dark:text-gray-400 dark:bg-gray-800
                          ">
                        <th class="px-4 py-3 w-1 text-center">Number</th>
                        <th class="px-4 py-3 text-center">Note</th>
                        <th class="px-4 py-3 text-center">Created at</th>
                        <th class="px-4 py-3 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody class="
                          bg-white
                          divide-y
                          dark:divide-gray-700 dark:bg-gray-800
                        ">
                      <tr v-for="request in myRequest" :key="request.id" class="
                            bg-gray-50
                            dark:bg-gray-800
                            hover:bg-gray-100
                            dark:hover:bg-gray-900
                            text-gray-700
                            dark:text-gray-400
                          ">
                        <td class="px-4 py-3">
                            {{ request.id }}
                        </td>
                        <td class="px-4 py-3 ">
                          <div class="flex items-center ml-64 text-sm">
                                {{ request.note }}
                          </div>
                        </td>
                        <td class="px-4 py-3 text-sm text-center">
                          {{ request.timeIn | formatDate }}
                        </td>
                        <td class="px-4 py-3 text-xs text-center">
                          <span class="
                                px-2
                                py-1
                                text-right
                                font-semibold
                                leading-tight
                                text-green-700
                                bg-green-100
                                rounded-full
                                dark:bg-green-700 dark:text-green-100
                              ">
                            {{ request.status }}
                          </span>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div v-else class="italic text-center text-gray-50">
              No Request Created!
            </div>
          </div>
          <!-- ./Client Table -->
          <!-- OT -->
          <div>
            <p
              class="arrow-right my-6 mx-3 w-2/12 px-12 py-2 text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-white dark:bg-gray-800 font-bold">
              OT
            </p>
          </div>
          <div class="mt-4 mx-4" v-if="this.myOTRequest.length > 0">
              <div class="w-full overflow-hidden rounded-lg shadow-xs">
                <div class="w-full overflow-x-auto">
                  <table class="w-full">
                    <thead>
                      <tr class="
                            text-xs
                            font-semibold
                            tracking-wide
                            text-center text-gray-500
                            uppercase
                            border-b
                            dark:border-gray-700
                            bg-gray-50
                            dark:text-gray-400 dark:bg-gray-800
                          ">
                        <th class="px-4 py-3 w-1">Number</th>
                        <th class="px-4 py-3">Note</th>
                        <th class="px-4 py-3">Date</th>
                        <th class="px-4 py-3">Time OT (min)</th>
                        <th class="px-4 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody class="
                          bg-white
                          divide-y
                          dark:divide-gray-700 dark:bg-gray-800
                        ">
                      <tr v-for="OTrequest in myOTRequest" :key="OTrequest.id" class="
                            bg-gray-50
                            dark:bg-gray-800
                            hover:bg-gray-100
                            dark:hover:bg-gray-900
                            text-gray-700
                            dark:text-gray-400
                          ">
                        <td class="px-4 text-center py-4">
                            {{ OTrequest.id }}
                        </td>
                        <td class="px-4 py-3 text-center text-sm">{{ OTrequest.note }}</td>
                        <td class="px-4 py-3   text-sm text-center">
                          {{ OTrequest.time_start | formatDate}}
                        </td>
                        <td class="px-4 py-3 text-sm text-center">
                          {{ OTrequest.time_end | formatMinute }} 
                        </td>
                        <td class="px-4 py-3 text-center text-sm">
                          <span
                            class="px-2 py-1 text-center font-semibold leading-tight text-yellow-50 bg-orange-600 rounded-full dark:bg-orange-600 dark:text-green-50"
                            v-if="OTrequest.status === 'PENDING'"
                          >
                            {{ OTrequest.status }}
                          </span>
                          <span
                            class="px-2 py-1 text-center font-semibold leading-tight text-green-50 bg-green-700 rounded-full dark:bg-green-700 dark:text-green-100"
                            v-else-if="OTrequest.status === 'APPROVED'"
                          >
                            {{ OTrequest.status }}
                          </span>
                          <span
                            class="px-2 py-1 text-center font-semibold leading-tight text-white bg-red-600 rounded-full dark:bg-red-600 dark:text-green-100"
                            v-else
                          >
                            {{ OTrequest.status }}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div v-else class="italic text-center text-gray-50">
              No Request Created!
            </div>
          <!-- ./OT -->
          <!-- Late For Work -->
          <div>
            <p
              class="arrow-right my-6 mx-3 w-2/12 px-12 py-2 text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-white dark:bg-gray-800 font-bold">
              Late Time
            </p>
          </div>
          <div class="mt-4 mx-4" v-if="this.myLateTimeRequest.length > 0">
              <div class="w-full overflow-hidden rounded-lg shadow-xs">
                <div class="w-full overflow-x-auto">
                  <table class="w-full">
                    <thead>
                      <tr class="
                            text-xs
                            font-semibold
                            tracking-wide
                            text-center text-gray-500
                            uppercase
                            border-b
                            dark:border-gray-700
                            bg-gray-50
                            dark:text-gray-400 dark:bg-gray-800
                          ">
                        <th class="px-4 py-3 w-1">Number</th>
                        <th class="px-4 py-3">Note</th>
                        <th class="px-4 py-3">Day Late</th>
                        <th class="px-4 py-3">Time Late (hours)</th>
                        <th class="px-4 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody class="
                          bg-white
                          divide-y
                          dark:divide-gray-700 dark:bg-gray-800
                        ">
                      <tr v-for="TLrequest in myLateTimeRequest" :key="TLrequest.id" class="
                            bg-gray-50
                            dark:bg-gray-800
                            hover:bg-gray-100
                            dark:hover:bg-gray-900
                            text-gray-700
                            dark:text-gray-400
                          ">
                        <td class="px-4 text-center py-4">
                            {{ TLrequest.id }}
                        </td>
                        <td class="px-4 py-3 text-center text-sm">{{ TLrequest.note }}</td>
                        <td class="px-4 py-3   text-sm text-center">
                          {{ TLrequest.time_start | formatDays}}
                        </td>
                        <td class="px-4 py-3 text-sm text-center">
                          {{ TLrequest.timeIn | formatHour }} 
                        </td>
                        <td class="px-4 py-3 text-center text-sm">
                          <span
                            class="px-2 py-1 text-center font-semibold leading-tight text-yellow-50 bg-orange-600 rounded-full dark:bg-orange-600 dark:text-green-50"
                            v-if="TLrequest.status === 'PENDING'"
                          >
                            {{ TLrequest.status }}
                          </span>
                          <span
                            class="px-2 py-1 text-center font-semibold leading-tight text-green-50 bg-green-700 rounded-full dark:bg-green-700 dark:text-green-100"
                            v-else-if="TLrequest.status === 'APPROVED'"
                          >
                            {{ TLrequest.status }}
                          </span>
                          <span
                            class="px-2 py-1 text-center font-semibold leading-tight text-white bg-red-600 rounded-full dark:bg-red-600 dark:text-green-100"
                            v-else
                          >
                            {{ TLrequest.status }}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div v-else class="italic text-center text-gray-50">
              No Request Created!
            </div>
          <!-- ./Late For Work -->
          <!-- Absent -->
          <div>
            <p
              class="arrow-right my-6 mx-3 w-2/12 px-12 py-2 text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-white dark:bg-gray-800 font-bold">
              Absent
            </p>
          </div>
          <div class="mt-4 mx-4" v-if="this.myAbsentRequest.length > 0">
              <div class="w-full overflow-hidden rounded-lg shadow-xs">
                <div class="w-full overflow-x-auto">
                  <table class="w-full">
                    <thead>
                      <tr class="
                            text-xs
                            font-semibold
                            tracking-wide
                            text-center text-gray-500
                            uppercase
                            border-b
                            dark:border-gray-700
                            bg-gray-50
                            dark:text-gray-400 dark:bg-gray-800
                          ">
                        <th class="px-4 py-3 w-1">Number</th>
                        <th class="px-4 py-3">Note</th>
                        <th class="px-4 py-3">Time Start</th>
                        <th class="px-4 py-3">Time End</th>
                        <th class="px-4 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody class="
                          bg-white
                          divide-y
                          dark:divide-gray-700 dark:bg-gray-800
                        ">
                      <tr v-for="Abrequest in myAbsentRequest" :key="Abrequest.id" class="
                            bg-gray-50
                            dark:bg-gray-800
                            hover:bg-gray-100
                            dark:hover:bg-gray-900
                            text-gray-700
                            dark:text-gray-400
                          ">
                        <td class="px-4 text-center py-4">
                            {{ Abrequest.id }}
                        </td>
                        <td class="px-4 py-3 text-center text-sm">{{ Abrequest.note }}</td>
                        <td class="px-4 py-3   text-sm text-center">
                          {{ Abrequest.time_start | formatDays}}
                        </td>
                        <td class="px-4 py-3 text-sm text-center">
                          {{ Abrequest.time_end | formatDays }} 
                        </td>
                        <td class="px-4 py-3 text-center text-sm">
                          <span
                            class="px-2 py-1 text-center font-semibold leading-tight text-yellow-50 bg-orange-600 rounded-full dark:bg-orange-600 dark:text-green-50"
                            v-if="Abrequest.status === 'PENDING'"
                          >
                            {{ Abrequest.status }}
                          </span>
                          <span
                            class="px-2 py-1 text-center font-semibold leading-tight text-green-50 bg-green-700 rounded-full dark:bg-green-700 dark:text-green-100"
                            v-else-if="Abrequest.status === 'APPROVED'"
                          >
                            {{ Abrequest.status }}
                          </span>
                          <span
                            class="px-2 py-1 text-center font-semibold leading-tight text-white bg-red-600 rounded-full dark:bg-red-600 dark:text-green-100"
                            v-else
                          >
                            {{ Abrequest.status }}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div v-else class="italic text-center text-gray-50">
              No Request Created!
            </div>
          <!-- ./Absent -->
        </div>
        <div class="fixed top-0 w-[100vw] h-[100vh] z-[10] flex items-center background" v-if="this.showModal === true">
          
          <div class="w-1/2 h-2/3 mx-auto flex items-center justify-center bg-white  opacity-100 z-[1000]">
          
            <form @submit.prevent="takeOff()">
              <div class=" absolute right-6 top-2 text-white text-4xl cursor-pointer" @click="() => { this.showModal = false }">
            x
          </div>
              <div class=" bg-white rounded-md px-6 py-10 max-w-2xl mx-auto ">
                <h1 class="text-center text-2xl font-bold text-gray-500 mb-10">Bảng lý do xin nghỉ</h1>
                <div class="space-y-4">
                  <div>
                    <label for="name" class="text-lg text-black font-serif">Lí do xin nghỉ:</label>
                    <input type="text" placeholder="take off" id="name" v-model="contentTakeOff"
                      class="ml-2 outline-none py-1 px-2 text-black text-md border-2 rounded-md" />
                  </div>
                  <button
                    class=" px-6 py-2 mx-auto block rounded-md text-lg font-semibold text-indigo-100 bg-indigo-600  ">
                    SUBMIT
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div class="fixed top-0 w-[100vw] h-[100vh] z-[10] flex items-center background"
          v-if="this.showModalLateForWork === true">
          <div class=" absolute right-6 top-2 text-white text-4xl cursor-pointer"
            @click="() => { this.showModalLateForWork = false }">x
          </div>
          <div class="w-1/2 h-2/3 mx-auto flex items-center justify-center bg-white  opacity-100 z-[1000]">
            <form @submit.prevent="lateForWork()">
              <div class=" bg-white rounded-md px-6 py-10 max-w-2xl mx-auto ">
                <h1 class="text-center text-2xl font-bold text-gray-500 mb-10">Bảng lý do xin đi muộn</h1>
                <div class="space-y-4">
                  <div>
                    <label for="number" class="text-lx font-serif">minutes late:</label>
                    <input type="number" placeholder="minutes late" id="number" v-model="dateLateForWork"
                      class="ml-2 outline-none py-1 px-2 text-md border-2 rounded-md" />
                  </div>
                  <div>
                    <label for="name" class="text-lx font-serif">take off:</label>
                    <input type="text" placeholder="take off" id="name" v-model="contentTakeOff"
                      class="ml-2 outline-none py-1 px-2 text-md border-2 rounded-md" />
                  </div>
                  <button
                    class=" px-6 py-2 mx-auto block rounded-md text-lg font-semibold text-indigo-100 bg-indigo-600  ">
                    SUBMIT
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div class="fixed top-0 w-[100vw] h-[100vh] z-[10] flex items-center background"
          v-if="this.showModalOT === true">
          <div class=" absolute right-6 top-2 text-white text-4xl cursor-pointer"
            @click="() => { this.showModalOT = false }">x
          </div>
          <div class="w-1/2 h-auto mx-auto flex items-center justify-center bg-white  opacity-100 z-[1000]">
            <form @submit.prevent="handleOT()">
              <div class=" bg-white rounded-md px-6 py-10 max-w-2xl mx-auto ">
                <h1 class="text-center text-2xl font-bold text-gray-500 mb-10">Over Time Table</h1>
                <div class="flex justify-center">
                  <v-date-picker v-model="dateOT" mode="dateTime" :minute-increment="5" :min-date='new Date()' />
                </div>
                <div class="space-y-4 mt-4">
                  <div>
                    <label for="ot" class="text-lg text-black font-serif">Thời gian làm việc (phút) :</label>
                    <input type="number" placeholder="OT Time" id="ot" v-model="timeOT"
                      class="ml-2 outline-none py-1 px-2 text-md text-black border-2 rounded-md" />
                  </div>
                  <div>
                    <label for="noteOT" class="text-lg text-black font-serif">Note :</label>
                    <input type="text" placeholder="note" id="noteOT" v-model="noteOverTime"
                      class="ml-2 outline-none py-1 px-2 text-md text-black border-2 rounded-md" />
                  </div>
                  <button
                    class=" px-6 py-2 mx-auto block rounded-md text-lg font-semibold text-indigo-100 bg-indigo-600  ">
                    SUBMIT
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Calendar from 'v-calendar/lib/components/calendar.umd'
import DatePicker from 'v-calendar/lib/components/date-picker.umd'
import RequestPoint from '../components/requestPoint.vue'
import { staffService } from "@/service/staffService"
import { authService } from "@/service/authService"
import { UserService } from "@/service/UserService";
import CompoStaffPage from "@/components/CompoStaffPage";
import { timeKeepingService } from "@/service/timeKeepingService";
import { lateTimeService } from '@/service/lateTimeService';
import { overTimeService } from '@/service/overTimeService';
import { absentService } from '@/service/absentService';
import Vue from 'vue'
import CxltToastr from 'cxlt-vue2-toastr'
Vue.use(CxltToastr)
import 'cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css'

export default {
  name: "Staff",
  components: { CompoStaffPage, RequestPoint },
  data() {
    return {
      date: "",
      dateLateForWork: "",
      showModal: false,
      showModalLateForWork: false,
      contentTakeOff: "",
      dataUser: [],
      currentUser: {},
      myRequest: [],
      myOTRequest: [],
      myLateTimeRequest: [],
      myAbsentRequest: [],
      attributes: [],
      showModalOT: false,
      dateOT: "",
      timeOT: "",
      noteOverTime: "",
    }
  },
  methods: {
    async getProfileOfCurrentUser() {
      const res = await UserService.getProfileOfCurrentUser();
      this.currentUser = res.data.data;
    },
    async getMyRequest() {
      const response = await timeKeepingService.getMyRequest();
      this.myRequest = response.data.data.content;
      const statusColor = {
        "APPROVED": 'green',
        "PENDING": 'orange',
        "REJECTED": 'red'
      }
      this.attributes = (this.myRequest.map(req => {
        return {
          highlight: {
            color: statusColor[req.status],
            fillMode: 'solid',
          },
          dates: req.timeIn,
        }
      }))
    },
    async Timekeeping() {
      if (this.date === "") {
        this.$toast.error({
          title: 'Date',
          message: 'Please select a date',
          position: 'top right',
          showDuration: 2000,
          hideMethod: 'bounce',
          showMethod: 'bounce',
        })
        return;
      }
      try {
        const data = await staffService.postStaff({
          note: "chấm công",
          staff: 1,
          timeIn: Date.parse(this.date.start),
        });
        this.$toast.success({
          title: 'Request success',
          message: 'Request sent successfully',
          position: 'top right',
          showDuration: 2000,
          hideMethod: 'bounce',
          showMethod: 'bounce',
        })
        this.getMyRequest();
      } catch (e) {
        console.log(e);
        this.$toast.error({
          title: 'Request error',
          message: 'Submit request failed',
          position: 'top right',
          showDuration: 2000,
          hideMethod: 'bounce',
          showMethod: 'bounce',
        })
      }
    },
    async getUser() {
      const res = await UserService.getProfileOfCurrentUser();
      this.dataUser = res.data.data;
    },
    showTakeOff() {
      if (this.date === "") {
        this.$toast.error({
          title: 'Date',
          message: 'Please select a date',
          position: 'top right',
          showDuration: 2000,
          hideMethod: 'bounce',
          showMethod: 'bounce',
        })
        return;
      }
      this.showModal = true;
    },
    showOT() {
      this.showModalOT = true;
    },
    async handleOT() {
      if (this.dateOT === "") {
        this.$toast.error({
          title: 'Please select a date',
          message: 'Please select a date',
          position: 'top right',
          showDuration: 4000,
          hideMethod: 'hinge',
          showMethod: 'bounce',
        })
        return;
      } else if (this.timeOT == "") {
        this.$toast.error({
          title: 'Enter working time',
          message: 'Enter working time',
          position: 'top right',
          showDuration: 4000,
          hideMethod: 'hinge',
          showMethod: 'bounce',
        })
        return;
      } else if (this.noteOverTime == "") {
        this.$toast.error({
          title: 'Note Over Time',
          message: 'Note Over Time Not Be Empty',
          position: 'top right',
          showDuration: 4000,
          hideMethod: 'hinge',
          showMethod: 'bounce',
        })
        return;
      }
      try {
        const data = await authService.overTime({
          multiply: 2,
          note: this.noteOverTime,
          staff_id: this.dataUser.staffId,
          status: "PENDING",
          time_end: Number(this.timeOT) * 60000,
          time_start: Date.parse(this.dateOT),
        })
        this.$toast.success({
          title: 'request sent successfully',
          message: 'request sent successfully',
          position: 'top right',
          showDuration: 4000,
          hideMethod: 'hinge',
          showMethod: 'bounce',
        })
        this.timeOT = "";
        this.dateOT = "";
      } catch (e) {
        console.log(e)
        this.$toast.error({
          title: 'Submit request failed',
          message: 'Submit request failed',
          position: 'top right',
          showDuration: 4000,
          hideMethod: 'hinge',
          showMethod: 'bounce',
        })
      }
    },
    async takeOff() {
      if (this.contentTakeOff === "") {
        this.$toast.error({
          title: 'Not Be Empty',
          message: 'contentTakeOff Not Be Empty',
          position: 'top right',
          showDuration: 4000,
          hideMethod: 'hinge',
          showMethod: 'bounce',
        })
        return;
      }

      try {
        const data = await authService.takeOff({
          note: this.contentTakeOff,
          staff: this.dataUser.staffId,
          status: "PENDING",
          time_created: Date.parse(Date()),
          time_end: Date.parse(this.date.end),
          time_start: Date.parse(this.date.start),
        });
        this.contentTakeOff = "";
        this.$toast.success({
          title: 'Request success',
          message: 'Request sent successfully',
          position: 'top right',
          showDuration: 2000,
          hideMethod: 'bounce',
          showMethod: 'bounce',
        })
      } catch (e) {
        console.log(e);
        this.$toast.error({
          title: 'Request error',
          message: 'Submit request failed',
          position: 'top right',
          showDuration: 2000,
          hideMethod: 'bounce',
          showMethod: 'bounce',
        })
      }
    },
    showLateForWork() {
      this.showModalLateForWork = true;
    },
    async lateForWork() {
      if (this.contentTakeOff === "") {
        this.$toast.error({
          title: 'Not Be Empty',
          message: 'contentTakeOff Not Be Empty',
          position: 'top right',
          showDuration: 4000,
          hideMethod: 'hinge',
          showMethod: 'bounce',
        })
        return;
      } else if (this.dateLateForWork == "") {
        this.$toast.error({
          title: 'Not Be Empty',
          message: 'dateLateForWork Not Be Empty',
          position: 'top right',
          showDuration: 4000,
          hideMethod: 'hinge',
          showMethod: 'bounce',
        })
        return;
      }
      try {
        const data = await authService.lateForWork({
          note: this.contentTakeOff,
          staff: this.dataUser.staffId,
          status: "PENDING",
          timeIn: Number(this.dateLateForWork) * 60000,
        });
        this.contentTakeOff = "";
        this.dateLateForWork = "";
        this.$toast.success({
          title: 'Request success',
          message: 'Request sent successfully',
          position: 'top right',
          showDuration: 2000,
          hideMethod: 'bounce',
          showMethod: 'bounce',
        })
      } catch (e) {
        console.log(e);
        this.$toast.error({
          title: 'Request error',
          message: 'Submit request failed',
          position: 'top right',
          showDuration: 2000,
          hideMethod: 'bounce',
          showMethod: 'bounce',
        })
      }
    },
    async getMyAbsentRequest() {
      try {
        const log1 = await absentService.getMyDayOff();
        this.myAbsentRequest = log1.data.data.content;
      } catch (error) {
        console.log(error)
      }
    },
    async getMyOTRequest() {
      try {
        const log2 = await overTimeService.getMyOT();
        this.myOTRequest = log2.data.data.content;
      } catch (error) {
        console.log(error)
      }
    },
    async getMyTimeLateRequest() {
      try {
        const log3 = await lateTimeService.getMyTimeLate();
        this.myLateTimeRequest = log3.data.data.content;
        console.log('myTLRequest', this.myLateTimeRequest);
      } catch (error) {
        console.log(error)
      }
    }
  },
  mounted() {
    this.getUser();
    this.getProfileOfCurrentUser();
    this.getMyRequest();
    this.getMyAbsentRequest();
    this.getMyOTRequest();
    this.getMyTimeLateRequest()
  }
}
</script>

<style scoped>
.background {
  background-color: rgba(0, 0, 0, 0.68);
}
</style>