<template>
  <div>
    <!-- Header -->
    <CompoAdminPage />
    <!-- ./Sidebar -->
    <div x-data="setup()">
      <div
        class="
          min-h-screen
          flex flex-col flex-auto flex-shrink-0
          antialiased
          bg-white
          dark:bg-gray-700
          text-black
          dark:text-white
        "
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
              class="
                px-3
                py-1
                mr-1
                font-semibold
                leading-tight
                text-green-700
                bg-green-100
                rounded-full
                dark:bg-green-700 dark:text-green-100
              "
              @click="getRequestByDate()"
            >
              Filter
            </button>
          </div>
          <!-- ./Statistics Cards -->

          <div class="grid grid-cols-1 lg:grid-cols-2 p-4 gap-4"></div>
          <!-- Approved or Rejected -->
          <div class="flex justify-end mx-8">
            <button
              class="
                px-2
                py-1
                mr-1
                font-semibold
                leading-tight
                text-green-700
                bg-green-100
                rounded-full
                dark:bg-green-700 dark:text-green-100
              "
              @click="approveRequest()"
            >
              Accept
            </button>
            <button
              class="
                px-2
                py-1
                mr-1
                font-semibold
                leading-tight
                text-red-700
                bg-red-100
                rounded-full
                dark:bg-red-700 dark:text-red-100
              "
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
                        class="
                          text-xs
                          font-semibold
                          tracking-wide
                          text-left text-gray-500
                          uppercase
                          border-b
                          dark:border-gray-700
                          bg-gray-50
                          dark:text-gray-400 dark:bg-gray-800
                        "
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
                      class="
                        bg-white
                        divide-y
                        dark:divide-gray-700 dark:bg-gray-800
                      "
                    >
                      <tr
                        v-for="request in requests"
                        :key="request.id"
                        class="
                          bg-gray-50
                          dark:bg-gray-800
                          hover:bg-gray-100
                          dark:hover:bg-gray-900
                          text-gray-700
                          dark:text-gray-400
                        "
                      >
                        <td class="px-4 py-3">
                          <p class="text-center">{{ request.id }}</p>
                        </td>
                        <td class="px-4 py-3">
                          <div class="flex items-center text-sm">
                            <div
                              class="
                                relative
                                hidden
                                w-8
                                h-8
                                mr-3
                                rounded-full
                                md:block
                              "
                            >
                              <img
                                class="object-cover w-full h-full rounded-full"
                                src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=200&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                                alt=""
                                loading="lazy"
                              />
                              <div
                                class="
                                  absolute
                                  inset-0
                                  rounded-full
                                  shadow-inner
                                "
                                aria-hidden="true"
                              ></div>
                            </div>
                            <div>
                              <p class="font-semibold">{{ request.staff }}</p>
                              <p
                                class="text-xs text-gray-600 dark:text-gray-400"
                              >
                                10x Developer
                              </p>
                            </div>
                          </div>
                        </td>
                        <td class="px-4 py-3 text-sm">{{ request.note }}</td>
                        <td class="px-4 py-3 text-xs">
                          <span
                            class="
                              px-2
                              py-1
                              font-semibold
                              leading-tight
                              text-yellow-50
                              bg-orange-600
                              rounded-full
                              dark:bg-orange-600 dark:text-green-50
                            "
                            v-if="request.status === 'PENDING'"
                          >
                            {{ request.status }}
                          </span>
                          <span
                            class="
                              px-2
                              py-1
                              font-semibold
                              leading-tight
                              text-green-50
                              bg-green-700
                              rounded-full
                              dark:bg-green-700 dark:text-green-100
                            "
                            v-else-if="request.status === 'APPROVED'"
                          >
                            {{ request.status }}
                          </span>
                          <span
                            class="
                              px-2
                              py-1
                              font-semibold
                              leading-tight
                              text-white
                              bg-red-600
                              rounded-full
                              dark:bg-red-600 dark:text-green-100
                            "
                            v-else
                          >
                            {{ request.status }}
                          </span>
                        </td>
                        <td class="px-4 py-3 text-sm">
                          {{ request.timeIn | formatDate }}
                        </td>
                        <td
                          class="px-4 py-3 text-sm"
                          v-if="request.status === 'PENDING'"
                        >
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
                  class="
                    grid
                    px-4
                    py-3
                    text-xs
                    font-semibold
                    tracking-wide
                    text-gray-500
                    uppercase
                    border-t
                    dark:border-gray-700
                    bg-gray-50
                    sm:grid-cols-9
                    dark:text-gray-400 dark:bg-gray-800
                  "
                >
                  <span class="flex items-center col-span-3">
                    Showing {{ this.requests.length }} of
                    {{ this.requests.length }}
                  </span>
                  <span class="col-span-2"></span>
                  <!-- Pagination -->
                  <span class="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
                    <nav aria-label="Table navigation">
                      <ul class="inline-flex items-center">
                        <li>
                          <button
                            class="
                              px-3
                              py-1
                              rounded-md rounded-l-lg
                              focus:outline-none focus:shadow-outline-purple
                            "
                            aria-label="Previous"
                          >
                            <svg
                              aria-hidden="true"
                              class="w-4 h-4 fill-current"
                              viewBox="0 0 20 20"
                            >
                              <path
                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                clip-rule="evenodd"
                                fill-rule="evenodd"
                              ></path>
                            </svg>
                          </button>
                        </li>
                        <li>
                          <button
                            class="
                              px-3
                              py-1
                              rounded-md
                              focus:outline-none focus:shadow-outline-purple
                            "
                          >
                            1
                          </button>
                        </li>
                        <li>
                          <button
                            class="
                              px-3
                              py-1
                              rounded-md
                              focus:outline-none focus:shadow-outline-purple
                            "
                          >
                            2
                          </button>
                        </li>
                        <li>
                          <button
                            class="
                              px-3
                              py-1
                              text-white
                              dark:text-gray-800
                              transition-colors
                              duration-150
                              bg-blue-600
                              dark:bg-gray-100
                              border border-r-0 border-blue-600
                              dark:border-gray-100
                              rounded-md
                              focus:outline-none focus:shadow-outline-purple
                            "
                          >
                            3
                          </button>
                        </li>
                        <li>
                          <button
                            class="
                              px-3
                              py-1
                              rounded-md
                              focus:outline-none focus:shadow-outline-purple
                            "
                          >
                            4
                          </button>
                        </li>
                        <li>
                          <span class="px-3 py-1">...</span>
                        </li>
                        <li>
                          <button
                            class="
                              px-3
                              py-1
                              rounded-md
                              focus:outline-none focus:shadow-outline-purple
                            "
                          >
                            8
                          </button>
                        </li>
                        <li>
                          <button
                            class="
                              px-3
                              py-1
                              rounded-md
                              focus:outline-none focus:shadow-outline-purple
                            "
                          >
                            9
                          </button>
                        </li>
                        <li>
                          <button
                            class="
                              px-3
                              py-1
                              rounded-md rounded-r-lg
                              focus:outline-none focus:shadow-outline-purple
                            "
                            aria-label="Next"
                          >
                            <svg
                              class="w-4 h-4 fill-current"
                              aria-hidden="true"
                              viewBox="0 0 20 20"
                            >
                              <path
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clip-rule="evenodd"
                                fill-rule="evenodd"
                              ></path>
                            </svg>
                          </button>
                        </li>
                      </ul>
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
                        class="
                          text-xs
                          font-semibold
                          tracking-wide
                          text-left text-gray-500
                          uppercase
                          border-b
                          dark:border-gray-700
                          bg-gray-50
                          dark:text-gray-400 dark:bg-gray-800
                        "
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
                      class="
                        bg-white
                        divide-y
                        dark:divide-gray-700 dark:bg-gray-800
                      "
                    >
                      <tr
                        v-for="requestlog in requestByDate"
                        :key="requestlog.id"
                        class="
                          bg-gray-50
                          dark:bg-gray-800
                          hover:bg-gray-100
                          dark:hover:bg-gray-900
                          text-gray-700
                          dark:text-gray-400
                        "
                      >
                        <td class="px-4 py-3">
                          <p class="text-center">{{ requestlog.id }}</p>
                        </td>
                        <td class="px-4 py-3">
                          <div class="flex items-center text-sm">
                            <div
                              class="
                                relative
                                hidden
                                w-8
                                h-8
                                mr-3
                                rounded-full
                                md:block
                              "
                            >
                              <img
                                class="object-cover w-full h-full rounded-full"
                                src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=200&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                                alt=""
                                loading="lazy"
                              />
                              <div
                                class="
                                  absolute
                                  inset-0
                                  rounded-full
                                  shadow-inner
                                "
                                aria-hidden="true"
                              ></div>
                            </div>
                            <div>
                              <p class="font-semibold">
                                {{ requestlog.staff }}
                              </p>
                              <p
                                class="text-xs text-gray-600 dark:text-gray-400"
                              >
                                10x Developer
                              </p>
                            </div>
                          </div>
                        </td>
                        <td class="px-4 py-3 text-sm">{{ requestlog.note }}</td>
                        <td class="px-4 py-3 text-xs">
                          <span
                            class="
                              px-2
                              py-1
                              font-semibold
                              leading-tight
                              text-yellow-50
                              bg-orange-600
                              rounded-full
                              dark:bg-orange-600 dark:text-green-50
                            "
                            v-if="requestlog.status === 'PENDING'"
                          >
                            {{ requestlog.status }}
                          </span>
                          <span
                            class="
                              px-2
                              py-1
                              font-semibold
                              leading-tight
                              text-green-50
                              bg-green-700
                              rounded-full
                              dark:bg-green-700 dark:text-green-100
                            "
                            v-else-if="requestlog.status === 'APPROVED'"
                          >
                            {{ requestlog.status }}
                          </span>
                          <span
                            class="
                              px-2
                              py-1
                              font-semibold
                              leading-tight
                              text-white
                              bg-red-600
                              rounded-full
                              dark:bg-red-600 dark:text-green-100
                            "
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
                  class="
                    grid
                    px-4
                    py-3
                    text-xs
                    font-semibold
                    tracking-wide
                    text-gray-500
                    uppercase
                    border-t
                    dark:border-gray-700
                    bg-gray-50
                    sm:grid-cols-9
                    dark:text-gray-400 dark:bg-gray-800
                  "
                >
                  <span class="flex items-center col-span-3">
                    Showing {{ this.requestByDate.length }} of
                    {{ this.requests.length }}
                  </span>
                  <span class="col-span-2"></span>
                  <!-- Pagination -->
                  <span class="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
                    <nav aria-label="Table navigation">
                      <ul class="inline-flex items-center">
                        <li>
                          <button
                            class="
                              px-3
                              py-1
                              rounded-md rounded-l-lg
                              focus:outline-none focus:shadow-outline-purple
                            "
                            aria-label="Previous"
                          >
                            <svg
                              aria-hidden="true"
                              class="w-4 h-4 fill-current"
                              viewBox="0 0 20 20"
                            >
                              <path
                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                clip-rule="evenodd"
                                fill-rule="evenodd"
                              ></path>
                            </svg>
                          </button>
                        </li>
                        <li>
                          <button
                            class="
                              px-3
                              py-1
                              rounded-md
                              focus:outline-none focus:shadow-outline-purple
                            "
                          >
                            1
                          </button>
                        </li>
                        <li>
                          <button
                            class="
                              px-3
                              py-1
                              rounded-md
                              focus:outline-none focus:shadow-outline-purple
                            "
                          >
                            2
                          </button>
                        </li>
                        <li>
                          <button
                            class="
                              px-3
                              py-1
                              text-white
                              dark:text-gray-800
                              transition-colors
                              duration-150
                              bg-blue-600
                              dark:bg-gray-100
                              border border-r-0 border-blue-600
                              dark:border-gray-100
                              rounded-md
                              focus:outline-none focus:shadow-outline-purple
                            "
                          >
                            3
                          </button>
                        </li>
                        <li>
                          <button
                            class="
                              px-3
                              py-1
                              rounded-md
                              focus:outline-none focus:shadow-outline-purple
                            "
                          >
                            4
                          </button>
                        </li>
                        <li>
                          <span class="px-3 py-1">...</span>
                        </li>
                        <li>
                          <button
                            class="
                              px-3
                              py-1
                              rounded-md
                              focus:outline-none focus:shadow-outline-purple
                            "
                          >
                            8
                          </button>
                        </li>
                        <li>
                          <button
                            class="
                              px-3
                              py-1
                              rounded-md
                              focus:outline-none focus:shadow-outline-purple
                            "
                          >
                            9
                          </button>
                        </li>
                        <li>
                          <button
                            class="
                              px-3
                              py-1
                              rounded-md rounded-r-lg
                              focus:outline-none focus:shadow-outline-purple
                            "
                            aria-label="Next"
                          >
                            <svg
                              class="w-4 h-4 fill-current"
                              aria-hidden="true"
                              viewBox="0 0 20 20"
                            >
                              <path
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clip-rule="evenodd"
                                fill-rule="evenodd"
                              ></path>
                            </svg>
                          </button>
                        </li>
                      </ul>
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
    };
  },
  mounted() {
    this.showRequest();
  },
  computed: {},
  methods: {
    async showRequest() {
      try {
        const resp = await timeKeepingService.getTimeKeeping();
        this.requests = resp.data.data.content;
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
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style scoped src="../assets/css/pageAdmin.css">
</style>
