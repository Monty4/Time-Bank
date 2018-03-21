import api from 'api-client'
api.port=5000
api.host='localhost'
api.protocol='http'

let api_client;

(function () {

    //const baseUrl = 'https://sheltered-stream-44715.herokuapp.com'

    api_client = {
        
        getList(){
            return  api.list().then(data => data.data)
        },

        getUser(id){
            return api.retrieve(id).then(data => data.data)
        },

        // register(name, surname, username, password, city, borrough, email){
        //     return api.register(name, surname, username, password, city, borrough, email).then(data => data.data)
        // }

        getServices(){
            return api.services().then(data => data.data)
        }
    }
})()

export default api_client