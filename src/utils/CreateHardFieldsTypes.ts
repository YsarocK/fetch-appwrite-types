import type { WriteStream } from "fs";
import { create, DeclarationFlags, emit } from "dts-dom";

const CreateHardFieldsTypes = async (writeStream: WriteStream) => {
  const types = [
    create.alias('Email', create.namedTypeReference('`${string}@${string}.${string}`')),
    create.alias('URL', create.namedTypeReference('`${string}://${string}.${string}`'))
  ];

  for (const type of types) {
    type.flags = DeclarationFlags.Export;
    await new Promise<void>((resolve) => {
      writeStream.write(emit(type), () => resolve());
    });
  }
};

export default CreateHardFieldsTypes;

