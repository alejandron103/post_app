<template>
	<article class="post box-shadow">
		<UserContent :content="post"/>
		<div class="post__info">
			<div class="buttons-container">
				<button class="btn-tranparent" v-on:click="toggleReacting">Reaccionar</button>
				<button class="btn-tranparent" v-on:click="addNewComment">Comentar</button>
				<Reactions v-if="isReacting" :reactions="post.reactions" @user-reaction="userReaction($event)"/>
			</div>
			<section class="user-activity">
				<div class="user-activity__reactions reactions">
					<span class="reactions__good" v-if="post.reactions.good > 0">good</span>
					<span class="reactions__bad" v-if="post.reactions.bad > 0">bad</span>
					<span class="reactions__acceptable" v-if="post.reactions.acceptable > 0">acceptable</span>
					<p class="reactions-number">{{ reactionsNumber > 0 ? reactionsNumber : reactionsNumber + ' Reacciones' }}</p>
				</div>
				<p class="comments-number">{{ commentsNumber }} {{ commentsNumber > 1 ? 'comentarios': 'comentario'}}</p>
			</section>
		</div>
		<section class="post__comments">
			<UserContent 
			v-for="comment in comments" 
			:key="comment.comment_id" 
			:content="comment" 
			rowDirection="true"/>
			<h3 class="empty-comments" v-if="commentsNumber == 0">¡Se el primero en comentar esta publicación!</h3>
			<textarea 
			name="comment-content" 
			id="comment-content"
			v-model="commentContent"
			placeholder="Escribe un comentario"
			rows="2"
			v-on:keyup.enter="addNewComment"
				>
			</textarea>
			<Error 
				class="comment-error" 
				textError="El comentario debe tener contenido." 
				:show="commentEmpty"/>
		</section>
	</article>
</template>

<script>
  import Reactions from "@/components/Post/Reactions.vue";
  import UserContent from "@/components/Post/UserContent.vue";
  import Error from '@/components/general/Error.vue';

  export default {
    name: 'Post',
    components: {
      Reactions,
      UserContent,
      Error
    },
    props: {post: null},
    data: function(){
      return{
        reactionsNumber: 0,
        isReacting: false,
        commentsNumber: 0,
        comments: null,
        commentContent: null,
        commentId: 2, 
        user: null,
        commentEmpty: false
      }
    },
    mounted: function(){
      this.setUser();
      this.setReactionsNumber();
      this.setCommentsNumber();
      this.setPostComments();
    },
    methods: {
      userReaction: function(event){
        this.post.reactions = event;
        this.setReactionsNumber();
        this.isReacting = false;

      },
      setUser: function(){
        this.user = this.post.user;
      },
      setReactionsNumber: function(){
        this.reactionsNumber = this.post.reactions.good + this.post.reactions.bad + this.post.reactions.acceptable;
      },
      toggleReacting: function(){
        this.isReacting = !this.isReacting;
      },
      setPostComments: function(){
        this.comments = this.post.comments;
      },
      setCommentsNumber: function(){
        this.commentsNumber = this.post.comments.length;
      },
      addNewComment: function(){
        if(!this.commentContent){
          this.commentEmpty = true;
        } else{
          const newComment = {
            content: this.commentContent,
            comment_id: this.commentId,
            posted_at: new Date(),
            user: {...this.user},
          };
          this.comments.push(newComment);
          this.commentId += 1; 
          this.commentContent = null;
          this.setCommentsNumber();
          this.commentEmpty = false;
        }
      }
    }
  }
</script>