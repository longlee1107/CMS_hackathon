<template>

  <div>
    <CompoStaffPage/>
    <div x-data="setup()">
      <div
          class=" min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white">
        <div class="h-full w-5/6 mx-auto mt-14 mb-10">
          <div class="bg-white pb-4 px-4 rounded-md w-full">
            <div class="flex justify-between w-full pt-6 mt-5">
              <h1 class="text-2xl">Salary table</h1>
            </div>

            <div>
              <select class="dark:text-black" v-model="value">
                <option disabled value="">Please select one</option>
                <option class="dark:text-black" value="1">1</option>
                <option class="dark:text-black" value="2">2</option>
                <option class="dark:text-black" value="3">3</option>
                <option class="dark:text-black" value="4">4</option>
                <option class="dark:text-black" value="5">5</option>
                <option class="dark:text-black" value="6">6</option>
                <option class="dark:text-black" value="7">7</option>
                <option class="dark:text-black" value="8">8</option>
                <option class="dark:text-black" value="9">9</option>
                <option class="dark:text-black" value="10">10</option>
                <option class="dark:text-black" value="11">11</option>
                <option class="dark:text-black" value="12">12</option>
              </select>
            </div>
            <div class="w-full flex justify-end px-2 mt-2">
              <div class="w-full sm:w-64 inline-block relative "></div>
            </div>
            <div class="overflow-x-auto mt-6" >
              <table class="table-auto border-collapse w-full" v-for="(item,index) in salary" :key="index">
                <thead>
                <tr class="rounded-lg text-sm font-medium text-gray-700 text-left" style="font-size: 0.9674rem">
                  <th class="px-4 py-2 bg-gray-200 " style="background-color:#f8f8f8">Ngày trong tháng</th>
                  <th class="px-4 py-2 " style="background-color:#f8f8f8">Tổng ngày</th>
                  <th class="px-4 py-2 " style="background-color:#f8f8f8">Tổng thời gian</th>
                  <th class="px-4 py-2 " style="background-color:#f8f8f8">Lương</th>
                </tr>
                </thead>
                <tbody class="text-sm font-normal text-gray-700" >
                <tr class="hover:bg-gray-100 border-b border-gray-200 py-10">
                  <td class="px-4 py-4">Số ngày đi muộn</td>
                  <td class="px-4 py-4">0</td>
                  <td class="px-4 py-4">0</td>
                  <td class="px-4 py-4">$858</td>
                </tr>
                <tr class="hover:bg-gray-100 border-b border-gray-200 py-4">
                  <td class="px-4 py-4 flex items-center">
                    Số ngày nghỉ
                  </td>
                  <td class="px-4 py-4">0</td>
                  <td class="px-4 py-4">0</td>
                  <td class="px-4 py-4">$112</td>
                </tr>
                <tr class="hover:bg-gray-100 border-b border-gray-200">
                  <td class="px-4 py-4">Số ngày làm việc</td>
                  <td class="px-4 py-4">26 ngày</td>
                  <td class="px-4 py-4">26 ngày</td>
                  <td class="px-4 py-4">$1268</td>
                </tr>
                <tr class="hover:bg-gray-100 border-b border-gray-200">
                  <td class="px-4 py-4">Số ngày OT</td>
                  <td class="px-4 py-4">0</td>
                  <td class="px-4 py-4">0</td>
                  <td class="px-4 py-4">$1,280</td>
                </tr>
                </tbody>

                <tr class="rounded-lg text-sm font-medium text-gray-700 text-left" style="font-size: 0.9674rem">
                  <th class="px-4 py-2 bg-gray-200 " style="background-color:#f8f8f8">Total Salary</th>
                  <th class="px-4 py-2 " style="background-color:#f8f8f8"></th>
                  <th class="px-4 py-2 " style="background-color:#f8f8f8"></th>
                  <th class="px-4 py-2 " style="background-color:#f8f8f8">$6000</th>
                </tr>

              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CompoStaffPage from "@/components/CompoStaffPage";
import {authService} from "@/service/authService";
import {staffService} from "@/service/staffService";
import {UserService} from "@/service/UserService";

export default {
  data() {
    return {
      currentUser: '',
      salary: [],
      value: '',
    }
  },
  name: "StaffSalary",
  components: {CompoStaffPage},

  methods: {
    async staffSalary() {
      try {
        const res = await staffService.salaryStaff(5);
        this.salary = res.data.data;
        console.log(this.salary)
      } catch (e) {
        console.log(e)
      }
    },
  },
  mounted() {
    this.staffSalary();
  }
}
</script>

<style scoped>

</style>