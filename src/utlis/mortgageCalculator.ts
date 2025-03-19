export const calculateMonthlyRepayment = (
  propertyValue: number,
  deposit: number,
  interestRate: number,
  mortgageTermYears: number
): number => {
  if (
    propertyValue <= deposit ||
    interestRate <= 0 ||
    interestRate > 100 ||
    mortgageTermYears <= 0 ||
    mortgageTermYears > 45
  )
    return 0;

  const loan = propertyValue - deposit;
  const monthlyInterest = interestRate / 100 / 12;
  const totalPayments = mortgageTermYears * 12;

  return (
    (monthlyInterest / (1 - Math.pow(1 + monthlyInterest, -totalPayments))) *
    loan
  );
};
