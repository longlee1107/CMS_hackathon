<template>
  <div>
    <CompoLeaderPage/>
    <div x-data="setup()" class="">
      <div
          class="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white">

        <div class="h-full ml-14 mt-14 mb-10 md:ml-64">

          <!-- Statistics Cards -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4 gap-4">
            <div
                class="bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
              <div
                  class="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                     class="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <div class="text-right">
                <p class="text-2xl">{{this.users.length}}</p>
                <p>Users</p>
              </div>
            </div>
            <div
                class="bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
              <div
                  class="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                     class="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                </svg>
              </div>
              <div class="text-right">
                <p class="text-2xl">557</p>
                <p>Orders</p>
              </div>
            </div>
            <div
                class="bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
              <div
                  class="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                     class="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
              <div class="text-right">
                <p class="text-2xl">$11,257</p>
                <p>Sales</p>
              </div>
            </div>
            <div
                class="bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
              <div
                  class="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                     class="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div class="text-right">
                <p class="text-2xl">$75,257</p>
                <p>Balances</p>
              </div>
            </div>
          </div>
          <!-- ./Statistics Cards -->

          <div class="grid grid-cols-1 lg:grid-cols-2 p-4 gap-4">
          </div>
          <div class="flex justify-end mx-8">
            <button
                class="px-2.5 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100"
                @click="showModalUser()">Add new user
            </button>
          </div>
          <!-- add user modal -->
          <div class="fixed z-40 text-black">
            <AddUserModal v-show="showModal" @close="closeModalUser">
              <template v-slot:body>
                <div class="w-96 h-full p-4">
                  <form @submit.prevent class="">
                    <div class="grid grid-cols-1">
                      <label for="" class="font-bold">Name</label>
                      <input type="text" v-model="staffName" class="px-3 border-2 border-sky-400 bg-blue-200 h-8 rounded-2xl">
                      <label for="" class="font-bold">Email</label>
                      <input type="text" v-model="email" class="px-3 border-2 border-sky-400 bg-blue-200 h-8 rounded-2xl">
                      <label for="" class="font-bold">Password</label>
                      <input type="password" v-model="password" class="px-3 border-2 border-sky-400 bg-blue-200 h-8 rounded-2xl">
                      <label for="" class="font-bold">Position</label>
                      <div class="grid grid-cols-2">
                        <div class="">
                          <input type="radio" value="4" v-model="position" class="px-3 border-2 border-sky-400 bg-blue-200 h-8 rounded-2xl">
                          <span class="font-bold">Staff</span>
                        </div>
                      </div>
                      <label class="block text-gray-600 text-sm font-bold mb-2" for="birthday">Select Date</label>
                      <div class="flex w-full">
                        <v-date-picker v-model="birthday" class="flex-grow">
                          <template v-slot="{ inputValue, inputEvents }">
                            <input id="date" class="bg-white text-gray-700 w-full py-2 px-3 appearance-none border rounded-3xl focus:outline-none" :class="{ 'border-red-600': errorMessage }" :value="inputValue" v-on="inputEvents" />
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
                        <input class="w-3/4 px-3 border-2 border-sky-400 bg-blue-200 h-8 rounded-2xl" type="number" v-model="salary"><span>/1 month</span>
                      </div>
                    </div>
                  </form>
                </div>
              </template>
              <template v-slot:footer>
                <div class="">
                  <button class="ml-36 mt-3 px-4 py-2 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100" @click="submitAddUser()">Add</button>
                </div>
              </template>
            </AddUserModal>
          </div>
          <!-- ./add user modal -->
          <!-- Client Table -->
          <div class="mt-4 mx-4" v-if="this.users.length > 0">
            <div class="w-full overflow-hidden rounded-lg shadow-xs">
              <div class="w-full overflow-x-auto">
                <table class="w-full">
                  <thead>
                  <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                    <th class="px-4 py-3 w-1 ">Number</th>
                    <th class="px-4 py-3">Name</th>
                    <th class="px-4 py-3">Roll</th>
                    <th class="px-4 py-3">Status</th>
                    <th class="px-4 py-3">Profile</th>
                  </tr>
                  </thead>
                  <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">

                  <tr v-for="user in users" :key="user.staffId"
                      class="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                    <td class="px-4 py-3">
                      <p class="text-center">{{ user.staffId }}</p>
                    </td>
                    <td class="px-4 py-3">
                      <div class="flex items-center text-sm">
                        <div class="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                          <img class="object-cover w-full h-full rounded-full"
                               src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=200&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                               alt="" loading="lazy"/>
                          <div class="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                        </div>
                        <div>
                          <p class="font-semibold">{{ user.staffName }}</p>
                          <p class="text-xs text-gray-600 dark:text-gray-400">10x Developer</p>
                        </div>
                      </div>
                    </td>
                    <td class="px-4 py-3 text-sm ">{{ user.position }}</td>
                    <td class="px-4 py-3 text-xs ">
                      <span
                          class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100"> Online </span>
                    </td>
                    <td class="px-4 py-3 text-sm">
                      <button
                          class="px-2 py-1 mr-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                        <router-link :to="{name:'detail', params:{id: user.staffId}}">Detail</router-link>
                      </button>

                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <div
                  class="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
                <span class="flex items-center col-span-3"> Showing {{this.users.length}} of 100 </span>
                <span class="col-span-2"></span>
                <!-- Pagination -->
                <span class="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
                <nav aria-label="Table navigation">
                  <ul class="inline-flex items-center">
                    <li>
                      <button class="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                              aria-label="Previous">
                        <svg aria-hidden="true" class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path
                              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                              clip-rule="evenodd" fill-rule="evenodd"></path>
                        </svg>
                      </button>
                    </li>
                    <li>
                      <button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">1</button>
                    </li>
                    <li>
                      <button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">2</button>
                    </li>
                    <li>
                      <button
                          class="px-3 py-1 text-white dark:text-gray-800 transition-colors duration-150 bg-blue-600 dark:bg-gray-100 border border-r-0 border-blue-600 dark:border-gray-100 rounded-md focus:outline-none focus:shadow-outline-purple">3</button>
                    </li>
                    <li>
                      <button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">4</button>
                    </li>
                    <li>
                      <span class="px-3 py-1">...</span>
                    </li>
                    <li>
                      <button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">8</button>
                    </li>
                    <li>
                      <button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">9</button>
                    </li>
                    <li>
                      <button class="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                              aria-label="Next">
                        <svg class="w-4 h-4 fill-current" aria-hidden="true" viewBox="0 0 20 20">
                          <path
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clip-rule="evenodd" fill-rule="evenodd"></path>
                        </svg>
                      </button>
                    </li>
                  </ul>
                </nav>
              </span>
              </div>
            </div>
          </div>
          <div class="italic text-center" v-else>
            Unavailable
          </div>
          <!-- ./Client Table -->
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import AddUserModal from "@/components/AddUserModal.vue";
import { UserService } from "@/service/UserService";
import CompoLeaderPage from "@/components/CompoLeaderPage";


export default {
  components: {
    CompoLeaderPage,
    AddUserModal,
  },
  data() {
    return {
      showModal: false,
      users: [],
      staffName: "",
      position: [],
      email: "",
      password: "",
      birthday: "",
      avatar: "",
      manager: 1,
      salary: 0,
    };
  },
  mounted() {
    this.showUser();
  },
  computed: {
    errorMessage() {
      if (!this.inputValue) return 'Date is required.';
      return '';
    },
  },
  methods: {
    showModalUser() {
      this.showModal = true;
    },
    closeModalUser() {
      this.showModal = false;
    },
    async submitAddUser() {
      this.staffName = this.staffName.trim();
      this.email = this.email.trim();
      this.password = this.password.trim();

      const user = {
        staffName: this.staffName,
        position: this.position,
        email: this.email,
        password: this.password,
        birthday: this.birthday,
        manager:this.manager,
        avatar: this.avatar,
        salary: this.salary,
      };
      console.log(this.user);
      await UserService.postNewUser(user);
      this.showUser();
      this.closeModalUser();
    },
    async showUser() {
      try {
        const response = await UserService.getAllUser();
        this.users = response.data.data.content;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped src="../assets/css/pageAdmin.css">
</style>