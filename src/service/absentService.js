import { Axios } from "./Axios";

function getDayOff() {
    return Axios.get('day-offs');
}

function patchDayOff(payload, value) {
    return Axios.patch(`day-offs/change-status?status=${value}`, payload);
}

function getMyDayOff() {
    return Axios.get('day-offs/my-request');
}

function deleteDayOff(id) {
    return Axios.delete(`day-offs/${id}`);
}

function getAllDayOffByStaffId(id) {
    return Axios.get(`day-offs/all-request/${id}`);
}

function getDayOffByDate(timeIn, timeOut) {
    return Axios.get(`day-offs/get-request-by-date/${timeIn}/${timeOut}`);
}

function postDayOff(payload) {
    return Axios.post('day-offs', payload);
}

export const absentService = {
    getDayOff,
    patchDayOff,
    getMyDayOff,
    deleteDayOff,
    getAllDayOffByStaffId,
    getDayOffByDate,
    postDayOff
}