export enum books_type {
    bd = "bd",
    roman = "roman",
    manga = "manga",
}

export interface books {
    name: string;
    type?: books_type;
    date?: string;
    email?: string;
    url?: string;
}

export interface others {
    Xdrdh?: number;
    books?: books;
}

