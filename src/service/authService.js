import {Axios} from "./Axios";

function doLogin(payload){
    return Axios.post('staffs/login',payload);
}

export const authService = {
    doLogin
};