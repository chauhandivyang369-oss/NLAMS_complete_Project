-- ==============================================================================================
-- NATIONAL LAND ACQUISITION & MANAGEMENT SYSTEM (NLAMS)
-- MASTER DATABASE SCHEMA (POSTGRESQL 15+ WITH POSTGIS 3.3+)
-- Compliant with: RFCTLARR Act 2013 | LGD | DILRMP | NIC Bhu-Naksha | ISRO Bhuvan Standards
-- Schema Version: 2.5 (Enterprise Monorepo Edition)
-- ==============================================================================================

CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE SCHEMA IF NOT EXISTS nlams;
SET search_path TO nlams, public;

-- ==============================================================================================
-- 1. ADMINISTRATIVE GEOGRAPHY & REGIONAL HIERARCHY
-- ==============================================================================================

CREATE TABLE IF NOT EXISTS states (
    state_id BIGSERIAL PRIMARY KEY,
    state_code VARCHAR(10) UNIQUE NOT NULL,
    state_name VARCHAR(100) UNIQUE NOT NULL,
    is_union_territory BOOLEAN NOT NULL DEFAULT FALSE,
    has_legislative_assembly BOOLEAN,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS districts (
    district_id BIGSERIAL PRIMARY KEY,
    state_id BIGINT NOT NULL REFERENCES states(state_id) ON DELETE RESTRICT,
    district_code VARCHAR(30) UNIQUE NOT NULL,
    district_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_districts_state_name UNIQUE (state_id, district_name)
);

CREATE TABLE IF NOT EXISTS talukas (
    taluka_id BIGSERIAL PRIMARY KEY,
    district_id BIGINT NOT NULL REFERENCES districts(district_id) ON DELETE RESTRICT,
    taluka_code VARCHAR(30) UNIQUE NOT NULL,
    taluka_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_talukas_district_name UNIQUE (district_id, taluka_name)
);

CREATE TABLE IF NOT EXISTS villages (
    village_id BIGSERIAL PRIMARY KEY,
    taluka_id BIGINT NOT NULL REFERENCES talukas(taluka_id) ON DELETE RESTRICT,
    village_code VARCHAR(30) UNIQUE NOT NULL,
    village_name VARCHAR(100) NOT NULL,
    geom GEOMETRY(MultiPolygon, 4326),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_villages_taluka_name UNIQUE (taluka_id, village_name)
);
CREATE INDEX IF NOT EXISTS idx_villages_geom ON villages USING GIST(geom);

-- ==============================================================================================
-- 2. USER MANAGEMENT, ROLES & STAKEHOLDER DIRECTORY (RBAC)
-- ==============================================================================================

CREATE TABLE IF NOT EXISTS land_authorities (
    authority_id BIGSERIAL PRIMARY KEY,
    district_id BIGINT NOT NULL REFERENCES districts(district_id),
    authority_type VARCHAR(30) NOT NULL CHECK (authority_type IN ('COLLECTOR','CALA','LAO','SLAO','TRIBUNAL','OTHER')),
    office_name VARCHAR(200) NOT NULL,
    officer_name VARCHAR(200),
    officer_designation VARCHAR(150),
    official_email VARCHAR(200),
    official_phone VARCHAR(30),
    office_address TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    last_verified_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS special_acts (
    special_act_id BIGSERIAL PRIMARY KEY,
    act_name VARCHAR(300) UNIQUE NOT NULL,
    act_short_name VARCHAR(150),
    source_reference TEXT,
    active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS requisitioning_bodies (
    requiring_body_id BIGSERIAL PRIMARY KEY,
    body_name VARCHAR(300) UNIQUE NOT NULL,
    body_category VARCHAR(50) NOT NULL,
    government_level VARCHAR(30),
    ministry_department VARCHAR(300),
    state_id BIGINT REFERENCES states(state_id),
    cin_gstin VARCHAR(50),
    official_email VARCHAR(200),
    official_phone VARCHAR(30),
    address TEXT,
    active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS users (
    user_id BIGSERIAL PRIMARY KEY,
    full_name VARCHAR(200) NOT NULL,
    email VARCHAR(200) UNIQUE NOT NULL,
    mobile VARCHAR(30),
    password_hash TEXT,
    role_group VARCHAR(50) NOT NULL,
    designation VARCHAR(150),
    state_id BIGINT REFERENCES states(state_id),
    district_id BIGINT REFERENCES districts(district_id),
    status VARCHAR(30) NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE','INACTIVE','LOCKED')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS pia_entities (
    pia_id BIGSERIAL PRIMARY KEY,
    legal_name VARCHAR(300) NOT NULL,
    cin_gstin VARCHAR(50),
    cin_verified BOOLEAN NOT NULL DEFAULT FALSE,
    entity_type VARCHAR(80),
    nodal_person_name VARCHAR(200),
    authorized_email VARCHAR(200),
    authorized_phone VARCHAR(30),
    address TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS pia_people (
    pia_person_id BIGSERIAL PRIMARY KEY,
    pia_id BIGINT NOT NULL REFERENCES pia_entities(pia_id) ON DELETE CASCADE,
    user_id BIGINT REFERENCES users(user_id),
    full_name VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL,
    mobile VARCHAR(30),
    designation VARCHAR(150),
    active BOOLEAN NOT NULL DEFAULT TRUE
);

-- ==============================================================================================
-- 3. PROJECTS & FORM-I REQUISITION CORE
-- ==============================================================================================

CREATE TABLE IF NOT EXISTS projects (
    project_id BIGSERIAL PRIMARY KEY,
    project_code VARCHAR(60) UNIQUE NOT NULL,
    project_title VARCHAR(250) NOT NULL,
    project_type VARCHAR(20) NOT NULL CHECK (project_type IN ('GOVERNMENT','PPP','PRIVATE')),
    public_purpose TEXT,
    gestation_years INTEGER,
    gestation_months INTEGER CHECK (gestation_months BETWEEN 0 AND 11),
    administrative_sanction_ref VARCHAR(150),
    administrative_approval_date DATE,
    requiring_body_id BIGINT REFERENCES requisitioning_bodies(requiring_body_id),
    status VARCHAR(40) NOT NULL DEFAULT 'DRAFT' CHECK (status IN ('DRAFT','UNDER_REVIEW','READY_FOR_SUBMISSION','SUBMITTED','IN_PROCESS','CLOSED')),
    created_by BIGINT REFERENCES users(user_id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS form1_requisitions (
    form1_id BIGSERIAL PRIMARY KEY,
    project_id BIGINT UNIQUE NOT NULL REFERENCES projects(project_id) ON DELETE CASCADE,
    government_level VARCHAR(30),
    ppp_sector VARCHAR(150),
    ppp_sponsoring_public_entity VARCHAR(300),
    ppp_concessionaire_or_implementing_entity VARCHAR(300),
    private_sector_category VARCHAR(150),
    private_entity_name VARCHAR(300),
    nodal_officer_name VARCHAR(200),
    nodal_officer_designation VARCHAR(150),
    official_email VARCHAR(200),
    mobile VARCHAR(30),
    official_address TEXT,
    appropriate_government_ministry VARCHAR(300),
    fourth_schedule_special_act BOOLEAN NOT NULL DEFAULT FALSE,
    special_act_id BIGINT REFERENCES special_acts(special_act_id),
    ut_applicability BOOLEAN NOT NULL DEFAULT FALSE,
    ut_name VARCHAR(100),
    ut_has_legislative_assembly BOOLEAN,
    section40_urgency BOOLEAN NOT NULL DEFAULT FALSE,
    section40_ground VARCHAR(200),
    section40_justification TEXT,
    temporary_occupation BOOLEAN NOT NULL DEFAULT FALSE,
    temporary_occupation_purpose TEXT,
    temporary_occupation_term VARCHAR(100),
    reason_for_delay TEXT,
    irrigated_multicrop_area_ha NUMERIC(14,4),
    multicrop_justification TEXT,
    alternate_wasteland_explored BOOLEAN,
    alternate_wasteland_details TEXT,
    alternate_wasteland_area_ha NUMERIC(14,4),
    estimated_landowner_families INTEGER,
    estimated_livelihood_dependent_families INTEGER,
    estimated_sc_families INTEGER,
    estimated_st_families INTEGER,
    estimated_displaced_families INTEGER,
    estimated_total_compensation_budget NUMERIC(18,2),
    funding_source VARCHAR(150),
    fund_allocation_reference VARCHAR(150),
    final_declaration_accepted BOOLEAN NOT NULL DEFAULT FALSE,
    signature_status VARCHAR(40) NOT NULL DEFAULT 'NOT_STARTED' CHECK (signature_status IN ('NOT_STARTED','READY','SIGNED','FAILED')),
    workflow_status VARCHAR(40) NOT NULL DEFAULT 'DRAFT' CHECK (workflow_status IN ('DRAFT','VALIDATION','READY','SIGNED','SUBMITTED')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS project_jurisdictions (
    project_jurisdiction_id BIGSERIAL PRIMARY KEY,
    project_id BIGINT NOT NULL REFERENCES projects(project_id) ON DELETE CASCADE,
    jurisdiction_level VARCHAR(30) NOT NULL CHECK (jurisdiction_level IN ('SINGLE_DISTRICT','MULTI_DISTRICT','MULTI_STATE')),
    state_id BIGINT NOT NULL REFERENCES states(state_id),
    district_id BIGINT NOT NULL REFERENCES districts(district_id),
    authority_id BIGINT REFERENCES land_authorities(authority_id),
    collector_office_name VARCHAR(200),
    collector_officer_name VARCHAR(200),
    collector_designation VARCHAR(150),
    official_email VARCHAR(200),
    official_phone VARCHAR(30),
    office_address TEXT,
    district_code VARCHAR(30),
    auto_fetched BOOLEAN NOT NULL DEFAULT FALSE,
    last_verified_at TIMESTAMPTZ,
    CONSTRAINT uq_project_jurisdictions UNIQUE (project_id, district_id)
);

CREATE TABLE IF NOT EXISTS project_pias (
    project_pia_id BIGSERIAL PRIMARY KEY,
    project_id BIGINT NOT NULL REFERENCES projects(project_id) ON DELETE CASCADE,
    pia_id BIGINT NOT NULL REFERENCES pia_entities(pia_id),
    role_description VARCHAR(200),
    board_resolution_or_concession_document_id BIGINT,
    is_primary BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_project_pias UNIQUE (project_id, pia_id)
);

-- ==============================================================================================
-- 4. GIS, SPATIAL CADASTRE & ULPIN REVENUE LAND RECORDS
-- ==============================================================================================

CREATE TABLE IF NOT EXISTS project_alignments (
    alignment_id BIGSERIAL PRIMARY KEY,
    project_id BIGINT NOT NULL REFERENCES projects(project_id) ON DELETE CASCADE,
    alignment_name VARCHAR(200),
    source_format VARCHAR(30) CHECK (source_format IN ('KML','KMZ','SHAPEFILE_ZIP','GEOJSON','DRAWN')),
    original_file_name VARCHAR(300),
    geometry GEOMETRY(Geometry, 4326),
    buffer_meters NUMERIC(10,2) DEFAULT 50,
    total_length_km NUMERIC(14,4),
    total_area_ha NUMERIC(14,4),
    upload_status VARCHAR(30) NOT NULL DEFAULT 'UPLOADED',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_project_alignments_geom ON project_alignments USING GIST(geometry);

CREATE TABLE IF NOT EXISTS cadastral_parcels (
    ulpin VARCHAR(14) PRIMARY KEY CHECK (ulpin ~ '^[0-9]{14}$'),
    survey_no VARCHAR(50) NOT NULL,
    village_code VARCHAR(30) REFERENCES villages(village_code),
    village_name VARCHAR(100) NOT NULL,
    taluka_name VARCHAR(100) NOT NULL,
    district_name VARCHAR(100) NOT NULL,
    state_name VARCHAR(100) NOT NULL,
    total_area_acre NUMERIC(12,2) NOT NULL CHECK (total_area_acre > 0),
    total_area_hectare NUMERIC(12,2) GENERATED ALWAYS AS (ROUND(total_area_acre * 0.404686, 2)) STORED,
    land_use VARCHAR(80) NOT NULL,
    statutory_status VARCHAR(80) NOT NULL,
    color_code VARCHAR(10) NOT NULL,
    geom GEOMETRY(Polygon, 4326) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_cadastral_parcels_geom ON cadastral_parcels USING GIST(geom);
CREATE INDEX IF NOT EXISTS idx_cadastral_survey_no ON cadastral_parcels (survey_no);
CREATE INDEX IF NOT EXISTS idx_cadastral_village ON cadastral_parcels (village_name);
CREATE INDEX IF NOT EXISTS idx_cadastral_district ON cadastral_parcels (district_name);

CREATE TABLE IF NOT EXISTS project_parcels (
    project_parcel_id BIGSERIAL PRIMARY KEY,
    project_id BIGINT NOT NULL REFERENCES projects(project_id) ON DELETE CASCADE,
    ulpin VARCHAR(14) NOT NULL REFERENCES cadastral_parcels(ulpin),
    selected_source VARCHAR(30) NOT NULL DEFAULT 'GIS' CHECK (selected_source IN ('GIS','ULPIN_IMPORT','MANUAL')),
    affected_area_acre NUMERIC(12,2),
    impact_percentage NUMERIC(7,3),
    selection_status VARCHAR(40) NOT NULL DEFAULT 'SELECTED',
    district_packet_status VARCHAR(40) NOT NULL DEFAULT 'MASTER',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_project_parcels UNIQUE (project_id, ulpin)
);
CREATE INDEX IF NOT EXISTS idx_project_parcels_project ON project_parcels (project_id);

CREATE TABLE IF NOT EXISTS form1_land_entries (
    land_entry_id BIGSERIAL PRIMARY KEY,
    project_id BIGINT NOT NULL REFERENCES projects(project_id) ON DELETE CASCADE,
    ulpin VARCHAR(14),
    survey_no VARCHAR(50),
    sub_division VARCHAR(50),
    village_name VARCHAR(100),
    taluka_name VARCHAR(100),
    district_id BIGINT REFERENCES districts(district_id),
    area_ha NUMERIC(14,4),
    source_type VARCHAR(30) NOT NULL DEFAULT 'MANUAL' CHECK (source_type IN ('ULPIN_API','CSV_IMPORT','EXCEL_IMPORT','MANUAL','GIS')),
    verification_status VARCHAR(40) NOT NULL DEFAULT 'PENDING' CHECK (verification_status IN ('PENDING','VERIFIED','NOT_FOUND','MISMATCH')),
    linked_ulpin VARCHAR(14) REFERENCES cadastral_parcels(ulpin),
    raw_import_row JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_form1_land_entries_project ON form1_land_entries (project_id);

CREATE TABLE IF NOT EXISTS gis_project_snapshots (
    snapshot_id BIGSERIAL PRIMARY KEY,
    project_id BIGINT NOT NULL REFERENCES projects(project_id) ON DELETE CASCADE,
    alignment_id BIGINT REFERENCES project_alignments(alignment_id),
    snapshot_type VARCHAR(30) NOT NULL DEFAULT 'REVIEW' CHECK (snapshot_type IN ('REVIEW','SUBMISSION','DISTRICT_PACKET')),
    file_reference TEXT,
    bbox JSONB,
    center_lat NUMERIC(10,7),
    center_lon NUMERIC(10,7),
    zoom_level NUMERIC(6,2),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS land_owners (
    owner_id BIGSERIAL PRIMARY KEY,
    ulpin VARCHAR(14) NOT NULL REFERENCES cadastral_parcels(ulpin) ON DELETE CASCADE,
    khata_no VARCHAR(50) NOT NULL,
    owner_name VARCHAR(200) NOT NULL,
    relative_name VARCHAR(200),
    relationship_type VARCHAR(50) DEFAULT 'Father',
    share_percentage NUMERIC(5,2) NOT NULL CHECK (share_percentage > 0 AND share_percentage <= 100),
    mobile_masked VARCHAR(20),
    id_reference VARCHAR(80),
    bank_linked BOOLEAN NOT NULL DEFAULT TRUE,
    is_disputed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_land_owners_ulpin ON land_owners (ulpin);

CREATE TABLE IF NOT EXISTS acquisition_cases (
    case_id VARCHAR(50) PRIMARY KEY,
    project_id BIGINT REFERENCES projects(project_id) ON DELETE CASCADE,
    project_name VARCHAR(250) NOT NULL,
    ulpin VARCHAR(14) NOT NULL REFERENCES cadastral_parcels(ulpin) ON DELETE CASCADE,
    affected_area_acre NUMERIC(12,2) NOT NULL,
    impact_percentage NUMERIC(7,3) NOT NULL,
    solatium_multiplier NUMERIC(4,2),
    market_rate_per_acre NUMERIC(18,2),
    compensation_awarded NUMERIC(18,2),
    compensation_status VARCHAR(60) NOT NULL,
    rr_applicable BOOLEAN NOT NULL DEFAULT FALSE,
    rr_status VARCHAR(60) NOT NULL DEFAULT 'Not Applicable',
    hearing_date DATE,
    objections_count INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_acquisition_cases_ulpin ON acquisition_cases (ulpin);
CREATE INDEX IF NOT EXISTS idx_acquisition_cases_project ON acquisition_cases (project_id);

CREATE TABLE IF NOT EXISTS form1_assets (
    asset_id BIGSERIAL PRIMARY KEY,
    project_id BIGINT NOT NULL REFERENCES projects(project_id) ON DELETE CASCADE,
    ulpin VARCHAR(14) REFERENCES cadastral_parcels(ulpin),
    asset_category VARCHAR(30) NOT NULL CHECK (asset_category IN ('STRUCTURE','WATER','FRUIT_TREE','TIMBER_TREE','STANDING_CROP')),
    asset_type VARCHAR(100) NOT NULL,
    quantity NUMERIC(14,2),
    plinth_area_sqm NUMERIC(14,2),
    construction_quality VARCHAR(30),
    depth_m NUMERIC(14,2),
    species VARCHAR(150),
    crop_area_ha NUMERIC(14,4),
    notes TEXT
);

-- ==============================================================================================
-- 5. REHABILITATION & RESETTLEMENT (R&R), FINANCIALS & ESCROW
-- ==============================================================================================

CREATE TABLE IF NOT EXISTS form1_rr_estimates (
    rr_estimate_id BIGSERIAL PRIMARY KEY,
    project_id BIGINT NOT NULL REFERENCES projects(project_id) ON DELETE CASCADE,
    district_id BIGINT REFERENCES districts(district_id),
    estimated_landowner_families INTEGER DEFAULT 0,
    estimated_livelihood_dependent_families INTEGER DEFAULT 0,
    estimated_sc_families INTEGER DEFAULT 0,
    estimated_st_families INTEGER DEFAULT 0,
    estimated_displaced_families INTEGER DEFAULT 0,
    estimate_source VARCHAR(40) DEFAULT 'MANUALLY_ENTERED',
    notes TEXT,
    CONSTRAINT uq_form1_rr_estimates UNIQUE (project_id, district_id)
);

CREATE TABLE IF NOT EXISTS form1_documents (
    document_id BIGSERIAL PRIMARY KEY,
    project_id BIGINT NOT NULL REFERENCES projects(project_id) ON DELETE CASCADE,
    document_type VARCHAR(80) NOT NULL CHECK (document_type IN (
        'ADMINISTRATIVE_APPROVAL', 'REVENUE_SURVEY_MAP', 'LEGAL_UNDERTAKING',
        'COURT_DECREE_UNDERTAKING', 'BUDGET_FUND_ALLOCATION', 'SCENARIO_SUPPORTING'
    )),
    document_name VARCHAR(300) NOT NULL,
    file_reference TEXT,
    mime_type VARCHAR(100),
    document_date DATE,
    version_no INTEGER NOT NULL DEFAULT 1,
    upload_status VARCHAR(30) NOT NULL DEFAULT 'UPLOADED',
    ai_ocr_status VARCHAR(30) DEFAULT 'NOT_RUN',
    ai_consistency_status VARCHAR(30) DEFAULT 'NOT_RUN',
    created_by BIGINT REFERENCES users(user_id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS form1_financials (
    financial_id BIGSERIAL PRIMARY KEY,
    project_id BIGINT UNIQUE NOT NULL REFERENCES projects(project_id) ON DELETE CASCADE,
    estimated_compensation_budget NUMERIC(18,2),
    funding_source VARCHAR(150),
    fund_allocation_reference VARCHAR(150),
    collector_escrow_bank_name VARCHAR(200),
    collector_escrow_account_holder VARCHAR(200),
    collector_escrow_account_no VARCHAR(100),
    collector_escrow_ifsc VARCHAR(20),
    collector_escrow_branch VARCHAR(200),
    admin_cost_undertaking BOOLEAN NOT NULL DEFAULT FALSE,
    admin_cost_undertaking_document_id BIGINT REFERENCES form1_documents(document_id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS form1_financial_districts (
    district_financial_id BIGSERIAL PRIMARY KEY,
    project_id BIGINT NOT NULL REFERENCES projects(project_id) ON DELETE CASCADE,
    district_id BIGINT NOT NULL REFERENCES districts(district_id),
    estimated_compensation NUMERIC(18,2),
    estimated_sia_cost NUMERIC(18,2),
    estimated_admin_cost NUMERIC(18,2),
    estimated_total NUMERIC(18,2),
    notes TEXT,
    CONSTRAINT uq_form1_financial_districts UNIQUE (project_id, district_id)
);

CREATE TABLE IF NOT EXISTS escrow_accounts (
    escrow_id BIGSERIAL PRIMARY KEY,
    project_id BIGINT NOT NULL REFERENCES projects(project_id),
    district_id BIGINT NOT NULL REFERENCES districts(district_id),
    bank_name VARCHAR(200) NOT NULL,
    account_number VARCHAR(100) UNIQUE NOT NULL,
    ifsc_code VARCHAR(20) NOT NULL,
    balance_amount NUMERIC(18,2) NOT NULL DEFAULT 0.00,
    held_in_dispute NUMERIC(18,2) NOT NULL DEFAULT 0.00,
    disbursed_total NUMERIC(18,2) NOT NULL DEFAULT 0.00,
    status VARCHAR(30) NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE','FROZEN','CLOSED')),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS escrow_transactions (
    txn_id BIGSERIAL PRIMARY KEY,
    escrow_id BIGINT NOT NULL REFERENCES escrow_accounts(escrow_id),
    txn_type VARCHAR(40) NOT NULL CHECK (txn_type IN ('DEPOSIT','DISBURSEMENT','TRIBUNAL_HOLD','INTEREST_CREDIT','REVERSAL')),
    amount NUMERIC(18,2) NOT NULL,
    beneficiary_name VARCHAR(200),
    beneficiary_account VARCHAR(100),
    beneficiary_ifsc VARCHAR(20),
    pfms_reference_id VARCHAR(100),
    dbt_status VARCHAR(40) DEFAULT 'PENDING' CHECK (dbt_status IN ('PENDING','SUBMITTED','SUCCESS','FAILED','RECONCILED')),
    initiated_by BIGINT REFERENCES users(user_id),
    remarks TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ==============================================================================================
-- 6. WORKFLOW SUBMISSION, AUDIT, & VALIDATIONS
-- ==============================================================================================

CREATE TABLE IF NOT EXISTS form1_validation_results (
    validation_id BIGSERIAL PRIMARY KEY,
    form1_id BIGINT NOT NULL REFERENCES form1_requisitions(form1_id) ON DELETE CASCADE,
    wizard_no INTEGER NOT NULL CHECK (wizard_no BETWEEN 1 AND 10),
    check_code VARCHAR(100) NOT NULL,
    check_title VARCHAR(250) NOT NULL,
    result VARCHAR(20) NOT NULL CHECK (result IN ('PASS','WARNING','FAIL','NOT_APPLICABLE')),
    message TEXT,
    checked_by VARCHAR(30) NOT NULL DEFAULT 'SYSTEM',
    checked_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_form1_validation_form ON form1_validation_results (form1_id);

CREATE TABLE IF NOT EXISTS form1_signatures (
    signature_id BIGSERIAL PRIMARY KEY,
    form1_id BIGINT UNIQUE NOT NULL REFERENCES form1_requisitions(form1_id) ON DELETE CASCADE,
    signer_user_id BIGINT REFERENCES users(user_id),
    signer_name VARCHAR(200),
    signer_designation VARCHAR(150),
    organisation_name VARCHAR(300),
    signature_method VARCHAR(30) CHECK (signature_method IN ('DSC','AADHAAR_ESIGN')),
    signature_reference VARCHAR(200),
    signed_at TIMESTAMPTZ,
    verification_status VARCHAR(40) NOT NULL DEFAULT 'PENDING'
);

CREATE TABLE IF NOT EXISTS form1_submissions (
    submission_id BIGSERIAL PRIMARY KEY,
    form1_id BIGINT UNIQUE NOT NULL REFERENCES form1_requisitions(form1_id) ON DELETE CASCADE,
    master_requisition_no VARCHAR(80) UNIQUE NOT NULL,
    submitted_by BIGINT REFERENCES users(user_id),
    submitted_at TIMESTAMPTZ,
    submission_status VARCHAR(40) NOT NULL DEFAULT 'DRAFT' CHECK (submission_status IN ('DRAFT','READY','SUBMITTED','FAILED')),
    pdf_file_reference TEXT,
    gis_snapshot_file_reference TEXT
);

CREATE TABLE IF NOT EXISTS form1_dispatch_packets (
    packet_id BIGSERIAL PRIMARY KEY,
    submission_id BIGINT NOT NULL REFERENCES form1_submissions(submission_id) ON DELETE CASCADE,
    district_id BIGINT NOT NULL REFERENCES districts(district_id),
    authority_id BIGINT REFERENCES land_authorities(authority_id),
    packet_reference VARCHAR(100) UNIQUE NOT NULL,
    packet_status VARCHAR(40) NOT NULL DEFAULT 'GENERATED',
    dispatched_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS pia_delegations (
    delegation_id BIGSERIAL PRIMARY KEY,
    project_id BIGINT NOT NULL REFERENCES projects(project_id) ON DELETE CASCADE,
    pia_id BIGINT NOT NULL REFERENCES pia_entities(pia_id),
    status VARCHAR(30) NOT NULL DEFAULT 'DRAFT' CHECK (status IN ('DRAFT','ACTIVE','REVOKED')),
    created_by BIGINT REFERENCES users(user_id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    finalized_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS pia_delegation_users (
    delegation_user_id BIGSERIAL PRIMARY KEY,
    delegation_id BIGINT NOT NULL REFERENCES pia_delegations(delegation_id) ON DELETE CASCADE,
    pia_person_id BIGINT NOT NULL REFERENCES pia_people(pia_person_id),
    assigned_designation VARCHAR(150),
    credential_dispatch_status VARCHAR(40) DEFAULT 'PENDING',
    credential_dispatched_at TIMESTAMPTZ,
    CONSTRAINT uq_pia_delegation_user UNIQUE (delegation_id, pia_person_id)
);

CREATE TABLE IF NOT EXISTS pia_delegation_permissions (
    permission_id BIGSERIAL PRIMARY KEY,
    delegation_id BIGINT NOT NULL REFERENCES pia_delegations(delegation_id) ON DELETE CASCADE,
    menu_key VARCHAR(80) NOT NULL,
    permission_level VARCHAR(30) NOT NULL CHECK (permission_level IN ('NO_ACCESS','VIEW','LIMITED')),
    CONSTRAINT uq_pia_delegation_menu UNIQUE (delegation_id, menu_key)
);

CREATE TABLE IF NOT EXISTS pia_delegation_field_permissions (
    field_permission_id BIGSERIAL PRIMARY KEY,
    delegation_id BIGINT NOT NULL REFERENCES pia_delegations(delegation_id) ON DELETE CASCADE,
    field_key VARCHAR(120) NOT NULL,
    permission_level VARCHAR(30) NOT NULL CHECK (permission_level IN ('NO_ACCESS','VIEW','EDIT')),
    CONSTRAINT uq_pia_delegation_field UNIQUE (delegation_id, field_key)
);

CREATE TABLE IF NOT EXISTS audit_logs (
    audit_id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(user_id),
    action VARCHAR(100) NOT NULL,
    module VARCHAR(100) NOT NULL,
    entity_type VARCHAR(100),
    entity_id VARCHAR(100),
    details JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs (created_at);
CREATE INDEX IF NOT EXISTS idx_audit_logs_entity ON audit_logs (entity_type, entity_id);

CREATE TABLE IF NOT EXISTS gis_service_catalog (
    service_id BIGSERIAL PRIMARY KEY,
    provider VARCHAR(150) NOT NULL,
    dataset_name VARCHAR(250) NOT NULL,
    service_type VARCHAR(30) NOT NULL,
    endpoint_url TEXT NOT NULL,
    layer_name VARCHAR(250),
    crs VARCHAR(30),
    coverage VARCHAR(100),
    verified BOOLEAN NOT NULL DEFAULT FALSE,
    notes TEXT
);

-- ==============================================================================================
-- 7. APPROPRIATE GOVERNMENT (SEC 11 NOTIFICATIONS & SEC 19 DECLARATIONS)
-- ==============================================================================================

CREATE TABLE IF NOT EXISTS statutory_gazette_notifications (
    notification_id BIGSERIAL PRIMARY KEY,
    project_id BIGINT NOT NULL REFERENCES projects(project_id),
    section_type VARCHAR(20) NOT NULL CHECK (section_type IN ('SECTION_4_SIA','SECTION_11_PRELIMINARY','SECTION_19_DECLARATION','SECTION_23_AWARD','SECTION_64_REFERENCE')),
    gazette_no VARCHAR(100) UNIQUE NOT NULL,
    issue_date DATE NOT NULL,
    published_date DATE,
    valid_upto_date DATE,
    egazette_url TEXT,
    publication_state VARCHAR(40) NOT NULL DEFAULT 'DRAFT' CHECK (publication_state IN ('DRAFT','PUBLISHED','BROADCASTED','EXPIRED','REVOKED')),
    content_text TEXT,
    created_by BIGINT REFERENCES users(user_id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ==============================================================================================
-- 8. SIA & IEG EXPERT GROUP APPRAISAL ENGINE
-- ==============================================================================================

CREATE TABLE IF NOT EXISTS sia_surveys (
    survey_id BIGSERIAL PRIMARY KEY,
    project_id BIGINT NOT NULL REFERENCES projects(project_id),
    agency_name VARCHAR(200) NOT NULL,
    start_date DATE NOT NULL,
    target_completion_date DATE NOT NULL,
    survey_status VARCHAR(40) NOT NULL DEFAULT 'IN_PROGRESS' CHECK (survey_status IN ('IN_PROGRESS','HEARING_SCHEDULED','REPORT_SUBMITTED','IEG_REVIEW','APPROVED','REJECTED')),
    total_families_surveyed INTEGER DEFAULT 0,
    impacted_structures_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sia_public_hearings (
    hearing_id BIGSERIAL PRIMARY KEY,
    survey_id BIGINT NOT NULL REFERENCES sia_surveys(survey_id) ON DELETE CASCADE,
    village_id BIGINT NOT NULL REFERENCES villages(village_id),
    hearing_date DATE NOT NULL,
    venue TEXT NOT NULL,
    quorum_attended INTEGER DEFAULT 0,
    video_recording_url TEXT,
    minutes_of_meeting TEXT,
    status VARCHAR(30) NOT NULL DEFAULT 'SCHEDULED' CHECK (status IN ('SCHEDULED','CONDUCTED','CANCELLED','ADJOURNED'))
);

CREATE TABLE IF NOT EXISTS sia_simp_items (
    simp_id BIGSERIAL PRIMARY KEY,
    survey_id BIGINT NOT NULL REFERENCES sia_surveys(survey_id) ON DELETE CASCADE,
    impact_category VARCHAR(100) NOT NULL,
    mitigation_strategy TEXT NOT NULL,
    responsible_agency VARCHAR(200),
    estimated_cost NUMERIC(18,2) NOT NULL DEFAULT 0.00,
    timeline_months INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS ieg_committees (
    committee_id BIGSERIAL PRIMARY KEY,
    survey_id BIGINT NOT NULL REFERENCES sia_surveys(survey_id),
    chairperson_name VARCHAR(200) NOT NULL,
    appraisal_status VARCHAR(40) NOT NULL DEFAULT 'IN_REVIEW' CHECK (appraisal_status IN ('IN_REVIEW','CONDITIONAL_APPROVAL','RECOMMENDED','REJECTED')),
    recommendation_summary TEXT,
    consensus_percentage NUMERIC(5,2),
    submitted_to_govt_at TIMESTAMPTZ
);

-- ==============================================================================================
-- 9. DISTRICT COLLECTOR & CLAIMS/OBJECTIONS ENGINE (SEC 15, SEC 21, SEC 23)
-- ==============================================================================================

CREATE TABLE IF NOT EXISTS objections_sec15 (
    objection_id BIGSERIAL PRIMARY KEY,
    project_id BIGINT NOT NULL REFERENCES projects(project_id),
    ulpin VARCHAR(14) NOT NULL REFERENCES cadastral_parcels(ulpin),
    claimant_name VARCHAR(200) NOT NULL,
    claimant_contact VARCHAR(50),
    ground_category VARCHAR(100) NOT NULL,
    objection_text TEXT NOT NULL,
    hearing_date DATE,
    collector_order_status VARCHAR(40) NOT NULL DEFAULT 'PENDING' CHECK (collector_order_status IN ('PENDING','NOTICE_ISSUED','HEARD','ACCEPTED','REJECTED')),
    order_document_ref TEXT,
    order_date DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS awards_sec23 (
    award_id BIGSERIAL PRIMARY KEY,
    project_id BIGINT NOT NULL REFERENCES projects(project_id),
    ulpin VARCHAR(14) NOT NULL REFERENCES cadastral_parcels(ulpin),
    award_number VARCHAR(100) UNIQUE NOT NULL,
    market_value_land NUMERIC(18,2) NOT NULL,
    multiplication_factor NUMERIC(4,2) NOT NULL DEFAULT 1.0,
    assets_value_structures NUMERIC(18,2) NOT NULL DEFAULT 0,
    assets_value_trees NUMERIC(18,2) NOT NULL DEFAULT 0,
    solatium_amount NUMERIC(18,2) NOT NULL,
    additional_interest_sec30 NUMERIC(18,2) NOT NULL DEFAULT 0,
    total_award_compensation NUMERIC(18,2) GENERATED ALWAYS AS (
        (market_value_land * multiplication_factor) + assets_value_structures + assets_value_trees + solatium_amount + additional_interest_sec30
    ) STORED,
    award_date DATE NOT NULL,
    possession_taken BOOLEAN NOT NULL DEFAULT FALSE,
    possession_date DATE
);

-- ==============================================================================================
-- 10. LARR TRIBUNAL / JUDICIAL ADJUDICATION (SEC 64 & SEC 69)
-- ==============================================================================================

CREATE TABLE IF NOT EXISTS larr_tribunal_cases (
    case_ref_id BIGSERIAL PRIMARY KEY,
    case_number VARCHAR(100) UNIQUE NOT NULL,
    project_id BIGINT NOT NULL REFERENCES projects(project_id),
    ulpin VARCHAR(14) NOT NULL REFERENCES cadastral_parcels(ulpin),
    petitioner_name VARCHAR(200) NOT NULL,
    respondent_name VARCHAR(200) NOT NULL DEFAULT 'Land Acquisition Officer / CALA',
    reference_section VARCHAR(20) NOT NULL DEFAULT 'SECTION_64',
    grounds_of_objection TEXT NOT NULL,
    initial_award_amount NUMERIC(18,2) NOT NULL,
    claimed_amount NUMERIC(18,2) NOT NULL,
    enhanced_amount_awarded NUMERIC(18,2),
    judicial_status VARCHAR(40) NOT NULL DEFAULT 'REGISTERED' CHECK (judicial_status IN ('REGISTERED','SUMMONS_DISPATCHED','HEARING_IN_PROGRESS','ORDER_RESERVED','JUDGMENT_PRONOUNCED','APPEALED')),
    next_hearing_date DATE,
    presiding_officer VARCHAR(200),
    judgment_summary TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ==============================================================================================
-- 11. POLICY MAKER OVERSIGHT, BOTTLENECK TRACKER & STATUTORY SLA
-- ==============================================================================================

CREATE TABLE IF NOT EXISTS statutory_stage_sla (
    sla_id BIGSERIAL PRIMARY KEY,
    project_id BIGINT NOT NULL REFERENCES projects(project_id),
    stage_name VARCHAR(100) NOT NULL,
    mandated_days INTEGER NOT NULL,
    actual_days INTEGER,
    start_date DATE NOT NULL,
    completion_date DATE,
    risk_level VARCHAR(20) NOT NULL DEFAULT 'LOW' CHECK (risk_level IN ('LOW','MEDIUM','HIGH','BREACHED')),
    delay_reason TEXT,
    mitigation_action TEXT
);
