export const SubmitButton = () => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '14px 0',
      flexShrink: 0,
    }}>
      <button
        type="submit"
        style={{
          padding: '9px 32px',
          fontSize: 13,
          fontWeight: 600,
          color: '#fff',
          background: '#111827',
          border: 'none',
          borderRadius: 8,
          cursor: 'pointer',
          letterSpacing: '0.01em',
          transition: 'background 0.15s',
          fontFamily: 'inherit',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = '#374151')}
        onMouseLeave={(e) => (e.currentTarget.style.background = '#111827')}
      >
        Submit Pipeline
      </button>
    </div>
  );
};
