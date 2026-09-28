import { useDroppable } from '@dnd-kit/core';
import JobCard from './JobCard';

const Column = ({ id, tasks, onDelete }) => {

  const { isOver, setNodeRef } = useDroppable({
    id: id, 
  });

  const containerStyle = {
    ...styles.columnList,
    border: isOver ? '2px dashed #3b82f6' : '2px dashed transparent',
    backgroundColor: isOver ? '#eff6ff' : 'transparent',
    borderRadius: '8px',
  };

  return (
    <div ref={setNodeRef} style={containerStyle}>
      {tasks.map(task => (
        <JobCard key={task._id} task={task} onDelete={onDelete}/>
      ))}
      
      {tasks.length === 0 && (
        <div style={styles.emptyPlaceholder}>
          <div style={styles.emptyIcon}>📥</div>
          <span style={styles.emptyText}>Empty column</span>
          <span style={styles.emptySubText}>Drag applications here</span>
        </div>
      )}
    </div>
  );
};

const styles = {
  columnList: {
    minHeight: '250px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    padding: '4px',
    boxSizing: 'border-box',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  emptyPlaceholder: {
    padding: '32px 16px',
    textAlign: 'center',
    border: '1px dashed #cbd5e1',
    borderRadius: '8px',
    backgroundColor: '#f8fafc',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
  },
  emptyIcon: {
    fontSize: '20px',
    marginBottom: '4px',
    opacity: 0.7,
  },
  emptyText: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#64748b',
  },
  emptySubText: {
    fontSize: '11px',
    color: '#94a3b8',
  },
};

export default Column;
