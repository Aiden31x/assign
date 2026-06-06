import { DraggableNode } from './draggableNode';

const DIVIDER = (
  <div style={{ width: 1, height: 28, background: '#e5e7eb', margin: '0 6px' }} />
);

const SECTION_LABEL = (label) => (
  <span style={{
    fontSize: 10, fontWeight: 600, color: '#9ca3af',
    letterSpacing: '0.08em', textTransform: 'uppercase',
    marginRight: 4, alignSelf: 'center',
  }}>
    {label}
  </span>
);

export const PipelineToolbar = () => {
  return (
    <div style={{
      padding: '10px 18px',
      background: '#ffffff',
      borderBottom: '1px solid #e5e7eb',
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      flexWrap: 'wrap',
      flexShrink: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
        {SECTION_LABEL('I/O')}
        <DraggableNode type='customInput' label='Input' />
        <DraggableNode type='customOutput' label='Output' />
      </div>

      {DIVIDER}

      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
        {SECTION_LABEL('Core')}
        <DraggableNode type='llm' label='LLM' />
        <DraggableNode type='text' label='Text' />
        <DraggableNode type='apiCall' label='API Call' />
      </div>

      {DIVIDER}

      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
        {SECTION_LABEL('Logic')}
        <DraggableNode type='filter' label='Filter' />
        <DraggableNode type='math' label='Math' />
        <DraggableNode type='merge' label='Merge' />
      </div>

      {DIVIDER}

      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
        {SECTION_LABEL('Other')}
        <DraggableNode type='note' label='Note' />
      </div>
    </div>
  );
};
