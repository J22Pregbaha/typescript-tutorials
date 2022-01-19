import { PutUserDto } from "./put.user.dto";

// The Partial feature creates a new type by copying another type
// and making all it's fields optional.
export interface PatchUserDto extends Partial<PutUserDto> {}