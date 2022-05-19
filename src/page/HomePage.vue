<template>
  <div>
    <div>Home Page</div>
    <input type="text" v-model="msg">
    <button @click="handleClick">Click</button>
    {{alt}}
    {{ler}}
    <Header />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
export default {
    name: "HomePage",
    components: { Header },
    data() {
      return {
        msg: '',
        alt:'',
        ler:''
      };
      },
      methods:{
        handleClick(){
          this.alt = this.msg;
          this.ler = "re"
        }
      }
}
</script>

<style scoped>

</style>