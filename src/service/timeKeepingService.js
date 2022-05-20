import { Axios } from "./Axios";


function getTimeKeeping() {
    return Axios.get('timekeeping');
}

function patchTimeKeeping(id, value) {
    return Axios.patch(`timekeeping/change-status/${id}?status=${value}`);
}

export const timeKeepingService = {
    getTimeKeeping,
    patchTimeKeeping
}