import { Input } from '@headlessui/react';
import { format } from '@react-input/mask';
import { ChangeEvent, useCallback } from 'react';
import { useMask } from './useMask';

export type PhoneNumberInputProps = {
  /**
   * Provide an id for the input
   */
  id?: string;
  /**
   * Set input mask template. _ character is replaced by phone number digits
   * @example
   * mask = '(___) ___-__-__'
   */
  mask?: string;
  /**
   * Capture phone number changes
   */
  onChange: (value: string) => void;
  /**
   * Set input value
   */
  value: string;
};

export function PhoneNumberInput({
  id,
  mask = '______________',
  onChange,
  value: valueProp,
}: PhoneNumberInputProps) {
  const { options, hasEmptyMask, inputRef } = useMask({ mask });

  const value = format(valueProp, options);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange(format(event.target.value, options));
    },
    [onChange, options]
  );
  return (
    <Input
      placeholder={hasEmptyMask ? 'Phone number' : mask}
      ref={inputRef}
      id={id}
      name="phone"
      className='w-full rounded-md px-2 py-2 text-base border border-amber-300'
      type="tel"
      onChange={handleChange}
      value={value}
    />
  );
};
