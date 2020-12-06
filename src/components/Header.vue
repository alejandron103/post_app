<template>
	<header class="header">
		<span class="header__title title">{{title}}</span>
		<span class="header__username">Hola! {{user.name}}</span>
	</header>
</template>

<script>
  export default {
    name: 'Header',
    props: {
      title: String,
      user: null
    },
   
  }
</script>