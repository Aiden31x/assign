import { useState } from 'react';
import { Handle, Position } from 'reactflow';

const MIN_WIDTH = 230;
const MIN_HEIGHT = 80;
const CHAR_WIDTH = 8;
const LINE_HEIGHT = 20;
const PADDING = 60;

const extractVariables = (text) => {
  const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
  const vars = new Set();
  let match;
  while ((match = regex.exec(text)) !== null) vars.add(match[1]);
  return Array.from(vars);
};

const calcDimensions = (text) => {
  const lines = text.split('\n');
  const longest = Math.max(...lines.map((l) => l.length), 10);
  return {
    width: Math.max(MIN_WIDTH, longest * CHAR_WIDTH + PADDING),
    height: Math.max(MIN_HEIGHT, lines.length * LINE_HEIGHT + PADDING),
  };
};

const getHandlePositions = (count) => {
  if (count === 0) return [];
  if (count === 1) return ['50%'];
  return Array.from({ length: count }, (_, i) =>
    `${((i + 1) / (count + 1)) * 100}%`
  );
};

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || '{{input}}');
  const variables = extractVariables(text);
  const { width, height } = calcDimensions(text);
  const varPositions = getHandlePositions(variables.length);

  return (
    <div style={{
      width,
      minHeight: height,
      background: '#ffffff',
      border: '1px solid #e5e7eb',
      borderRadius: 14,
      boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
      fontFamily: 'Inter, system-ui, sans-serif',
      overflow: 'visible',
      position: 'relative',
    }}>
      {/* Header */}
      <div style={{
        padding: '10px 14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #f3f4f6',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <span style={{ fontSize: 15 }}>📝</span>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#111827', letterSpacing: '-0.01em' }}>Text</span>
        </div>
        <span style={{
          fontSize: 10, fontWeight: 500, color: '#6b7280',
          background: '#f3f4f6', padding: '3px 9px',
          borderRadius: 20, letterSpacing: '0.02em',
        }}>
          Input
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: '10px 14px' }}>
        <label style={{ display: 'block', fontSize: 11, color: '#9ca3af', marginBottom: 3, fontWeight: 500 }}>
          Text
        </label>
        <textarea
          style={{
            width: '100%',
            minHeight: Math.max(56, height - 70),
            padding: '5px 8px',
            fontSize: 12,
            border: '1px solid #e5e7eb',
            borderRadius: 6,
            outline: 'none',
            background: '#f9fafb',
            boxSizing: 'border-box',
            color: '#111827',
            resize: 'none',
            fontFamily: 'inherit',
          }}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type text or use {{variableName}} for dynamic inputs…"
        />

        {variables.length > 0 && (
          <div style={{ marginTop: 6, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {variables.map((v) => (
              <span key={v} style={{ fontSize: 10, color: '#6b7280', fontWeight: 500, paddingLeft: 2 }}>
                ← {v}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Dynamic input handles */}
      {variables.map((varName, i) => (
        <Handle
          key={varName}
          type="target"
          position={Position.Left}
          id={`${id}-${varName}`}
          style={{ top: varPositions[i], background: '#374151', width: 10, height: 10, border: '2px solid #fff' }}
        />
      ))}

      {/* Output handle */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{ background: '#374151', width: 10, height: 10, border: '2px solid #fff' }}
      />
    </div>
  );
};
