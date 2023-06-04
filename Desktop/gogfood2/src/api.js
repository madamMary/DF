class Api {
    constructor(token) {
        this.path = "https://api.react-lqarning.ru/";
        this.token = token;
    }
    getProduct() {
        return fetch(`${this.path}/product`, {
            headers: {
                "Authorization": `Bearer ${this.token}`
            }
        }).then(res => res.json())
    }
}

export default Api;


