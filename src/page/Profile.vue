<template>
  <div>
    <div v-if="currentUser.position == 'ADMINISTRATOR'">
      <CompoAdminPage/>
    </div>
    <div v-if="currentUser.position == 'LEADER'">
      <CompoLeaderPage/>
    </div>
    <!--Profile Card-->
    <div x-data="setup()">
      <div
        class="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-black"
      >
        <div class="h-full ml-14 mt-14 mb-10 md:ml-64">
          <div class="md:grid grid-cols-4 grid-rows-2 bg-white gap-2 p-4 rounded-xl">
            <div class="md:col-span-1 h-48 shadow-xl">
              <div class="flex w-full h-full relative">
                <img
                  src="https://th.bing.com/th/id/R.f11a623e2d5994eba9ef4e6da950b62c?rik=K3LlgywjliCTjA&pid=ImgRaw&r=0"
                  class="w-44 h-44 m-auto rounded-full"
                  alt=""
                />
              </div>
            </div>
            <div class="md:col-span-3 h-48 shadow-xl p-4 space-y-2">
              <div class="flex">
                <span
                  class="text-sm font-bold uppercase border-2 rounded-l px-4 py-2 bg-gray-50 whitespace-no-wrap w-2/6 mr-2"
                  >Name:
                  <span
                    class="px-4 font-normal border-l-0 cursor-default border-gray-300 focus:outline-none rounded-md rounded-l-none shadow-sm -ml-1 w-4/6"
                  >
                    {{ currentUser.staffName }}
                  </span>
                </span>
                <span
                  class="text-sm font-bold uppercase border-2 rounded-l px-4 py-2 bg-gray-50 whitespace-no-wrap w-2/6"
                  >Birthday::
                  <span
                    class="px-4 font-normal border-l-0 cursor-default border-gray-300 focus:outline-none rounded-md rounded-l-none shadow-sm -ml-1 w-4/6"
                  >
                    {{ currentUser.birthday }}
                  </span>
                </span>
              </div>
              <div class="flex">
                <span
                  class="text-sm font-bold uppercase border-2 rounded-l px-4 py-2 bg-gray-50 whitespace-no-wrap w-2/6 mr-2"
                  >Email:
                  <span
                    class="px-4 font-normal border-l-0 cursor-default border-gray-300 focus:outline-none rounded-md rounded-l-none shadow-sm -ml-1 w-4/6"
                  >
                    {{ currentUser.email }}
                  </span>
                </span>
                <span
                  class="text-sm font-bold uppercase border-2 rounded-l px-4 py-2 bg-gray-50 whitespace-no-wrap w-2/6"
                  >Manage by:
                  <span
                    class="px-4 font-normal border-l-0 cursor-default border-gray-300 focus:outline-none rounded-md rounded-l-none shadow-sm -ml-1 w-4/6"
                  >
                    {{ currentUser.manager }}
                  </span>
                </span>
              </div>
              <div class="flex">
                <span
                  class="text-sm font-bold uppercase border-2 rounded-l px-4 py-2 bg-gray-50 whitespace-no-wrap w-2/6 mr-2"
                  >Role:
                  <span
                    class="px-6 font-normal border-l-0 cursor-default border-gray-300 focus:outline-none rounded-md rounded-l-none shadow-sm -ml-1 w-4/6"
                  >
                    {{ currentUser.position }}
                  </span>
                </span>
                <span
                  class="text-sm font-bold uppercase border-2 rounded-l px-4 py-2 bg-gray-50 whitespace-no-wrap w-2/6"
                  >Created at:
                  <span
                    class="px-4 font-normal border-l-0 cursor-default border-gray-300 focus:outline-none rounded-md rounded-l-none shadow-sm -ml-1 w-4/6"
                  >
                    {{ currentUser.createdAt | formatDate }}
                  </span>
                </span>
              </div>
            </div>
            <div class="md:col-span-4 h-48 shadow-xl p-4 space-y-2 hidden md:block">
              <h3 class="font-bold uppercase">Profile Description</h3>
              <p class="">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget
                laoreet diam, id luctus lectus. Ut consectetur nisl ipsum, et faucibus sem
                finibus vitae. Maecenas aliquam dolor at dignissim commodo. Etiam a
                aliquam tellus, et suscipit dolor. Proin auctor nisi velit, quis aliquet
                sapien viverra a.
              </p>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4 mt-4">
            <div class="border-2 bg-white rounded-2xl text-center">
              <h1 class="font-bold uppercase p-3">Number of TimeKeeping</h1>
              <p class="font-bold text-2xl">{{this.myRequest.length}}</p>
            </div>
            <div class="border-2 bg-white rounded-2xl text-center">
              <h1 class="font-bold uppercase p-3">Number of AbsentTime Requests</h1>
              <p class="font-bold text-2xl">{{this.myAbsent.length}}</p>
            </div>
            <div class="border-2 bg-white rounded-2xl text-center">
              <h1 class="font-bold uppercase p-3">Number of TimeLate Requests</h1>
              <p class="font-bold text-2xl">{{this.myTimeLate.length}}</p>
            </div>
            <div class="border-2 bg-white rounded-2xl text-center">
              <h1 class="font-bold uppercase p-3">Number of OT Requests</h1>
              <p class="font-bold text-2xl">{{this.myOverTime.length}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { UserService } from "@/service/UserService";
import { timeKeepingService } from "@/service/timeKeepingService";
import CompoAdminPage from "@/components/CompoAdminPage.vue";
import {lateTimeService} from "@/service/lateTimeService";
import { overTimeService } from "@/service/overTimeService";
import { absentService } from "@/service/absentService";
import CompoLeaderPage from "@/components/CompoLeaderPage";

export default {
  data() {
    return {
      currentUser: {},
      myRequest: {},
      myTimeLate:{},
      myOverTime:{},
      myAbsent:{}
    };
  },
  mounted() {
    this.getProfileOfCurrentUser();
    this.getMyRequest();
    this.getMyAbsent();
    this.getMyOverTime();
    this.getMyTimeLate();
  },
  methods: {
    async getProfileOfCurrentUser() {
      const res = await UserService.getProfileOfCurrentUser();
      this.currentUser = res.data.data;
    },
    async getMyRequest() {
      const response = await timeKeepingService.getMyRequest();
      this.myRequest = response.data.data.content;
    },
    async getMyTimeLate(){
      try {
        const res1 = await lateTimeService.getMyTimeLate();
        this.myTimeLate = res1.data.data.content;
      } catch (error) {
        console.log(error);
      }
    },
    async getMyOverTime(){
      try {
        const res2 = await overTimeService.getMyOT();
        this.myOverTime = res2.data.data.content;
      } catch (error) {
        console.log(error);
      }
    },
    async getMyAbsent(){
      try {
        const res3 = await absentService.getMyDayOff();
        this.myAbsent = res3.data.data.content;
      } catch (error) {
        console.log(error);
      }
    }
  },
  components: { CompoAdminPage,CompoLeaderPage},
};
</script>