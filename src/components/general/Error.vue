<template>
	<p class="error" v-if="show">{{ textError }}</p>
</template>

<script>
  export default{
    name: 'Error',
    props: { 
      textError: String,
      show: null
    }
  }
</script>