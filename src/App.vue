<template>
  <div>
    <Header/>
    <SideBar/>
    <router-view></router-view>
  </div>
</template>

<script>



import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
export default {
  name: 'App',
  components:{
    SideBar,
    Header

},
}
</script>

<style>

</style>
