<template>
  <div>
    <!-- Header -->
    <div class="fixed w-full flex items-center justify-between h-14 text-white z-10">
      <div
          class="flex items-center justify-start md:justify-center pl-3 w-14 md:w-64 h-14 bg-blue-800 dark:bg-gray-800 border-none">
        <img class="w-7 h-7 md:w-10 md:h-10 mr-2 rounded-md overflow-hidden"
             src="https://therminic2018.eu/wp-content/uploads/2018/07/dummy-avatar.jpg"/>
        <span class="hidden md:block ">STAFF</span>
      </div>
      <div class="flex justify-between items-center h-14 bg-blue-800 dark:bg-gray-800 header-right">
        <div class="bg-white rounded flex items-center w-full max-w-xl mr-4 p-2 shadow-sm border border-gray-200">
          <button class="outline-none focus:outline-none">
            <svg class="w-5 text-gray-600 h-5 cursor-pointer" fill="none" stroke-linecap="round"
                 stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>
          <input type="search" name="" id="" placeholder="Search"
                 class="w-full pl-3 text-sm text-black outline-none focus:outline-none bg-transparent"/>
        </div>
        <ul class="flex items-center">
          <li>
            <a href="#"
                 class="relative flex flex-row items-center h-11 focus:outline-none hover:text-blue-300 dark:hover:text-blue-300 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6">
                <span class="inline-flex justify-center items-center ml-4">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                       xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round"
                                                                stroke-width="2"
                                                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                </span>
                <span class="ml-2 text-sm tracking-wide truncate">Salary</span>
              </a>
          </li>
          <li>
            <div class="block w-px h-6 mx-3 bg-gray-400 dark:bg-gray-700"></div>
          </li>
          <router-link to="/profile">
            <li>
              <a href="#"
                 class="relative flex flex-row items-center h-11 focus:outline-none hover:text-blue-300 dark:hover:text-blue-300 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6">
                <span class="inline-flex justify-center items-center ml-4">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                       xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round"
                                                                stroke-width="2"
                                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                </span>
                <span class="ml-2 text-sm tracking-wide truncate">Profile</span>
              </a>
            </li>
          </router-link>
          <li>
            <div class="block w-px h-6 mx-3 bg-gray-400 dark:bg-gray-700"></div>
          </li>
          <router-link to="/">
            <li>
              <a href="#" class="flex items-center mr-4 hover:text-blue-100" @click="logout">
                <span class="inline-flex mr-1">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                       xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round"
                                                                stroke-width="2"
                                                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                </span>
                Logout
              </a>
            </li>
          </router-link>
        </ul>
      </div>
    </div>
    <!-- ./Header -->
  
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem('token');
    }
  }
}
</script>

<style scoped src="../assets/css/pageAdmin.css">
</style>
