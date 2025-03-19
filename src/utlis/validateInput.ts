export const validateInput = (
    field: string,
    value: number | string,
    propertyValue?: number,
    deposit?: number) => {

    const numericValue = Number(value);


    if (value === "" || isNaN(numericValue)) {
        return `Please enter a valid ${field
            .replace(/([A-Z])/g, " $1")
            .trim()
            .toLowerCase()}.`;
    }

    switch (field) {
        case "propertyValue":
            if (numericValue <= 0) {
                return "Please enter a property value greater than 0.";
            }
            if (deposit !== undefined && numericValue <= deposit) {
                return "The property value needs to be more than the deposit.";
            }
            break;
        case "deposit":
            if (numericValue < 0) {
                return "The deposit cannot be negative.";
            }
            if (propertyValue !== undefined && numericValue >= propertyValue) {
                return "The deposit must be less than the property value.";
            }
            break;
        case "interestRate":
            if (numericValue <= 0 || numericValue > 100) {
                return "Please enter an interest rate between 0% and 100%.";
            }
            break;
        case "mortgageTermYears":
            if (numericValue <= 0 || numericValue > 45) {
                return "Please enter a mortgage term between 0 and 45 years.";
            }
            break;
        default:
            return "";
    }
    return "";
};