<template>
  <div>
    <!-- Header -->
    <CompoAdminPage />
    <!-- ./Sidebar -->
    <div x-data="setup()">
      <div
        class="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white"
      >
        <div class="h-full ml-14 mt-14 mb-10 md:ml-64">
          <!--Calendar-->
          <div class="m-5">
            <v-date-picker
              is-expanded
              :value="null"
              color="red"
              is-dark
              trim-weeks
              mode="range"
              is-range
              v-model="range"
              :model-config="modelConfig"
            />
          </div>
          <!--Calendar-->
          <div class="flex justify-start mx-8">
            <button
              class="px-3 py-1 mr-1 font-semibold leading-tight text-green-100 bg-green-700 rounded-full dark:bg-green-700 dark:text-green-100"
              @click="getRequestByDate()"
            >
              Filter
            </button>
            <button class="px-2  pb-1 font-semibold leading-tight text-red-100 bg-red-700 rounded-full dark:bg-red-700 dark:text-red-100"
            @click="resetRequest()"
            >
              <a-icon type="undo" />
            </button>
          </div>
          <!-- ./Statistics Cards -->

          <div class="grid grid-cols-1 lg:grid-cols-2 p-4 gap-4"></div>
          <!-- Approved or Rejected -->
          <div class="flex justify-end mx-8">
            <button
              class="px-2 py-1 mr-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100"
              @click="approveRequest()"
            >
              Accept
            </button>
            <button
              class="px-2 py-1 mr-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-full dark:bg-red-700 dark:text-red-100"
              @click="rejectRequest()"
            >
              Reject
            </button>
          </div>
          <!-- ./Approved or Rejected -->

          <!-- Client Table -->
          <div v-if="this.requests.length > 0">
            <div class="mt-4 mx-4" v-if="this.requestByDate.length == 0">
              <div class="w-full overflow-hidden rounded-lg shadow-xs">
                <div class="w-full overflow-x-auto">
                  <table class="w-full">
                    <thead>
                      <tr
                        class="text-xs font-semibold tracking-wide text-center text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
                      >
                        <th class="px-4 py-3 w-1">Number</th>
                        <th class="px-4 py-3">Name</th>
                        <th class="px-4 py-3">Note</th>
                        <th class="px-4 py-3">Status</th>
                        <th class="px-4 py-3">Date</th>
                        <th class="px-4 py-3">Request</th>
                      </tr>
                    </thead>
                    <tbody
                      class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"
                    >
                      <tr
                        v-for="request in requests"
                        :key="request.id"
                        class="bg-gray-50 text-center dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400"
                      >
                        <td class="px-4 py-3">
                          <p class="text-center">{{ request.id }}</p>
                        </td>
                        <td class="px-4 py-3">
                          <div class="flex ml-16 items-center text-sm">
                            <div
                              class="relative hidden w-8 h-8 mr-3 rounded-full md:block"
                            >
                              <img
                                class="object-cover w-full h-full rounded-full"
                                src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=200&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                                alt=""
                                loading="lazy"
                              />
                              <div
                                class="absolute inset-0 rounded-full shadow-inner"
                                aria-hidden="true"
                              ></div>
                            </div>
                            <div>
                              <p class="font-semibold">{{ request.staff }}</p>
                              <p class="text-xs text-gray-600 dark:text-gray-400">
                                10x Developer
                              </p>
                            </div>
                          </div>
                        </td>
                        <td class="px-4 py-3 text-sm">{{ request.note }}</td>
                        <td class="px-4 py-3 text-xs">
                          <span
                            class="px-2 py-1 font-semibold leading-tight text-yellow-50 bg-orange-600 rounded-full dark:bg-orange-600 dark:text-green-50"
                            v-if="request.status === 'PENDING'"
                          >
                            {{ request.status }}
                          </span>
                          <span
                            class="px-2 py-1 font-semibold leading-tight text-green-50 bg-green-700 rounded-full dark:bg-green-700 dark:text-green-100"
                            v-else-if="request.status === 'APPROVED'"
                          >
                            {{ request.status }}
                          </span>
                          <span
                            class="px-2 py-1 font-semibold leading-tight text-white bg-red-600 rounded-full dark:bg-red-600 dark:text-green-100"
                            v-else
                          >
                            {{ request.status }}
                          </span>
                        </td>
                        <td class="px-4 py-3 text-sm">
                          {{ request.timeIn | formatDate }}
                        </td>
                        <td class="px-4 py-3 text-sm" v-if="request.status === 'PENDING'">
                          <input
                            type="checkbox"
                            name=""
                            id=""
                            v-model="checkRequest"
                            :value="request.id"
                          />
                        </td>
                        <td class="px-4 py-3 text-sm" v-else>
                          <span class="text-green-500 italic">Checked</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div
                  class="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800"
                >
                  <span class="flex items-center col-span-3">
                    Showing {{ this.requests.length }} of
                    {{ this.requests.length }}
                  </span>
                  <span class="col-span-2"></span>
                  <!-- Pagination -->
                  <span class="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
                    <nav aria-label="Table navigation">
                      <a-pagination
                        @change="showRequest()"
                        v-model="current"
                        :default-current="1"
                        :total="this.totalPage"
                        :defaultPageSize="1"
                      />
                    </nav>
                  </span>
                </div>
              </div>
            </div>
            <div class="mt-4 mx-4" v-else>
              <div class="w-full overflow-hidden rounded-lg shadow-xs">
                <div class="w-full overflow-x-auto">
                  <table class="w-full">
                    <thead>
                      <tr
                        class="text-xs font-semibold tracking-wide text-center text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
                      >
                        <th class="px-4 py-3 w-1">Number</th>
                        <th class="px-4 py-3">Name</th>
                        <th class="px-4 py-3">Note</th>
                        <th class="px-4 py-3">Status</th>
                        <th class="px-4 py-3">Date</th>
                        <th class="px-4 py-3">Request</th>
                      </tr>
                    </thead>
                    <tbody
                      class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"
                    >
                      <tr
                        v-for="requestlog in requestByDate"
                        :key="requestlog.id"
                        class="bg-gray-50 text-center dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400"
                      >
                        <td class="px-4 py-3">
                          <p class="text-center">{{ requestlog.id }}</p>
                        </td>
                        <td class="px-4 py-3">
                          <div class="flex items-center ml-8 text-sm">
                            <div
                              class="relative hidden w-8 h-8 mr-3 rounded-full md:block"
                            >
                              <img
                                class="object-cover w-full h-full rounded-full"
                                src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=200&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                                alt=""
                                loading="lazy"
                              />
                              <div
                                class="absolute inset-0 rounded-full shadow-inner"
                                aria-hidden="true"
                              ></div>
                            </div>
                            <div>
                              <p class="font-semibold">
                                {{ requestlog.staff }}
                              </p>
                              <p class="text-xs text-gray-600 dark:text-gray-400">
                                10x Developer
                              </p>
                            </div>
                          </div>
                        </td>
                        <td class="px-4 py-3 text-sm">{{ requestlog.note }}</td>
                        <td class="px-4 py-3 text-xs">
                          <span
                            class="px-2 py-1 font-semibold leading-tight text-yellow-50 bg-orange-600 rounded-full dark:bg-orange-600 dark:text-green-50"
                            v-if="requestlog.status === 'PENDING'"
                          >
                            {{ requestlog.status }}
                          </span>
                          <span
                            class="px-2 py-1 font-semibold leading-tight text-green-50 bg-green-700 rounded-full dark:bg-green-700 dark:text-green-100"
                            v-else-if="requestlog.status === 'APPROVED'"
                          >
                            {{ requestlog.status }}
                          </span>
                          <span
                            class="px-2 py-1 font-semibold leading-tight text-white bg-red-600 rounded-full dark:bg-red-600 dark:text-green-100"
                            v-else
                          >
                            {{ requestlog.status }}
                          </span>
                        </td>
                        <td class="px-4 py-3 text-sm">
                          {{ requestlog.timeIn | formatDate }}
                        </td>
                        <td
                          class="px-4 py-3 text-sm"
                          v-if="requestlog.status === 'PENDING'"
                        >
                          <input
                            type="checkbox"
                            name=""
                            id=""
                            v-model="checkRequest"
                            :value="requestlog.id"
                          />
                        </td>
                        <td class="px-4 py-3 text-sm" v-else>
                          <span class="text-green-500 italic">Checked</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div
                  class="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800"
                >
                  <span class="flex items-center col-span-3">
                    Showing {{ this.requestByDate.length }} of {{ this.requests.length }}
                  </span>
                  <span class="col-span-2"></span>
                  <!-- Pagination -->
                  <span class="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
                    <nav aria-label="Table navigation">
                      <a-pagination
                        @change="showRequest()"
                        v-model="current"
                        :default-current="1"
                        :total="this.totalPage"
                        :defaultPageSize="1"
                      />
                    </nav>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="italic text-center" v-else>No Request Created</div>
          <!-- ./Client Table -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { timeKeepingService } from "@/service/timeKeepingService";
