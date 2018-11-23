export class Item {
    id: number;
    name: string;
    nameStyle: string;
    description: string;
    image: string;
    available: boolean;
    selected: boolean;

    constructor() {
        this.selected = false;
    }
}