<template>
  <div class="feed">
    <CreatePostForm @add-post="addPost($event)"></CreatePostForm>
    <section v-if="hasPosts">
     <Post  v-for="post in posts" :post="post" :key="post.id"/>      
    </section>
    <h3 v-if="!hasPosts">Sé el primero en publicar.</h3>
  </div>
</template>

<script>
  import CreatePostForm from '@/components/CreatePostForm.vue';
  import Post from '@/components/Post/Post.vue';
  import postService from '@/services/post.service.js';

  export default{
    name: 'Feed',
    props: {user: null},
    components: {
      CreatePostForm,
      Post
    },
    data: function(){
      return{
        newPost: null,
        posts: null,
        postId: 1,
        hasPosts: false
      }
    },
    created: function(){
      this.getUserPosts();
    },
    methods:{
      getUserPosts: async function(){
        this.posts = await postService.getPosts();
        this.setHasPosts();
      },
      addPost: function(event){
        this.newPost = {
          content: event,
          post_id: this.postId ++,
          posted_at: new Date(),
          user: {...this.user},
          reactions: {
            good: 0,
            acceptable: 0,
            bad: 0    
          },
          comments: []
        }
        this.posts.push(this.newPost);
        this.setHasPosts();
      },
      setHasPosts:function(){
        this.hasPosts = this.posts.length > 0;
      }
    }
  }
</script>