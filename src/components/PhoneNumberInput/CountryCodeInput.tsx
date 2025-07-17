import {
  Input,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';

import { CountryCodeConfig } from '@/components/PhoneNumberInput/countryCodeList';
import { Icon } from '@/components/PhoneNumberInput/Icon';
import {
  ChangeEvent, useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';

const ANCHOR_PROP = { to: 'bottom start' as const, gap: '12px' };

export type Props = {
  /**
   * Provide a list of countries to render
   */
  countryList: CountryCodeConfig[];
  /**
   * Set selected country code value
   */
  value: CountryCodeConfig['code'];
  /**
   * Callback to capture selected country changes
   */
  onChange: (value?: CountryCodeConfig['code']) => void;
};

export function CountryCodeInput({
  id,
  countryList,
  value,
  onChange,
}) {
  const useCountryFilter = (countryList: CountryCodeConfig[]) => {
    const [filteredList, setFilteredList] = useState(countryList);

    useEffect(() => {
      setFilteredList(countryList);
    }, [countryList]);

    const [filter, setFilterState] = useState('');

    const setFilter = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        setFilterState(event.target.value);
        const nextCountries = countryList.filter(({ name }) =>
          name.toLowerCase().includes(event.target.value.toLowerCase())
        );
        if (event.target.value !== '') {
          setFilteredList(nextCountries);
        } else {
          setFilteredList(countryList);
        }
      },
      [countryList]
    );

    return { filter, setFilter, filteredList };
  };

  const useCountrySelect = ({ value, onChange, countryList }: Props) => {
    const [selected, setSelected] = useState(value);

    useEffect(() => {
      setSelected(value);
    }, [value]);

    const handleSelect = useCallback(
      (selectedCode: CountryCodeConfig['code']) => {
        onChange(selectedCode);
        setSelected(selectedCode);
      },
      [onChange]
    );

    const selectedFlag = useMemo(
      () => countryList.find(({ code }) => code === selected)?.flag,
      [countryList, selected]
    );

    return { selected, handleSelect, selectedFlag };
  };

  // country list filter logic
  const { filter, setFilter, filteredList } = useCountryFilter(countryList);

  // country list selection logic
  const { selectedFlag, handleSelect, selected } = useCountrySelect({
    onChange,
    countryList,
    value,
  });

  return (
    <div className="w-24">

      <Listbox value={selected} onChange={handleSelect}>
        <ListboxButton
          className='relative w-full rounded-md px-2 py-1.5 text-base flex items-center gap-1 border border-amber-300'>
          <span className="text-xl">{selectedFlag}</span>
          <span className="ml-auto grow-0">{selected}</span>
          <Input id={id} name="countryCode" type="hidden" value={selected} />
          <Icon
            className="group pointer-events-none size-3.5 shrink-0 "
            name="caret-down"
            title=""
          />
        </ListboxButton>
        <ListboxOptions
          anchor={ANCHOR_PROP}
          transition
          className='w-56 rounded-md border flex flex-col origin-top transition duration-200 ease-in data-[closed]:scale-95 data-[closed]:opacity-0 shadow-md shadow-black/20 border-amber-300 bg-zinc-950'>
          {countryList.length > 5 && (
            <div className=" border-b-2 border-b-black/10 p-2">
              <Input
                defaultValue={filter}
                onChange={setFilter}
                placeholder="Country name"
                className='max-w-full rounded-full bg-zinc-800 px-4 py-1 text-sm/6 focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25'
              />
            </div>
          )}
          <div className="max-h-48 grow overflow-auto">
            {filteredList.map(({ code, flag, name }) => (
              <ListboxOption
                key={code}
                value={code}
                className="group flex cursor-pointer select-none items-center gap-1 p-1.5 data-[focus]:bg-black/10"
              >
                <div className="size-4">
                  <Icon
                    className="invisible size-4  group-data-[selected]:visible"
                    name="check"
                    title=""
                  />
                </div>
                <span className="text-xl/5">{flag}</span>
                <div className="w-9 shrink-0 text-right text-sm/6 tabular-nums ">
                  {code}
                </div>
                <div className="truncate text-base group-data-[hover]:">
                  {name}
                </div>
              </ListboxOption>
            ))}
            {filteredList.length === 0 && (
              <div className="py-1.5 text-center text-sm/6 /65">
                No results.
              </div>
            )}
          </div>
        </ListboxOptions>
      </Listbox>
    </div>
  );
};
