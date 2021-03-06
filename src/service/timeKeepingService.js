import { Axios } from "./Axios";

function getTimeKeeping(payload) {
    return Axios.get(`timekeeping?page=${payload}&size=10`);
}

function patchTimeKeeping(payload, value) {
    return Axios.patch(`timekeeping/change-status?status=${value}`, payload);
}

function getMyRequest() {
    return Axios.get('timekeeping/my-request');
}

function deleteTimeKeeping(payload) {
    return Axios.delete(`timekeeping/deletes`, payload);
}

function getAllRequestByStaffId(id) {
    return Axios.get(`timekeeping/all-request/${id}`);
}

function getRequestByDate(timeIn, timeOut) {
    return Axios.get(`timekeeping/get-request-by-date/${timeIn}/${timeOut}`);
}

function postRequest(payload) {
    return Axios.post('timekeeping', payload);
}

export const timeKeepingService = {
    getTimeKeeping,
    patchTimeKeeping,
    getMyRequest,
    deleteTimeKeeping,
    getAllRequestByStaffId,
    getRequestByDate,
    postRequest
}