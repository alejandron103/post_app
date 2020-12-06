<template>
	<form
	class="box-shadow"
	id="app"
	@submit="checkForm"
	method="post">
		<div class="form-field">
			<label for="post-content" hidden>Escribe aquí tu estado</label>
			<textarea 
				name="post-content" 
				id="post-content"
				v-model="postContent"
				placeholder="Escribe aquí tu estado"
				rows="2"
				>
			</textarea>
		</div>
		<Error textError="Por favor ingresa un contenido para la publicación" :show="hasError" />
		<div class="submit-container">
			<button class="btn-green" type="submit">Publicar</button>			
		</div>
	</form>
</template>

<script>
  import Error from '@/components/general/Error.vue';
  export default {
    name: 'CreatePostForm',
    components: { Error },
    emits: ['add-post'],
    data: function(){
      return {
        postContent: null,
        hasError: false
      }
    },
    methods: {
      checkForm: function(e){
        e.preventDefault();
        if(!this.postContent){
          this.hasError = true;
        }
        else{
          this.$emit('add-post', this.postContent);
          this.postContent = null;        	
        }
      }
    }
  }
</script>