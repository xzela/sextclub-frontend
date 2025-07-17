export function Icon({
  name,
  className,
  title,
}) {
  return (
    <i
      title={title}
      aria-hidden={Boolean(title)}
      className='leading-none block'
    />
  );
};
