<template>
  <div>
    <!-- Header -->
    <CompoStaffPage />
    <!-- ./Sidebar -->
    <div x-data="setup()">
      <div
        class="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white"
      >
        <div class="h-full w-5/6 mx-auto mt-14 mb-10">
          <div class="m-5">
            <v-date-picker
              v-model="date"
              :attributes="attributes"
              is-expanded
              :value="[1, 2, 3]"
              is-dark
              is-range
              trim-weeks
            />
          </div>
          <div></div>
          <div class="flex justify-evenly text-xl">
            <div>
              <button class="w-64 h-10 rounded-lg bg-blue-400" @click="Timekeeping()">
                Chấm công
              </button>
            </div>
            <div>
              <button class="w-64 h-10 rounded-lg bg-blue-400" @click="showLateForWork()">
                Xin đi muộn
              </button>
            </div>
            <div>
              <button class="w-64 h-10 rounded-lg bg-blue-400" @click="showTakeOff()">
                Xin nghỉ
              </button>
            </div>
          </div>
          <!-- Client Table -->
          <div class="mt-4 gap-2 rounded-xl">
            <div class="mt-4 mx-4" v-if="this.myRequest.length > 0">
              <div class="w-full overflow-hidden rounded-lg shadow-xs">
                <div class="w-full overflow-x-auto">
                  <table class="w-full">
                    <thead>
                      <tr
                        class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
                      >
                        <th class="px-4 py-3 w-1 text-center">Number</th>
                        <th class="px-4 py-3 text-center">Note</th>
                        <th class="px-4 py-3 text-center">Created at</th>
                        <th class="px-4 py-3 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody
                      class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"
                    >
                      <tr
                        v-for="request in myRequest"
                        :key="request.id"
                        class="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400"
                      >
                        <td class="px-4 py-3">
                          <p class="text-center">
                            {{ request.id }}
                          </p>
                        </td>
                        <td class="px-4 py-3">
                          <div class="flex items-center text-sm">
                            <div
                              class="relative hidden w-44 h-8 mr-3 rounded-full md:block"
                            >
                              <div
                                class="absolute inset-0 rounded-full shadow-inner"
                                aria-hidden="true"
                              ></div>
                            </div>
                            <div>
                              <p class="font-semibold">
                                {{ request.note }}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td class="px-4 py-3 text-sm text-center">
                          {{ request.timeIn | formatDate }}
                        </td>
                        <td class="px-4 py-3 text-xs text-center">
                          <span
                            class="px-2 py-1 text-right font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100"
                          >
                            {{ request.status }}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div v-else class="italic text-center text-gray-50">No Request Created!</div>
          </div>
          <!-- ./Client Table -->
        </div>
        <div
          class="fixed top-0 w-[100vw] h-[100vh] z-[10] flex items-center background"
          v-if="this.showModal === true"
        >
          <div
            class="absolute right-2 top-2 text-white text-4xl cursor-pointer"
            @click="
              () => {
                this.showModal = false;
              }
            "
          >
            x
          </div>
          <div
            class="w-1/2 h-2/3 mx-auto flex items-center justify-center bg-white opacity-100 z-[1000]"
          >
            <form @submit.prevent="takeOff()">
              <div class="bg-white rounded-md px-6 py-10 max-w-2xl mx-auto">
                <h1 class="text-center text-2xl font-bold text-gray-500 mb-10">
                  Bảng lý do xin nghỉ
                </h1>
                <div class="space-y-4">
                  <div>
                    <label for="name" class="text-lx font-serif">take off:</label>
                    <input
                      type="text"
                      placeholder="take off"
                      id="name"
                      v-model="contentTakeOff"
                      class="ml-2 outline-none py-1 px-2 text-md border-2 rounded-md"
                    />
                  </div>
                  <button
                    class="px-6 py-2 mx-auto block rounded-md text-lg font-semibold text-indigo-100 bg-indigo-600"
                  >
                    SUBMIT
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div
          class="fixed top-0 w-[100vw] h-[100vh] z-[10] flex items-center background"
          v-if="this.showModalLateForWork === true"
        >
          <div
            class="absolute right-2 top-2 text-white text-4xl cursor-pointer"
            @click="
              () => {
                this.showModalLateForWork = false;
              }
            "
          >
            x
          </div>
          <div
            class="w-1/2 h-2/3 mx-auto flex items-center justify-center bg-white opacity-100 z-[1000]"
          >
            <form @submit.prevent="lateForWork()">
              <div class="bg-white rounded-md px-6 py-10 max-w-2xl mx-auto">
                <h1 class="text-center text-2xl font-bold text-gray-500 mb-10">
                  Bảng lý do xin đi muộn
                </h1>
                <div class="space-y-4">
                  <div>
                    <label for="number" class="text-lg text-black font-serif">minutes late:</label>
                    <input
                      type="number"
                      placeholder="minutes late"
                      id="number"
                      v-model="dateLateForWork"
                      class="ml-2 outline-none py-1 px-2 text-md text-black border-2 rounded-md"
                    />
                  </div>
                  <div>
                    <label for="name" class="text-lg font-serif">take off:</label>
                    <input
                      type="text"
                      placeholder="take off"
                      id="name"
                      v-model="contentTakeOff"
                      class="ml-2 outline-none py-1 px-2 text-black text-md border-2 rounded-md"
                    />
                  </div>
                  <button
                    class="px-6 py-2 mx-auto block rounded-md text-lg font-semibold text-indigo-100 bg-indigo-600"
                  >
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
import Calendar from "v-calendar/lib/components/calendar.umd";
import DatePicker from "v-calendar/lib/components/date-picker.umd";
import { staffService } from "@/service/staffService";
import { authService } from "@/service/authService";
import { UserService } from "@/service/UserService";
import CompoStaffPage from "@/components/CompoStaffPage";
import { timeKeepingService } from "@/service/timeKeepingService";
export default {
  name: "Staff",
  components: { CompoStaffPage },
  data() {
    return {
      date: "",
      dateLateForWork: "",
      showModal: false,
      showModalLateForWork: false,
      contentTakeOff: "",
      dataUser: [],
      currentUser: {},
      myRequest: {},
      attributes: [],
    };
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
        APPROVED: "green",
        PENDING: "orange",
        REJECTED: "red",
      };
      this.attributes = this.myRequest.map((req) => {
        return {
          highlight: {
            color: statusColor[req.status],
            fillMode: "solid",
          },
          dates: req.timeIn,
        };
      });
    },
    async Timekeeping() {
      if (this.date === "") {
        alert("Please select a date");
        return;
      }else{
        
      }
      try {
        const data = await staffService.postStaff({
          note: "chấm công",
          staff: 1,
          timeIn: Date.parse(this.date.start),
        });
        alert("request sent successfully");
      } catch (e) {
        console.log(e);
        alert("Submit request failed");
      }
    },
    async getUser() {
      const res = await UserService.getProfileOfCurrentUser();
      this.dataUser = res.data.data;
    },
    showTakeOff() {
      if (this.date === "") {
        alert("Please select a date");
        return;
      }
      this.showModal = true;
    },
    async takeOff() {
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
        alert("request sent successfully");
      } catch (e) {
        console.log(e);
        alert("Submit request failed");
      }
    },
    showLateForWork() {
      this.showModalLateForWork = true;
    },
    async lateForWork() {
      try {
        const data = await authService.lateForWork({
          note: this.contentTakeOff,
          staff: this.dataUser.staffId,
          status: "PENDING",
          timeIn: Number(this.dateLateForWork) * 60000,
        });
        this.contentTakeOff = "";
        this.dateLateForWork = "";
        alert("request sent successfully");
      } catch (e) {
        console.log(e);
        alert("Submit request failed");
      }
      this.showModalLateForWork = false
    },
  },
  mounted() {
    this.getUser();
    this.getProfileOfCurrentUser();
    this.getMyRequest();
  },
};
</script>

<style scoped>
.background {
  background-color: rgba(0, 0, 0, 0.68);
}
</style>
