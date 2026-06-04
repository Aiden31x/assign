// noteNode.js — zero handles, textarea only; edge-case proof of the abstraction

import { BaseNode } from './BaseNode';

const config = {
  title: 'Note / Comment',
  category: 'default',
  headerIcon: '📌',
  inputs: [],
  outputs: [],
  width: 240,
  fields: [
    {
      type: 'textarea',
      label: 'Note',
      key: 'note',
      placeholder: 'Add a comment or description for this part of the pipeline…',
    },
  ],
};

export const NoteNode = (props) => <BaseNode {...props} config={config} />;
