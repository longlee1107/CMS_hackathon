import {Axios} from "./Axios";

function doLogin(payload){
    return Axios.post('staffs/login',payload);
}

function takeOff(payload){
    return Axios.post('/day-offs',payload);
}

function lateForWork(payload){
    return Axios.post('/timeLate',payload);
}

function paging(payload){
    return Axios.get(`/staffs?page=${payload}&size=10`);
}

export const authService = {
    doLogin,
    takeOff,
    lateForWork,
    paging
};