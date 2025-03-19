import { useEffect, useState } from 'react';
import { calculateMonthlyRepayment } from '../utlis/mortgageCalculator';

export const useMortgageCalculator = () => {
  const [propertyValue, setPropertyValue] = useState<number>(0);
  const [deposit, setDeposit] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(0);
  const [mortgageTermYears, setMortgageTermYears] = useState<number>(0);
  const [monthlyRepayment, setMonthlyRepayment] = useState<number>(0);

  useEffect(() => {
    const repayment = calculateMonthlyRepayment(
      propertyValue,
      deposit,
      interestRate,
      mortgageTermYears
    );
    setMonthlyRepayment(repayment);
  }, [propertyValue, deposit, interestRate, mortgageTermYears]);

  return {
    propertyValue,
    setPropertyValue,
    deposit,
    setDeposit,
    interestRate,
    setInterestRate,
    mortgageTermYears,
    setMortgageTermYears,
    monthlyRepayment,
  };
};
