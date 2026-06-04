// apiCallNode.js

import { BaseNode } from './BaseNode';

const config = {
  title: 'API Call',
  category: 'process',
  headerIcon: '🌐',
  inputs: [{ id: 'body', label: 'Body' }],
  outputs: [
    { id: 'response', label: 'Response' },
    { id: 'error', label: 'Error' },
  ],
  fields: [
    {
      type: 'text',
      label: 'URL',
      key: 'url',
      placeholder: 'https://api.example.com/endpoint',
    },
    {
      type: 'select',
      label: 'Method',
      key: 'method',
      options: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
      defaultValue: 'GET',
    },
    {
      type: 'text',
      label: 'Headers (JSON)',
      key: 'headers',
      placeholder: '{"Authorization": "Bearer ..."}',
    },
  ],
};

export const ApiCallNode = (props) => <BaseNode {...props} config={config} />;
