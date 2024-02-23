import { PhysicsController } from "../PhysicsController";

export abstract class Level {
    levelName: string;
    levelDescription: string;

    constructor(name: string, description: string) {
        this.levelName = name;
        this.levelDescription = description;
    }
    abstract createLevel(controller: PhysicsController): void;
    abstract destroyLevel(): void;
}