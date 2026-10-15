import type { PresetItem, PresetValue } from '../types';

export interface PresetsBarProps<T> {
  presets?: PresetItem<T>[];
  onSelectPreset: (value: T) => void;
}

export function PresetsBar<T>({ presets, onSelectPreset }: PresetsBarProps<T>) {
  if (!presets || presets.length === 0) return null;

  const resolveValue = (v: PresetValue<T>): T => {
    return typeof v === 'function' ? (v as () => T)() : v;
  };

  return (
    <div className="adp-presets-sidebar">
      {presets.map((preset, index) => (
        <button
          key={index}
          type="button"
          className="adp-preset-tag"
          onClick={() => onSelectPreset(resolveValue(preset.value))}
        >
          {preset.label}
        </button>
      ))}
    </div>
  );
}
