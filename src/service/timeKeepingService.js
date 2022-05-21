import { Axios } from "./Axios";


function getTimeKeeping() {
    return Axios.get('timekeeping');
}

function patchTimeKeeping(payload, value) {
    return Axios.patch(`timekeeping/change-status?status=${value}`, payload);
}

export const timeKeepingService = {
    getTimeKeeping,
    patchTimeKeeping
}