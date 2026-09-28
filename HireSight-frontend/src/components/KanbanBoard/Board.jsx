import { DndContext, closestCorners } from '@dnd-kit/core';
import Column from './Column';
import apiClient from '../../api/axiosConfig'; 

const COLUMNS = ['Wishlist', 'Applied', 'Interviewing', 'Offer', 'Rejected'];

const COLUMN_ACCENTS = {
  'Wishlist': '#64748b',      
  'Applied': '#2563eb',       
  'Interviewing': '#d97706',  
  'Offer': '#10b981',         
  'Rejected': '#ef4444'       
};

const Board = ({ applications, setApplications, onDelete }) => {

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (!over) return;

    const cardId = active.id;
    const newStatus = over.id; 

    const draggedTask = (applications || []).find(task => task._id === cardId);
    
    if (!draggedTask || draggedTask.status === newStatus) return;

    const previousState = [...(applications || [])];

    setApplications(currentApps => 
      (currentApps || []).map(task => 
        task._id === cardId ? { ...task, status: newStatus } : task
      )
    );

    try {
      await apiClient.patch(`/applications/${cardId}/status`, { 
        status: newStatus 
      });
    } catch (err) {
      console.error('Failed to update status in DB:', err);

      setApplications(previousState);
    }
  };

  const safeApplications = applications || [];
  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div style={styles.boardScrollContainer}>
        
        {COLUMNS.map(status => {
          const columnTasks = safeApplications.filter(task => task.status === status);
          const accentColor = COLUMN_ACCENTS[status] || '#cbd5e1';
          
          return (
            <div key={status} style={styles.columnCard}>
              <div style={{ ...styles.columnHeader, borderTop: `4px solid ${accentColor}` }}>
                <h3 style={styles.columnTitle}>{status}</h3>
                <span style={{ ...styles.badge, backgroundColor: `${accentColor}15`, color: accentColor }}>
                  {columnTasks.length}
                </span>
              </div>

              <div style={styles.columnContent}>
                <Column id={status} tasks={columnTasks} onDelete={onDelete}/>
              </div>

              <div style={styles.columnFooter}>
                Total: {columnTasks.length} {columnTasks.length === 1 ? 'job' : 'jobs'}
              </div>
            </div>
          );
        })}

      </div>
    </DndContext>
  );
};

const styles = {
  boardScrollContainer: {
    display: 'flex',
    gap: '24px',
    overflowX: 'auto',
    flexGrow: 1,
    paddingBottom: '16px',
    scrollbarWidth: 'thin',
    scrollbarColor: '#cbd5e1 transparent',
  },
  columnCard: {
    minWidth: '310px',
    maxWidth: '350px',
    flex: '1 0 310px',
    backgroundColor: '#ffffff', 
    borderRadius: '12px',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
    border: '1px solid #e2e8f0',
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '75vh', 
  },
  columnHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px 12px 20px',
    borderRadius: '12px 12px 0 0',
  },
  columnTitle: {
    margin: 0,
    fontSize: '16px',
    fontWeight: '600',
    color: '#1e293b',
  },
  badge: {
    fontSize: '12px',
    fontWeight: '700',
    padding: '2px 8px',
    borderRadius: '20px',
  },
  columnContent: {
    flexGrow: 1,
    overflowY: 'auto', 
    padding: '4px 20px 16px 20px',
  },
  columnFooter: {
    padding: '12px 20px',
    borderTop: '1px solid #f1f5f9',
    fontSize: '12px',
    fontWeight: '500',
    color: '#94a3b8',
    backgroundColor: '#f8fafc',
    borderRadius: '0 0 12px 12px',
  },
};

export default Board;
