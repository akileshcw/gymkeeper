import React, { useEffect, useState } from "react";
import ReactEcharts from "echarts-for-react";
import { Box } from "@mui/system";
const ExpenseChart = () => {
  const [windowSize, setWindowSize] = useState(getWindowSize());
  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  function getWindowSize() {
    if (typeof window !== "undefined") {
      // Your client-side code here
      const innerWidth = window.innerWidth;
      if (innerWidth >= 400) {
        return [50, 210];
      }
      return [30, 160];
    }
  }
  const option = {
    legend: {
      top: "top",
    },
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        name: "Nightingale Chart",
        type: "pie",
        itemStyle: {
          bordeRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        radius: windowSize,
        center: ["45%", "50%"],
        label: {
          show: false,
        },
        roseType: "radius",
        data: [
          { value: 40, name: "rose 1" },
          { value: 38, name: "rose 2" },
          { value: 32, name: "rose 3" },
          { value: 30, name: "rose 4" },
          { value: 28, name: "rose 5" },
          { value: 26, name: "rose 6" },
          { value: 22, name: "rose 7" },
          { value: 18, name: "rose 8" },
        ],
      },
    ],
  };
  return (
    <>
      <Box sx={{ height: 600, overflow: "hidden" }}>
        <ReactEcharts
          option={option}
          style={{
            height: "100%",
            width: "100%",
          }}
        />
      </Box>
    </>
  );
};

export default ExpenseChart;
