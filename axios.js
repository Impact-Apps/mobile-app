import axios from 'axios'
import AsyncStorage from "@react-native-community/async-storage";


// const interceptors = {
//     responseError: (store, router, error) => {
//         return Promise.reject(error);
//     },
// };

export const axiosInstall = () => {

    // axios.defaults.baseURL = API_CONSTANTS.BASE_URL

    axios.interceptors.request.use( async function (config) {
        console.log('making a request')
        console.log('url: ' + config.url)
        const token = await AsyncStorage.getItem('accessToken')
        // const token = localStorage.getItem('access_token')
        config.headers['Authorization'] = `Bearer ${token}`
        console.log(config.headers)
        return config
    })

    // Add a response interceptor
    axios.interceptors.response.use(function (response) {
        return response
    }, function (error) {
        console.log(error)
        return Promise.reject(error)
    })


};


