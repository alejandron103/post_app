<template>
	<header class="header">
		<span class="header__title title">{{title}}</span>
    <div class="header__right">
      <span class="header__username">Hola! {{user.name}}</span>  
    </div>
    <div class="header__right-mobile header__username" v-on:click="toggleShowUsernameMobile">
      <span class="icon-menu">menu</span>
      <span class="username-mobile box-shadow" v-if="showUsernameMobile">Hola! {{user.name}}</span>  
    </div>
	</header>
</template>

<script>
  export default {
    name: 'Header',
    props: {
      title: String,
      user: null
    },
    data: function(){
      return { showUsernameMobile: false }
    },
    methods:{
      toggleShowUsernameMobile: function(){
        this.showUsernameMobile = !this.showUsernameMobile;
      }
    }
  }
</script>