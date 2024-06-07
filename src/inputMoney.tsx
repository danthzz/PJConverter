import React, { useEffect, useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';

interface InputMoneyProps {
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  addonBefore?: string;
}

const DECIMAL_SIZE = 2;

const InputMoney = ({ value, onChange, addonBefore = 'R$', ...props }: InputMoneyProps) => {
  const [currentValue, setCurrentValue] = useState<string>(formatCurrency(value, DECIMAL_SIZE));

  useEffect(() => {
    if (!isNaN(value)) {
      setCurrentValue(formatCurrency(value, DECIMAL_SIZE));
    }
  }, [value]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueRemoved = event.target.value.replace(',', '').replace(/[^0-9]/g, '');
    const sizeSlice = valueRemoved.length - DECIMAL_SIZE;
    const newValue = `${valueRemoved.slice(0, sizeSlice)}.${valueRemoved.slice(sizeSlice)}`;
    onChange({
      ...event,
      target: {
        ...event.target,
        value: newValue,
      },
    });
  };

  function formatCurrency(value: number, decimalSize: number) {
    const [integerPart, decimalPart] = value.toFixed(decimalSize).split('.');
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `${formattedIntegerPart},${decimalPart || '00'}`;
  }

  return (
    <InputGroup>
      {addonBefore && <InputGroup.Text>{addonBefore}</InputGroup.Text>}
      <Form.Control value={currentValue} onChange={handleOnChange} {...props} />
    </InputGroup>
  );
};

export default InputMoney;
