import React from 'react';
import classNames from 'classnames';

export const BottomTabs: React.FC<{
  active: number;
  onChange: (idx: number) => void;
}> = ({ active, onChange }) => {
  const tabs = ['🗺️ Map', '🎨 Alliances', '📅 Dates'];
  return (
    <div className="tabs">
      {tabs.map((t, i) => (
        <div
          key={t}
          className={classNames('tab', { active: active === i })}
          onClick={() => onChange(i)}
        >
          {t}
        </div>
      ))}
    </div>
  );
};
