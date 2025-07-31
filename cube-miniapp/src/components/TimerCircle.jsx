// src/components/TimerCircle.jsx
import React from 'react';

export default function TimerCircle({ progress, width, height }) {
  const strokeWidth = 20;
  const maxWidth = width - strokeWidth;
  const maxHeight = height - strokeWidth;
  const radius = 15; // радиус скругления углов

  // Максимальная длина прогресс-бара — длина периметра (без скругления для упрощения)
  const perimeter = 2 * (maxWidth + maxHeight);

  // Прогресс (0-100%) в длину штриха (strokeDashoffset)
  const offset = perimeter - (progress / 100) * perimeter;

  return (
    <svg width={width} height={height} style={{ position: 'absolute', top: 0, left: 0 }}>
      {/* Фоновый прямоугольник */}
      <rect
        x={strokeWidth / 2}
        y={strokeWidth / 2}
        width={maxWidth}
        height={maxHeight}
        rx={radius}
        ry={radius}
        fill="none"
        stroke="#ddd"
        strokeWidth={strokeWidth}
      />
      {/* Прогресс прямоугольника */}
      <rect
        x={strokeWidth / 2}
        y={strokeWidth / 2}
        width={maxWidth}
        height={maxHeight}
        rx={radius}
        ry={radius}
        fill="none"
        stroke="#003366"
        strokeWidth={strokeWidth}
        strokeDasharray={perimeter}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 1s linear' }}
      />
    </svg>
  );
}
