// llmNode.js

import { BaseNode } from './BaseNode';

const config = {
  title: 'LLM',
  category: 'process',
  headerIcon: '🤖',
  inputs: [
    { id: 'system', label: 'System' },
    { id: 'prompt', label: 'Prompt' },
  ],
  outputs: [{ id: 'response', label: 'Response' }],
  fields: [
    {
      type: 'select',
      label: 'Model',
      key: 'model',
      options: ['gpt-4o', 'gpt-4-turbo', 'gpt-3.5-turbo', 'claude-3-opus', 'claude-3-sonnet'],
      defaultValue: 'gpt-4o',
    },
    {
      type: 'number',
      label: 'Temperature',
      key: 'temperature',
      placeholder: '0.7',
      min: 0,
      max: 2,
      defaultValue: '0.7',
    },
  ],
};

export const LLMNode = (props) => <BaseNode {...props} config={config} />;
