<template>
  <div>
    <div v-if="currentUser.position == 'ADMINISTRATOR'">
      <CompoAdminPage/>
    </div>
    <div v-if="currentUser.position == 'LEADER'">
      <CompoLeaderPage/>
    </div>
    <div v-if="currentUser.position == 'STAFF'">
      <CompoStaffPage/>
    </div>
    <!--Profile Card-->
    <div x-data="setup()">
      <div
        class="
          min-h-screen
          flex flex-col flex-auto flex-shrink-0
          antialiased
          bg-white
          dark:bg-gray-700
          text-black
          dark:text-black
        "
      >
        <div class="h-full ml-14 mt-14 mb-10 md:ml-64">
          <div
            class="
              md:grid
              grid-cols-4 grid-rows-2
              bg-white
              gap-2
              p-4
              rounded-xl
            "
          >
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
                  class="
                    text-sm
                    font-bold
                    uppercase
                    border-2
                    rounded-l
                    px-4
                    py-2
                    bg-gray-50
                    whitespace-no-wrap
                    w-2/6
                    mr-2
                  "
                  >Name:
                  <span
                    class="
                      px-4
                      font-normal
                      border-l-0
                      cursor-default
                      border-gray-300
                      focus:outline-none
                      rounded-md rounded-l-none
                      shadow-sm
                      -ml-1
                      w-4/6
                    "
                  >
                    {{ currentUser.staffName }}
                  </span>
                </span>
                <span
                  class="
                    text-sm
                    font-bold
                    uppercase
                    border-2
                    rounded-l
                    px-4
                    py-2
                    bg-gray-50
                    whitespace-no-wrap
                    w-2/6
                  "
                  >Birthday::
                  <span
                    class="
                      px-4
                      font-normal
                      border-l-0
                      cursor-default
                      border-gray-300
                      focus:outline-none
                      rounded-md rounded-l-none
                      shadow-sm
                      -ml-1
                      w-4/6
                    "
                  >
                    {{ currentUser.birthday }}
                  </span>
                </span>
              </div>
              <div class="flex">
                <span
                  class="
                    text-sm
                    font-bold
                    uppercase
                    border-2
                    rounded-l
                    px-4
                    py-2
                    bg-gray-50
                    whitespace-no-wrap
                    w-2/6
                    mr-2
                  "
                  >Email:
                  <span
                    class="
                      px-4
                      font-normal
                      border-l-0
                      cursor-default
                      border-gray-300
                      focus:outline-none
                      rounded-md rounded-l-none
                      shadow-sm
                      -ml-1
                      w-4/6
                    "
                  >
                    {{ currentUser.email }}
                  </span>
                </span>
                <span
                  class="
                    text-sm
                    font-bold
                    uppercase
                    border-2
                    rounded-l
                    px-4
                    py-2
                    bg-gray-50
                    whitespace-no-wrap
                    w-2/6
                  "
                  >Manage by:
                  <span
                    class="
                      px-4
                      font-normal
                      border-l-0
                      cursor-default
                      border-gray-300
                      focus:outline-none
                      rounded-md rounded-l-none
                      shadow-sm
                      -ml-1
                      w-4/6
                    "
                  >
                    {{ currentUser.manager }}
                  </span>
                </span>
              </div>
              <div class="flex">
                <span
                  class="
                    text-sm
                    font-bold
                    uppercase
                    border-2
                    rounded-l
                    px-4
                    py-2
                    bg-gray-50
                    whitespace-no-wrap
                    w-2/6
                    mr-2
                  "
                  >Role:
                  <span
                    class="
                      px-6
                      font-normal
                      border-l-0
                      cursor-default
                      border-gray-300
                      focus:outline-none
                      rounded-md rounded-l-none
                      shadow-sm
                      -ml-1
                      w-4/6
                    "
                  >
                    {{ currentUser.position }}
                  </span>
                </span>
                <span
                  class="
                    text-sm
                    font-bold
                    uppercase
                    border-2
                    rounded-l
                    px-4
                    py-2
                    bg-gray-50
                    whitespace-no-wrap
                    w-2/6
                  "
                  >Created at:
                  <span
                    class="
                      px-4
                      font-normal
                      border-l-0
                      cursor-default
                      border-gray-300
                      focus:outline-none
                      rounded-md rounded-l-none
                      shadow-sm
                      -ml-1
                      w-4/6
                    "
                  >
                    {{ currentUser.createdAt | formatDate }}
                  </span>
                </span>
              </div>
            </div>
            <div
              class="md:col-span-4 h-48 shadow-xl p-4 space-y-2 hidden md:block"
            >
              <h3 class="font-bold uppercase">Profile Description</h3>
              <p class="">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                eget laoreet diam, id luctus lectus. Ut consectetur nisl ipsum,
                et faucibus sem finibus vitae. Maecenas aliquam dolor at
                dignissim commodo. Etiam a aliquam tellus, et suscipit dolor.
                Proin auctor nisi velit, quis aliquet sapien viverra a.
              </p>
            </div>
          </div>
          <div class="
          mt-4
              gap-2
              rounded-xl">
              <RequestPoint/>
              <div class="mt-4 mx-4" v-if="this.myRequest.length > 0">
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
                          <th class="px-4 py-3 w-1 text-center">Number</th>
                          <th class="px-4 py-3 text-center">Note</th>
                          <th class="px-4 py-3 text-center">Created at</th>
                          <th class="px-4 py-3 text-center">Status</th>
                          <th class="px-4 py-3 text-center">Other</th>
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
                          v-for="request in myRequest"
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
                            <p class="text-center">
                              {{ request.id }}
                            </p>
                          </td>
                          <td class="px-4 py-3 ">
                            <div class="flex items-center  text-sm">
                              <div
                                class="
                                  relative
                                  hidden
                                  w-44
                                  h-8
                                  mr-3
                                  rounded-full
                                  md:block
                                "
                              >
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
                              class="
                                px-2
                                py-1
                                text-right
                                font-semibold
                                leading-tight
                                text-green-700
                                bg-green-100
                                rounded-full
                                dark:bg-green-700 dark:text-green-100
                              "
                            >
                              {{ request.status }}
                            </span>
                          </td>
                          <td class="text-center">
                            <span
                              class="
                                px-2
                                py-1
                                text-right
                                font-semibold
                                leading-tight
                                text-red-700
                                bg-red-100
                                rounded-full
                                dark:bg-red-700 dark:text-red-100
                              "
                              >Delete</span
                            >
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { UserService } from "@/service/UserService";
import { timeKeepingService } from "@/service/timeKeepingService";
import Header from "@/components/Header.vue";
import SideBar from "@/components/SideBar.vue";
import RequestPoint from "../components/requestPoint.vue";
import CompoAdminPage from "@/components/CompoAdminPage";
import CompoLeaderPage from "@/components/CompoLeaderPage";
import CompoStaffPage from "@/components/CompoStaffPage";
export default {
  data() {
    return {
      currentUser: {},
      myRequest: {},
    };
  },
  mounted() {
    this.getProfileOfCurrentUser();
    this.getMyRequest();
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
  },
  components: {CompoStaffPage, CompoLeaderPage, CompoAdminPage, RequestPoint},
};
</script>