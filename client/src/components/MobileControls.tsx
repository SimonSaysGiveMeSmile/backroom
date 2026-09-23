import { useGame } from '../store/GameContext';
import { touch } from '../shared-touch/touch';
import { LookZone, Joystick, HoldButton, TapButton, Theme } from '../shared-touch/primitives';

const BACKROOM_THEME: Theme = {
  base: 'rgba(20, 18, 6, 0.42)',
  border: 'rgba(214, 198, 74, 0.4)',
  active: 'rgba(214, 198, 74, 0.55)',
  activeText: '#14120a',
  inactiveText: '#e8dca0',
};

const JOYSTICK_THEME: Theme = {
  base: 'rgba(20, 18, 6, 0.42)',
  border: 'rgba(214, 198, 74, 0.4)',
  active: 'rgba(214, 198, 74, 0.55)',
  activeText: '#14120a',
  inactiveText: '#e8dca0',
};

/**
 * Touch overlay for the FPS: left thumb = move joystick, right side =
 * drag-to-look (replaces pointer lock), corner buttons = sprint / crouch / menu.
 * DOM-only; rendered outside the Canvas so it never disturbs WebGL.
 */
export function MobileControls({ onMenu }: { onMenu: () => void }) {
  const { state, dispatch } = useGame();

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50, pointerEvents: 'none', touchAction: 'none' }}>
      <LookZone widthPercent={58} />
      <Joystick left={22} bottom={30} size={144} knobSize={58} theme={JOYSTICK_THEME} />

      {/* Right-hand action buttons */}
      <div style={{
        position: 'fixed',
        right: 'calc(env(safe-area-inset-right, 0px) + 22px)',
        bottom: 'calc(env(safe-area-inset-bottom, 0px) + 30px)',
        display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-end',
        pointerEvents: 'auto',
      }}>
        <HoldButton label="SPRINT" onChange={(v) => { touch.sprint = v; }} size={78} theme={BACKROOM_THEME} />
        <TapButton
          label={state.isCrouching ? 'STAND' : 'CROUCH'}
          onTap={() => dispatch({ type: 'SET_CROUCHING', value: !state.isCrouching })}
          size={78}
          theme={BACKROOM_THEME}
        />
      </div>

      {/* Menu / pause */}
      <div style={{
        position: 'fixed',
        top: 'calc(env(safe-area-inset-top, 0px) + 14px)',
        right: 'calc(env(safe-area-inset-right, 0px) + 16px)',
        pointerEvents: 'auto',
      }}>
        <TapButton label="☰" onTap={onMenu} size={48} theme={{ ...BACKROOM_THEME, base: 'rgba(20, 18, 6, 0.5)' }} />
      </div>
    </div>
  );
}
