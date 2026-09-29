/**
 * Reference Data Service for NLAMS Form-I Smart Wizard
 * Provides authoritative directory & reference datasets:
 * - Central & State Requisitioning Bodies
 * - Fourth Schedule Special Acts (13 Acts)
 * - PPP Sectors & Sponsoring Public Entities
 * - Private Sector Categories
 * - States, Districts & CALA / Collectorate Directories
 */

export const CENTRAL_REQUISITIONING_BODIES = [
  { id: 'NHAI', name: 'National Highways Authority of India (NHAI)', ministry: 'Ministry of Road Transport and Highways (MoRTH)', code: 'CENT-MORTH-NHAI' },
  { id: 'DFCCIL', name: 'Dedicated Freight Corridor Corporation of India (DFCCIL)', ministry: 'Ministry of Railways', code: 'CENT-RAIL-DFCCIL' },
  { id: 'MOR', name: 'Ministry of Railways (Direct Zonal Railway)', ministry: 'Ministry of Railways', code: 'CENT-RAIL-ZONAL' },
  { id: 'NTPC', name: 'NTPC Limited (Power Projects)', ministry: 'Ministry of Power', code: 'CENT-POW-NTPC' },
  { id: 'PGCIL', name: 'Power Grid Corporation of India Limited (PGCIL)', ministry: 'Ministry of Power', code: 'CENT-POW-PGCIL' },
  { id: 'AAI', name: 'Airports Authority of India (AAI)', ministry: 'Ministry of Civil Aviation', code: 'CENT-AVIA-AAI' },
  { id: 'GAIL', name: 'GAIL (India) Limited (Pipeline Infrastructure)', ministry: 'Ministry of Petroleum & Natural Gas', code: 'CENT-PNG-GAIL' },
  { id: 'IOCL', name: 'Indian Oil Corporation Limited (IOCL)', ministry: 'Ministry of Petroleum & Natural Gas', code: 'CENT-PNG-IOCL' },
  { id: 'ONGC', name: 'Oil and Natural Gas Corporation (ONGC)', ministry: 'Ministry of Petroleum & Natural Gas', code: 'CENT-PNG-ONGC' },
  { id: 'NHIDCL', name: 'National Highways & Infrastructure Development Corp (NHIDCL)', ministry: 'Ministry of Road Transport and Highways (MoRTH)', code: 'CENT-MORTH-NHIDCL' },
  { id: 'DMRC', name: 'Delhi Metro Rail Corporation / Metro Authorities', ministry: 'Ministry of Housing and Urban Affairs (MoHUA)', code: 'CENT-HUA-METRO' },
  { id: 'CIL', name: 'Coal India Limited & Subsidiaries', ministry: 'Ministry of Coal', code: 'CENT-COAL-CIL' }
];

export const STATE_REQUISITIONING_BODIES = [
  { id: 'GIDC', name: 'Gujarat Industrial Development Corporation (GIDC)', state: 'Gujarat', department: 'Industries & Mines Department' },
  { id: 'GSRTC', name: 'Gujarat State Road Transport Corporation', state: 'Gujarat', department: 'Transport Department' },
  { id: 'SSNNL', name: 'Sardar Sarovar Narmada Nigam Limited (SSNNL)', state: 'Gujarat', department: 'Water Resources Department' },
  { id: 'MIDC', name: 'Maharashtra Industrial Development Corporation (MIDC)', state: 'Maharashtra', department: 'Industries Department' },
  { id: 'MSRDC', name: 'Maharashtra State Road Development Corporation (MSRDC)', state: 'Maharashtra', department: 'Public Works Department' },
  { id: 'UPSIDA', name: 'UP State Industrial Development Authority (UPSIDA)', state: 'Uttar Pradesh', department: 'Infrastructure & Industrial Dev' },
  { id: 'UPEIDA', name: 'UP Expressways Industrial Development Authority (UPEIDA)', state: 'Uttar Pradesh', department: 'Expressways Department' },
  { id: 'KIADB', name: 'Karnataka Industrial Areas Development Board (KIADB)', state: 'Karnataka', department: 'Commerce & Industries Department' },
  { id: 'TIDCO', name: 'Tamil Nadu Industrial Development Corporation (TIDCO)', state: 'Tamil Nadu', department: 'Industries Department' },
  { id: 'TNRDC', name: 'Tamil Nadu Road Development Company (TNRDC)', state: 'Tamil Nadu', department: 'Highways & Minor Ports' },
  { id: 'RIICO', name: 'Rajasthan State Industrial Dev & Investment Corp (RIICO)', state: 'Rajasthan', department: 'Industries Department' },
  { id: 'HSIIDC', name: 'Haryana State Industrial & Infrastructure Dev Corp (HSIIDC)', state: 'Haryana', department: 'Industries & Commerce' }
];

