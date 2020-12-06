<template>
  <div id="app">
    <Header :title="headerText" :user="user" v-if="user"/>
    <Feed :user="user"/>
  </div>
</template>

<script>
  import Header from '@/components/general/Header.vue';
  import Feed from '@/components/Feed.vue';
  import profileService from '@/services/profile.service.js';

  export default {
    name: 'App',
    components: {
      Header,
      Feed
    },
    data : function() {
      return{ 
        user: null,
        headerText: "Domicilios Test"
      }
    },
    created: function(){
      this.getUserInfo();
    },
    methods:{
      getUserInfo: async function(){
        this.user = await profileService.getProfileInfo();
      }
    }
  }
</script>

<style lang="scss">
@import "./scss/styles.scss";
</style>
