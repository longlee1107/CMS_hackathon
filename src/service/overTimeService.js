import { Axios } from "./Axios";

function getOT() {
    return Axios.get('ots');
}

function patchOT(payload, value) {
    return Axios.patch(`ots/change-status?status=${value}`, payload);
}

function getMyOT() {
    return Axios.get('ots/my-request');
}

function deleteOT(id) {
    return Axios.delete(`ots/${id}`);
}

function getAllOTByStaffId(id) {
    return Axios.get(`ots/all-request/${id}`);
}

function getOTByDate(date) {
    return Axios.get(`ots/get-request-by-date/${date}`);
}

function postOT(payload) {
    return Axios.post('ots', payload);
}

export const positionService = {
    getOT,
    patchOT,
    getMyOT,
    deleteOT,
    getAllOTByStaffId,
    getOTByDate,
    postOT
}