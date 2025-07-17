import { CountryCodeConfig, countryCodeList } from '@/components/PhoneNumberInput/countryCodeList';
import { useCallback, useState } from "react";
import { CountryCodeInput } from './CountryCodeInput';
import { PhoneNumberInput } from './PhoneNumberInput';

export function PhoneNumberInputComponent() {
  // phone number logic
  const [phoneNumber, setPhoneNumber] = useState('');
  const handlePhoneChange = useCallback((value: string) => {
    setPhoneNumber(value);
  }, []);

  // country code logic
  const [countryCode, setCountryCode] = useState<CountryCodeConfig['code']>('+1');
  const handleCodeChange = useCallback((nextCode?: CountryCodeConfig['code']) => {
    if (nextCode) {
      setCountryCode(nextCode);
    }
  }, []);

  const mask = countryCodeList.find(({ code }) => code === countryCode)?.mask;

  return (
    <div className="flex flex-col gap-2">
      <label className="cursor-pointer text-base font-bold pt-2" htmlFor="test1">
        Phone number:
      </label>
      <div className="flex gap-3">
        <CountryCodeInput
          id="countryCode"
          countryList={countryCodeList}
          value={countryCode}
          onChange={handleCodeChange}
        />
        <PhoneNumberInput
          id="phone"
          mask={mask}
          onChange={handlePhoneChange}
          value={phoneNumber}
        />
      </div>
    </div>
  )
}
