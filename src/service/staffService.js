import {Axios} from "./Axios";

function postStaff(payload){
    return Axios.post('timekeeping',payload);
}

function salaryStaff(payload){
    return Axios.post(`salary/all/${payload}`);
}

export const staffService = {
    postStaff,
    salaryStaff
};