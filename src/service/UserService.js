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

function updateProfileOfUser(id) {
    return Axios.put(`staffs/${id}`);
}

function deleteUserById(id) {
    return Axios.del(`staffs/${id}`);
}

export const UserService = {
    postNewUser,
    getAllUser,
    getUserProfileById,
    getProfileOfCurrentUser,
    updateProfileOfUser,
    deleteUserById
}