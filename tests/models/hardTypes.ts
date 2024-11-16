import type { Models } from 'appwrite';

export type Email = `${string}@${string}.${string}`;

export type URL = `${string}://${string}.${string}`;

export enum BooksTypeType {
    "bd" = "bd",
    "roman" = "roman",
    "manga" = "manga",
}

export interface BooksType {
    name: string;
    type?: BooksTypeType;
    date?: Date;
    email?: Email;
    url?: URL;
}

export interface BooksDocument extends BooksType, Models.Document {
}

export interface OthersBooksType {
    Xdrdh?: number;
    books?: BooksType;
    stringArray?: string[];
}

export interface OthersBooksDocument extends OthersBooksType, Models.Document {
    books: BooksDocument;
}

