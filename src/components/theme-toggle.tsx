import { MoonIcon, SunIcon } from '@phosphor-icons/react';
import { useTheme } from '@/contexts/theme-context';

import { Button } from './ui';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant='ghost'
      size='3'
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <MoonIcon size={16} weight='fill' />
      ) : (
        <SunIcon size={16} weight='fill' />
      )}
    </Button>
  );
}

export default ThemeToggle;

