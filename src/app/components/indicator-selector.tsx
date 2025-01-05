'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Indicator } from './strategy-builder'

const INDICATORS = [
  'Simple Moving Average (SMA)',
  'Exponential Moving Average (EMA)',
  'Relative Strength Index (RSI)',
  'Moving Average Convergence Divergence (MACD)',
  'Bollinger Bands',
  'Stochastic Oscillator'
]

const OPERATORS = [
  { value: 'greater', label: 'Greater than' },
  { value: 'equal', label: 'Equal to' },
  { value: 'smaller', label: 'Smaller than' },
]

interface IndicatorSelectorProps {
  onAddIndicator: (indicator: Indicator) => void;
}

export function IndicatorSelector({ onAddIndicator }: IndicatorSelectorProps) {
  const [selectedIndicator, setSelectedIndicator] = useState('')
  const [indicatorValue, setIndicatorValue] = useState('')
  const [selectedOperator, setSelectedOperator] = useState<Indicator['operator']>('greater')

  const handleAddIndicator = () => {
    if (selectedIndicator && indicatorValue && selectedOperator) {
      onAddIndicator({
        id: Date.now().toString(),
        name: selectedIndicator,
        value: parseFloat(indicatorValue),
        operator: selectedOperator
      })
      setSelectedIndicator('')
      setIndicatorValue('')
      setSelectedOperator('greater')
    }
  }

  return (
    <div className="flex flex-col space-y-2">
      <Select value={selectedIndicator} onValueChange={setSelectedIndicator}>
        <SelectTrigger>
          <SelectValue placeholder="Select Indicator" />
        </SelectTrigger>
        <SelectContent>
          {INDICATORS.map((indicator) => (
            <SelectItem key={indicator} value={indicator}>
              {indicator}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={selectedOperator} onValueChange={(value: Indicator['operator']) => setSelectedOperator(value)}>
        <SelectTrigger>
          <SelectValue placeholder="Operator" />
        </SelectTrigger>
        <SelectContent>
          {OPERATORS.map((op) => (
            <SelectItem key={op.value} value={op.value}>
              {op.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        type="number"
        placeholder="Critical Value"
        value={indicatorValue}
        onChange={(e) => setIndicatorValue(e.target.value)}
      />
      <Button onClick={handleAddIndicator}>Add Indicator</Button>
    </div>
  )
}