export const FOURTH_SCHEDULE_SPECIAL_ACTS = [
  { id: 'ACT-01', name: 'The Ancient Monuments and Archaeological Sites and Remains Act, 1958 (24 of 1958)', code: 'AMASR_1958' },
  { id: 'ACT-02', name: 'The Atomic Energy Act, 1962 (33 of 1962)', code: 'AEA_1962' },
  { id: 'ACT-03', name: 'The Damodar Valley Corporation Act, 1948 (14 of 1948)', code: 'DVC_1948' },
  { id: 'ACT-04', name: 'The Indian Tramways Act, 1886 (11 of 1886)', code: 'ITA_1886' },
  { id: 'ACT-05', name: 'The Land Acquisition (Mines) Act, 1885 (18 of 1885)', code: 'LAM_1885' },
  { id: 'ACT-06', name: 'The Metro Railways (Construction of Works) Act, 1978 (33 of 1978)', code: 'MRCW_1978' },
  { id: 'ACT-07', name: 'The National Highways Act, 1956 (48 of 1956) [Sec 3A to 3J]', code: 'NHA_1956' },
  { id: 'ACT-08', name: 'The Petroleum and Minerals Pipelines (Acquisition of Right of User in Land) Act, 1962 (50 of 1962)', code: 'PMP_1962' },
  { id: 'ACT-09', name: 'The Railways Act, 1989 (24 of 1989) [Chapter IVA]', code: 'RAIL_1989' },
  { id: 'ACT-10', name: 'The Coal Bearing Areas Acquisition and Development Act, 1957 (20 of 1957)', code: 'CBA_1957' },
  { id: 'ACT-11', name: 'The Electricity Act, 2003 (36 of 2003)', code: 'ELEC_2003' },
  { id: 'ACT-12', name: 'The Requisitioning and Acquisition of Immovable Property Act, 1952 (30 of 1952)', code: 'RAIP_1952' },
  { id: 'ACT-13', name: 'The Resettlement of Displaced Persons (Land Acquisition) Act, 1948 (60 of 1948)', code: 'RDP_1948' }
];

export const PPP_SECTORS = [
  'National Highways / Expressways (BOT/HAM)',
  'High-Speed Rail / Mass Rapid Transit (PPP)',
  'Commercial Ports & Logistics Hubs',
  'Civil Aviation / Green-field Airports',
  'Multi-Modal Logistics Parks (MMLP)',
  'Renewable Energy / Solar-Wind Ultra Parks',
  'Industrial Corridor Smart Cities',
  'Water Supply & Bulk Transmission Grids'
];

export const SPONSORING_PUBLIC_ENTITIES = [
  'Ministry of Road Transport and Highways (MoRTH)',
  'Ministry of Railways / Railway Board',
  'Ministry of Ports, Shipping and Waterways',
  'Ministry of Civil Aviation',
  'National Highways Authority of India (NHAI)',
  'National Industrial Corridor Development Corporation (NICDC)',
  'Dedicated Freight Corridor Corporation of India (DFCCIL)',
  'State Infrastructure Development Board / Department'
];

export const PRIVATE_SECTOR_CATEGORIES = [
  'Private Infrastructure Company (Sec 2(2)(b) - 80% Consent Required)',
  'Public-Private Partnership (PPP) SPV (Sec 2(2)(a) - 70% Consent Required)',
  'Industrial / Manufacturing Hub (Private Entity)',
  'Private Port / Private Railway Siding Developer',
  'Commercial Township / SEZ Developer'
];

