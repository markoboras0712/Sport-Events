<template>
  <div>
    <p>{{user}}</p>
  </div>
</template>


<script>
export default {
  computed:{
    user(){
      console.log(this.$store.getters.user);
      return this.$store.getters.user;
    }
  }
}
</script>