import { useState } from 'react';
import { Handle, Position } from 'reactflow';

const CATEGORY_LABELS = {
  input:   'Input',
  output:  'Output',
  process: 'Process',
  utility: 'Utility',
  default: null,
};

const getHandlePositions = (count) => {
  if (count === 1) return ['50%'];
  return Array.from({ length: count }, (_, i) =>
    `${((i + 1) / (count + 1)) * 100}%`
  );
};

const fieldStyle = {
  width: '100%',
  padding: '5px 8px',
  fontSize: 12,
  border: '1px solid #e5e7eb',
  borderRadius: 6,
  outline: 'none',
  background: '#f9fafb',
  boxSizing: 'border-box',
  color: '#111827',
  fontFamily: 'inherit',
};

const FieldRenderer = ({ field, value, onChange }) => {
  switch (field.type) {
    case 'text':
      return (
        <input
          type="text"
          style={fieldStyle}
          value={value ?? field.defaultValue ?? ''}
          placeholder={field.placeholder || ''}
          onChange={(e) => onChange(field.key, e.target.value)}
        />
      );
    case 'number':
      return (
        <input
          type="number"
          style={fieldStyle}
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
          style={{ ...fieldStyle, resize: 'vertical', minHeight: 56 }}
          value={value ?? field.defaultValue ?? ''}
          placeholder={field.placeholder || ''}
          onChange={(e) => onChange(field.key, e.target.value)}
        />
      );
    case 'select':
      return (
        <select
          style={fieldStyle}
          value={value ?? field.defaultValue ?? field.options?.[0] ?? ''}
          onChange={(e) => onChange(field.key, e.target.value)}
        >
          {(field.options || []).map((opt) => {
            const v = typeof opt === 'object' ? opt.value : opt;
            const l = typeof opt === 'object' ? opt.label : opt;
            return <option key={v} value={v}>{l}</option>;
          })}
        </select>
      );
    case 'toggle':
      return (
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
          <div
            onClick={() => onChange(field.key, !value)}
            style={{
              width: 32, height: 18, borderRadius: 9,
              background: value ? '#374151' : '#d1d5db',
              position: 'relative', transition: 'background 0.2s', flexShrink: 0,
            }}
          >
            <div style={{
              position: 'absolute', top: 2, left: value ? 16 : 2,
              width: 14, height: 14, borderRadius: '50%',
              background: '#fff', transition: 'left 0.2s',
              boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
            }} />
          </div>
          <span style={{ fontSize: 12, color: '#6b7280' }}>{value ? 'On' : 'Off'}</span>
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
    width = 230,
    headerIcon,
  } = config;

  const initialState = {};
  fields.forEach((f) => { initialState[f.key] = data?.[f.key] ?? f.defaultValue ?? ''; });
  const [fieldValues, setFieldValues] = useState(initialState);
  const handleChange = (key, value) => setFieldValues((prev) => ({ ...prev, [key]: value }));

  const badge = CATEGORY_LABELS[category];
  const inputPositions = getHandlePositions(inputs.length);
  const outputPositions = getHandlePositions(outputs.length);

  return (
    <div style={{
      width,
      background: '#ffffff',
      border: '1px solid #e5e7eb',
      borderRadius: 14,
      boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
      fontFamily: 'Inter, system-ui, sans-serif',
      overflow: 'visible',
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
          {headerIcon && <span style={{ fontSize: 15 }}>{headerIcon}</span>}
          <span style={{ fontSize: 14, fontWeight: 600, color: '#111827', letterSpacing: '-0.01em' }}>
            {title}
          </span>
        </div>
        {badge && (
          <span style={{
            fontSize: 10, fontWeight: 500, color: '#6b7280',
            background: '#f3f4f6', padding: '3px 9px',
            borderRadius: 20, letterSpacing: '0.02em',
          }}>
            {badge}
          </span>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {fields.map((field) => (
          <div key={field.key}>
            <label style={{ display: 'block', fontSize: 11, color: '#9ca3af', marginBottom: 3, fontWeight: 500 }}>
              {field.label}
            </label>
            <FieldRenderer field={field} value={fieldValues[field.key]} onChange={handleChange} />
          </div>
        ))}
        {children}
      </div>

      {/* Input handles (left) */}
      {inputs.map((handle, i) => (
        <Handle
          key={handle.id}
          type="target"
          position={Position.Left}
          id={`${id}-${handle.id}`}
          style={{ top: inputPositions[i], background: '#374151', width: 10, height: 10, border: '2px solid #fff' }}
        />
      ))}

      {/* Output handles (right) */}
      {outputs.map((handle, i) => (
        <Handle
          key={handle.id}
          type="source"
          position={Position.Right}
          id={`${id}-${handle.id}`}
          style={{ top: outputPositions[i], background: '#374151', width: 10, height: 10, border: '2px solid #fff' }}
        />
      ))}
    </div>
  );
};