export const INDIAN_STATES = [
  'Gujarat',
  'Maharashtra',
  'Uttar Pradesh',
  'Madhya Pradesh',
  'Karnataka',
  'Rajasthan',
  'Tamil Nadu',
  'Haryana',
  'Punjab',
  'Andhra Pradesh',
  'Telangana',
  'Odisha',
  'Bihar',
  'West Bengal',
  'Assam'
];

export const UNION_TERRITORIES = [
  { name: 'Delhi (National Capital Territory)', hasAssembly: true },
  { name: 'Puducherry', hasAssembly: true },
  { name: 'Jammu and Kashmir', hasAssembly: true },
  { name: 'Ladakh', hasAssembly: false },
  { name: 'Chandigarh', hasAssembly: false },
  { name: 'Dadra and Nagar Haveli and Daman and Diu', hasAssembly: false },
  { name: 'Andaman and Nicobar Islands', hasAssembly: false },
  { name: 'Lakshadweep', hasAssembly: false }
];

export const DISTRICTS_BY_STATE = {
  Gujarat: [
    { name: 'Anand', code: 'GJ-AND', calaOffice: 'Collector & CALA, Collectorate Anand', calaOfficer: 'Shri Pravin K. Solanki, IAS', email: 'collector-and@gujarat.gov.in', phone: '+91-2692-260200', address: 'Collectorate Campus, Anand - 388001' },
    { name: 'Ahmedabad', code: 'GJ-AHM', calaOffice: 'District Magistrate & CALA, Ahmedabad', calaOfficer: 'Smt. Praveena D.K., IAS', email: 'collector-ahd@gujarat.gov.in', phone: '+91-79-27551681', address: 'Collectorate, Subhash Bridge, Ahmedabad - 380027' },
    { name: 'Mehsana', code: 'GJ-MEH', calaOffice: 'Collector & CALA, Mehsana', calaOfficer: 'Shri M. Nagarajan, IAS', email: 'collector-meh@gujarat.gov.in', phone: '+91-2762-222201', address: 'Collectorate, Radhanpur Road, Mehsana - 384002' },
    { name: 'Vadodara', code: 'GJ-VAD', calaOffice: 'Collectorate & Land Acquisition Officer, Vadodara', calaOfficer: 'Shri A. B. Gor, IAS', email: 'collector-vad@gujarat.gov.in', phone: '+91-265-2420000', address: 'Kothi Compound, Vadodara - 390001' },
    { name: 'Kheda', code: 'GJ-KHD', calaOffice: 'Collector & CALA Kheda (Nadiad)', calaOfficer: 'Shri K. L. Bachani, IAS', email: 'collector-khe@gujarat.gov.in', phone: '+91-268-2553334', address: 'Collector Office, Nadiad - 387001' },
    { name: 'Gandhinagar', code: 'GJ-GND', calaOffice: 'Collector & CALA, Gandhinagar', calaOfficer: 'Shri Hitesh Koya, IAS', email: 'collector-gnr@gujarat.gov.in', phone: '+91-79-23259000', address: 'Sector 11, Gandhinagar - 382011' },
    { name: 'Surat', code: 'GJ-SUR', calaOffice: 'Collector & District Magistrate, Surat', calaOfficer: 'Dr. Saurabh Pardhi, IAS', email: 'collector-sur@gujarat.gov.in', phone: '+91-261-2655151', address: 'District Collectorate, Nanpura, Surat - 395001' }
  ],
  Maharashtra: [
    { name: 'Pune', code: 'MH-PUN', calaOffice: 'District Collector & CALA, Pune', calaOfficer: 'Dr. Suhas Diwase, IAS', email: 'collector.pune@maharashtra.gov.in', phone: '+91-20-26122000', address: 'Station Road, Pune - 411001' },
    { name: 'Thane', code: 'MH-THA', calaOffice: 'District Magistrate & CALA, Thane', calaOfficer: 'Shri Ashok Shingare, IAS', email: 'collector.thane@maharashtra.gov.in', phone: '+91-22-25344041', address: 'Court Naka, Thane West - 400601' },
    { name: 'Nagpur', code: 'MH-NAG', calaOffice: 'Collector & CALA, Nagpur', calaOfficer: 'Dr. Vipin Itankar, IAS', email: 'collector.nagpur@maharashtra.gov.in', phone: '+91-712-2560500', address: 'Civil Lines, Nagpur - 440001' },
    { name: 'Nashik', code: 'MH-NSK', calaOffice: 'Collector & CALA, Nashik', calaOfficer: 'Shri Jalaj Sharma, IAS', email: 'collector.nashik@maharashtra.gov.in', phone: '+91-253-2578500', address: 'Old Agra Road, Nashik - 422002' },
    { name: 'Raigad', code: 'MH-RAI', calaOffice: 'District Collector & CALA, Raigad (Alibaug)', calaOfficer: 'Dr. Mahendra Kalyankar, IAS', email: 'collector.raigad@maharashtra.gov.in', phone: '+91-2141-222001', address: 'Collectorate Alibaug, Raigad - 402201' }
  ],
  'Uttar Pradesh': [
    { name: 'Gautam Buddha Nagar (Noida)', code: 'UP-GBN', calaOffice: 'District Magistrate & CALA, GB Nagar', calaOfficer: 'Shri Manish Kumar Verma, IAS', email: 'dmgbn@nic.in', phone: '+91-120-2544400', address: 'Collectorate, Surajpur, Greater Noida - 201306' },
    { name: 'Lucknow', code: 'UP-LKO', calaOffice: 'Collector & CALA, Lucknow', calaOfficer: 'Shri Surya Pal Gangwar, IAS', email: 'dmlko@nic.in', phone: '+91-522-2623024', address: 'Kaiserbagh, Lucknow - 226001' },
    { name: 'Varanasi', code: 'UP-VAR', calaOffice: 'District Magistrate & CALA, Varanasi', calaOfficer: 'Shri S. Rajalingam, IAS', email: 'dmvar@nic.in', phone: '+91-542-2501000', address: 'Kachehri Campus, Varanasi - 221002' },
    { name: 'Agra', code: 'UP-AGR', calaOffice: 'District Magistrate & CALA, Agra', calaOfficer: 'Shri Bhanu Chandra Goswami, IAS', email: 'dmagr@nic.in', phone: '+91-562-2260550', address: 'Collectorate Compound, Agra - 282001' },
    { name: 'Mathura', code: 'UP-MTR', calaOffice: 'District Collector & CALA, Mathura', calaOfficer: 'Shri Shailendra Kumar Singh, IAS', email: 'dmmtr@nic.in', phone: '+91-565-2403200', address: 'Collectorate, Mathura - 281001' }
  ],
  Rajasthan: [
    { name: 'Jaipur', code: 'RJ-JPR', calaOffice: 'District Collector & CALA, Jaipur', calaOfficer: 'Shri Prakash Rajpurohit, IAS', email: 'dm-jai-rj@nic.in', phone: '+91-141-2200000', address: 'Collectorate Circle, Bani Park, Jaipur - 302016' },
    { name: 'Alwar', code: 'RJ-ALW', calaOffice: 'Collector & District Magistrate, Alwar', calaOfficer: 'Dr. Artika Shukla, IAS', email: 'dm-alw-rj@nic.in', phone: '+91-144-2337565', address: 'Collectorate Campus, Alwar - 301001' },
    { name: 'Kota', code: 'RJ-KOT', calaOffice: 'District Collector & CALA, Kota', calaOfficer: 'Dr. Ravindra Goswami, IAS', email: 'dm-kot-rj@nic.in', phone: '+91-744-2323456', address: 'Collectorate, Nayapura, Kota - 324001' }
  ],
  'Madhya Pradesh': [
    { name: 'Indore', code: 'MP-IND', calaOffice: 'Collector & District Magistrate, Indore', calaOfficer: 'Shri Ashish Singh, IAS', email: 'dmindore@nic.in', phone: '+91-731-2449111', address: 'Collectorate, Moti Tabela, Indore - 452004' },
    { name: 'Bhopal', code: 'MP-BPL', calaOffice: 'District Collector & CALA, Bhopal', calaOfficer: 'Shri Kaushlendra Vikram Singh, IAS', email: 'dmbhopal@nic.in', phone: '+91-755-2540500', address: 'Collectorate Campus, Shahjahanabad, Bhopal - 462001' }
  ],
  Haryana: [
    { name: 'Gurugram', code: 'HR-GUR', calaOffice: 'Deputy Commissioner & CALA, Gurugram', calaOfficer: 'Shri Nishant Kumar Yadav, IAS', email: 'dcgrg@hry.nic.in', phone: '+91-124-2321144', address: 'Mini Secretariat, Civil Lines, Gurugram - 122001' },
    { name: 'Faridabad', code: 'HR-FBD', calaOffice: 'Deputy Commissioner & CALA, Faridabad', calaOfficer: 'Shri Vikram Singh, IAS', email: 'dcfbd@hry.nic.in', phone: '+91-129-2227868', address: 'Mini Secretariat, Sector 12, Faridabad - 121007' }
  ],
  Karnataka: [
    { name: 'Bengaluru Urban', code: 'KA-BLR', calaOffice: 'Deputy Commissioner & CALA, Bengaluru Urban', calaOfficer: 'Shri K. A. Dayananda, IAS', email: 'dcbangaloreurban@gmail.com', phone: '+91-80-22211292', address: 'DC Office Complex, KG Road, Bengaluru - 560009' },
    { name: 'Belagavi', code: 'KA-BEL', calaOffice: 'Deputy Commissioner & CALA, Belagavi', calaOfficer: 'Shri Nitesh Patil, IAS', email: 'dcbelagavi@gmail.com', phone: '+91-831-2407200', address: 'DC Office, Court Compound, Belagavi - 590001' }
  ]
};

