class postService {

	constructor(){}

	getPosts(){
		return fetch('mocks/posts.json')
        .then(response=> response.json())
        .then(data=> data);
	}
}

export default new postService();