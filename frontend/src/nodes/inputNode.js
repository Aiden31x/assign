// inputNode.js

import { BaseNode } from './BaseNode';

const config = {
  title: 'Input',
  category: 'input',
  headerIcon: '→',
  inputs: [],
  outputs: [{ id: 'value', label: 'Value' }],
  fields: [
    {
      type: 'text',
      label: 'Name',
      key: 'inputName',
      placeholder: 'input_0',
    },
    {
      type: 'select',
      label: 'Type',
      key: 'inputType',
      options: ['Text', 'File'],
      defaultValue: 'Text',
    },
  ],
};

export const InputNode = (props) => <BaseNode {...props} config={config} />;
