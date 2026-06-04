// mergeNode.js

import { BaseNode } from './BaseNode';

const config = {
  title: 'Merge',
  category: 'utility',
  headerIcon: '⇒',
  inputs: [
    { id: 'a', label: 'A' },
    { id: 'b', label: 'B' },
    { id: 'c', label: 'C' },
    { id: 'd', label: 'D' },
  ],
  outputs: [{ id: 'merged', label: 'Merged' }],
  fields: [
    {
      type: 'select',
      label: 'Strategy',
      key: 'strategy',
      options: [
        { value: 'concat', label: 'Concatenate' },
        { value: 'json', label: 'JSON Object' },
        { value: 'array', label: 'Array' },
        { value: 'first', label: 'First Non-Empty' },
      ],
      defaultValue: 'concat',
    },
    {
      type: 'text',
      label: 'Separator (for Concatenate)',
      key: 'separator',
      placeholder: ', ',
    },
  ],
};

export const MergeNode = (props) => <BaseNode {...props} config={config} />;
