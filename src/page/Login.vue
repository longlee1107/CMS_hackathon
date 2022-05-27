<template>
  <div class="font-sans">
    <div class="relative min-h-screen flex flex-col sm:justify-center items-center bg-gray-100 ">
      <div class="relative sm:max-w-sm w-full">
        <div class="card bg-blue-400 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"></div>
        <div class="card bg-red-400 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"></div>
        <div class="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md">
          <label class="block mt-3 text-2xl text-gray-700 text-center font-semibold">
            Login
          </label>
          <form method="" action="" class="mt-10" @submit.prevent="_login()">

            <div>
              <input type="text" v-model="user.username" placeholder="Username"
                     class="mt-1 pl-3 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0">
              <p class="error font-semibold text-red-600">{{ err.username }} </p>
            </div>

            <div class="mt-7">
              <input type="password" v-model="user.password" placeholder="Password"
                     class="mt-1 pl-3 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0">
              <p class="error font-semibold text-red-600">{{ err.password }}</p>
            </div>

            <div class="mt-7 flex">
              <label for="remember_me" class="inline-flex items-center w-full cursor-pointer">
                <input id="remember_me" type="checkbox"
                       class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                       name="remember">
                <span class="ml-2 text-sm text-gray-600">
                  Remember me
                </span>
              </label>
            </div>

            <div class="mt-7">
              <button
                  type="submit"
                  class="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
import {authService} from "../service/authService";
import Vue from 'vue'
import CxltToastr from 'cxlt-vue2-toastr'
Vue.use(CxltToastr)
import 'cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css'
export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
        position: '',
      },
      err: {
        username: '',
        password: '',
      },
      countErr: 0,
    }
  },
  methods: {
    Validate() {
      // if (!this.user.username) {
      //   this.err.username = "username is required.";
      //   this.countErr++;
      // } else if (!/\S+@\S+\.\S+/.test(this.user.username)) {
      //   this.countErr++;
      //   this.err.username = "username is invalid.";
      // } else {
      //   this.err.username = "";
      // }
      // if (!this.user.password) {
      //   this.err.password = "Password is required.";
      //   this.countErr++;
      // } else {
      //   this.err.password = "";
      // }
      // if (this.countErr > 0) {
      //   this.countErr = 0;
      //   return false;
      // }
      this.countErr = 0;
      return true;
    },
    async _login(e) {
      const isValid = this.Validate();
      if (!isValid) {
        return;
      }
      try {
        const response = await authService.doLogin({
          username: this.user.username,
          password: this.user.password,
        })
        const data = response.data.data;
        console.log(data)
        localStorage.setItem('token', data.token);
        this.$toast.success({
          title:'Login Success',
          message:'Login Success',
          position: 'top right',
          showDuration: 2000,
          hideMethod:'bounce',
          showMethod:'bounce',
        })
        if (data.authorities[0] === "ADMINISTRATOR") {
          this.$router.push({name: 'admin'});
        } else if (data.authorities[0] === "LEADER") {
          this.$router.push({name: 'leader'});
        } else if (data.authorities[0] === "STAFF") {
          this.$router.push({name: 'staff'});
        }
      } catch (e) {
        console.log(e);
        this.$toast.error({
          title:'Login Failed',
          message:'Login Failed',
          position: 'top right',
          showDuration: 2000,
          hideMethod:'bounce',
          showMethod:'bounce',
        })
      }
    },
  },
}
</script>

<style scoped>

</style>