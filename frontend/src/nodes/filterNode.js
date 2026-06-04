// filterNode.js

import { BaseNode } from './BaseNode';

const config = {
  title: 'Filter / Condition',
  category: 'utility',
  headerIcon: '⚡',
  inputs: [{ id: 'input', label: 'Input' }],
  outputs: [
    { id: 'true', label: 'True' },
    { id: 'false', label: 'False' },
  ],
  fields: [
    {
      type: 'text',
      label: 'Condition',
      key: 'condition',
      placeholder: 'value > 10',
    },
    {
      type: 'select',
      label: 'Operator',
      key: 'operator',
      options: [
        { value: 'eq', label: '== Equals' },
        { value: 'neq', label: '!= Not Equals' },
        { value: 'gt', label: '> Greater Than' },
        { value: 'lt', label: '< Less Than' },
        { value: 'contains', label: '⊂ Contains' },
        { value: 'custom', label: '✎ Custom Expression' },
      ],
      defaultValue: 'custom',
    },
    {
      type: 'toggle',
      label: 'Case Sensitive',
      key: 'caseSensitive',
      defaultValue: false,
    },
  ],
};

export const FilterNode = (props) => <BaseNode {...props} config={config} />;
