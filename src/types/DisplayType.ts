import * as Default from "../components/template/Default.vue";

export const DEFAULT_COMPONENT = Default;

export class DisplayType {
    constructor() {}

    get displayComponent() {
        return Default;
    }

    toString(): string {
        return "DisplayType -> Not allowed to be used directly";
    }

    getAttributes(): object {
        return {};
    }
}
