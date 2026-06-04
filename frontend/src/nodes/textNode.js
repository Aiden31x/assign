// textNode.js
// Extends BaseNode with dynamic variable handle detection (Part 3)

import { useState, useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';
import { BaseNode } from './BaseNode';

const MIN_WIDTH = 220;
const MIN_HEIGHT = 80;
const CHAR_WIDTH = 8;
const LINE_HEIGHT = 20;
const PADDING = 60;

// Extract valid JS variable names from {{varName}} patterns
const extractVariables = (text) => {
  const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
  const vars = new Set();
  let match;
  while ((match = regex.exec(text)) !== null) {
    vars.add(match[1]);
  }
  return Array.from(vars);
};

// Calculate node dimensions based on text content
const calcDimensions = (text) => {
  const lines = text.split('\n');
  const longestLine = Math.max(...lines.map((l) => l.length), 10);
  const width = Math.max(MIN_WIDTH, longestLine * CHAR_WIDTH + PADDING);
  const height = Math.max(MIN_HEIGHT, lines.length * LINE_HEIGHT + PADDING);
  return { width, height };
};

const HEADER_COLOR = '#e08a3c';
const RING_COLOR = '#c06a1e';

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
    <div
      style={{
        width,
        minHeight: height,
        background: '#fff',
        border: `1.5px solid ${RING_COLOR}`,
        borderRadius: 10,
        boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
        fontFamily: 'Inter, system-ui, sans-serif',
        overflow: 'visible',
        position: 'relative',
      }}
    >
      {/* Header */}
      <div
        style={{
          background: HEADER_COLOR,
          borderRadius: '8px 8px 0 0',
          padding: '7px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        <span style={{ fontSize: 14 }}>📝</span>
        <span
          style={{
            color: '#fff',
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: '0.01em',
          }}
        >
          Text
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: '10px 12px' }}>
        <label
          style={{
            display: 'block',
            fontSize: 11,
            color: '#6b7280',
            marginBottom: 2,
            fontWeight: 500,
          }}
        >
          Text
        </label>
        <textarea
          style={{
            width: '100%',
            minHeight: Math.max(56, height - 70),
            padding: '4px 6px',
            fontSize: 12,
            border: '1px solid #d1d5db',
            borderRadius: 4,
            outline: 'none',
            background: '#fff',
            boxSizing: 'border-box',
            color: '#1f2937',
            resize: 'none',
            fontFamily: 'inherit',
          }}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type text or use {{variableName}} for dynamic inputs…"
        />

        {/* Variable handle labels */}
        {variables.length > 0 && (
          <div style={{ marginTop: 6, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {variables.map((v) => (
              <span
                key={v}
                style={{
                  fontSize: 10,
                  color: RING_COLOR,
                  fontWeight: 600,
                  paddingLeft: 2,
                }}
              >
                ← {v}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Dynamic input handles for each {{variable}} */}
      {variables.map((varName, i) => (
        <Handle
          key={varName}
          type="target"
          position={Position.Left}
          id={`${id}-${varName}`}
          style={{
            top: varPositions[i],
            background: RING_COLOR,
            width: 10,
            height: 10,
          }}
        />
      ))}

      {/* Output handle */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{ background: RING_COLOR, width: 10, height: 10 }}
      />
    </div>
  );
};
