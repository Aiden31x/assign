export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify({ nodeType }));
    event.dataTransfer.effectAllowed = 'move';
    event.target.style.cursor = 'grabbing';
  };

  return (
    <div
      className={type}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      draggable
      style={{
        cursor: 'grab',
        padding: '5px 14px',
        borderRadius: 8,
        border: '1px solid #e5e7eb',
        background: '#f9fafb',
        fontSize: 12,
        fontWeight: 500,
        color: '#374151',
        userSelect: 'none',
        transition: 'background 0.15s, border-color 0.15s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = '#111827';
        e.currentTarget.style.color = '#fff';
        e.currentTarget.style.borderColor = '#111827';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = '#f9fafb';
        e.currentTarget.style.color = '#374151';
        e.currentTarget.style.borderColor = '#e5e7eb';
      }}
    >
      {label}
    </div>
  );
};
