import { TPiece, LPiece, IPiece, JPiece, OPiece, SPiece } from "../pieces";
import {
    COLOR_GRAY100,
    COLOR_GRAY200,
    COLOR_GREEN,
    COLOR_GREEN100,
    COLOR_GREEN200,
    COLOR_PURPLE,
    COLOR_RED100,
    COLOR_RED200,
    COLOR_RED300,
} from "./contants";


export const pickRandom = <T>(arr: T[]): T => {
    return arr[Math.floor(Math.random() * arr.length)];
}

export const getRandomColor = () => {
    const colors = [
        // COLOR_CREAM100,
        // COLOR_CREAM200,
        // COLOR_CREAM300,
        COLOR_GREEN100,
        COLOR_GREEN200,
        COLOR_PURPLE,
        COLOR_GREEN,
        COLOR_GRAY100,
        COLOR_GRAY200,
        COLOR_RED100,
        COLOR_RED200,
        COLOR_RED300,
    ];
    return pickRandom(colors);
};

export type Observable = {
    value: number;
    subscribe: (listener: (value: number) => void) => () => void;
    unsubscribe: (listener: (value: number) => void) => void;
};

export const createObservable = <T>(initialValue: T) => {
    let value = initialValue;
    const listeners: ((value: T) => void)[] = [];
    return {
        get value() {
            return value;
        },
        set value(newValue: T) {
            value = newValue;
            listeners.forEach((listener) => listener(value));
        },
        subscribe: (listener: (value: T) => void) => {
            listeners.push(listener);
            return () => {
                const index = listeners.indexOf(listener);
                if (index !== -1) {
                    listeners.splice(index, 1);
                }
            };
        },
        unsubscribe: (listener: (value: T) => void) => {
            const index = listeners.indexOf(listener);
            if (index !== -1) {
                listeners.splice(index, 1);
            }
        },
    };
};

export const clamp = (value: number, min: number, max: number) => {
    return Math.min(Math.max(value, min), max);
};

export const createRandomPiece = (
    x: number,
    y: number,
    color: string,
    options?: any
) => {
    const pieces = [TPiece, LPiece, IPiece, JPiece, OPiece, SPiece];
    return pieces[Math.floor(Math.random() * pieces.length)](
        x,
        y,
        color,
        options
    );
};

export const createLoop = (callback: FrameRequestCallback) => {
    let raf: number;
    const initialTime = performance.now();
    const loop = () => {
        raf = requestAnimationFrame(loop);
        callback(performance.now() - initialTime);
    };
    loop();
    return () => cancelAnimationFrame(raf);
};
