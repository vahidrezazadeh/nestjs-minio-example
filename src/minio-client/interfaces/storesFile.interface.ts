import { HasFile } from "./hasFile.interface";
import { StoredFileMetadata } from "./storedFileMetadata.interface";

export interface StoredFile extends HasFile, StoredFileMetadata { }
