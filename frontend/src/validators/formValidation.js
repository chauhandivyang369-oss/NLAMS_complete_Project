/**
 * NLAMS - Statutory Form-I & Cadastral Validators
 */

export function validateFormI(formData) {
  const errors = {};

  if (!formData.executingAgency?.trim()) {
    errors.executingAgency = 'Executing Agency is required';
  }

  if (!formData.projectName?.trim()) {
    errors.projectName = 'Project name is required';
  }

  if (!formData.extentRequiredHa || Number(formData.extentRequiredHa) <= 0) {
    errors.extentRequiredHa = 'Total land extent must be greater than 0';
  }

  if (!formData.estimatedCostCr || Number(formData.estimatedCostCr) <= 0) {
    errors.estimatedCostCr = 'Estimated compensation must be specified';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
