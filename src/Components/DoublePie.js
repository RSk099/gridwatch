import React, { useState } from "react";
import { PieChart, Pie, Sector, Cell } from "recharts";

const renderOuterSector = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy + 150} dy={8} textAnchor="middle" fill="black"></text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={payload.color}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={payload.color}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={payload.color}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={payload.color} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={-20}
        textAnchor={textAnchor}
        fill="#333"
        style={{ fontWeight: "bold" }}
      >{`${payload.name}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`${value} GW`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const DoublePie = ({ innerData, outerData }) => {
  const [activeIndex, setActiveIndex] = useState(
    outerData.findIndex(
      (obj) => obj.value === Math.max(...outerData.map((item) => item.value))
    )
  );

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  return (
    <PieChart width={400} height={400} style={{ width: "100%" }}>
      <Pie data={innerData} dataKey="value" cx="50%" cy="50%" outerRadius={60}>
        {innerData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderOuterSector}
        onMouseEnter={onPieEnter}
        data={outerData}
        dataKey="value"
        cx="50%"
        cy="50%"
        innerRadius={70}
        outerRadius={80}
      />
    </PieChart>
  );
};

export default DoublePie;