import CompoAdminPage from "@/components/CompoAdminPage";
import Vue from 'vue'
import CxltToastr from 'cxlt-vue2-toastr'
Vue.use(CxltToastr)
import 'cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css'

export default {
  components: { CompoAdminPage },
  data() {
    return {
      requests: [],
      requestByDate: [],
      statusChecked: {
        APPROVED: "APPROVED",
        PENDING: "PENDING",
        REJECTED: "REJECTED",
      },
      checkRequest: [],
      range: {
        start: new Date(),
        end: new Date(),
      },
      modelConfig: {
        start: {
          timeAdjust: "00:00:00",
        },
        end: {
          timeAdjust: "23:59:59",
        },
      },
      current: 1,
      totalPage: "",
    };
  },
  mounted() {
    this.showRequest();
  },
  methods: {
    async showRequest() {
      try {
        const resp = await timeKeepingService.getTimeKeeping(this.current - 1);
        this.requests = resp.data.data.content;
        this.totalPage = resp.data.data.totalPages;
      } catch (error) {
        console.log(error);
      }
    },
    async approveRequest() {
      try {
        const resp = await timeKeepingService.patchTimeKeeping(
          this.checkRequest,
          this.statusChecked.APPROVED
        );
        this.checkRequest = [];
        this.showRequest();
      } catch (error) {
        console.log(error);
      }
    },
    async rejectRequest() {
      try {
        const resp = await timeKeepingService.patchTimeKeeping(
          this.checkRequest,
          this.statusChecked.REJECTED
        );
        this.checkRequest = [];
        this.showRequest();
      } catch (error) {
        console.log(error);
      }
    },
    async getRequestByDate() {
      try {
        this.timeStart = Date.parse(this.range.start);
        this.timeEnd = Date.parse(this.range.end);
        const reply = await timeKeepingService.getRequestByDate(
          this.timeStart,
          this.timeEnd
        );
        this.requestByDate = reply.data.data.content;
        if(this.requestByDate.length === 0){
          this.$toast.error({
            title:'Filter failed',
            message:'Do not have any request in this day',
            position: 'top right',
            showDuration: 2000,
            hideMethod:'bounce',
            showMethod:'bounce',
          })
        }
      } catch (error) {
        console.log(error);
      }
    },
    async resetRequest(){
      this.requestByDate=[];
      this.showRequest();
    }
  },
};
</script>
<style scoped src="../assets/css/pageAdmin.css"></style>
