// Year Progress + Liquid Glass Clock
// Layout: 
// Row 1: Flag + "Year Journey" | Date
// Row 2: Large % | Day Count
// Row 3: Progress Bar

export const refreshFrequency = 1000;

export const className = `
  top: 40px;
  right: 40px;
  user-select: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;

  .glass-card {
    position: relative;
    width: 320px; /* Slightly wider for new layout */
    padding: 24px;
    border-radius: 24px;
    background-color: rgba(40, 40, 50, 0.4); 
    backdrop-filter: blur(40px) saturate(180%);
    -webkit-backdrop-filter: blur(40px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.15);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    color: white;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  /* Row 1: Header */
  .header-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.95rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.9);
  }
  
  .title-group {
    display: flex;
    align-items: center;
    gap: 8px;
    color: rgba(255, 210, 0, 0.85); /* Restored soft gold */
    text-shadow: 0 0 10px rgba(255, 210, 0, 0.2);
    font-weight: 600;
  }

  .date-text {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.6);
    font-weight: 500;
  }

  /* Row 2: Stats */
  .stats-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }

  .percentage-text {
    font-size: 2.8rem; 
    font-weight: 700;
    line-height: 1;
    letter-spacing: -1.0px;
    /* Restored white glass gradient */
    background: linear-gradient(to bottom, rgba(255,255,255,0.95), rgba(255,255,255,0.5));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: none;
  }

  .days-text {
    font-size: 1.1rem; /* Increased from 1rem */
    font-weight: 600; /* Increased weight */
    color: rgba(255, 255, 255, 0.85); /* Increased opacity */
  }

  /* Row 3: Bar */
  .track {
    width: 100%;
    height: 14px; /* Increased from 10px to match text weight */
    background: rgba(255, 255, 255, 0.1);
    border-radius: 7px;
    overflow: hidden;
    position: relative;
  }

  .fill {
    height: 100%;
    background: linear-gradient(90deg, #FFD200, #FF9500);
    border-radius: 7px;
    transition: width 0.5s ease-out;
  }
`;

export const render = ({ output }) => {
  const now = new Date();

  // Year Progress Logic
  const start = new Date(now.getFullYear(), 0, 1);
  const end = new Date(now.getFullYear() + 1, 0, 1);
  const total = end - start;
  const elapsed = now - start;
  const progress = Math.max(0, Math.min(1, elapsed / total));

  // Format Data
  const pct = (progress * 100).toFixed(1);
  const daysPassed = Math.floor(elapsed / (1000 * 60 * 60 * 24)) + 1;
  const daysTotal = (end - start) / (1000 * 60 * 60 * 24);
  const dateString = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  // Flag Icon SVG
  const IconFlag = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
      <line x1="4" y1="22" x2="4" y2="15"></line>
    </svg>
  );

  return (
    <div className="glass-card">
      {/* Row 1 */}
      <div className="header-row">
        <div className="title-group">
          {IconFlag}
          <span>Year Journey</span>
        </div>
        <div className="date-text">{dateString}</div>
      </div>

      {/* Row 2 */}
      <div className="stats-row">
        <div className="percentage-text">{pct}%</div>
        <div className="days-text">{daysPassed}/{daysTotal} Days</div>
      </div>

      {/* Row 3 */}
      <div className="track">
        <div className="fill" style={{ width: `${pct}%` }}></div>
      </div>
    </div>
  );
};
