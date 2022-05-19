import { Axios } from "./Axios";

function postNewUser(payload) {
    return Axios.post('staffs', payload);
}

function getAllUser() {
    return Axios.get('staffs');
}

export const UserService = {
    postNewUser,
    getAllUser
}