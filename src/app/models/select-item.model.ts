export class SelectItem {
    label!: string;
    value!: string | number;
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