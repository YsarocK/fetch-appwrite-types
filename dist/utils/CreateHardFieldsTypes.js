import { create, DeclarationFlags, emit } from "dts-dom";
const CreateHardFieldsTypes = async (writeStream) => {
    const types = [
        create.alias('Email', create.namedTypeReference('`${string}@${string}.${string}`')),
        create.alias('URL', create.namedTypeReference('`${string}://${string}.${string}`'))
    ];
    for (const type of types) {
        type.flags = DeclarationFlags.Export;
        await new Promise((resolve) => {
            writeStream.write(emit(type), () => resolve());
        });
    }
};
export default CreateHardFieldsTypes;
