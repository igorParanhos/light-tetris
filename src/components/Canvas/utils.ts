export const createCanvas = (canvas: HTMLCanvasElement, options: any = {}): CanvasRenderingContext2D => {
    const context = canvas.getContext("2d");
    canvas.width = options?.width || window.innerWidth;
    canvas.height = options?.height || window.innerHeight;
    return context!;
};

export const clearCanvas = (context: CanvasRenderingContext2D) => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
}

export const createCircle = (
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number = 10,
    color: string = "green"
) => {
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, true);
    context.fillStyle = color;
    context.fill();
};

export const createSquare = (
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number = 10,
    color: string = "blue"
) => {
    context.fillStyle = color;
    context.fillRect(x, y, size, size);
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
}