export const VILLAGES_BY_DISTRICT = {
  Anand: ['Petlad', 'Sunav', 'Bandhani', 'Agas', 'Boriavi', 'Mogri', 'Karamsad', 'Vallabh Vidyanagar'],
  Ahmedabad: ['Sanand', 'Bavla', 'Dholka', 'Viramgam', 'Mandal', 'Detroj'],
  Mehsana: ['Kadi', 'Becharaji', 'Visnagar', 'Vadnagar', 'Satlasana'],
  Vadodara: ['Padra', 'Karjan', 'Waghodia', 'Savli', 'Dabhoi'],
  Kheda: ['Nadiad', 'Matar', 'Mahudha', 'Kapadvanj'],
  Gandhinagar: ['Kalol', 'Dehgam', 'Mansa', 'Pethapur'],
  Surat: ['Choryasi', 'Kamrej', 'Olpad', 'Palsana'],
  Pune: ['Haveli', 'Shirur', 'Khed', 'Maval', 'Baramati'],
  Thane: ['Kalyan', 'Bhiwandi', 'Ulhasnagar', 'Ambernath'],
  Nagpur: ['Hingna', 'Kamptee', 'Umred', 'Katol'],
  Nashik: ['Dindori', 'Igatpuri', 'Sinnar', 'Niphad'],
  Raigad: ['Panvel', 'Pen', 'Khalapur', 'Uran'],
  'Gautam Buddha Nagar (Noida)': ['Jewar', 'Dadri', 'Dankaur', 'Bisrakh'],
  Lucknow: ['Mohanlalganj', 'Bakshi Ka Talab', 'Sarojini Nagar', 'Malihabad'],
  Varanasi: ['Pindra', 'Raja Talab', 'Kashi', 'Cholapur'],
  Agra: ['Fatehabad', 'Etmadpur', 'Kheragarh', 'Bah'],
  Mathura: ['Chhata', 'Mant', 'Govardhan', 'Mahavan'],
  Jaipur: ['Sanganer', 'Amer', 'Chaksu', 'Bassai'],
  Alwar: ['Behror', 'Neemrana', 'Tijara', 'Kishangarh Bas'],
  Kota: ['Ladpura', 'Digod', 'Ramganj Mandi', 'Sangod'],
  Indore: ['Sanwer', 'Depalpur', 'Mhow', 'Hatod'],
  Bhopal: ['Huzur', 'Berasia', 'Kolar'],
  Gurugram: ['Manesar', 'Sohna', 'Pataudi', 'Farrukhnagar'],
  Faridabad: ['Ballabgarh', 'Badkhal', 'Mohna'],
  'Bengaluru Urban': ['Anekal', 'Yelahanka', 'Bangalore North', 'Bangalore South'],
  Belagavi: ['Bailhongal', 'Gokak', 'Chikkodi', 'Khanapur']
};
