import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { getAccentColor } from './Utils/playerAccent.ts';

type Props = SvgIconProps & { accent?: string };

export default function BookmarkIcon(props: Props) {
  const { accent, color, ...rest } = props as any;
  const accentColor = accent || (typeof color === 'string' ? getAccentColor(color) : undefined);
  return (
    <SvgIcon viewBox="0 0 24 24" {...rest}>
      <path d="M6 2h12v19l-6-3-6 3V2z" fill={color || 'currentColor'} />
      {accentColor && <path d="M6 2h12v19l-6-3-6 3V2z" fill="none" stroke={accentColor} strokeWidth={0.8} />}
    </SvgIcon>
  );
}
