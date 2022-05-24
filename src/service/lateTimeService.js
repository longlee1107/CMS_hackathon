import { Axios } from "./Axios";

function getTimeLate() {
    return Axios.get('timeLate');
}

function patchTimeLate(payload, value) {
    return Axios.patch(`timeLate/change-status?status=${value}`, payload);
}

function getMyTimeLate() {
    return Axios.get('timeLate/my-request');
}

function deleteTimeLate(id) {
    return Axios.delete(`timeLate/${id}`);
}

function getAllTimeLateByStaffId(id) {
    return Axios.get(`timeLate/all-request/${id}`);
}

function getTimeLateByDate(date) {
    return Axios.get(`timeLate/get-request-by-date/${date}`);
}

function postTimeLate(payload) {
    return Axios.post('timeLate', payload);
}

export const lateTimeService = {
    getTimeLate,
    patchTimeLate,
    getMyTimeLate,
    deleteTimeLate,
    getAllTimeLateByStaffId,
    getTimeLateByDate,
    postTimeLate
}