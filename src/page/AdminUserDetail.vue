<template>
  <div>
    <CompoAdminPage />
    <!-- Profile Card -->
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
                    {{ this.user.staffName }}
                  </span>
                </span>
                <span
                  class="text-sm font-bold uppercase border-2 rounded-l px-4 py-2 bg-gray-50 whitespace-no-wrap w-2/6 mr-2"
                  >Birthday::
                  <span
                    class="px-4 font-normal border-l-0 cursor-default border-gray-300 focus:outline-none rounded-md rounded-l-none shadow-sm -ml-1 w-4/6"
                  >
                    {{ this.user.birthday }}
                  </span>
                </span>
                <div>
                  <button
                    class="px-4 py-2 mr-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-3xl dark:bg-green-700 dark:text-green-100"
                    @click="showModalUser()"
                  >
                    Update
                  </button>
                  <button
                    v-if="this.user.position != 'ADMINISTRATOR'"
                    class="px-4 py-2 mr-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-3xl dark:bg-red-700 dark:text-red-100"
                    @click="deleteUserById()"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div class="fixed z-40 text-black">
                <UpdateUserInfomation v-show="showModal" @close="closeModalUser">
                  <template v-slot:body>
                    <div class="w-96 h-full p-4">
                      <form @submit.prevent class="">
                        <div class="grid grid-cols-1">
                          <label for="" class="font-bold">Name</label>
                          <input
                            type="text"
                            v-model="staffName"
                            class="px-3 border-2 border-sky-400 bg-blue-200 h-8 rounded-2xl"
                          />
                          <label for="" class="font-bold">Email</label>
                          <input
                            type="text"
                            v-model="email"
                            class="px-3 border-2 border-sky-400 bg-blue-200 h-8 rounded-2xl"
                          />
                          <label for="" class="font-bold">Password</label>
                          <input
                            type="password"
                            v-model="password"
                            class="px-3 border-2 border-sky-400 bg-blue-200 h-8 rounded-2xl"
                          />
                          <label for="" class="font-bold">Position</label>
                          <div
                            class="flex"
                            v-for="pos in listPosition"
                            :key="pos.positionId"
                          >
                            <div class="">
                              <input
                                type="radio"
                                :value="pos.positionName"
                                v-model="position"
                                class="px-3 border-2 border-sky-400 bg-blue-200 h-8 rounded-2xl"
                              />
                              <span class="font-bold">{{ pos.positionName }}</span>
                            </div>
                          </div>
                          <label
                            class="block text-gray-600 text-sm font-bold mb-2"
                            for="birthday"
                            >Birthday</label
                          >
                          <div class="flex w-full">
                            <v-date-picker v-model="birthday" class="flex-grow">
                              <template v-slot="{ inputValue, inputEvents }">
                                <input
                                  id="date"
                                  class="bg-white text-gray-700 w-full py-2 px-3 appearance-none border rounded-3xl focus:outline-none"
                                  :class="{ 'border-red-600': errorMessage }"
                                  :value="inputValue"
                                  v-on="inputEvents"
                                />
                              </template>
                            </v-date-picker>
                          </div>
                          <p class="text-red-600 text-xs italic mt-1" v-if="errorMessage">
                            {{ errorMessage }}
                          </p>
                          <p class="text-blue-500 text-xs font-bold mt-1" v-else>
                            We got it. Thanks!
                          </p>
                          <label for="" class="font-bold">Salary</label>
                          <div>
                            <input
                              class="w-3/4 px-3 border-2 border-sky-400 bg-blue-200 h-8 rounded-2xl"
                              type="number"
                              v-model="salary"
                            /><span>/1 month</span>
                          </div>
                        </div>
                      </form>
                    </div>
                  </template>
                  <template v-slot:footer>
                    <div>
                      <button
                        class="ml-36 mt-3 px-4 py-2 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100"
                        @click="UpdateUserbyId()"
                      >
                        Update
                      </button>
                    </div>
                  </template>
                </UpdateUserInfomation>
              </div>
              <div class="flex">
                <span
                  class="text-sm font-bold uppercase border-2 rounded-l px-4 py-2 bg-gray-50 whitespace-no-wrap w-2/6 mr-2"
                  >Email:
                  <span
                    class="px-4 font-normal border-l-0 cursor-default border-gray-300 focus:outline-none rounded-md rounded-l-none shadow-sm -ml-1 w-4/6"
                  >
                    {{ this.user.email }}
                  </span>
                </span>
                <span
                  class="text-sm font-bold uppercase border-2 rounded-l px-4 py-2 bg-gray-50 whitespace-no-wrap w-2/6"
                  >Manage by:
                  <span
                    class="px-4 font-normal border-l-0 cursor-default border-gray-300 focus:outline-none rounded-md rounded-l-none shadow-sm -ml-1 w-4/6"
                  >
                    {{ this.user.manager }}
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
                    {{ this.user.position }}
                  </span>
                </span>
                <span
                  class="text-sm font-bold uppercase border-2 rounded-l px-4 py-2 bg-gray-50 whitespace-no-wrap w-2/6"
                  >Created at:
                  <span
                    class="px-4 font-normal border-l-0 cursor-default border-gray-300 focus:outline-none rounded-md rounded-l-none shadow-sm -ml-1 w-4/6"
                  >
                    {{ this.user.createdAt | formatDate }}
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { UserService } from "@/service/UserService";
import { timeKeepingService } from "@/service/timeKeepingService";
import { positionService } from "@/service/positionService";
import CompoAdminPage from "@/components/CompoAdminPage.vue";
import UpdateUserInfomation from "./UpdateUserInfomation.vue";
export default {
  data() {
    return {
      staffId: "",
      showModal: false,
      staffName: "",
      position: [],
      email: "",
      password: "",
      birthday: "",
      avatar: "",
      manager: 1,
      salary: 0,
      user: {},
      updateUser: {},
      listPosition: [],
    };
  },
  mounted() {
    this.getProfileById();
    this.getPosition();
  },
  computed: {
    errorMessage() {
      if (!this.inputValue) return "Date is required.";
      return "";
    },
  },
  methods: {
    showModalUser() {
      this.showModal = true;
      this.staffName = this.user.staffName;
      this.email = this.user.email;
      this.position = this.user.position;
      this.birthday = this.user.birthday;
      this.salary = this.user.salary;
    },
    closeModalUser() {
      this.showModal = false;
    },
    async getProfileById() {
      try {
        this.staffId = this.$route.params.id;
        const resp = await UserService.getUserProfileById(this.staffId);
        this.user = resp.data.data;
      } catch (error) {
        console.log("error", error);
      }
    },
    
    async deleteUserById() {
      try {
        this.staffId = this.$route.params.id;
        await UserService.deleteUserById(this.staffId);
        alert("Delete User Success!");
        this.$router.push("/admin");
      } catch (error) {
        console.log("error", error);
      }
    },
    async UpdateUserbyId() {
      try {
        this.staffId = this.$route.params.id;
        this.updateUser = {
          staffName: this.staffName,
          email: this.email,
          password: this.password,
          birthday: this.birthday,
          salary: this.salary,
          position: this.listPosition.find((item) => item.positionName == this.position).positionId,
        };
        await UserService.updateProfileOfUser(this.staffId, this.updateUser);
        alert("Update User Success!");
        this.showModal = false;
        this.getProfileById();
      } catch (error) {
        console.log("error", error);
      }
    },
    async getPosition() {
      try {
        const dataRes = await positionService.getPosition();
        this.listPosition = dataRes.data.data;
        
      } catch (error) {
        console.log("error", error);
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
  },
  components: { CompoAdminPage, UpdateUserInfomation },
};
</script>
