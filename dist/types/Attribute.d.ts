export type Attribute = {
    key: string;
    type: string;
    status: string;
    required: boolean;
    array: boolean;
    default: string | number | boolean;
    min?: number;
    max?: number;
    format?: string;
    elements?: Array<string>;
    size?: number;
    relatedCollection?: string;
};
