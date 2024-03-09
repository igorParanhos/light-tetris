import { Bodies, Body } from "matter-js";

export const JPiece = (x: number, y: number, color: string, options?: any) => {
  const obj = Body.create({
    parts: [
      Bodies.rectangle(x, y, 40, 40, { render: { fillStyle: color } }),
      Bodies.rectangle(x, y + 40, 40, 40, {
        render: { fillStyle: color },
      }),
      Bodies.rectangle(x, y + 80, 40, 40, {
        render: { fillStyle: color },
      }),
      Bodies.rectangle(x + 40, y + 80, 40, 40, {
        render: { fillStyle: color },
      }),
    ],
    ...options,
  });

  return obj;
};
