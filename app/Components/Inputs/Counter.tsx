"use client";

import React, { FC, useCallback } from "react";

interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

const Counter: FC<CounterProps> = ({ title, subtitle, value, onChange }) => {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const onReduce = useCallback(() => {
    if (value == 1) {
      return;
    }
    onChange(value - 1);
  }, [onChange, value]);

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        <div className="font-light text-grey-600">{subtitle}</div>
        <div className="flex flex-row items-center gap-4">
          <div onClick={onReduce}></div>
        </div>
      </div>
    </div>
  );
};

export default Counter;
