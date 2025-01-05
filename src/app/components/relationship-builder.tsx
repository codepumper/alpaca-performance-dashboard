'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Indicator, Relationship } from './strategy-builder'

const LOGICAL_OPERATORS = [
  { value: 'and', label: 'AND' },
  { value: 'or', label: 'OR' },
  { value: 'xor', label: 'XOR' },
]

interface RelationshipBuilderProps {
  indicators: Indicator[];
  onAddRelationship: (relationship: Relationship) => void;
}

export function RelationshipBuilder({ indicators, onAddRelationship }: RelationshipBuilderProps) {
  const [indicator1, setIndicator1] = useState('')
  const [indicator2, setIndicator2] = useState('')
  const [logicalOperator, setLogicalOperator] = useState<Relationship['logicalOperator']>('and')

  const handleAddRelationship = () => {
    if (indicator1 && indicator2 && logicalOperator) {
      onAddRelationship({
        id: Date.now().toString(),
        indicator1,
        indicator2,
        logicalOperator
      })
      setIndicator1('')
      setIndicator2('')
      setLogicalOperator('and')
    }
  }

  return (
    <div className="flex flex-col space-y-2">
      <Select value={indicator1} onValueChange={setIndicator1}>
        <SelectTrigger>
          <SelectValue placeholder="Select Indicator 1" />
        </SelectTrigger>
        <SelectContent>
          {indicators.map((indicator) => (
            <SelectItem key={indicator.id} value={indicator.id}>
              {indicator.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={logicalOperator} onValueChange={(value: Relationship['logicalOperator']) => setLogicalOperator(value)}>
        <SelectTrigger>
          <SelectValue placeholder="Operator" />
        </SelectTrigger>
        <SelectContent>
          {LOGICAL_OPERATORS.map((op) => (
            <SelectItem key={op.value} value={op.value}>
              {op.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={indicator2} onValueChange={setIndicator2}>
        <SelectTrigger>
          <SelectValue placeholder="Select Indicator 2" />
        </SelectTrigger>
        <SelectContent>
          {indicators.map((indicator) => (
            <SelectItem key={indicator.id} value={indicator.id}>
              {indicator.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button onClick={handleAddRelationship}>Add Relationship</Button>
    </div>
  )
}

