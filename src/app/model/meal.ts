
import { Step } from './step';

export class Meal {
    codebar: number;
    name: string;
    nameStyle: string;
    price: number;
    description: string;
    image: string;
    available: boolean;
    deal: boolean;
    steps: Step[];
}