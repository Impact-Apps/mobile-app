import axios from 'axios'
import AsyncStorage from "@react-native-community/async-storage";

export const axiosInstall = () => {

    // axios.defaults.baseURL = API_CONSTANTS.BASE_URL

    axios.interceptors.request.use( async function (config) {
        const token = await AsyncStorage.getItem('accessToken')
        config.headers['Authorization'] = `Bearer ${token}`
        return config
    })

    axios.interceptors.response.use(function (response) {
        return response
    }, function (error) {
        console.log(error)
        return Promise.reject(error)
    })


};


