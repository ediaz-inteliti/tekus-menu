import { Item } from './item';
export class Step {
    id: number;
    name: string;
    description: string;
    image: string;
    selectableItems: number;
    available: boolean;
    items: Item[];
    selected: boolean;

    constructor() {
        this.selected = false;
    }
}