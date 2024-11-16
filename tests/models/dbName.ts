import type { Models } from 'appwrite';

export enum LibraryBooksTypeType {
    "bd" = "bd",
    "roman" = "roman",
    "manga" = "manga",
}

export interface LibraryBooksType {
    name: string;
    type?: LibraryBooksTypeType;
    date?: string;
    email?: string;
    url?: string;
}

export interface LibraryBooksDocument extends LibraryBooksType, Models.Document {
}

export interface LibraryOthersBooksType {
    Xdrdh?: number;
    books?: LibraryBooksType;
}

export interface LibraryOthersBooksDocument extends LibraryOthersBooksType, Models.Document {
    books: LibraryBooksDocument;
}

