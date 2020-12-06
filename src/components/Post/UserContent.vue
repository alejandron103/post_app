<template>
	<article class="user-content">
		<div class="user-content__img">
			<img :src="user.img ? user.img : emptyUserImg" alt="user avatar" v-if="user">			
		</div>
		<div class="user-content__info" :class="{ 'comment': rowDirection }">
			<p class="username" v-if="user">{{rowDirection ? user.name :full_name}}</p>
			<span class="user-content__date">{{postTimeInfo}}</span>
			<p class="user-content__title">{{content.content}}</p>
		</div>
		
	</article>
</template>

<script>
  export default {
    name: 'UserContent',
    props: {
      content:null,
      rowDirection: null
    },
    data: function(){
      return{
        postedTime: null,
        postTimeInfo: "",
        user: null,
        full_name: "",
        emptyUserImg: "https://www.shareicon.net/data/2015/09/14/100950_user_512x512.png"
      }
    },
    mounted: function(){
      this.getPostedTime();
      this.setUserInfo();
    },
    methods: {
      getPostedTime: function(){
        this.setPostedTime();
        setInterval(() => {
          this.setPostedTime();
        }, 60000);
      },
      setPostedTime(){
        const now = new Date(); 
        this.postedTime = Math.round(((now.getTime() - new Date(this.content.posted_at).getTime()) / 60000));
        this.postedTime = Math.round(this.postedTime);
        if(this.postedTime < 60 && this.postedTime !== 0){
          this.postTimeInfo = `Hace ${this.postedTime} minutos`;
        }
        else if(this.postedTime >= 60){
          this.postedTime = Math.round(this.postedTime / 60);
          this.postTimeInfo = `Hace ${this.postedTime} horas`;
          if(this.postedTime >= 24){
            this.postTimeInfo = `Hace ${Math.round(this.postedTime / 24)} días`;
          }
        }
        else if(this.postedTime === 0){
          this.postTimeInfo = "ahora";
        }
      },
      setUserInfo(){
        this.user = this.content.user;
        this.full_name = this.user.name + ' ' + this.user.last_name;
      }
    }
  }
</script>