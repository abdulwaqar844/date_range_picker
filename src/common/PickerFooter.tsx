import React from 'react';

export interface PickerFooterProps {
  renderExtraFooter?: () => React.ReactNode;
  showToday?: boolean;
  showNow?: boolean;
  showOk?: boolean;
  okDisabled?: boolean;
  onToday?: () => void;
  onNow?: () => void;
  onOk?: () => void;
}

export const PickerFooter: React.FC<PickerFooterProps> = ({
  renderExtraFooter,
  showToday = false,
  showNow = false,
  showOk = false,
  okDisabled = false,
  onToday,
  onNow,
  onOk,
}) => {
  const hasExtra = Boolean(renderExtraFooter);
  const hasActions = showToday || showNow || showOk;

  if (!hasExtra && !hasActions) return null;

  return (
    <div className="adp-panel-footer">
      <div className="adp-footer-extra">
        {renderExtraFooter ? renderExtraFooter() : null}
      </div>
      <div className="adp-footer-actions">
        {showToday && (
          <button type="button" className="adp-btn-link" onClick={onToday}>
            Today
          </button>
        )}
        {showNow && (
          <button type="button" className="adp-btn-link" onClick={onNow}>
            Now
          </button>
        )}
        {showOk && (
          <button
            type="button"
            className="adp-btn-primary"
            disabled={okDisabled}
            onClick={onOk}
          >
            OK
          </button>
        )}
      </div>
    </div>
  );
};
