import type { Models } from 'appwrite';

export enum LibrarybooksTypeType {
    "bd" = "bd",
    "roman" = "roman",
    "manga" = "manga",
}

export interface LibrarybooksType {
    name: string;
    type?: LibrarybooksTypeType;
    date?: string;
    email?: string;
    url?: string;
}

export interface LibrarybooksDocument extends LibrarybooksType, Models.Document {
}

export interface LibraryothersType {
    Xdrdh?: number;
    books?: LibrarybooksType;
}

export interface LibraryothersDocument extends LibraryothersType, Models.Document {
    books: LibrarybooksDocument;
}

