import { createWriteStream } from "fs";
import { create, DeclarationFlags, emit } from "dts-dom";
const CreateHardFieldsTypes = (outPath) => {
    const writeStream = createWriteStream(outPath);
    const types = [
        create.alias('Email', create.namedTypeReference('`${string}@${string}.${string}`')),
        create.alias('URL', create.namedTypeReference('`${string}://${string}.${string}`'))
    ];
    types.forEach(type => {
        type.flags = DeclarationFlags.Export;
        writeStream.write(emit(type));
    });
};
export default CreateHardFieldsTypes;
