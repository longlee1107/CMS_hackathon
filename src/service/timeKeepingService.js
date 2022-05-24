import { Axios } from "./Axios";


function getTimeKeeping() {
    return Axios.get('timekeeping');
}

function postTimeKeeping(payload) {
    return Axios.put('timekeeping/change-status/${id}', payload);
}

export const timeKeepingService = {
    getTimeKeeping,
    postTimeKeeping
}