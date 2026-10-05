import iconsSprite from '@/assets/iconsSprite/icons.svg';

const Icon = ({ name, size = 24, className = '' }) => (
  <svg
    className={`icon ${className}`}
    width={size}
    height={size}
    viewBox='0 0 50 50'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    aria-hidden='true'>
    <use xlinkHref={`${iconsSprite}#${name}`} />
  </svg>
);

export default Icon;
