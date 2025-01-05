'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { IndicatorSelector } from './indicator-selector'
import { RelationshipBuilder } from './relationship-builder'
import { StrategyPreview } from './strategy-preview'
import { StrategyChart } from './strategy-chart'
import { KeyStatistics } from './key-statistics'

export interface Indicator {
  id: string;
  name: string;
  value: number;
  operator: 'greater' | 'equal' | 'smaller';
}

export interface Relationship {
  id: string;
  indicator1: string;
  indicator2: string;
  logicalOperator: 'and' | 'or' | 'xor';
}

export interface OHLCData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

// Mock OHLC data
const mockOHLCData: OHLCData[] = [
  { date: '2023-01-01', open: 100, high: 105, low: 98, close: 103 },
  { date: '2023-01-02', open: 103, high: 107, low: 101, close: 105 },
  { date: '2023-01-03', open: 105, high: 108, low: 102, close: 106 },
  { date: '2023-01-04', open: 106, high: 110, low: 104, close: 109 },
  { date: '2023-01-05', open: 109, high: 112, low: 107, close: 111 },
  { date: '2023-01-06', open: 111, high: 115, low: 110, close: 114 },
  { date: '2023-01-07', open: 114, high: 118, low: 112, close: 116 },
  { date: '2023-01-08', open: 116, high: 120, low: 115, close: 119 },
  { date: '2023-01-09', open: 119, high: 122, low: 117, close: 121 },
  { date: '2023-01-10', open: 121, high: 125, low: 120, close: 124 },
]

export default function StrategyBuilder() {
  const [indicators, setIndicators] = useState<Indicator[]>([])
  const [relationships, setRelationships] = useState<Relationship[]>([])

  const handleAddIndicator = (indicator: Indicator) => {
    setIndicators([...indicators, indicator])
  }

  const handleAddRelationship = (relationship: Relationship) => {
    setRelationships([...relationships, relationship])
  }

  return (
    <div className="container mx-auto p-4 flex">
      <div className="w-1/2 pr-4">
        <h1 className="text-2xl font-bold mb-4">Algorithmic Trading Strategy Builder</h1>
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Add Indicator</CardTitle>
          </CardHeader>
          <CardContent>
            <IndicatorSelector onAddIndicator={handleAddIndicator} />
          </CardContent>
        </Card>
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Define Relationships</CardTitle>
          </CardHeader>
          <CardContent>
            <RelationshipBuilder
              indicators={indicators}
              onAddRelationship={handleAddRelationship}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Strategy Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <StrategyPreview
              indicators={indicators}
              relationships={relationships}
            />
          </CardContent>
        </Card>
      </div>
      <div className="w-1/2 pl-4">
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Strategy Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <StrategyChart 
              ohlcData={mockOHLCData}
              indicators={indicators}
              relationships={relationships}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Key Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <KeyStatistics />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

