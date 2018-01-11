<template>
  <footer>
    <p> {{footer}}  </p>
  </footer>
</template>

<script>
export default {
  data () {
    return{
      footer: 'Copyright 2018'
    }
  }
}
</script>

<style scoped>
  footer{
    background: #333;
    padding: 3px;
  }
p{
  color: white;
  text-align: center;
}
</style>
