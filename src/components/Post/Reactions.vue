<template>
	<section class="reactions box-shadow">
		<span class="reactions__good" v-on:click="addReaction('good')">good</span>
		<span class="reactions__bad" v-on:click="addReaction('bad')">bad</span>
		<span class="reactions__acceptable" v-on:click="addReaction('acceptable')">acceptable</span>
	</section>
</template>

<script>
  export default {
    name: 'Reactions',
    props: { reactions: null },
    emits: ['user-reaction'],
    methods:{
      addReaction: function(reactionType){
        switch (reactionType) {
        case "good":
          this.reactions.good += 1;
          break;
        case "bad":
          this.reactions.bad += 1;
          break;
        case "acceptable":
          this.reactions.acceptable += 1;
          break;
        }
        this.$emit('user-reaction', this.reactions)
      }
    }
  }
</script>