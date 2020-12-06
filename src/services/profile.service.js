class profileService {

	constructor(){}

	getProfileInfo(){
		return fetch('mocks/user.json')
        .then(response=> response.json())
        .then(data=> data);
	}
}

export default new profileService();