import { TypeReference, UnionType, IntersectionType, PrimitiveType, ObjectType, TypeofReference, FunctionType, TypeParameter, ThisType, Type, ArrayTypeReference } from 'dts-dom';
import Email from './types/fields/Email.ts';

// This is a custom type for dts-dom including the Email type
/**
 * 
 * Extends the dts-dom type to include the Email type
*/
declare module "dts-dom-custom" {
  export const type: {
    array(type: Type): ArrayTypeReference;
    stringLiteral(string: string): PrimitiveType;
    numberLiteral(number: number): PrimitiveType;
    string: PrimitiveType;
    number: PrimitiveType;
    boolean: PrimitiveType;
    any: PrimitiveType;
    unknown: PrimitiveType;
    void: PrimitiveType;
    object: PrimitiveType;
    null: PrimitiveType;
    undefined: PrimitiveType;
    true: PrimitiveType;
    false: PrimitiveType;
    this: "this";
    email: Email;
  };
}