import { Axios } from "./Axios";

function postNewUser(payload) {
    return Axios.post('staffs', payload);
}

function getAllUser() {
    return Axios.get('staffs');
}

function getUserProfileById(id) {
    return Axios.get(`staffs/profile/${id}`);
}

function getProfileOfCurrentUser() {
    return Axios.get('staffs/profile');
}

export const UserService = {
    postNewUser,
    getAllUser,
    getUserProfileById,
    getProfileOfCurrentUser
}