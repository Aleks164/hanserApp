import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { SalesCountByDateType } from ".";

type DiagramStateTypeParams = {
  salesByDate: SalesCountByDateType;
  diagramType: string;
};

function Diagram({ salesByDate = [], diagramType }: DiagramStateTypeParams) {
  return (
    <>
      <ResponsiveContainer width="80%" height="100%">
        <LineChart
          // width={500}
          // height={300}
          data={salesByDate}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          {/* <XAxis dataKey="category" /> */}
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey={diagramType}
            name={diagramType}
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}

export default Diagram;
