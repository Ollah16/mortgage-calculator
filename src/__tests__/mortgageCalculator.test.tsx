import { render, screen, fireEvent } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react';
import { useMortgageCalculator } from '../hooks/useMortgageCalculator';
import MortgageCalculator from '../components/MortgageCalculator';
import { validateInput } from '../utlis/validateInput';

describe('MortgageCalculator', () => {
  describe('useMortgageCalculator Hook', () => {
    it('calculates monthly repayment correctly with valid inputs', () => {
      const { result } = renderHook(() => useMortgageCalculator());
      act(() => {
        result.current.setPropertyValue(200000);
        result.current.setDeposit(40000);
        result.current.setInterestRate(3);
        result.current.setMortgageTermYears(25);
      });
      expect(result.current.monthlyRepayment).toBeCloseTo(758.74, 2);
    });

    it('returns 0 for invalid loan (deposit >= property value)', () => {
      const { result } = renderHook(() => useMortgageCalculator());
      act(() => {
        result.current.setPropertyValue(100000);
        result.current.setDeposit(100000);
        result.current.setInterestRate(3);
        result.current.setMortgageTermYears(25);
      });
      expect(result.current.monthlyRepayment).toBe(0);
    });

    it('returns 0 for invalid interest (0 %)', () => {
      const { result } = renderHook(() => useMortgageCalculator());
      act(() => {
        result.current.setPropertyValue(200000);
        result.current.setDeposit(40000);
        result.current.setInterestRate(0);
        result.current.setMortgageTermYears(5);
      });
      expect(result.current.monthlyRepayment).toBe(0);
    });

    it('returns 0 for invalid term (0 years)', () => {
      const { result } = renderHook(() => useMortgageCalculator());
      act(() => {
        result.current.setPropertyValue(200000);
        result.current.setDeposit(40000);
        result.current.setInterestRate(3);
        result.current.setMortgageTermYears(0);
      });
      expect(result.current.monthlyRepayment).toBe(0);
    });
  });

  describe('validateInput Function', () => {
    it('returns error for property value <= 0', () => {
      const error = validateInput('propertyValue', 0);
      expect(error).toBe('Please enter a property value greater than 0.');
    });

    it('returns error for property value <= deposit', () => {
      const error = validateInput('propertyValue', 50000, 50000, 60000);
      expect(error).toBe(
        'The property value needs to be more than the deposit.'
      );
    });

    it('returns error for deposit value <= 0', () => {
      const error = validateInput('deposit', -1);
      expect(error).toBe('The deposit cannot be negative.');
    });

    it('returns error for property value <= deposit', () => {
      const error = validateInput('deposit', 200000, 50000, 200000);
      expect(error).toBe('The deposit must be less than the property value.');
    });

    it('returns error for interest rate out of range', () => {
      const error = validateInput('interestRate', 150);
      expect(error).toBe('Please enter an interest rate between 0% and 100%.');
    });

    it('returns error for mortgage term out of range', () => {
      const error = validateInput('mortgageTermYears', 50);
      expect(error).toBe(
        'Please enter a mortgage term between 0 and 45 years.'
      );
    });

    it('returns no error for valid inputs', () => {
      const error = validateInput('deposit', 40000, 200000);
      expect(error).toBe('');
    });
  });

  describe('MortgageCalculator Component', () => {
    beforeEach(() => {
      render(<MortgageCalculator />);
    });

    it('renders input fields with labels', () => {
      expect(screen.getByLabelText(/property value/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/deposit/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/interest rate/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/mortgage term/i)).toBeInTheDocument();
    });

    it('displays error message when property value is empty on blur', () => {
      const propertyInput = screen.getByLabelText(
        /property value/i
      ) as HTMLInputElement;
      fireEvent.change(propertyInput, { target: { value: '' } });
      fireEvent.blur(propertyInput);

      expect(
        screen.getByText('Please enter a property value greater than 0.')
      ).toBeInTheDocument();
    });

    it('displays error message when property value <= deposit ', () => {
      const propertyInput = screen.getByLabelText(
        /property value/i
      ) as HTMLInputElement;
      const depositInput = screen.getByLabelText(
        /Deposit/i
      ) as HTMLInputElement;

      fireEvent.change(propertyInput, { target: { value: 20000 } });
      fireEvent.change(depositInput, { target: { value: 50000 } });
      fireEvent.blur(propertyInput);

      expect(
        screen.getByText(
          'The property value needs to be more than the deposit.'
        )
      ).toBeInTheDocument();
    });

    it('displays error message when deposit value is empty on blur', () => {
      const depositInput = screen.getByLabelText(
        /Deposit/i
      ) as HTMLInputElement;

      fireEvent.change(depositInput, { target: { value: '' } });
      fireEvent.blur(depositInput);

      expect(
        screen.getByText('The deposit must be less than the property value.')
      ).toBeInTheDocument();
    });

    it('displays error message when deposit < 0', () => {
      const depositInput = screen.getByLabelText(
        /Deposit/i
      ) as HTMLInputElement;

      fireEvent.change(depositInput, { target: { value: -1 } });
      fireEvent.blur(depositInput);

      expect(
        screen.getByText('The deposit cannot be negative.')
      ).toBeInTheDocument();
    });

    it('displays error message when interest rate is empty on blur', () => {
      const interestInput = screen.getByLabelText(
        /interest rate/i
      ) as HTMLInputElement;
      fireEvent.change(interestInput, { target: { value: '' } });
      fireEvent.blur(interestInput);

      expect(
        screen.getByText('Please enter an interest rate between 0% and 100%.')
      ).toBeInTheDocument();
    });

    it('displays error message when mortgage term is empty on blur', () => {
      const termInput = screen.getByLabelText(
        /mortgage term/i
      ) as HTMLInputElement;
      fireEvent.change(termInput, { target: { value: '' } });
      fireEvent.blur(termInput);

      expect(
        screen.getByText('Please enter a mortgage term between 0 and 45 years.')
      ).toBeInTheDocument();
    });

    it('updates monthly repayment when valid inputs are entered', () => {
      const propertyInput = screen.getByLabelText(
        /property value/i
      ) as HTMLInputElement;
      const depositInput = screen.getByLabelText(
        /deposit/i
      ) as HTMLInputElement;
      const interestInput = screen.getByLabelText(
        /interest rate/i
      ) as HTMLInputElement;
      const termInput = screen.getByLabelText(
        /mortgage term/i
      ) as HTMLInputElement;

      fireEvent.change(propertyInput, { target: { value: '200000' } });
      fireEvent.change(depositInput, { target: { value: '40000' } });
      fireEvent.change(interestInput, { target: { value: '3' } });
      fireEvent.change(termInput, { target: { value: '25' } });

      expect(screen.getByText(/£758.74/i)).toBeInTheDocument();
    });

    it('resets inputs and errors when close button is clicked', () => {
      const propertyInput = screen.getByLabelText(
        /property value/i
      ) as HTMLInputElement;
      const depositInput = screen.getByLabelText(
        /deposit/i
      ) as HTMLInputElement;
      const interestInput = screen.getByLabelText(
        /interest rate/i
      ) as HTMLInputElement;
      const termInput = screen.getByLabelText(
        /mortgage term/i
      ) as HTMLInputElement;
      const closeButton = screen.getByLabelText(/close calculator/i);

      fireEvent.change(propertyInput, { target: { value: '200000' } });
      fireEvent.change(depositInput, { target: { value: '400000' } });
      fireEvent.change(interestInput, { target: { value: '-5' } });
      fireEvent.change(termInput, { target: { value: '-5' } });

      expect(propertyInput.value).toBe('200000');
      expect(depositInput.value).toBe('400000');
      expect(termInput.value).toBe('-5');
      expect(interestInput.value).toBe('-5');

      fireEvent.blur(propertyInput);
      fireEvent.blur(depositInput);
      fireEvent.blur(termInput);
      fireEvent.blur(interestInput);

      expect(
        screen.getByText(
          'The property value needs to be more than the deposit.'
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText('The deposit must be less than the property value.')
      ).toBeInTheDocument();
      expect(
        screen.getByText('Please enter an interest rate between 0% and 100%.')
      ).toBeInTheDocument();
      expect(
        screen.getByText('Please enter a mortgage term between 0 and 45 years.')
      ).toBeInTheDocument();

      fireEvent.click(closeButton);

      const reopenButton = screen.getByLabelText(/reopen calculator/i);
      fireEvent.click(reopenButton);

      expect(screen.getByText('Mortgage Calculator')).toBeInTheDocument();

      const updatedPropertyInput = screen.getByLabelText(
        /property value/i
      ) as HTMLInputElement;
      const updatedDepositInput = screen.getByLabelText(
        /deposit/i
      ) as HTMLInputElement;
      const updatedInterestInput = screen.getByLabelText(
        /interest rate/i
      ) as HTMLInputElement;
      const updatedTermInput = screen.getByLabelText(
        /mortgage term/i
      ) as HTMLInputElement;

      expect(updatedPropertyInput.value).toBe('');
      expect(updatedDepositInput.value).toBe('');
      expect(updatedInterestInput.value).toBe('');
      expect(updatedTermInput.value).toBe('');

      expect(
        screen.queryByText(
          'The property value needs to be more than the deposit.'
        )
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText('The deposit must be less than the property value.')
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText('Please enter an interest rate between 0% and 100%.')
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(
          'Please enter a mortgage term between 0 and 45 years.'
        )
      ).not.toBeInTheDocument();
    });
  });
});
