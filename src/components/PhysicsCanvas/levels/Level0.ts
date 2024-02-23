import { PhysicsController } from "../PhysicsController";
import { Level } from "./Level";

export class Level0 extends Level {
    createLevel(controller: PhysicsController): void {
        // this.createBall(100, 100, 20, 0, 0);
        console.log(controller)
    }
    destroyLevel(): void {
        
    }
}