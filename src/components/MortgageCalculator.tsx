import React, { useState } from 'react';
import Modal from './Modal';
import InputField from './InputField';
import { useMortgageCalculator } from '../hooks/useMortgageCalculator';
import { validateInput } from '../utlis/validateInput';

const MortgageCalculator: React.FC = () => {
  const {
    propertyValue,
    setPropertyValue,
    deposit,
    setDeposit,
    interestRate,
    setInterestRate,
    mortgageTermYears,
    setMortgageTermYears,
    monthlyRepayment,
  } = useMortgageCalculator();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const [errors, setErrors] = useState<{ [key: string]: string }>({
    propertyValue: '',
    deposit: '',
    interestRate: '',
    mortgageTermYears: '',
  });

  const handleInputChange = (
    field: string,
    setValue: (value: number) => void,
    value: number | string
  ) => {
    const numericValue = Number(value);
    const error = validateInput(field, value, propertyValue, deposit);
    setErrors((prev) => ({ ...prev, [field]: error }));

    if (!isNaN(numericValue) && value !== '') {
      setValue(numericValue);
    } else if (value === '') {
      setValue(0);
    }
  };

  const handleClose = () => {
    setPropertyValue(0);
    setDeposit(0);
    setInterestRate(0);
    setMortgageTermYears(0);

    setErrors({
      propertyValue: '',
      deposit: '',
      interestRate: '',
      mortgageTermYears: '',
    });

    setIsModalOpen(false);
  };

  const handleBlur = (field: string, value: number | string) => {
    const error = validateInput(field, value, propertyValue, deposit);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const inputFields = [
    {
      label: 'Property Value',
      value: propertyValue,
      setValue: setPropertyValue,
      min: 0,
      className: 'form__group--property-value',
      id: 'property-value-input',
      fieldName: 'propertyValue',
      suffix: '£',
    },
    {
      label: 'Deposit',
      value: deposit,
      setValue: setDeposit,
      min: 0,
      className: 'form__group--deposit',
      id: 'deposit-input',
      fieldName: 'deposit',
      suffix: '£',
    },
    {
      label: 'Interest Rate',
      value: interestRate,
      setValue: setInterestRate,
      min: 0,
      max: 100,
      className: 'form__group--interest-rate',
      id: 'interest-rate-input',
      fieldName: 'interestRate',
      suffix: '%',
    },
    {
      label: 'Mortgage Term (Years)',
      value: mortgageTermYears,
      setValue: setMortgageTermYears,
      min: 1,
      max: 45,
      className: 'form__group--mortgage-term',
      id: 'mortgage-term-input',
      fieldName: 'mortgageTermYears',
    },
  ];

  return (
    <div className="calculator">
      {isModalOpen ? (
        <Modal
          ariaLabelledby="modal-title"
          onClose={() => setIsModalOpen(false)}
          aria-labelledby="modal-title"
          isOpen={isModalOpen}
        >
          <div className="modal__content">
            <h2 className="modal__title">Mortgage Calculator</h2>
            <div className="form__inputs">
              {inputFields.map(
                ({
                  label,
                  value,
                  setValue,
                  min,
                  max,
                  className,
                  id,
                  fieldName,
                  suffix,
                }) => (
                  <InputField
                    key={label}
                    label={label}
                    type="number"
                    value={value}
                    min={min}
                    max={max}
                    onChange={(value: number) =>
                      handleInputChange(fieldName, setValue, value)
                    }
                    onBlur={() => handleBlur(fieldName, value)}
                    className={className}
                    id={id}
                    ariaLabelledby={`${id}-label`}
                    error={errors[fieldName]}
                    suffix={suffix}
                  />
                )
              )}
            </div>
            <div className="repayment">
              <h3 className="repayment__text">
                Estimated Monthly Repayment:{' '}
                <span className="repayment__amount">
                  £{monthlyRepayment.toFixed(2)}
                </span>
              </h3>
            </div>
            <button
              onClick={handleClose}
              className="modal__close-btn"
              aria-label="Close calculator"
            >
              Close Calculator
            </button>
          </div>
        </Modal>
      ) : (
        <button
          onClick={() => setIsModalOpen(true)}
          className="calculator__reopen-btn"
          aria-label="Reopen calculator"
        >
          Reopen Calculator
        </button>
      )}
    </div>
  );
};

export default MortgageCalculator;
