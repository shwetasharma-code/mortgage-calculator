/* eslint-disable  @typescript-eslint/no-explicit-any */
export class SelectItem {
    label!: string;
    value!: any;
    /**
     *
     */
    constructor(item: any) {
        if (item) {
            this.label = item.label || '';
            this.value = item.value || '';
        }
    }
}