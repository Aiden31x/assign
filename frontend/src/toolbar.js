// toolbar.js

import { DraggableNode } from './draggableNode';

const SECTION_STYLE = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  alignItems: 'center',
};

const DIVIDER_STYLE = {
  width: 1,
  height: 32,
  background: '#e5e7eb',
  margin: '0 4px',
};

const LABEL_STYLE = {
  fontSize: 10,
  fontWeight: 600,
  color: '#9ca3af',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  marginRight: 2,
  alignSelf: 'center',
};

export const PipelineToolbar = () => {
  return (
    <div
      style={{
        padding: '10px 16px',
        background: '#f9fafb',
        borderBottom: '1px solid #e5e7eb',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        flexWrap: 'wrap',
      }}
    >
      <div style={SECTION_STYLE}>
        <span style={LABEL_STYLE}>I/O</span>
        <DraggableNode type='customInput' label='Input' />
        <DraggableNode type='customOutput' label='Output' />
      </div>

      <div style={DIVIDER_STYLE} />

      <div style={SECTION_STYLE}>
        <span style={LABEL_STYLE}>Core</span>
        <DraggableNode type='llm' label='LLM' />
        <DraggableNode type='text' label='Text' />
        <DraggableNode type='apiCall' label='API Call' />
      </div>

      <div style={DIVIDER_STYLE} />

      <div style={SECTION_STYLE}>
        <span style={LABEL_STYLE}>Logic</span>
        <DraggableNode type='filter' label='Filter' />
        <DraggableNode type='math' label='Math' />
        <DraggableNode type='merge' label='Merge' />
      </div>

      <div style={DIVIDER_STYLE} />

      <div style={SECTION_STYLE}>
        <span style={LABEL_STYLE}>Other</span>
        <DraggableNode type='note' label='Note' />
      </div>
    </div>
  );
};
