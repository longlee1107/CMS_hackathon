import { Axios } from "./Axios";

function getPosition() {
    return Axios.get('positions/allowed-position');
}

export const positionService = {
    getPosition
}