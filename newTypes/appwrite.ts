import type { Models } from 'appwrite';

export enum BooksTypeType {
    "bd" = "bd",
    "roman" = "roman",
    "manga" = "manga",
}

export interface BooksType {
    name: string;
    type?: BooksTypeType;
    date?: string;
    email?: string;
    url?: string;
}

export interface BooksDocument extends BooksType, Models.Document {
}

export interface OthersType {
    Xdrdh?: number;
    books?: BooksType;
}

export interface OthersDocument extends OthersType, Models.Document {
    books: BooksDocument;
}

