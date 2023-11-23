import { HOST_NAME } from "@/constants";

export enum RATING_PATH_NAMES {
    RATING = 'rating'
}

function getRatingByNmId(pathName: RATING_PATH_NAMES, nmid: string) {
    return fetch(`${HOST_NAME}/${pathName}?nmid=${nmid}`, {
        method: "GET",
    })
}

export default getRatingByNmId;

