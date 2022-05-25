<template>
  <div>
    <CompoStaffPage />
    <!-- Profile Card -->
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
        <div class="h-full w-5/6 mx-auto mt-14 mb-10">
          <div
            class="
              md:grid
              grid-cols-4 grid-rows-2
              bg-white
              gap-2
              p-4
              mt-5
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { UserService } from "@/service/UserService";
import { timeKeepingService } from "@/service/timeKeepingService";
import CompoStaffPage from "@/components/CompoStaffPage.vue";
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
      console.log('myRequest', this.myRequest);
    },
  },
  components: { CompoStaffPage },
};
</script>