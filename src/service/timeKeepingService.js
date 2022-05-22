import { Axios } from "./Axios";


function getTimeKeeping() {
    return Axios.get('timekeeping');
}

function patchTimeKeeping(payload, value) {
    return Axios.patch(`timekeeping/change-status?status=${value}`, payload);
}

function getMyRequest() {
    return Axios.get('timekeeping/my-request');
}

function deleteTimeKeeping(id) {
    return Axios.delete(`timekeeping/${id}`);
}

export const timeKeepingService = {
    getTimeKeeping,
    patchTimeKeeping,
    getMyRequest,
    deleteTimeKeeping
}