import {Axios} from "./Axios";

function postStaff(payload){
    return Axios.post('timekeeping',payload);
}

export const staffService = {
    postStaff
};