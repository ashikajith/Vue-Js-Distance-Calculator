<template>
  <div>
    <app-header></app-header>
    <user-list></user-list>
    <app-footer></app-footer>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue'
import UserList from './components/UserList'
export default {
  components:{
    'app-header': Header,
    'app-footer': Footer,
    'user-list': UserList
  },
  data () {
    return{
    }
  }
}
</script>

<style>
.container {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}
</style>
