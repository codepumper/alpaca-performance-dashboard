'use client'

import { useMemo } from 'react'
import { ResponsiveContainer, ComposedChart, XAxis, YAxis, Tooltip, Legend, ReferenceLine, Line, Rectangle } from 'recharts'
import { Indicator, Relationship, OHLCData } from './strategy-builder'

interface StrategyChartProps {
  ohlcData: OHLCData[]
  indicators: Indicator[]
  relationships: Relationship[]
}

const CandlestickSeries = ({ data }: { data: OHLCData[] }) => {
  return data.map((entry, index) => (
    <Rectangle
      key={`candle-${index}`}
      x={index - 0.3}
      y={Math.min(entry.open, entry.close)}
      width={0.6}
      height={Math.abs(entry.open - entry.close)}
      fill={entry.open > entry.close ? 'hsl(0, 100%, 70%)' : 'hsl(120, 100%, 70%)'}
    />
  ))
}

const CandlestickWick = ({ data }: { data: OHLCData[] }) => {
  return data.map((entry, index) => (
    <line
      key={`wick-${index}`}
      x1={index}
      x2={index}
      y1={entry.low}
      y2={entry.high}
      stroke={entry.open > entry.close ? 'hsl(0, 100%, 50%)' : 'hsl(120, 100%, 50%)'}
      strokeWidth={1}
    />
  ))
}

export function StrategyChart({ ohlcData, indicators, relationships }: StrategyChartProps) {
  const chartData = useMemo(() => {
    return ohlcData.map((data, index) => {
      const indicatorValues = indicators.reduce((acc, indicator) => {
        // This is a simplified calculation. In a real scenario, you'd calculate the indicator value based on historical data
        acc[indicator.name] = data.close * (1 + Math.random() * 0.1 - 0.05)
        return acc
      }, {} as Record<string, number>)

      // Simplified signal generation. In a real scenario, this would be based on the actual indicator values and relationships
      const signal = Math.random() > 0.7 ? (Math.random() > 0.5 ? 'buy' : 'sell') : null

      return {
        ...data,
        ...indicatorValues,
        signal,
        index, // Add index for x-axis positioning
      }
    })
  }, [ohlcData, indicators, relationships])

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart data={chartData}>
        <XAxis dataKey="date" />
        <YAxis domain={['auto', 'auto']} />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload;
              return (
                <div className="bg-white p-2 border border-gray-300 rounded shadow">
                  <p>Date: {data.date}</p>
                  <p>Open: {data.open}</p>
                  <p>High: {data.high}</p>
                  <p>Low: {data.low}</p>
                  <p>Close: {data.close}</p>
                  {indicators.map(indicator => (
                    <p key={indicator.id}>{indicator.name}: {data[indicator.name].toFixed(2)}</p>
                  ))}
                </div>
              );
            }
            return null;
          }}
        />
        <Legend />
        <CandlestickSeries data={chartData} />
        <CandlestickWick data={chartData} />
        {indicators.map((indicator, index) => (
          <Line 
            key={indicator.id} 
            type="monotone" 
            dataKey={indicator.name} 
            stroke={`hsl(${index * 30 + 180}, 70%, 50%)`} 
            dot={false}
          />
        ))}
        {chartData.map((data, index) => {
          if (data.signal === 'buy') {
            return <ReferenceLine key={`buy-${index}`} x={index} stroke="hsl(120, 100%, 50%)" />
          } else if (data.signal === 'sell') {
            return <ReferenceLine key={`sell-${index}`} x={index} stroke="hsl(0, 100%, 50%)" />
          }
          return null
        })}
      </ComposedChart>
    </ResponsiveContainer>
  )
}

