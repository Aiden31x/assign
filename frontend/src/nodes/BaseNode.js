// BaseNode.js — shared node shell used by all node types

import { useState } from 'react';
import { Handle, Position } from 'reactflow';

const CATEGORY_COLORS = {
  input:   { header: '#4f86c6', ring: '#2e6fad' },
  output:  { header: '#5baa74', ring: '#3d8f5a' },
  process: { header: '#9b72cb', ring: '#7a4faa' },
  utility: { header: '#e08a3c', ring: '#c06a1e' },
  default: { header: '#6b7280', ring: '#4b5563' },
};

const FIELD_LABEL_STYLE = {
  display: 'block',
  fontSize: 11,
  color: '#6b7280',
  marginBottom: 2,
  fontWeight: 500,
  letterSpacing: '0.02em',
};

const FIELD_INPUT_STYLE = {
  width: '100%',
  padding: '4px 6px',
  fontSize: 12,
  border: '1px solid #d1d5db',
  borderRadius: 4,
  outline: 'none',
  background: '#fff',
  boxSizing: 'border-box',
  color: '#1f2937',
};

// Calculates evenly-spaced percentage positions for n handles
const getHandlePositions = (count) => {
  if (count === 1) return ['50%'];
  return Array.from({ length: count }, (_, i) =>
    `${((i + 1) / (count + 1)) * 100}%`
  );
};

const FieldRenderer = ({ field, value, onChange }) => {
  const inputStyle = { ...FIELD_INPUT_STYLE };

  switch (field.type) {
    case 'text':
      return (
        <input
          type="text"
          style={inputStyle}
          value={value ?? field.defaultValue ?? ''}
          placeholder={field.placeholder || ''}
          onChange={(e) => onChange(field.key, e.target.value)}
        />
      );

    case 'number':
      return (
        <input
          type="number"
          style={inputStyle}
          value={value ?? field.defaultValue ?? ''}
          placeholder={field.placeholder || ''}
          min={field.min}
          max={field.max}
          onChange={(e) => onChange(field.key, e.target.value)}
        />
      );

    case 'textarea':
      return (
        <textarea
          style={{ ...inputStyle, resize: 'vertical', minHeight: 56 }}
          value={value ?? field.defaultValue ?? ''}
          placeholder={field.placeholder || ''}
          onChange={(e) => onChange(field.key, e.target.value)}
        />
      );

    case 'select':
      return (
        <select
          style={inputStyle}
          value={value ?? field.defaultValue ?? field.options?.[0] ?? ''}
          onChange={(e) => onChange(field.key, e.target.value)}
        >
          {(field.options || []).map((opt) => {
            const optValue = typeof opt === 'object' ? opt.value : opt;
            const optLabel = typeof opt === 'object' ? opt.label : opt;
            return (
              <option key={optValue} value={optValue}>
                {optLabel}
              </option>
            );
          })}
        </select>
      );

    case 'toggle':
      return (
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
          <div
            onClick={() => onChange(field.key, !value)}
            style={{
              width: 32,
              height: 18,
              borderRadius: 9,
              background: value ? '#4f86c6' : '#d1d5db',
              position: 'relative',
              transition: 'background 0.2s',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 2,
                left: value ? 16 : 2,
                width: 14,
                height: 14,
                borderRadius: '50%',
                background: '#fff',
                transition: 'left 0.2s',
                boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
              }}
            />
          </div>
          <span style={{ fontSize: 12, color: '#374151' }}>
            {value ? 'On' : 'Off'}
          </span>
        </label>
      );

    default:
      return null;
  }
};

export const BaseNode = ({ id, data, config, children }) => {
  const {
    title,
    category = 'default',
    fields = [],
    inputs = [],
    outputs = [],
    width = 220,
    headerIcon,
  } = config;

  // Build initial field state from data prop or defaultValues in config
  const initialFieldState = {};
  fields.forEach((f) => {
    initialFieldState[f.key] = data?.[f.key] ?? f.defaultValue ?? '';
  });

  const [fieldValues, setFieldValues] = useState(initialFieldState);

  const handleFieldChange = (key, value) => {
    setFieldValues((prev) => ({ ...prev, [key]: value }));
  };

  const colors = CATEGORY_COLORS[category] || CATEGORY_COLORS.default;
  const inputPositions = getHandlePositions(inputs.length);
  const outputPositions = getHandlePositions(outputs.length);

  return (
    <div
      style={{
        width,
        background: '#fff',
        border: `1.5px solid ${colors.ring}`,
        borderRadius: 10,
        boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
        fontFamily: 'Inter, system-ui, sans-serif',
        overflow: 'visible',
        minHeight: 60,
      }}
    >
      {/* Header */}
      <div
        style={{
          background: colors.header,
          borderRadius: '8px 8px 0 0',
          padding: '7px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        {headerIcon && <span style={{ fontSize: 14 }}>{headerIcon}</span>}
        <span
          style={{
            color: '#fff',
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: '0.01em',
          }}
        >
          {title}
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {fields.map((field) => (
          <div key={field.key}>
            <label style={FIELD_LABEL_STYLE}>{field.label}</label>
            <FieldRenderer
              field={field}
              value={fieldValues[field.key]}
              onChange={handleFieldChange}
            />
          </div>
        ))}
        {/* Slot for custom children (e.g. TextNode dynamic handles) */}
        {children}
      </div>

      {/* Left handles — inputs (targets) */}
      {inputs.map((handle, i) => (
        <Handle
          key={handle.id}
          type="target"
          position={Position.Left}
          id={`${id}-${handle.id}`}
          style={{ top: inputPositions[i], background: colors.ring, width: 10, height: 10 }}
        />
      ))}

      {/* Right handles — outputs (sources) */}
      {outputs.map((handle, i) => (
        <Handle
          key={handle.id}
          type="source"
          position={Position.Right}
          id={`${id}-${handle.id}`}
          style={{ top: outputPositions[i], background: colors.ring, width: 10, height: 10 }}
        />
      ))}
    </div>
  );
};
