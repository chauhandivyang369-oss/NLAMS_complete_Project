/**
 * Form-I Statutory Validators
 * Implements validation rules for all 10 wizards
 */

export function validateEmail(email) {
  if (!email) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePhone(phone) {
  if (!phone) return false;
  const clean = phone.replace(/[^0-9]/g, '');
  return clean.length >= 10;
}

export function validateUlpin(ulpin) {
  if (!ulpin) return false;
  return /^\d{14}$/.test(ulpin.trim());
}

export function validateCinGstin(val) {
  if (!val) return false;
  const trimmed = val.trim();
  // CIN is 21 alphanumeric; GSTIN is 15 alphanumeric
  return /^[A-Z0-9]{15,21}$/i.test(trimmed);
}

/**
 * Step-by-Step Statutory Validator for Form-I Wizard
 */
export function validateStep(stepNumber, formData) {
  const errors = {};

  switch (stepNumber) {
    case 1: {
      if (!formData.projectScenario) {
        errors.projectScenario = 'Please select project scenario (Government, PPP, or Private).';
      }
      if (formData.projectScenario === 'GOVERNMENT' && !formData.governmentLevel) {
        errors.governmentLevel = 'Please select Government Level (Central/National or State).';
      }
      if (formData.projectScenario === 'PPP') {
        if (!formData.pppSector) errors.pppSector = 'PPP Sector is mandatory.';
        if (!formData.sponsoringPublicEntity) errors.sponsoringPublicEntity = 'Sponsoring Public Entity is mandatory.';
        if (!formData.concessionaireEntity) errors.concessionaireEntity = 'Concessionaire / Implementing Entity is mandatory.';
      }
      if (formData.projectScenario === 'PRIVATE') {
        if (!formData.privateSectorCategory) errors.privateSectorCategory = 'Private Sector Category is mandatory.';
        if (!formData.privateEntityName) errors.privateEntityName = 'Private Entity Name is mandatory.';
      }
      if (!formData.requisitioningBodyName) {
        errors.requisitioningBodyName = 'Requisitioning Body Name is required.';
      }
      if (!formData.nodalOfficerName) {
        errors.nodalOfficerName = 'Nodal Officer Name is required.';
      }
      if (!formData.nodalOfficerDesignation) {
        errors.nodalOfficerDesignation = 'Nodal Officer Designation is required.';
      }
      if (!validateEmail(formData.officialEmail)) {
        errors.officialEmail = 'Valid official email is required.';
      }
      if (!validatePhone(formData.mobile)) {
        errors.mobile = 'Valid 10-digit mobile number is required.';
      }
      if (!formData.appropriateGovernment) {
        errors.appropriateGovernment = 'Appropriate Government / Ministry is required.';
      }
      if (formData.isFourthScheduleAct && !formData.fourthScheduleAct) {
        errors.fourthScheduleAct = 'Please select the applicable Fourth Schedule Special Act.';
      }
      if (formData.isSection40Urgency) {
        if (!formData.urgencyGround) errors.urgencyGround = 'Urgency ground is required under Section 40.';
        if (!formData.urgencyJustification) errors.urgencyJustification = 'Detailed statutory justification is required.';
      }
      if (formData.isTemporaryOccupation) {
        if (!formData.temporaryOccupationPurpose) errors.temporaryOccupationPurpose = 'Purpose of temporary occupation is required.';
        if (!formData.temporaryOccupationTerm) errors.temporaryOccupationTerm = 'Term duration is required.';
      }
      break;
    }

    case 2: {
      if (formData.isPiaDifferent) {
        if (!formData.pias || formData.pias.length === 0) {
          errors.pias = 'At least one Project Implementing Agency (PIA) is required when designated.';
        } else {
          formData.pias.forEach((pia, idx) => {
            if (!pia.entityName) errors[`pia_${idx}_name`] = 'Entity legal name is mandatory.';
            if (!pia.cinGstin || !validateCinGstin(pia.cinGstin)) errors[`pia_${idx}_cin`] = 'Valid CIN (21 digits) or GSTIN (15 digits) is required.';
            if (!pia.nodalPerson) errors[`pia_${idx}_person`] = 'Nodal person name is required.';
            if (!validateEmail(pia.email)) errors[`pia_${idx}_email`] = 'Valid official email is required.';
            if (!validatePhone(pia.contact)) errors[`pia_${idx}_contact`] = 'Valid contact number is required.';
          });
        }
      }
      break;
    }

    case 3: {
      if (!formData.projectTitle || formData.projectTitle.trim().length < 5) {
        errors.projectTitle = 'Project Title is mandatory (max 250 characters).';
      }
      if (!formData.publicPurposeDetails || formData.publicPurposeDetails.trim().length < 20) {
        errors.publicPurposeDetails = 'Detailed Public Purpose justification (RFCTLARR Sec. 2(1)) is required (min 20 chars).';
      }
      if (!formData.gestationYears && !formData.gestationMonths) {
        errors.gestation = 'Please enter estimated gestation period.';
      }
      if (!formData.adminSanctionRef) {
        errors.adminSanctionRef = 'Administrative Sanction Ref Number is required.';
      }
      if (!formData.adminApprovalDate) {
        errors.adminApprovalDate = 'Administrative Approval Date is required.';
      }
      break;
    }

    case 4: {
      if (!formData.jurisdictionLevel) {
        errors.jurisdictionLevel = 'Select Jurisdiction Level (Single District, Multi-District, or Multi-State).';
      }
      if (!formData.selectedDistricts || formData.selectedDistricts.length === 0) {
        errors.selectedDistricts = 'Please select at least one district.';
      }
      break;
    }

    case 5: {
      if (!formData.selectedParcels || formData.selectedParcels.length === 0) {
        errors.selectedParcels = 'At least one cadastral land parcel must be selected / imported via GIS.';
      }
      break;
    }

    case 6: {
      if (formData.isMultiCropIrrigated && (!formData.multiCropAreaHa || Number(formData.multiCropAreaHa) <= 0)) {
        errors.multiCropAreaHa = 'Please enter irrigated multi-crop land extent in Hectares.';
      }
      if (formData.isMultiCropIrrigated && !formData.multiCropJustification) {
        errors.multiCropJustification = 'Statutory justification for multi-crop acquisition is mandatory under Section 10.';
      }
      break;
    }

    case 7: {
      if (formData.estLandownerFamilies === '' || formData.estLandownerFamilies === null) {
        errors.estLandownerFamilies = 'Estimated Landowner Families Count is required.';
      }
      if (formData.estLivelihoodDependentFamilies === '' || formData.estLivelihoodDependentFamilies === null) {
        errors.estLivelihoodDependentFamilies = 'Estimated Livelihood-Dependent Families Count is required.';
      }
      if (formData.estScStFamilies === '' || formData.estScStFamilies === null) {
        errors.estScStFamilies = 'Estimated SC/ST Families Count is required.';
      }
      if (formData.estDisplacedFamilies === '' || formData.estDisplacedFamilies === null) {
        errors.estDisplacedFamilies = 'Estimated Displaced Families Count is required.';
      }
      break;
    }

    case 8: {
      if (!formData.estCompensationBudgetCr || Number(formData.estCompensationBudgetCr) <= 0) {
        errors.estCompensationBudgetCr = 'Estimated Total Compensation Budget (INR) is required.';
      }
      if (!formData.fundingSource) {
        errors.fundingSource = 'Funding Source is mandatory.';
      }
      if (!formData.hasAdminCostUndertaking) {
        errors.hasAdminCostUndertaking = 'The 5% Administrative Cost Statutory Undertaking is mandatory under RFCTLARR rules.';
      }
      break;
    }

    case 9: {
      if (!formData.documents || !formData.documents.adminSanction) {
        errors.adminSanctionDoc = 'Administrative Sanction / Approval Order upload is mandatory.';
      }
      if (!formData.documents || !formData.documents.surveyMap) {
        errors.surveyMapDoc = 'Combined Revenue Survey Map upload is mandatory.';
      }
      break;
    }

    case 10: {
      if (!formData.sovereignDeclarationAccepted) {
        errors.declaration = 'Sovereign Attestation & Declaration must be accepted before submission.';
      }
      break;
    }

    default:
      break;
  }

  return errors;
}
