type IconProps = {
  name?: string;
  className?: string;
  title?: string
}
export function Icon({
  className,
  title,
}: IconProps) {
  return (
    <i
      title={title}
      aria-hidden={Boolean(title)}
      className={className + ' leading-none block'}
    />
  );
};
