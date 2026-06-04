// outputNode.js

import { BaseNode } from './BaseNode';

const config = {
  title: 'Output',
  category: 'output',
  headerIcon: '←',
  inputs: [{ id: 'value', label: 'Value' }],
  outputs: [],
  fields: [
    {
      type: 'text',
      label: 'Name',
      key: 'outputName',
      placeholder: 'output_0',
    },
    {
      type: 'select',
      label: 'Type',
      key: 'outputType',
      options: ['Text', 'Image'],
      defaultValue: 'Text',
    },
  ],
};

export const OutputNode = (props) => <BaseNode {...props} config={config} />;
