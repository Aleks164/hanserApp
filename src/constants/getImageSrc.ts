import getHost from "./getImageHost";

export default function getImgSrc(id: number) {
    const vol = ~~(id / 1e5);
    const part = ~~(id / 1e3);
    return `https:${getHost(
        vol
    )}/vol${vol}/part${part}/${id}/images/c516x688/1.webp`;
}