// mathNode.js

import { BaseNode } from './BaseNode';

const config = {
  title: 'Math',
  category: 'utility',
  headerIcon: '∑',
  inputs: [
    { id: 'a', label: 'A' },
    { id: 'b', label: 'B' },
  ],
  outputs: [{ id: 'result', label: 'Result' }],
  fields: [
    {
      type: 'select',
      label: 'Operation',
      key: 'operation',
      options: [
        { value: 'add', label: '+ Add' },
        { value: 'subtract', label: '− Subtract' },
        { value: 'multiply', label: '× Multiply' },
        { value: 'divide', label: '÷ Divide' },
        { value: 'modulo', label: '% Modulo' },
        { value: 'power', label: '^ Power' },
      ],
      defaultValue: 'add',
    },
    {
      type: 'number',
      label: 'Constant (optional override for B)',
      key: 'constant',
      placeholder: 'e.g. 2',
    },
  ],
};

export const MathNode = (props) => <BaseNode {...props} config={config} />;
