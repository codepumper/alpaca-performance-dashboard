import { Indicator, Relationship } from './strategy-builder'

interface StrategyPreviewProps {
  indicators: Indicator[];
  relationships: Relationship[];
}

export function StrategyPreview({ indicators, relationships }: StrategyPreviewProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">{'Untitled Strategy'}</h3>
      <div className="mb-4">
        <h4 className="font-medium">Indicators:</h4>
        <ul className="list-disc pl-5">
          {indicators.map((indicator) => (
            <li key={indicator.id}>
              {indicator.name} is {indicator.operator} {indicator.value}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="font-medium">Relationships:</h4>
        <ul className="list-disc pl-5">
          {relationships.map((relationship) => (
            <li key={relationship.id}>
              {indicators.find(i => i.id === relationship.indicator1)?.name} {relationship.logicalOperator.toUpperCase()} {indicators.find(i => i.id === relationship.indicator2)?.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

