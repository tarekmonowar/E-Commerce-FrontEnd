import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

interface PriceRangeSliderProps {
  min: number;
  max: number;
  minValue: number;
  maxValue: number;
  onChange: (min: number, max: number) => void;
}

const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({
  min,
  max,
  minValue,
  maxValue,
  onChange,
}) => {
  const onSliderChange = (values: number | number[]) => {
    if (Array.isArray(values)) {
      onChange(values[0], values[1]);
    }
  };

  return (
    <div className="px-2">
      <Slider
        range
        min={min}
        max={max}
        allowCross={false}
        value={[minValue, maxValue]}
        onChange={onSliderChange}
        trackStyle={[{ backgroundColor: "#51b12b", height: 7 }]}
        railStyle={{ backgroundColor: "#ccc", height: 7 }}
        handleStyle={[
          {
            borderColor: "#51b12b",
            backgroundColor: "white",
            cursor: "pointer",
            height: 24,
            width: 24,
            marginTop: -9,
          },
          {
            borderColor: "#51b12b",
            backgroundColor: "white",
            cursor: "pointer",
            height: 24,
            width: 24,
            marginTop: -9,
          },
        ]}
      />
      <div className="flex justify-between text-sm text-gray-600 mt-1">
        <span>From: {minValue.toLocaleString()} $</span>
        <span>To: {maxValue.toLocaleString()} $</span>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
