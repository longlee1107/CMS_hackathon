import {Axios} from "./Axios";

function postStaff(payload){
    return Axios.post('timekeeping',payload);
}

function salaryStaff(payload){
    return Axios.get(`salary/my-salary/${payload}`);
}

export const staffService = {
    postStaff,
    salaryStaff
};