import { PhysicsController } from "../controller/PhysicsController";

export abstract class Level {
    levelName: string;
    levelDescription: string;
    initialized: boolean = false;
    destroyed: boolean = false;

    constructor(name: string, description: string) {
        this.levelName = name;
        this.levelDescription = description;
    }
    abstract createLevel(controller: PhysicsController): void;
    abstract destroyLevel(): void;
}
