export interface CardsListRequest {
    cards: Card[];
    cursor: Cursor;
}

export interface Card {
    nmID: number;
    imtID: number;
    nmUUID: string;
    subjectID: number;
    subjectName: string;
    vendorCode: string;
    brand: Brand;
    title: string;
    photos: Photo[];
    dimensions: Dimensions;
    characteristics: Characteristic[];
    sizes: Size[];
    createdAt: Date;
    updatedAt: Date;
    description?: string;
}

export enum Brand {
    Hanster = "HANSTER",
}

export interface Characteristic {
    id: number;
    name: string;
    value: string[] | number;
}

export interface Dimensions {
    length: number;
    width: number;
    height: number;
}

export interface Photo {
    "516x288": string;
    big: string;
    small: string;
}

export interface Size {
    chrtID: number;
    techSize: string;
    wbSize: string;
    skus: string[];
}

export interface Cursor {
    updatedAt: Date;
    nmID: number;
    total: number;
}
