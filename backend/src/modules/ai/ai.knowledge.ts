export interface StatutorySection {
  section: string;
  title: string;
  limitationDays?: number;
  summary: string;
  keywords: string[];
}

export const RFCTLARR_KNOWLEDGE_BASE: StatutorySection[] = [
  {
    section: 'Section 4',
    title: 'Preparation of Social Impact Assessment Study',
    limitationDays: 180, // 6 months
    summary: 'Whenever the Appropriate Government intends to acquire land for a public purpose, it shall consult the concerned Panchayat, Municipality or Municipal Corporation and carry out a Social Impact Assessment (SIA) study in consultation with them. The study must be completed within 6 months from notification.',
    keywords: ['sia', 'social impact assessment', 'panchayat', 'public purpose', 'consultation', 'section 4']
  },
  {
    section: 'Section 7',
    title: 'Appraisal of Social Impact Assessment report by an Expert Group',
    limitationDays: 60, // 2 months
    summary: 'The Social Impact Assessment report shall be evaluated by an independent multi-disciplinary Expert Group (IEG) consisting of non-official experts, members from panchayat, and rehabilitation specialists. The IEG submits its recommendation within two months.',
    keywords: ['ieg', 'expert group', 'appraisal', 'recommendation', 'section 7']
  },
  {
    section: 'Section 11',
    title: 'Publication of Preliminary Notification and power of officers',
    limitationDays: 365,
    summary: 'Whenever it appears to the Appropriate Government that land in any area is required or likely to be required for any public purpose, a preliminary notification along with details of the land shall be published in the Official Gazette, two daily newspapers, and local offices. No transaction of land is permitted after this date.',
    keywords: ['preliminary notification', 'section 11', 'gazette', 'freeze', 'statutory lock']
  },
  {
    section: 'Section 15',
    title: 'Hearing of Objections',
    limitationDays: 60,
    summary: 'Any person interested in any land which has been notified under Section 11 may, within 60 days from the date of publication, object to the area and suitability of the land, justification of public purpose, or findings of the SIA. Collector provides personal hearing and submits report.',
    keywords: ['objection', 'hearing', 'section 15', 'collector report', '60 days', 'claimant']
  },
  {
    section: 'Section 19',
    title: 'Publication of Declaration and summary of Rehabilitation and Resettlement',
    limitationDays: 365,
    summary: 'When the Appropriate Government is satisfied after considering the report under Section 15 that land is required, a declaration shall be published. Under Section 19(7), if no declaration is published within 12 months from the preliminary notification under Section 11, the notification shall be deemed to have lapsed and rescinded.',
    keywords: ['declaration', 'section 19', '12 months', 'lapse', 'rescinded', 'section 19(7)', 'time limit', 'limitation period']
  },
  {
    section: 'Section 21',
    title: 'Notice to Persons Interested',
    limitationDays: 30,
    summary: 'The Collector shall publish public notice stating that the Government intends to take possession of the land and that claims to compensations and rehabilitation and resettlement may be made to him within 30 to 60 days.',
    keywords: ['notice', 'claims', 'possession', 'section 21', 'khatedar']
  },
  {
    section: 'Section 23',
    title: 'Enquiry and Land Acquisition Award by Collector',
    limitationDays: 365,
    summary: 'On the day fixed, the Collector shall enquire into the objections and claims and declare the award under his hand. Under Section 25, the Collector shall make an award within a period of twelve months from the date of the publication of the declaration under section 19, failing which the entire proceedings for acquisition shall lapse.',
    keywords: ['award', 'section 23', 'section 25', 'lapse', 'collector award', 'enquiry']
  },
  {
    section: 'Section 26',
    title: 'Determination of Market Value of Land by Collector',
    summary: 'The Collector shall adopt the highest of: (a) minimum land value specified in the Indian Stamp Act (Circle Rate / Jantri), (b) average sale price of similar land in nearest village of preceding 3 years, or (c) consented amount in case of private/PPP projects.',
    keywords: ['market value', 'circle rate', 'jantri', 'sale deed', 'section 26', 'valuation']
  },
  {
    section: 'Section 27 & 28',
    title: 'Multiplication Factor for Rural Areas',
    summary: 'Market value determined under section 26 is multiplied by a factor: 1.0 in urban areas, and between 1.2 and 2.0 in rural areas depending on distance from urban boundaries.',
    keywords: ['multiplier', 'rural factor', 'urban', 'section 27', 'section 28']
  },
  {
    section: 'Section 30',
    title: 'Award of Solatium and Additional Interest',
    summary: 'The Collector shall impose a "Solatium" amount equivalent to 100% of the total compensation (Market Value x Multiplier + Assets). In addition, under Section 30(3), interest at 12% per annum is awarded on market value from Section 11 notification date to Award date.',
    keywords: ['solatium', '100%', 'interest', '12%', 'section 30', 'section 30(3)']
  },
  {
    section: 'Section 38',
    title: 'Power to Take Possession of Land to be Acquired',
    summary: 'The Collector shall take possession of land only after ensuring full payment of compensation as well as rehabilitation and resettlement entitlements are paid or deposited into the bank account of the beneficiaries.',
    keywords: ['possession', 'section 38', 'handover', 'dbt', 'full payment']
  },
  {
    section: 'Section 40',
    title: 'Special Powers in Cases of Urgency',
    summary: 'In cases of national defense, national calamity, or emergency, the Collector may, on the expiration of thirty days from publication of notice under section 21, take possession of any land without previous award. An additional 75% solatium is payable.',
    keywords: ['urgency', 'section 40', 'defense', 'calamity', 'emergency', 'possession without award']
  },
  {
    section: 'Section 64',
    title: 'Reference to Land Acquisition, Rehabilitation and Resettlement Authority (Tribunal)',
    limitationDays: 42,
    summary: 'Any person interested who has not accepted the award may, by written application to the Collector within six weeks, require that the matter be referred by the Collector for the determination of the Authority (LARR Tribunal).',
    keywords: ['tribunal', 'reference', 'section 64', 'enhancement', 'dispute', 'six weeks']
  }
];
