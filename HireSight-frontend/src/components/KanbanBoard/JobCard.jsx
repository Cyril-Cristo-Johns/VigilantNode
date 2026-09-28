import { useState, useEffect } from 'react';
import { useDraggable } from '@dnd-kit/core';
import apiClient from '../../api/axiosConfig';

const JobCard = ({ task, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task._id,
  });

  const [checklist, setChecklist] = useState(task.prepChecklist || []);

  useEffect(() => {
    setChecklist(task.prepChecklist || []);
  }, [task.prepChecklist]);

  const dndStyle = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    zIndex: isDragging ? 999 : 'auto',
    opacity: isDragging ? 0.6 : 1,
    boxShadow: isDragging 
      ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' 
      : '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
  } : undefined;

  const toggleChecklist = async (index, currentStatus) => {
    const newChecklist = [...checklist];
    newChecklist[index] = { 
      ...newChecklist[index], 
      isComplete: !currentStatus 
    };
    setChecklist(newChecklist);

    try {
      await apiClient.patch(`/applications/${task._id}`, { prepChecklist: newChecklist });
    } catch (error) {
      console.error("Failed to save checklist:", error);
      const rollbackChecklist = [...newChecklist];
      rollbackChecklist[index] = { ...rollbackChecklist[index], isComplete: currentStatus };
      setChecklist(rollbackChecklist);
    }
  };

  const completedCount = checklist.filter(item => item.isComplete).length;
  const progressPercent = checklist.length > 0 ? Math.round((completedCount / checklist.length) * 100) : 0;

  return (
    <div
      ref={setNodeRef}
      style={{
        ...styles.card,
        ...dndStyle,
        borderLeft: isDragging ? '4px solid #2563eb' : '1px solid #e2e8f0',
      }}

      {...listeners}
      {...attributes}
    >

      <div style={styles.cardHeader}>
        <div style={{ flex: 1, paddingRight: '8px' }}>
          <h4 style={styles.roleTitle}>{task.role}</h4>
          <p style={styles.companySub}>{task.company}</p>
        </div>

        <button 
          onClick={(e) => { e.stopPropagation(); onDelete(task._id); }}

          onPointerDown={(e) => e.stopPropagation()} 
          style={styles.deleteButton}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#fee2e2'}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
        >
          ✕
        </button>
      </div>

      {checklist.length > 0 && (
        <div style={styles.checklistSection}>
          <div style={styles.checklistHeader}>
            <span style={styles.checklistTitle}>✨ AI Prep Checklist</span>
            <span style={styles.progressText}>{completedCount}/{checklist.length}</span>
          </div>

          <div style={styles.progressBarBg}>
            <div style={{ ...styles.progressBarFill, width: `${progressPercent}%` }} />
          </div>
          
          <div style={styles.itemsList}>
            {checklist.map((item, index) => (
              <label 
                key={index} 
                style={{ 
                  ...styles.itemLabel,
                  color: item.isComplete ? '#94a3b8' : '#334155',
                  textDecoration: item.isComplete ? 'line-through' : 'none',
                }}
                onPointerDown={(e) => e.stopPropagation()} 
              >
                <input 
                  type="checkbox" 
                  checked={item.isComplete || false} 
                  onChange={() => toggleChecklist(index, item.isComplete)}
                  style={styles.checkboxInput}
                />
                <span style={styles.taskText}>{item.task}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: '#ffffff',
    padding: '16px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    cursor: 'grab',
    position: 'relative',
    transition: 'box-shadow 0.2s ease, border-left 0.1s ease',
    boxSizing: 'border-box',
    width: '100%',
    userSelect: 'none',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  roleTitle: {
    margin: '0 0 4px 0',
    fontSize: '15px',
    fontWeight: '600',
    color: '#0f172a',
    lineHeight: '1.4',
  },
  companySub: {
    margin: 0,
    fontSize: '13px',
    color: '#64748b',
    fontWeight: '500',
  },
  deleteButton: {
    background: 'none',
    border: 'none',
    color: '#94a3b8',
    cursor: 'pointer',
    padding: '4px 6px',
    fontSize: '11px',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.15s ease',
  },
  checklistSection: {
    marginTop: '14px',
    borderTop: '1px solid #f1f5f9',
    paddingTop: '12px',
  },
  checklistHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '6px',
  },
  checklistTitle: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#4f46e5',
    letterSpacing: '0.03em',
    textTransform: 'uppercase',
  },
  progressText: {
    fontSize: '11px',
    fontWeight: '600',
    color: '#64748b',
  },
  progressBarBg: {
    width: '100%',
    height: '4px',
    backgroundColor: '#f1f5f9',
    borderRadius: '2px',
    marginBottom: '10px',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#4f46e5',
    borderRadius: '2px',
    transition: 'width 0.3s ease',
  },
  itemsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  itemLabel: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
    fontSize: '12px',
    cursor: 'pointer',
    lineHeight: '1.4',
    padding: '2px 0',
  },
  checkboxInput: {
    marginTop: '2px',
    cursor: 'pointer',
    accentColor: '#4f46e5',
  },
  taskText: {
    flex: 1,
  },
};

export default JobCard;
