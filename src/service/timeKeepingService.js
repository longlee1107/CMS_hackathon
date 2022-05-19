import { Axios } from "./Axios";


function getTimeKeeping() {
    return Axios.get('timekeeping');
}

export const UserService = {
    getTimeKeeping
}