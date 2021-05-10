<template>
<div>
  {{linkSlike}}
</div>
</template>


<script>
export default {
  computed:{
    linkSlike(){
      return this.$store.getters.uploadedImage;
    }
  }
}
</script>