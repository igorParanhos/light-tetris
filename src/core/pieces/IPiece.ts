import { Bodies, Body } from "matter-js";

export const IPiece = (x: number, y: number, color: string, options?: any) => {
  const obj = Body.create({
    parts: [
      Bodies.rectangle(x, y, 40, 40, { render: { fillStyle: color } }),
      Bodies.rectangle(x, y + 40, 40, 40, {
        render: { fillStyle: color },
      }),
      Bodies.rectangle(x, y + 80, 40, 40, {
        render: { fillStyle: color },
      }),
      Bodies.rectangle(x, y + 120, 40, 40, {
        render: { fillStyle: color },
      }),
    ],
    ...options,
  });

  return obj;
};
