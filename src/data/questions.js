import { getCustomData } from '../utils/customContent';

// ============================================================
// HistoPath India — Question Bank
// Sourced directly from Neville's Oral and Maxillofacial Pathology (South Asia Edition)
// 36 missions × 5 high-yield pathology MCQs = 180 questions
// Covers Odontogenic Lesions, Premalignancy/OSCC, Salivary Neoplasms, Bone & Fibro-Osseous,
// Vesiculobullous/Infections, and Soft Tissue/Hematologic Malignancies.
// ============================================================

export const QUESTIONS = {
  // ══════════════════════════════════════════════════════════
  // TOPIC 1: ODONTOGENIC CYSTS & TUMORS (Neville Ch. 15)
  // ══════════════════════════════════════════════════════════

  // Mission 1: Ameloblastoma & Subtypes (otc_m1)
  otc_m1: [
    {
      q: 'Which microscopic feature constitutes the classic Vickers-Gorlin criteria for diagnosing ameloblastoma?',
      options: [
        'Central squamous metaplasia and keratin pearl formation',
        'Tall columnar peripheral cells with hyperchromatic palisaded nuclei and reversed polarity',
        'Sheets of polyhedral cells with amyloid-like Congo red deposits',
        'Duct-like tubular structures lined by cuboidal cells'
      ],
      correct: 1,
      explanation: 'According to Neville Ch. 15, the Vickers-Gorlin criteria specify that peripheral ameloblastoma cells must be tall columnar, palisaded, with hyperchromatic nuclei showing polarization away from the basement membrane (reversed polarity) and subnuclear vacuolization.'
    },
    {
      q: 'Which histopathologic subtype of conventional ameloblastoma is characterized by central island cells undergoing squamous metaplasia?',
      options: [
        'Follicular ameloblastoma',
        'Plexiform ameloblastoma',
        'Acanthomatous ameloblastoma',
        'Desmoplastic ameloblastoma'
      ],
      correct: 2,
      explanation: 'Neville describes Acanthomatous Ameloblastoma as a variant of the follicular pattern where the central stellate reticulum-like cells undergo squamous metaplasia, occasionally with individual keratinization and keratin pearl formation.'
    },
    {
      q: 'In which location does the Desmoplastic Ameloblastoma exhibit a marked predilection compared to conventional ameloblastoma?',
      options: [
        'Mandibular molar-ramus region',
        'Maxillary anterior region',
        'Mandibular condyle',
        'Maxillary tuberosity'
      ],
      correct: 1,
      explanation: 'Unlike conventional solid ameloblastomas which occur primarily in the posterior mandible (80-85%), desmoplastic ameloblastoma exhibits a distinct predilection for the anterior regions of the jaws, particularly the maxilla, often presenting with mixed radiolucent-radiopaque ground-glass appearance (Neville Ch. 15).'
    },
    {
      q: 'Unicystic ameloblastoma that demonstrates proliferation of neoplastic epithelium infiltrating into the fibrous cyst wall is classified as:',
      options: [
        'Luminal unicystic ameloblastoma',
        'Intraluminal (plexiform) unicystic ameloblastoma',
        'Mural unicystic ameloblastoma',
        'Extraosseous / Peripheral ameloblastoma'
      ],
      correct: 2,
      explanation: 'Neville categorizes unicystic ameloblastoma into luminal (confined to lining), intraluminal (nodule projects into lumen), and mural (infiltrates the fibrous capsule). Mural unicystic ameloblastoma requires more aggressive surgical resection similar to conventional solid multicystic ameloblastoma.'
    },
    {
      q: 'What molecular mutation is detected in approximately 60% of conventional mandibular ameloblastomas?',
      options: [
        'BRAF V600E mutation',
        'SMO (Smoothened) mutation',
        'PTCH1 tumor suppressor deletion',
        'GNAS point mutation'
      ],
      correct: 0,
      explanation: 'As documented in Neville Ch. 15, MAPK pathway alterations, specifically the BRAF V600E point mutation, are identified in over 60% of mandibular ameloblastomas, whereas maxillary ameloblastomas frequently harbor SMO mutations.'
    }
  ],

  // Mission 2: Mixed & Calcifying Odontogenic Tumors (otc_m2)
  otc_m2: [
    {
      q: 'The Calcifying Epithelial Odontogenic Tumor (CEOT / Pindborg tumor) is microscopically characterized by:',
      options: [
        'Bipolar spindle cells and Verocay bodies',
        'Polyhedral epithelial sheets, amyloid-like eosinophilic globules, and concentric Liesegang ring calcifications',
        'Epithelial ducts containing eosinophilic coagulum and cartwheel chromatin',
        'Ghost cells and extensive dentinoid formation in young females'
      ],
      correct: 1,
      explanation: 'Neville Ch. 15 notes the classic triad of CEOT (Pindborg tumor): sheets of polyhedral epithelial cells with distinct intercellular bridges, extracellular amyloid-like protein that stains with Congo red and shows apple-green birefringence, and concentric calcific rings (Liesegang rings).'
    },
    {
      q: 'Adenomatoid Odontogenic Tumor (AOT) most commonly occurs in which demographic and anatomical site?',
      options: [
        'Elderly males in the posterior mandible',
        'Young females in the anterior maxilla associated with an impacted canine crown',
        'Middle-aged females in the mandibular premolar region',
        'Infants in the maxillary tuberosity'
      ],
      correct: 1,
      explanation: 'AOT is classic in the "two-thirds tumor" rule: 2/3 occur in females, 2/3 are diagnosed in the second decade of life (teens), 2/3 involve the anterior maxilla, and 2/3 surround the crown of an unerupted canine (Neville Ch. 15).'
    },
    {
      q: 'What is the diagnostic histopathologic difference between a Compound Odontoma and a Complex Odontoma?',
      options: [
        'Compound has malignant features while complex is benign',
        'Compound forms multiple small rudimentary tooth-like structures (denticles), whereas complex forms an amorphous conglomerate mass of dental tissues',
        'Compound consists solely of enamel, while complex contains only cellular cementum',
        'Compound occurs exclusively in the posterior mandible'
      ],
      correct: 1,
      explanation: 'Neville explains that Compound Odontoma is composed of multiple organized tooth-like structures (denticles) with anatomical arrangement of enamel, dentin, and pulp, while Complex Odontoma consists of a disorganized mass of hard and soft dental tissues bearing no morphologic resemblance to a tooth.'
    },
    {
      q: 'Calcifying Odontogenic Cyst (Gorlin Cyst) is pathognomonically recognized by the presence of:',
      options: [
        'Rushton bodies and foamy histiocytes',
        'Abundant pale eosinophilic Ghost Cells undergoing dystrophic calcification',
        'Bence Jones proteins and amyloid spherules',
        'Birbeck tennis-racket shaped granules'
      ],
      correct: 1,
      explanation: 'Neville Ch. 15 highlights "Ghost Cells" as the hallmark of Calcifying Odontogenic Cyst (Gorlin cyst). These are altered epithelial cells that retain their cellular outline but lose their nuclei, leaving a pale, eosinophilic ghost-like shadow that frequently calcifies.'
    },
    {
      q: 'Ameloblastic Fibroma differs fundamentally from conventional ameloblastoma because:',
      options: [
        'It produces true malignant metastasis to lungs',
        'Both the epithelial AND mesenchymal components are truly neoplastic',
        'It occurs exclusively in patients over 60 years of age',
        'It is composed solely of anaplastic clear cells'
      ],
      correct: 1,
      explanation: 'Ameloblastic fibroma is a true mixed odontogenic tumor wherein both the odontogenic epithelium (cords and small islands) and the ectomesenchymal stroma (resembling primitive cellular dental papilla) are neoplastic, unlike ameloblastoma where the stroma is non-neoplastic (Neville).'
    }
  ],

  // Mission 3: Odontogenic Neoplasm Terms (otc_m3)
  otc_m3: [
    {
      q: 'Odontogenic Myxoma is derived from which embryologic structure?',
      options: [
        'Enamel organ outer enamel epithelium',
        'Dental papilla / dental follicle ectomesenchyme',
        'Remnants of Serres dental lamina',
        'Neural crest melanoblasts'
      ],
      correct: 1,
      explanation: 'Neville Ch. 15 explains that Odontogenic Myxoma arises from odontogenic ectomesenchyme (dental papilla or follicle). Microscopically, it mimics the primitive dental pulp, containing stellate and spindle fibroblasts in an abundant loose, gelatinous, hyaluronic acid-rich ground substance.'
    },
    {
      q: 'Which odontogenic lesion typically produces a "tennis racket" or "stepladder" multilocular soap-bubble appearance on radiographs?',
      options: [
        'Adenomatoid Odontogenic Tumor',
        'Odontogenic Myxoma',
        'Periapical Cemento-Osseous Dysplasia',
        'Compound Odontoma'
      ],
      correct: 1,
      explanation: 'Odontogenic Myxoma classically produces a multilocular radiolucency with fine, straight bony trabeculae intersecting at right angles, often described as "stepladder" or "tennis-racket" trabeculation (Neville Ch. 15).'
    },
    {
      q: 'Clear cell odontogenic carcinoma is an aggressive malignant odontogenic tumor characterized by cells containing abundant:',
      options: [
        'Lipids and cholesterol crystals',
        'Intracellular Glycogen (PAS positive, diastase labile)',
        'Melanin pigment granules',
        'Mucin globules positive for Mucicarmine'
      ],
      correct: 1,
      explanation: 'Clear cell odontogenic carcinoma consists of sheets and cords of clear epithelial cells containing glycogen demonstrated by periodic acid-Schiff (PAS) positivity that is removed after diastase pre-treatment (Neville Ch. 15).'
    },
    {
      q: 'Squamous Odontogenic Tumor (SOT) is believed to originate from:',
      options: [
        'Epithelial rests of Malassez within the periodontal ligament',
        'Basal cells of the surface oral lining mucosa',
        'Striated ducts of minor salivary glands',
        'Ectomesenchyme of the dental follicle'
      ],
      correct: 0,
      explanation: 'Squamous Odontogenic Tumor (SOT) originates from the rests of Malassez in the periodontal ligament, presenting microscopically as islands of bland, well-differentiated squamous epithelium lacking peripheral columnar palisading (Neville Ch. 15).'
    },
    {
      q: 'The characteristic "duct-like" rosette structures in Adenomatoid Odontogenic Tumor are formed by:',
      options: [
        'True salivary secretory ducts',
        'Columnar epithelial cells oriented around a central empty space or eosinophilic material',
        'Invaginating endothelial blood capillaries',
        'Degenerating osteoclasts'
      ],
      correct: 1,
      explanation: 'In AOT, the characteristic rosette/duct-like structures are not true ducts but rather a tubular arrangement of cuboidal to columnar cells surrounding a central space containing eosinophilic material or secretions (Neville Ch. 15).'
    }
  ],

  // Mission 4: Inflammatory vs Developmental Cysts (otc_m4)
  otc_m4: [
    {
      q: 'The Radicular (Periapical) Cyst originates through inflammatory stimulation of which epithelial remnants?',
      options: [
        'Rests of Serres',
        'Epithelial Rests of Malassez',
        'Dental lamina superficial rests',
        'Reduced enamel epithelium'
      ],
      correct: 1,
      explanation: 'Radicular cysts develop at the apex of non-vital teeth when bacterial toxins from a necrotic pulp stimulate the dormant Epithelial Rests of Malassez in the periodontal ligament to proliferate into an inflammatory cyst (Neville Ch. 15).'
    },
    {
      q: 'A Dentigerous Cyst attaches to the tooth at which precise anatomical landmark?',
      options: [
        'Root apex',
        'Cementoenamel Junction (CEJ)',
        'Mid-root level',
        'Incisal edge / cusp tip'
      ],
      correct: 1,
      explanation: 'By definition, a dentigerous (follicular) cyst originates by separation of the follicle from around the crown of an unerupted tooth, attaching strictly at the cementoenamel junction (CEJ) (Neville Ch. 15).'
    },
    {
      q: 'Which microscopic features are pathognomonic for Odontogenic Keratocyst (OKC)?',
      options: [
        'Thick non-keratinized epithelium with deep rete pegs and cholesterol clefts',
        'Thin, uniform 6-8 cell thick parakeratinized stratified squamous lining, palisaded "tombstone" basal layer, and wavy corrugated surface without rete pegs',
        'Ciliated pseudostratified columnar epithelium with mucous goblet cells',
        'Bilayered oncocytic epithelium with dense lymphoid stroma'
      ],
      correct: 1,
      explanation: 'Neville Ch. 15 specifies the definitive histology of OKC: a regular uniform epithelial lining 6 to 8 cells thick, a corrugated (wavy) parakeratotic surface, a prominent palisaded basal layer of cuboidal to columnar cells with polarized hyperchromatic nuclei ("picket-fence" or "tombstone" appearance), and absence of rete pegs.'
    },
    {
      q: 'Multiple Odontogenic Keratocysts (OKCs), bifid ribs, calcification of the falx cerebri, and palmar/plantar pits characterize:',
      options: [
        'Gardner Syndrome',
        'Gorlin-Goltz Syndrome (Nevoid Basal Cell Carcinoma Syndrome)',
        'McCune-Albright Syndrome',
        'Sturge-Weber Syndrome'
      ],
      correct: 1,
      explanation: 'Gorlin-Goltz Syndrome (Nevoid Basal Cell Carcinoma Syndrome) is an autosomal dominant condition caused by mutations in the PTCH1 tumor suppressor gene on chromosome 9q, featuring multiple OKCs, palmar/plantar pits, bifid ribs, and multiple cutaneous basal cell carcinomas (Neville).'
    },
    {
      q: 'Lateral Periodontal Cyst is typically found along the lateral root surface of which teeth in a vital state?',
      options: [
        'Maxillary molars',
        'Mandibular canine-premolar region',
        'Maxillary central incisors',
        'Mandibular third molars'
      ],
      correct: 1,
      explanation: 'Lateral periodontal cyst is a non-inflammatory developmental cyst occurring in 75-80% of cases in the mandibular canine and premolar region adjacent to vital teeth, lined by thin non-keratinized epithelium with localized focal nodular thickenings (plaques) containing clear glycogen-rich cells (Neville Ch. 15).'
    }
  ],

  // Mission 5: Cyst Wall & Epithelial Linings (otc_m5)
  otc_m5: [
    {
      q: 'Rushton bodies (hyaline bodies) found in the epithelial lining of radicular cysts represent:',
      options: [
        'Intracellular viral inclusion aggregates',
        'Curvilinear, hairpin, or arch-shaped eosinophilic structures derived from degraded erythrocytes or epithelial secretum',
        'Calcified bacterial colonies of Actinomyces',
        'Atypical dysplastic keratin pearls'
      ],
      correct: 1,
      explanation: 'Rushton bodies are peculiar, linear, curved, hairpin, or circular eosinophilic structures found embedded in the epithelial lining of inflammatory odontogenic (radicular) cysts, thought to represent a secretory or degenerative product of odontogenic epithelium mixed with red blood cell breakdown products (Neville Ch. 15).'
    },
    {
      q: 'Why does an Odontogenic Keratocyst (OKC) have a markedly higher recurrence rate compared to other odontogenic cysts?',
      options: [
        'It metastasizes via lymphatic vessels to cervical nodes',
        'The epithelial lining is extremely thin and friable, easily leaving fragments or satellite "daughter" microcysts in the bone wall',
        'It produces severe osteolytic toxins that dissolve cancellous bone',
        'It transforms into high-grade osteosarcoma within 1 year'
      ],
      correct: 1,
      explanation: 'Neville Ch. 15 highlights that OKCs recur in 25-30% of cases because the thin, friable epithelial lining tears easily upon curettage, and microcysts (daughter/satellite cysts) frequently exist within the adjacent fibrous connective tissue capsule.'
    },
    {
      q: 'Glandular Odontogenic Cyst (GOC) is distinguished histopathologically by:',
      options: [
        'Extensive necrosis and Liesegang rings',
        'Intraepithelial duct-like spaces, mucous cells, and a superficial layer of columnar/cuboidal eosinophilic "hobnail" cells',
        'Widespread amyloid deposition and ghost cells',
        'Anaplastic pleomorphic spindle cells and osteoid'
      ],
      correct: 1,
      explanation: 'Glandular Odontogenic Cyst (GOC) features intraepithelial microcysts or glandular duct-like spaces lined by mucous cells, covered on the luminal surface by eosinophilic "hobnail" cells with apocrine-like snouting (Neville Ch. 15).'
    },
    {
      q: 'Cholesterol clefts surrounded by foreign-body multinucleated giant cells and hemosiderin in a periapical cyst wall indicate:',
      options: [
        'Dietary hypercholesterolemia in the patient',
        'Past tissue hemorrhage with erythrocyte breakdown and lipid release',
        'Active fungal colony infection',
        'Malignant transformation of cyst lining'
      ],
      correct: 1,
      explanation: 'Cholesterol clefts result from the breakdown of cell membranes of extravasated erythrocytes and degenerating inflammatory cells. In histologic tissue processing, lipids are dissolved, leaving optical empty needle-like clefts surrounded by multinucleated giant cells (Neville Ch. 15).'
    },
    {
      q: 'A cyst exhibiting an uninflamed fibrous wall with a thin cuboidal epithelial lining 2-3 cell layers thick attached to an unerupted molar crown is:',
      options: [
        'Non-inflamed Dentigerous Cyst',
        'Invasive Squamous Cell Carcinoma',
        'Radicular Cyst with acute flare-up',
        'Calcifying Odontogenic Cyst'
      ],
      correct: 0,
      explanation: 'In the absence of secondary inflammation, a dentigerous cyst is lined by a thin, non-keratinized stratified squamous epithelium 2 to 4 cell layers thick without rete pegs, resembling reduced enamel epithelium (Neville Ch. 15).'
    }
  ],

  // Mission 6: Odontogenic Cyst Terminology (otc_m6)
  otc_m6: [
    {
      q: 'What is the diagnostic significance of finding "tombstone" or "picket-fence" basal cells in a jaw cyst?',
      options: [
        'Confirms acute osteomyelitis',
        'Pathognomonic criterion for Odontogenic Keratocyst (OKC)',
        'Indicates a benign mucosal salivary retention phenomenon',
        'Proves the lesion is a malignant osteosarcoma'
      ],
      correct: 1,
      explanation: 'The palisaded basal layer of uniform columnar or tall cuboidal cells with polarized hyperchromatic nuclei resembling a "picket fence" or "row of tombstones" is a defining criterion for OKC (Neville Ch. 15).'
    },
    {
      q: 'A residual cyst represents:',
      options: [
        'A cyst that remains in the jaw bone after the causative non-vital tooth has been extracted',
        'A developmental cyst forming around a congenital missing tooth',
        'A recurrent malignant ameloblastoma',
        'A cyst located in the incisive canal'
      ],
      correct: 0,
      explanation: 'A residual cyst is a radicular (or other inflammatory) cyst that was left behind in the alveolar ridge after the associated non-vital tooth was removed (Neville Ch. 15).'
    },
    {
      q: 'The Nasopalatine Duct Cyst (Incisive Canal Cyst) is clinically and microscopically distinguished by:',
      options: [
        'Heart-shaped radiolucency between maxillary central incisors containing nerves and muscular blood vessels in the cyst wall',
        'Mandibular molar multilocular radiolucency with ghost cells',
        'Involvement of vital mandibular canine with Rushton bodies',
        'High prevalence in young female patients with precocious puberty'
      ],
      correct: 0,
      explanation: 'Nasopalatine duct cyst is the most common non-odontogenic cyst of the oral cavity. Located in the incisive canal, it often appears heart-shaped on radiographs due to superimposition of the anterior nasal spine; the cyst wall contains prominent branches of the nasopalatine nerve and sphenopalatine vessels (Neville Ch. 15).'
    },
    {
      q: 'What is a Primordial Cyst according to modern WHO / Neville classifications?',
      options: [
        'A historic term for an OKC that develops in place of a tooth that failed to form',
        'A synonym for high-grade clear cell carcinoma',
        'A true glandular retention mucocele',
        'A salivary choristoma'
      ],
      correct: 0,
      explanation: 'Historically, "primordial cyst" referred to a cyst developing in place of a tooth before hard tissue calcification occurred. Modern consensus recognizes almost all such lesions as Odontogenic Keratocysts (Neville Ch. 15).'
    },
    {
      q: 'Epithelial rests of Serres originate from:',
      options: [
        'Hertwig epithelial root sheath remnants',
        'Dental lamina remnants within the gingival soft tissue',
        'Junctional epithelium hemidesmosomes',
        'Submandibular gland ductal buds'
      ],
      correct: 1,
      explanation: 'Rests of Serres are small islands of odontogenic epithelial cells derived from fragmentation of the dental lamina, lingering in the gingival soft tissue and giving rise to gingival cysts of the newborn/adult (Neville Ch. 15).'
    }
  ],

  // ══════════════════════════════════════════════════════════
  // TOPIC 2: EPITHELIAL PATHOLOGY & ORAL CANCER (Neville Ch. 10)
  // ══════════════════════════════════════════════════════════

  // Mission 1: OPMD Clinical & Histopath Spectrum (ep_m1)
  ep_m1: [
    {
      q: 'Which Potentially Malignant Disorder (OPMD) carries the highest statistical rate of malignant transformation at initial biopsy?',
      options: [
        'Homogeneous Leukoplakia',
        'Erythroplakia',
        'Reticular Lichen Planus',
        'Frictional Keratosis'
      ],
      correct: 1,
      explanation: 'Neville Ch. 10 stresses that Erythroplakia carries the highest risk among all OPMDs: over 90% of cases demonstrate severe epithelial dysplasia, carcinoma in situ, or invasive squamous cell carcinoma at the time of initial biopsy.'
    },
    {
      q: 'The pathogenesis of Oral Submucous Fibrosis (OSMF) is predominantly triggered by which alkaloid in areca nut?',
      options: [
        'Nicotine',
        'Arecoline',
        'Caffeine',
        'Anabasine'
      ],
      correct: 1,
      explanation: 'Arecoline (the major alkaloid of the areca nut / betel quid) stimulates fibroblasts to produce excessive collagen while inhibiting collagenase activity and upregulating TGF-beta, resulting in progressive subepithelial fibrosis and trismus (Neville Ch. 10).'
    },
    {
      q: 'What is the characteristic subepithelial inflammatory infiltrate in Oral Lichen Planus?',
      options: [
        'Diffuse polymorphonuclear neutrophils forming microabscesses',
        'Dense, band-like (lichenoid) lymphocytic infiltrate strictly hugging the dermal-epidermal junction',
        'Scattered multinucleated Langhans giant cells with caseous necrosis',
        'Sheets of monoclonal neoplastic plasma cells'
      ],
      correct: 1,
      explanation: 'Neville Ch. 10 describes the diagnostic hallmark of Lichen Planus: a well-demarcated, dense, band-like subepithelial infiltrate of T-lymphocytes confined to the superficial lamina propria, coupled with hydropic degeneration of basal keratinocytes.'
    },
    {
      q: 'Civatte bodies (colloid or cytoid bodies) seen at the dermal-epidermal junction in Lichen Planus represent:',
      options: [
        'Calcified fungal spores',
        'Apoptotic / necrotic basal keratinocytes',
        'Aggregated viral protein inclusions',
        'Degenerating plasma cells'
      ],
      correct: 1,
      explanation: 'Civatte bodies (also called colloid or hyaline bodies) are round, eosinophilic, anucleate apoptotic keratinocytes located in the basal layer and superficial lamina propria of lichen planus lesions (Neville Ch. 10).'
    },
    {
      q: 'Actinic Cheilitis is a potentially malignant condition affecting primarily:',
      options: [
        'The dorsum of the tongue caused by candidal overgrowth',
        'The vermilion border of the lower lip caused by chronic ultraviolet radiation exposure',
        'The buccal mucosa caused by betel quid chewing',
        'The soft palate caused by hot food ingestion'
      ],
      correct: 1,
      explanation: 'Actinic (solar) cheilitis results from chronic UV exposure and represents lip counterpart of actinic keratosis. It affects almost exclusively the lower lip, showing epithelial atrophy/hyperkeratosis, solar elastosis in connective tissue, and varying dysplasia (Neville Ch. 10).'
    }
  ],

  // Mission 2: Architectural & Cytologic Dysplasia (ep_m2)
  ep_m2: [
    {
      q: 'Which architectural feature is a strong indicator of epithelial dysplasia according to the WHO and Neville classifications?',
      options: [
        'Uniform slender parallel rete pegs',
        'Bulbous, drop-shaped (teardrop) rete ridges extending into connective tissue',
        'Thick, normal orthokeratin surface layer',
        'Dense underlying mature collagen bundles'
      ],
      correct: 1,
      explanation: 'Neville Ch. 10 lists "drop-shaped" or teardrop bulbous rete pegs (where the bottom of the rete ridge is wider than its neck) as a major architectural alteration signaling epithelial dysplasia.'
    },
    {
      q: 'How is "Severe Epithelial Dysplasia" distinguished from "Carcinoma in Situ"?',
      options: [
        'Severe dysplasia has invaded the bone; carcinoma in situ has not',
        'In Carcinoma in Situ, architectural and cytological atypia involves the entire thickness of the epithelium (top-to-bottom) without breaching the basement membrane',
        'Carcinoma in situ shows metastasis to lymph nodes',
        'Severe dysplasia has no abnormal mitotic figures'
      ],
      correct: 1,
      explanation: 'Carcinoma in situ represents the most extreme form of epithelial dysplasia where dysplastic cytologic changes extend throughout the entire thickness of the epithelium ("top-to-bottom change"), but the basement membrane remains strictly intact (Neville Ch. 10).'
    },
    {
      q: 'Dyskeratosis in epithelial dysplasia refers to:',
      options: [
        'Complete absence of keratin on the oral mucosal surface',
        'Premature, abnormal keratinization of individual cells occurring deep within the spinous or basal layers',
        'Excessive shedding of superficial epithelial cells',
        'Transformation into glandular goblet cells'
      ],
      correct: 1,
      explanation: 'Dyskeratosis is premature individual cell cornification below the stratum granulosum, characterized by round eosinophilic keratinized cells appearing prematurely in the stratum spinosum or basal layer (Neville Ch. 10).'
    },
    {
      q: 'An increased Nuclear-to-Cytoplasmic (N:C) ratio in dysplastic cells signifies:',
      options: [
        'Atrophy and shrinkage of the nucleus',
        'Enlargement of the nucleus relative to the cytoplasmic volume due to increased metabolic and proliferative activity',
        'Accumulation of cytoplasmic glycogen vacuoles',
        'Cellular apoptosis'
      ],
      correct: 1,
      explanation: 'Dysplastic epithelial cells exhibit prominent nuclear enlargement (macronucleoli and hyperchromasia), resulting in a substantially increased N:C ratio compared to normal differentiated spinous cells (Neville Ch. 10).'
    },
    {
      q: 'Where are mitotic figures normally confined in healthy stratified squamous oral epithelium?',
      options: [
        'Stratum corneum',
        'Stratum granulosum',
        'Basal and parabasal layers only',
        'Superficial spinosum'
      ],
      correct: 2,
      explanation: 'In healthy oral epithelium, mitotic activity is strictly confined to the basal and parabasal layers. The presence of mitotic figures in the mid-to-superficial spinous layers or atypical multipolar (tri-polar/starburst) mitoses is a cardinal sign of dysplasia (Neville Ch. 10).'
    }
  ],

  // Mission 3: Epithelial Pathology Terminology (ep_m3)
  ep_m3: [
    {
      q: 'What is "Acanthosis"?',
      options: [
        'Loss of desmosomal cell attachments',
        'Hyperplasia and abnormal thickening of the stratum spinosum (prickle cell layer)',
        'Premature cell death in the basal layer',
        'Invasion of cells into blood capillaries'
      ],
      correct: 1,
      explanation: 'Acanthosis refers to an increased thickness of the spinous layer of stratified squamous epithelium, leading to widened rete ridges (Neville Ch. 10).'
    },
    {
      q: 'Hyperchromatism of cell nuclei is caused by:',
      options: [
        'Excessive intracellular lipid accumulation',
        'Abnormally high nuclear DNA content that avidly binds hematoxylin stain dark blue/purple',
        'Deposition of iron and hemosiderin pigments',
        'Loss of ribosomal RNA'
      ],
      correct: 1,
      explanation: 'Hyperchromatism is the intensely dark staining of cell nuclei resulting from an increased amount of chromatin/DNA in rapidly dividing and atypical neoplastic cells (Neville Ch. 10).'
    },
    {
      q: 'What distinguishes Orthokeratosis from Parakeratosis under light microscopy?',
      options: [
        'Orthokeratinized cells retain pyknotic nuclei; parakeratinized cells do not',
        'Orthokeratin has an anucleate cornified layer with an underlying granular layer (stratum granulosum); parakeratin retains flat dark nuclei in the cornified layer',
        'Orthokeratin stains dark purple with Alcian blue',
        'Parakeratosis only occurs in malignant tumors'
      ],
      correct: 1,
      explanation: 'Orthokeratin is anucleate (no nuclei in the keratin layer) and typically exhibits a well-defined stratum granulosum; parakeratin retains flattened, pyknotic nuclei in the surface keratin and lacks a prominent granulosum (Neville Ch. 10).'
    },
    {
      q: 'Wickham striae are characteristic clinical reticular white lace-like lines observed in:',
      options: [
        'Erythroplakia',
        'Reticular Oral Lichen Planus',
        'Verrucous Carcinoma',
        'Smokeless Tobacco Keratosis'
      ],
      correct: 1,
      explanation: 'Wickham striae are the pathognomonic fine, interlacing white lines and papules seen on the buccal mucosa in reticular lichen planus (Neville Ch. 10).'
    },
    {
      q: 'In Oral Submucous Fibrosis, the progressive inability to open the mouth is termed:',
      options: [
        'Xerostomia',
        'Trismus',
        'Dysphagia',
        'Ankyloglossia'
      ],
      correct: 1,
      explanation: 'Trismus (limited mouth opening) is the clinical hallmark of OSMF, caused by severe dense fibrous connective tissue bands forming in the buccal mucosa, soft palate, and pterygomandibular raphe (Neville Ch. 10).'
    }
  ],

  // Mission 4: OSCC & Verrucous Carcinoma (ep_m4)
  ep_m4: [
    {
      q: 'What is the definitive microscopic hallmark of Well-Differentiated Oral Squamous Cell Carcinoma (OSCC)?',
      options: [
        'Sheet-like proliferation of small uniform basaloid cells',
        'Islands and cords of malignant squamous cells with prominent concentric Keratin Pearls and intercellular bridges',
        'Extensive amyloid deposition with Swiss cheese spaces',
        'Presence of Birbeck granules on electron microscopy'
      ],
      correct: 1,
      explanation: 'Neville Ch. 10 explains that well-differentiated OSCC closely resembles normal squamous epithelium, characterized by abundant eosinophilic cytoplasm, intercellular bridges (desmosomes), and numerous concentric laminated Keratin Pearls (epithelial pearls).'
    },
    {
      q: 'Verrucous Carcinoma (Ackerman tumor) is distinguished from conventional OSCC by which clinical and microscopic feature?',
      options: [
        'Extremely high rate of early cervical lymph node metastasis',
        'Broad, pushing "elephant-foot" bulbous rete ridges with church-spire surface hyperkeratosis and low metastatic potential',
        'Marked nuclear anaplasia and abundant atypical multipolar mitoses',
        'Occurrence exclusively in children under 10 years'
      ],
      correct: 1,
      explanation: 'Verrucous Carcinoma is a low-grade, non-metastasizing variant of OSCC characterized by a papillary or warty surface with deep keratin-filled clefts ("church spires") and broad, pushing bulbous rete ridges ("elephant feet") that compress rather than infiltrate the connective tissue (Neville Ch. 10).'
    },
    {
      q: 'Which oral anatomical site carries the highest incidence and worst prognosis for Oral Squamous Cell Carcinoma?',
      options: [
        'Hard palate and attached gingiva',
        'Posterolateral border of tongue and floor of mouth',
        'Dorsum of the tongue',
        'Labial mucosa of the upper lip'
      ],
      correct: 1,
      explanation: 'The posterolateral border of the tongue and the floor of the mouth account for over 50% of all intraoral OSCC cases, where thin lining mucosa and abundant lymphatic drainage facilitate rapid depth of invasion and early cervical node metastasis (Neville Ch. 10).'
    },
    {
      q: 'What does "Desmoplasia" signify in the histopathology of invasive carcinoma?',
      options: [
        'Formation of reactive new bone around the tumor',
        'Proliferation of dense, collagenous, fibrous connective tissue stroma induced by invasive neoplastic cells',
        'Direct invasion into nerve axons',
        'Infiltration of tumor cells into the blood vessel lumen'
      ],
      correct: 1,
      explanation: 'Desmoplasia is the induction of a dense, scirrhous, collagen-rich fibrous stroma by invading carcinoma cells, creating a firm, indurated consistency upon palpation (Neville Ch. 10).'
    },
    {
      q: 'High-risk Human Papillomavirus (HPV-16 and HPV-18) is most strongly associated with squamous cell carcinomas arising in which anatomical area?',
      options: [
        'Anterior floor of mouth',
        'Oropharynx (palatine tonsils and base of tongue)',
        'Hard palate rugae',
        'Buccal mucosa'
      ],
      correct: 1,
      explanation: 'Neville Ch. 10 emphasizes that HPV-positive squamous cell carcinoma arises predominantly in the oropharynx (tonsillar crypts and base of tongue), driven by the viral oncoproteins E6 (degrades p53) and E7 (inactivates pRb), showing a non-keratinizing basaloid histology and p16 overexpression.'
    }
  ],

  // Mission 5: Invasion & Keratin Pearl Histology (ep_m5)
  ep_m5: [
    {
      q: 'Perineural invasion in oral squamous cell carcinoma is defined microscopically as:',
      options: [
        'Malignant tumor cells tracking along the perineurium, epineurium, or nerve sheath spaces of peripheral nerves',
        'Degeneration of nerve fibers caused by local anesthetic',
        'Compression of nerves by a benign fibrous capsule',
        'Autoimmune demyelination of cranial nerves'
      ],
      correct: 0,
      explanation: 'Perineural invasion is the infiltration of neoplastic cells into the perineural space surrounding peripheral nerve bundles, serving as a pathway for tumor extension beyond surgical margins and correlating with increased recurrence and poor survival (Neville Ch. 10).'
    },
    {
      q: 'A Spindle Cell Carcinoma (Sarcomatoid Carcinoma) is a biphasic variant of OSCC that can mimic a sarcoma. What immunohistochemical marker confirms its epithelial origin?',
      options: [
        'S-100 protein',
        'Cytokeratin (e.g., AE1/AE3, p63, CK5/6)',
        'Desmin',
        'CD34'
      ],
      correct: 1,
      explanation: 'Spindle cell carcinoma consists of malignant spindle cells that resemble a sarcoma, but positivity for epithelial markers such as cytokeratins and p63 confirms their true squamous epithelial origin (Neville Ch. 10).'
    },
    {
      q: 'Depth of Invasion (DOI) in the AJCC 8th Edition TNM staging of oral cancer is measured from:',
      options: [
        'The surface keratin layer to the bottom of the tumor',
        'The level of the adjacent normal epithelial basement membrane to the deepest point of invasive tumor cells',
        'The base of the mandible to the mucosal surface',
        'The closest surgical resection margin'
      ],
      correct: 1,
      explanation: 'According to current AJCC guidelines (Neville Ch. 10), DOI is measured by dropping a perpendicular line from the level of the basement membrane of the closest adjacent normal mucosa to the deepest point of tumor invasion.'
    },
    {
      q: 'What is a "Keratin Pearl" composed of?',
      options: [
        'A round colony of Actinomyces bacteria',
        'Concentric laminated layers of flattened, eosinophilic hornified squamous cells with or without pyknotic nuclei in the center of an invasive island',
        'A collection of apoptotic Tzanck cells',
        'A cluster of dystrophic calcium deposits in blood vessels'
      ],
      correct: 1,
      explanation: 'Keratin pearls (epithelial pearls) are concentric, onion-skin-like whorls of laminated keratinocytes undergoing terminal differentiation at the center of malignant epithelial islands, pathognomonic of well-differentiated OSCC (Neville Ch. 10).'
    },
    {
      q: 'Poorly differentiated OSCC is characterized by:',
      options: [
        'Abundant keratin pearls and prominent intercellular bridges',
        'Sheets of pleomorphic, anaplastic cells with high mitotic rate, nuclear hyperchromasia, and little or no keratinization',
        'Uniform glandular duct formation',
        'Complete absence of mitotic figures'
      ],
      correct: 1,
      explanation: 'Poorly differentiated OSCC shows minimal resemblance to squamous epithelium, lacking keratin pearls and intercellular bridges, and is dominated by cellular anaplasia, marked pleomorphism, and bizarre mitotic figures (Neville Ch. 10).'
    }
  ],

  // Mission 6: Oncology & Carcinoma Terminology (ep_m6)
  ep_m6: [
    {
      q: 'In the TNM clinical staging system, the "T" component evaluates:',
      options: [
        'The size and local extent of the primary tumor (T1 to T4)',
        'The total number of teeth involved in the quadrant',
        'The thickness of the subepithelial basement membrane',
        'The degree of cytological differentiation'
      ],
      correct: 0,
      explanation: 'In the TNM classification, T evaluates the dimensions and depth/invasion of the primary Tumor, N evaluates regional lymph Node metastasis, and M evaluates distant Metastasis (Neville Ch. 10).'
    },
    {
      q: 'Field Cancerization (Slaughter concept) explains why patients treated for oral cancer:',
      options: [
        'Develop secondary primary tumors in other areas of the aerodigestive tract exposed to the same carcinogens (tobacco/alcohol)',
        'Experience bacterial infections in the surgical field',
        'Become immune to further neoplastic mutations',
        'Have generalized bone sclerosis'
      ],
      correct: 0,
      explanation: 'Slaughter\'s concept of Field Cancerization postulates that widespread exposure to carcinogens (tobacco and alcohol) preconditions the entire upper aerodigestive mucosal surface, creating multiple independent subclinical clones of mutated cells that can produce separate primary cancers (Neville Ch. 10).'
    },
    {
      q: 'The term "Carcinoma in Situ" implies that:',
      options: [
        'The lesion has invaded into blood vessels',
        'Dysplastic cells occupy the full thickness of the epithelium but the basement membrane remains completely intact with NO stromal invasion',
        'The tumor has metastasized to the lungs',
        'The lesion has already produced osteolytic jaw destruction'
      ],
      correct: 1,
      explanation: 'In Carcinoma in Situ, all criteria for malignancy are present within the epithelial layer, but the basement membrane is intact and there is zero invasion into the underlying connective tissue stroma (Neville Ch. 10).'
    },
    {
      q: 'A surgical margin reported as "positive" after resection of oral cancer indicates that:',
      options: [
        'The patient has tested positive for HIV',
        'Malignant tumor cells are present at the inked surgical cut edge of the resected tissue specimen',
        'The lesion is benign',
        'Complete curative excision was achieved'
      ],
      correct: 1,
      explanation: 'A positive margin means that tumor cells extend directly to the outer margin of the surgically excised tissue, indicating a high risk of residual disease and local recurrence (Neville Ch. 10).'
    },
    {
      q: 'Lymphatic drainage from the tip of the tongue primarily drains into which lymph node group first?',
      options: [
        'Submental lymph nodes (Level IA)',
        'Supraclavicular lymph nodes (Level V)',
        'Axillary lymph nodes',
        'Postauricular lymph nodes'
      ],
      correct: 0,
      explanation: 'Lymphatics from the anterior floor of mouth and tip of the tongue drain primarily into the Submental lymph nodes (Level IA), before progressing to submandibular (Level IB) and deep cervical nodes (Neville Ch. 10).'
    }
  ],

  // ══════════════════════════════════════════════════════════
  // TOPIC 3: SALIVARY GLAND PATHOLOGY (Neville Ch. 11)
  // ══════════════════════════════════════════════════════════

  // Mission 1: Benign Tumors & Obstructive Lesions (sp_m1)
  sp_m1: [
    {
      q: 'Pleomorphic Adenoma (Mixed Tumor) is termed "mixed" because:',
      options: [
        'It is caused by a mixture of viral and bacterial infections',
        'It contains a mixture of ductal epithelial cells and modified myoepithelial cells in a background of diverse mesenchyme-like (myxoid, chondroid, hyaline) stroma',
        'It consists of both benign and malignant cells simultaneously',
        'It occurs in both major and minor salivary glands equally'
      ],
      correct: 1,
      explanation: 'Pleomorphic Adenoma is a benign epithelial tumor showing remarkable histologic diversity: ductal cells and myoepithelial cells intermingle with myxoid, chondroid (cartilage-like), hyalinized, or osseous stroma produced by the neoplastic myoepithelial cells (Neville Ch. 11).'
    },
    {
      q: 'Warthin Tumor (Papillary Cystadenoma Lymphomatosum) is strongly correlated with which risk factor and anatomical location?',
      options: [
        'Chewing tobacco; minor glands of the palate',
        'Cigarette smoking; parotid gland superficial lobe / tail',
        'Alcohol consumption; sublingual gland',
        'Areca nut; submandibular gland'
      ],
      correct: 1,
      explanation: 'Warthin tumor occurs almost exclusively in the parotid gland (especially the tail of the parotid) in older adults and has a very strong association with cigarette smoking (smokers have an 8-fold higher risk) (Neville Ch. 11).'
    },
    {
      q: 'Why is a Mucus Extravasation Phenomenon (Mucocele) classified as a "pseudocyst" rather than a true cyst?',
      options: [
        'It contains blood instead of fluid',
        'It lacks an epithelial lining, consisting instead of pooled mucin surrounded by granulation tissue and foamy histiocytes',
        'It occurs only in bone',
        'It has malignant epithelial proliferation'
      ],
      correct: 1,
      explanation: 'A mucocele of the extravasation type is caused by traumatic severing of a minor salivary gland duct; pooled mucin spills into the surrounding connective tissue and is encapsulated by granulation tissue without an epithelial lining (Neville Ch. 11).'
    },
    {
      q: 'Necrotizing Sialometaplasia is a benign reactive condition of the palate that can be easily misdiagnosed clinically and histopathologically as:',
      options: [
        'Squamous Cell Carcinoma or Mucoepidermoid Carcinoma',
        'Pleomorphic Adenoma',
        'Recurrent Aphthous Stomatitis',
        'Radicular Cyst'
      ],
      correct: 0,
      explanation: 'Necrotizing sialometaplasia results from local ischemic necrosis of salivary lobules (e.g., following palatal local anesthesia or trauma). The surviving ducts undergo prominent squamous metaplasia while lobular architecture is preserved, frequently mimicking OSCC or MEC (Neville Ch. 11).'
    },
    {
      q: 'Canalicular Adenoma demonstrates a distinct predilection for which oral site?',
      options: [
        'Upper lip (nearly 70% of cases)',
        'Floor of the mouth',
        'Retromolar trigone',
        'Ventral tongue'
      ],
      correct: 0,
      explanation: 'Canalicular adenoma is a benign monomorphic adenoma that occurs almost exclusively in minor salivary glands, with approximately 70% developing in the upper lip of older adults (Neville Ch. 11).'
    }
  ],

  // Mission 2: Pleomorphic Adenoma & Warthin Histology (sp_m2)
  sp_m2: [
    {
      q: 'What cell type in Pleomorphic Adenoma is responsible for synthesizing the chondromyxoid and cartilaginous matrix?',
      options: [
        'Ductal intercalated epithelial cells',
        'Myoepithelial cells',
        'Infiltrating fibroblasts',
        'Endothelial cells'
      ],
      correct: 1,
      explanation: 'Modified myoepithelial cells in pleomorphic adenoma produce the extracellular glycosaminoglycans and chondroid matrix, often adopting a plasmacytoid ("hyaline") or spindle appearance (Neville Ch. 11).'
    },
    {
      q: 'The epithelial component of Warthin Tumor consists of:',
      options: [
        'Keratinizing squamous epithelium with pearls',
        'A distinct bilayered oncocytic epithelium (tall columnar luminal cells and smaller basal cells packed with mitochondria) forming papillary projections into cystic spaces',
        'Mucin-secreting signet-ring cells',
        'Sheets of small round blue cells'
      ],
      correct: 1,
      explanation: 'Neville Ch. 11 details that Warthin tumor exhibits papillary cystic folds lined by a double layer of uniform eosinophilic oncocytes (inner tall columnar cells with centrally placed palisaded nuclei, and outer cuboidal basal cells) resting on a rich lymphoid stroma with germinal centers.'
    },
    {
      q: 'Why does simple enucleation of a parotid Pleomorphic Adenoma result in a high rate of recurrence?',
      options: [
        'The tumor sends neoplastic finger-like pseudopodia through the thin fibrous capsule into adjacent gland tissue',
        'The tumor spreads via the facial nerve',
        'The tumor always has occult neck metastasis',
        'The tumor is resistant to radiation'
      ],
      correct: 0,
      explanation: 'Pleomorphic adenoma is bounded by a thin, irregular fibrous pseudocapsule through which microscopic extensions (pseudopodia or capsular breaches) protrude. Enucleation tears these extensions and leaves neoplastic cells behind (Neville Ch. 11).'
    },
    {
      q: 'Oncocytes in salivary gland tumors appear intensely eosinophilic and granular on H&E stain due to:',
      options: [
        'Abundant glycogen storage',
        'Extensive accumulation of altered mitochondria',
        'Engorgement with mucin droplets',
        'Hemosiderin pigment accumulation'
      ],
      correct: 1,
      explanation: 'Oncocytes are transformed epithelial cells whose cytoplasm is filled with vast numbers of crowded, biochemically altered mitochondria, creating their granular pink/eosinophilic appearance (Neville Ch. 11).'
    },
    {
      q: 'A Sialolith (salivary calculus) is most commonly found in which salivary gland duct system?',
      options: [
        'Stensen duct (Parotid)',
        'Wharton duct (Submandibular gland)',
        'Bartholin duct (Sublingual gland)',
        'Minor palatine ducts'
      ],
      correct: 1,
      explanation: 'Over 80% of sialoliths occur in the Wharton duct of the submandibular gland due to its long upward path, wider diameter, and the thicker, more alkaline, mucin- and calcium-rich secretion (Neville Ch. 11).'
    }
  ],

  // Mission 3: Benign Salivary Terminology (sp_m3)
  sp_m3: [
    {
      q: 'A Ranula refers specifically to a mucocele located in:',
      options: [
        'The lower lip mucosa',
        'The floor of the mouth arising from the sublingual gland',
        'The buccal mucosa opposite the first molar',
        'The soft palate'
      ],
      correct: 1,
      explanation: 'A ranula is a large, translucent, bluish mucocele located in the floor of the mouth, characteristically arising from duct rupture of the sublingual gland (Neville Ch. 11).'
    },
    {
      q: 'A Plunging (Cervical) Ranula develops when spilled mucin:',
      options: [
        'Extends downward through the mylohyoid muscle into the submandibular and cervical fascial spaces of the neck',
        'Extends into the maxillary sinus cavity',
        'Invades the mandibular marrow space',
        'Spills onto the surface of the tongue'
      ],
      correct: 0,
      explanation: 'A plunging ranula occurs when extravasated salivary mucin tracks dissecting through or around the posterior border of the mylohyoid muscle into the neck, producing a submandibular cervical swelling (Neville Ch. 11).'
    },
    {
      q: 'Sjögren Syndrome is an autoimmune disease primarily characterized by lymphocytic destruction of:',
      options: [
        'Salivary and lacrimal exocrine glands (causing xerostomia and keratoconjunctivitis sicca)',
        'Thyroid follicular cells',
        'Adrenal cortical glands',
        'Pituitary anterior lobe'
      ],
      correct: 0,
      explanation: 'Sjögren syndrome is a systemic autoimmune disorder marked by T- and B-cell infiltration and progressive destruction of lacrimal and salivary glands, resulting in dry eyes and dry mouth (sicca syndrome) with a 20-fold increased risk of B-cell lymphoma (Neville Ch. 11).'
    },
    {
      q: 'Histologically, minor salivary gland biopsy of the lower lip in Sjögren Syndrome is evaluated by:',
      options: [
        'Focus score (clusters of 50 or more lymphocytes per 4 mm² of gland tissue)',
        'Number of keratin pearls per high-power field',
        'Presence of amyloid Liesegang rings',
        'Depth of mylohyoid invasion'
      ],
      correct: 0,
      explanation: 'Labial salivary gland biopsy diagnosis of Sjögren syndrome uses the Focus Score: a focus is defined as an aggregate of 50 or more lymphocytes/plasma cells adjacent to normal-appearing acini; a score of ≥ 1 focus per 4 mm² is diagnostic (Neville Ch. 11).'
    },
    {
      q: 'What is a Salivary Choristoma?',
      options: [
        'A malignant salivary neoplasm with neural tracking',
        'A normal salivary gland tissue found in an abnormal anatomical location (heterotopic salivary tissue)',
        'A stone obstructing the parotid duct',
        'An autoimmune granuloma'
      ],
      correct: 1,
      explanation: 'A choristoma is microscopically normal tissue in an abnormal anatomical site, such as heterotopic salivary gland tissue found in the middle ear or cervical lymph nodes (Neville Ch. 11).'
    }
  ],

  // Mission 4: Salivary Carcinomas (sp_m4)
  sp_m4: [
    {
      q: 'What is the most common primary malignant salivary gland neoplasm in both adults and children?',
      options: [
        'Adenoid Cystic Carcinoma',
        'Mucoepidermoid Carcinoma',
        'Acinic Cell Carcinoma',
        'Carcinoma ex Pleomorphic Adenoma'
      ],
      correct: 1,
      explanation: 'Mucoepidermoid Carcinoma (MEC) is the most frequent malignant salivary gland tumor across all age groups, consisting of a variable mixture of mucous, epidermoid (squamoid), and intermediate cells (Neville Ch. 11).'
    },
    {
      q: 'What characteristic chromosomal translocation is detected in the majority of Mucoepidermoid Carcinomas?',
      options: [
        't(11;19)(q21;p13) CRTC1-MAML2 fusion',
        't(8;14) MYC-IGH fusion',
        't(9;22) BCR-ABL Philadelphia chromosome',
        't(14;18) BCL2 rearrangement'
      ],
      correct: 0,
      explanation: 'Neville Ch. 11 notes that up to 80% of mucoepidermoid carcinomas harbor the t(11;19)(q21;p13) translocation, creating a CRTC1-MAML2 fusion gene that disrupts Notch signaling pathways.'
    },
    {
      q: 'Adenoid Cystic Carcinoma (ACC) is notorious for which clinical and histopathologic feature?',
      options: [
        'Early painless enlargement without recurrence',
        'Relentless perineural invasion (tracking along nerve sheaths) causing pain/facial paralysis, and late lung metastases',
        'Exclusive involvement of young children',
        'Formation of abundant true bone'
      ],
      correct: 1,
      explanation: 'Adenoid Cystic Carcinoma exhibits an unmistakable affinity for perineural invasion, tracking along nerve trunks far beyond clinical borders and causing early pain or paresthesia, with delayed distant hematogenous metastases to lungs and bone decades after primary treatment (Neville Ch. 11).'
    },
    {
      q: 'The classic "Swiss cheese" or cribriform pattern in Adenoid Cystic Carcinoma is composed of:',
      options: [
        'Islands of basaloid cells surrounding cylindrical pseudocystic spaces filled with basophilic glycosaminoglycans or hyalinized basement membrane material',
        'Sheets of fat cells surrounding necrotic osteoid',
        'Concentric keratin pearls and intercellular prickles',
        'Glandular ducts lined by ciliated columnar cells'
      ],
      correct: 0,
      explanation: 'The cribriform pattern of ACC consists of nests of uniform small, dark, basaloid myoepithelial cells punctuated by cylindrical spaces resembling the holes of Swiss cheese, filled with basophilic glycosaminoglycan material or hyaline cylinders (Neville Ch. 11).'
    },
    {
      q: 'Acinic Cell Carcinoma is characterized microscopically by cells showing serous acinar differentiation containing:',
      options: [
        'Intracellular mucin droplets positive for Mucicarmine',
        'Cytoplasmic basophilic Zymogen secretory granules (PAS positive, diastase resistant)',
        'Melanin pigment granules',
        'Amyloid Congo red positive spherules'
      ],
      correct: 1,
      explanation: 'Acinic Cell Carcinoma cells resemble normal serous acini, containing prominent cytoplasmic basophilic zymogen granules that stain positive with PAS and resist diastase digestion (Neville Ch. 11).'
    }
  ],

  // Mission 5: Swiss-Cheese & Mucinous Architecture (sp_m5)
  sp_m5: [
    {
      q: 'Which special histochemical stain is essential to confirm the diagnosis of Mucoepidermoid Carcinoma by demonstrating intracellular mucin?',
      options: [
        'Mucicarmine / Alcian Blue',
        'Alizarin Red',
        'Von Kossa',
        'Prussian Blue'
      ],
      correct: 0,
      explanation: 'Mucicarmine and Alcian blue stains specifically highlight intracellular and extracellular epithelial mucin bright pink/blue, confirming the mucous cell component in Mucoepidermoid Carcinoma (Neville Ch. 11).'
    },
    {
      q: 'The three microscopic architectural patterns recognized in Adenoid Cystic Carcinoma are:',
      options: [
        'Papillary, cystic, and alveolar',
        'Cribriform (Swiss cheese), Tubular, and Solid (basaloid)',
        'Follicular, plexiform, and desmoplastic',
        'Spindle, clear cell, and oncocytic'
      ],
      correct: 1,
      explanation: 'Neville Ch. 11 outlines three histologic patterns of ACC: Cribriform, Tubular, and Solid. The solid variant carries the worst prognosis with early recurrence and metastasis.'
    },
    {
      q: 'Carcinoma ex Pleomorphic Adenoma represents:',
      options: [
        'A malignant tumor arising from the epithelial component of a pre-existing benign pleomorphic adenoma',
        'A benign tumor developing inside a malignant lymphoma',
        'A collision tumor of two separate benign entities',
        'A salivary gland metastasis from breast carcinoma'
      ],
      correct: 0,
      explanation: 'Carcinoma ex Pleomorphic Adenoma is a high-grade carcinoma that arises from the epithelial element of a long-standing, untreated, or multiply recurrent benign pleomorphic adenoma (Neville Ch. 11).'
    },
    {
      q: 'Polymorphous Adenocarcinoma (PAC) occurs almost exclusively in which anatomical location?',
      options: [
        'Parotid gland superficial lobe',
        'Minor salivary glands of the hard and soft palate',
        'Submandibular gland parenchyma',
        'Sublingual gland ducts'
      ],
      correct: 1,
      explanation: 'Polymorphous Adenocarcinoma occurs almost exclusively in minor salivary glands, with over 60% developing in the palate. It exhibits diverse architecture (tubular, solid, trabecular, cribriform) with deceptively bland uniform cytology (Neville Ch. 11).'
    },
    {
      q: 'Intermediate cells in Mucoepidermoid Carcinoma function as:',
      options: [
        'Progenitor basaloid cells capable of differentiating into either mucous or epidermoid cells',
        'Dead necrotic cells',
        'Host immune cytotoxic lymphocytes',
        'Stroma-producing fibroblasts'
      ],
      correct: 0,
      explanation: 'Intermediate cells are small, basaloid, polygona cells that represent a transitional progenitor population capable of maturing into either squamoid (epidermoid) or mucin-producing cells (Neville Ch. 11).'
    }
  ],

  // Mission 6: Salivary Malignancy Terminology (sp_m6)
  sp_m6: [
    {
      q: 'What distinguishes a Low-Grade Mucoepidermoid Carcinoma from a High-Grade one?',
      options: [
        'Low-grade has abundant cystic spaces and prominent mucous cells; high-grade is predominantly solid with atypical epidermoid/intermediate cells and frequent mitoses',
        'Low-grade occurs only in males; high-grade only in females',
        'Low-grade has 100% mortality within 6 months',
        'High-grade lacks the CRTC1-MAML2 translocation entirely'
      ],
      correct: 0,
      explanation: 'Histologic grading of MEC is based on the proportion of cystic spaces, degree of cytological atypia, necrosis, mitotic rate, and neural/vascular invasion: low-grade tumors are predominantly cystic with abundant mature mucous cells, whereas high-grade tumors are solid with marked atypia (Neville Ch. 11).'
    },
    {
      q: 'The historical term "Cylindroma" was applied to which salivary malignancy?',
      options: [
        'Adenoid Cystic Carcinoma',
        'Acinic Cell Carcinoma',
        'Warthin Tumor',
        'Canalicular Adenoma'
      ],
      correct: 0,
      explanation: 'Billroth originally coined the term "Cylindroma" for Adenoid Cystic Carcinoma due to the cylindrical hyaline and basophilic stromal cylinders surrounded by basaloid tumor nests (Neville Ch. 11).'
    },
    {
      q: 'Secretory Carcinoma of salivary glands (formerly Mammary Analogue Secretory Carcinoma / MASC) harbors which specific genetic fusion?',
      options: [
        'ETV6-NTRK3 translocation',
        'BRAF V600E mutation',
        'EWSR1-FLI1 fusion',
        'MYB-NFIB translocation'
      ],
      correct: 0,
      explanation: 'Secretory carcinoma of salivary glands is characterized by the t(12;15)(p13;q25) translocation producing an ETV6-NTRK3 gene fusion, identical to secretory carcinoma of the breast, and responds to TRK inhibitors (Neville Ch. 11).'
    },
    {
      q: 'Adenoid Cystic Carcinoma most commonly metastasizes to which distant organ via the bloodstream?',
      options: [
        'Lungs',
        'Liver',
        'Kidneys',
        'Spleen'
      ],
      correct: 0,
      explanation: 'Hematogenous spread is characteristic of ACC, with the lungs and bone being the most common sites of distant metastasis, often occurring many years after initial surgical resection (Neville Ch. 11).'
    },
    {
      q: 'Why is minor salivary gland pathology on the hard palate and upper lip statistically different?',
      options: [
        'Palatal minor gland tumors are approximately 50% malignant, whereas upper lip minor gland tumors are overwhelmingly benign (canalicular adenoma / pleomorphic adenoma)',
        'Palatal tumors only occur in infancy',
        'Upper lip tumors never contain ducts',
        'Palate lacks minor salivary glands entirely'
      ],
      correct: 0,
      explanation: 'Neville emphasizes the clinical rule of thumb: minor salivary gland tumors on the palate have a nearly 50% probability of being malignant (e.g., MEC, ACC, PAC), whereas tumors of the upper lip are greater than 90% benign (predominantly canalicular and pleomorphic adenomas).'
    }
  ],

  // ══════════════════════════════════════════════════════════
  // TOPIC 4: BONE PATHOLOGY & FIBRO-OSSEOUS LESIONS (Neville Ch. 14)
  // ══════════════════════════════════════════════════════════

  // Mission 1: Fibro-Osseous Spectrum (bf_m1)
  bf_m1: [
    {
      q: 'Which histopathologic feature is classic for Fibrous Dysplasia of the jaws?',
      options: [
        'Irregular, curvilinear C- and V-shaped trabeculae of immature woven bone without osteoblastic rimming ("Chinese characters") in a cellular fibrous stroma',
        'Well-formed lamellar bone with thick continuous osteoblastic rimming and a fibrous capsule',
        'Concentric Liesegang rings in polyhedral epithelial sheets',
        'Sheets of multinucleated giant cells surrounding cholesterol clefts'
      ],
      correct: 0,
      explanation: 'Neville Ch. 14 explains the hallmark histology of Fibrous Dysplasia: irregular, disconnected, curvilinear C- and Chinese character-like trabeculae of immature woven bone that blend imperceptibly into adjacent normal bone, lacking peripheral osteoblastic rimming.'
    },
    {
      q: 'What postzygotic somatic mutation is responsible for the pathogenesis of Fibrous Dysplasia and McCune-Albright Syndrome?',
      options: [
        'GNAS gene mutation (R201 codon)',
        'BRAF V600E mutation',
        'SH3BP2 mutation',
        'PTCH1 mutation'
      ],
      correct: 0,
      explanation: 'Fibrous dysplasia is caused by a somatic activating mutation in the GNAS gene (encoding the alpha subunit of the Gs stimulatory protein), leading to persistent adenylate cyclase activation, elevated intracellular cAMP, and unregulated osteoblast proliferation (Neville Ch. 14).'
    },
    {
      q: 'Cemento-Ossifying Fibroma (COF) is distinguished from Fibrous Dysplasia because COF is:',
      options: [
        'A true encapsulated, well-demarcated neoplasm with sharp borders that separates cleanly from surrounding normal bone',
        'A diffuse non-encapsulated lesion that merges seamlessly into bone',
        'A malignant metastatic sarcoma',
        'Caused by tooth periapical infection'
      ],
      correct: 0,
      explanation: 'Unlike fibrous dysplasia which blends into normal bone without a border, Cemento-Ossifying Fibroma is a true benign neoplasm with sharp, well-demarcated margins, shell-like expansion, and a distinct fibrous capsule that shells out easily at surgery (Neville Ch. 14).'
    },
    {
      q: 'Periapical Cemento-Osseous Dysplasia (PCOD) typically occurs in which clinical setting?',
      options: [
        'Anterior mandible of middle-aged Black/Asian females associated with VITAL teeth',
        'Posterior maxilla of teenage males with non-vital teeth',
        'Mandibular ramus of elderly males with facial paralysis',
        'Hard palate of young children with precocious puberty'
      ],
      correct: 0,
      explanation: 'Neville Ch. 14 emphasizes that PCOD exhibits a dramatic predilection for the periapical region of the anterior mandible in middle-aged females (predominantly of African and Asian descent); crucially, the associated teeth are always VITAL and require no root canal therapy.'
    },
    {
      q: 'McCune-Albright Syndrome is defined by the clinical triad of:',
      options: [
        'Polyostotic fibrous dysplasia, Café-au-lait skin macules (Coast of Maine), and endocrine hyperfunction (precocious puberty)',
        'Multiple OKCs, bifid ribs, and palmar pits',
        'Supernumerary teeth, osteomas, and intestinal polyps',
        'Multiple neuromas, medullary thyroid carcinoma, and pheochromocytoma'
      ],
      correct: 0,
      explanation: 'McCune-Albright syndrome features polyostotic fibrous dysplasia, unilateral jagged café-au-lait cutaneous pigmentation ("Coast of Maine"), and endocrine hyperfunction, most commonly precocious puberty in young females (Neville Ch. 14).'
    }
  ],

  // Mission 2: Woven Bone & Spherule Histology (bf_m2)
  bf_m2: [
    {
      q: 'How does Cemento-Ossifying Fibroma appear under the microscope?',
      options: [
        'A cellular fibroblastic stroma containing a mixture of immature woven bone, mature lamellar bone trabeculae with osteoblastic rimming, and acellular basophilic cementum-like spherules',
        'Sheets of anaplastic chondrocytes in myxoid matrix',
        'Uniform parakeratinized epithelial lining with Rushton bodies',
        'Diffuse proliferation of osteoclasts dissolving cortex'
      ],
      correct: 0,
      explanation: 'COF demonstrates a cellular fibrous stroma containing varying proportions of mineralized material: bony trabeculae with active osteoblastic rimming and rounded, acellular, basophilic cementum-like spherules (psammoma-like calcifications) (Neville Ch. 14).'
    },
    {
      q: 'Why is surgical biopsy or intervention generally contraindicated in active Florid Cemento-Osseous Dysplasia (FCOD)?',
      options: [
        'The lesion has an 80% risk of malignant transformation',
        'The dense, avascular sclerotic bone masses are highly susceptible to secondary hypovascular necrosis and intractable osteomyelitis',
        'It causes severe pulmonary hypertension',
        'It triggers immediate facial nerve paralysis'
      ],
      correct: 1,
      explanation: 'Florid COD produces massive dense, hypovascular cemento-osseous bone in multiple quadrants. Any surgical intervention or tooth extraction exposes the compromised avascular bone to oral bacteria, triggering intractable secondary osteomyelitis (Neville Ch. 14).'
    },
    {
      q: 'Cherubism is an autosomal dominant condition characterized histologically by:',
      options: [
        'Vascular fibrous tissue packed with multinucleated giant cells and perivascular eosinophilic collagen cuffing',
        'Pure mature compact bone with Haversian systems',
        'Ghost cells and Liesegang calcifications',
        'Anaplastic pleomorphic osteoblasts producing osteoid'
      ],
      correct: 0,
      explanation: 'Neville Ch. 14 notes that Cherubism (caused by SH3BP2 mutations) shows vascular fibrous stroma containing numerous multinucleated giant cells and a characteristic pathognomonic cuff of eosinophilic collagen around small blood capillaries.'
    },
    {
      q: 'The ground-glass or orange-peel (peau d\'orange) radiographic appearance is classic for:',
      options: [
        'Fibrous Dysplasia',
        'Ameloblastoma',
        'Radicular Cyst',
        'Osteosarcoma'
      ],
      correct: 0,
      explanation: 'The numerous fine, poorly calcified woven bone trabeculae in fibrous dysplasia replace normal marrow spaces, creating a characteristic fine, hazy "ground-glass", "orange-peel", or "fingerprint" radiographic pattern (Neville Ch. 14).'
    },
    {
      q: 'Juvenile Trabecular Ossifying Fibroma (JTOF) is distinguished from adult COF by:',
      options: [
        'Occurrence in children and adolescents, aggressive rapid growth, and anastomosing strands of osteoid lined by plump osteoblasts',
        'Presence of true cartilage pearls and ghost cells',
        'Spontaneous regression without treatment',
        'Exclusively bilateral maxillary sinus involvement'
      ],
      correct: 0,
      explanation: 'Juvenile ossifying fibroma (JOF) is an aggressive, rapidly growing variant arising in children and young adults, divided into juvenile trabecular and juvenile psammomatoid types, requiring prompt surgical excision due to destructive expansion (Neville Ch. 14).'
    }
  ],

  // Mission 3: Fibro-Osseous Terminology (bf_m3)
  bf_m3: [
    {
      q: 'What is the definition of "Woven Bone"?',
      options: [
        'Mature parallel-lamellar bone with Haversian canals',
        'Immature, embryonic, non-lamellar bone characterized by haphazardly oriented collagen fibers and large, randomly distributed osteocytes',
        'Dense acellular cementum covering tooth roots',
        'Dead bone separated by granulation tissue'
      ],
      correct: 1,
      explanation: 'Woven (fibrous or immature) bone is rapidly deposited bone characterized by irregular, randomly oriented collagen fibers, low mineral content, and numerous plump osteocytes, normally seen in fetal development, healing fractures, and fibro-osseous lesions (Neville Ch. 14).'
    },
    {
      q: 'Osteomas associated with supernumerary teeth, impacted teeth, and intestinal polyposis with 100% malignant potential define:',
      options: [
        'Gardner Syndrome',
        'Gorlin Syndrome',
        'Treacher Collins Syndrome',
        'Peutz-Jeghers Syndrome'
      ],
      correct: 0,
      explanation: 'Gardner Syndrome (an autosomal dominant variant of FAP caused by APC gene mutations) features multiple osteomas of the skull and jaws, multiple unerupted and supernumerary teeth, epidermoid cysts, and adenomatous intestinal polyps that inevitably undergo malignant transformation (Neville Ch. 14).'
    },
    {
      q: 'Osteoid Osteoma produces nocturnal bone pain that is classically relieved by:',
      options: [
        'Aspirin / NSAIDs (due to high prostaglandin E2 synthesis by the tumor nidus)',
        'Antibiotics',
        'Corticosteroids',
        'Antifungal mouthrinses'
      ],
      correct: 0,
      explanation: 'Osteoid osteoma produces high local levels of prostaglandins within its central vascular nidus, causing sharp nocturnal pain that is characteristically relieved dramatically by aspirin and NSAIDs (Neville Ch. 14).'
    },
    {
      q: 'A Simple Bone Cyst (Traumatic Bone Cyst) is microscopically categorized as a pseudocyst because:',
      options: [
        'It is completely empty of epithelial lining, consisting of an empty or fluid-filled bone cavity scalloping between the roots of vital teeth',
        'It contains malignant epithelial cells',
        'It has an outer parakeratinized wall with Rushton bodies',
        'It is lined by stratified columnar cells'
      ],
      correct: 0,
      explanation: 'Simple (traumatic) bone cyst is a non-neoplastic cavity in bone that lacks an epithelial lining (a pseudocyst), often discovered as an asymptomatic radiolucency that scallops between the roots of vital mandibular teeth without root resorption (Neville Ch. 14).'
    },
    {
      q: 'Aneurysmal Bone Cyst (ABC) is histologically characterized by:',
      options: [
        'Blood-filled sinusoidal spaces lacking an endothelial lining, bounded by fibroblastic tissue containing multinucleated giant cells and reactive woven bone',
        'Sheets of oncocytes in lymphoid stroma',
        'Ghost cells and enamel matrix',
        'Concentric lamellae and Haversian systems'
      ],
      correct: 0,
      explanation: 'Aneurysmal Bone Cyst (ABC) consists of cavernous blood-filled spaces that are not lined by true vascular endothelium, separated by fibrous connective tissue septa containing osteoclast-like giant cells and osteoid trabeculae (Neville Ch. 14).'
    }
  ],

  // Mission 4: Giant Cell Lesions & Malignancies (bf_m4)
  bf_m4: [
    {
      q: 'Central Giant Cell Granuloma (CGCG) of the jaws is histopathologically identical to which systemic endocrine bone lesion?',
      options: [
        'Brown Tumor of Hyperparathyroidism',
        'Fibrous Dysplasia in McCune-Albright',
        'Osteosarcoma',
        'Paget Disease of Bone'
      ],
      correct: 0,
      explanation: 'Microscopically, CGCG cannot be distinguished from the Brown Tumor of Hyperparathyroidism; therefore, patients with aggressive or recurrent giant cell lesions must be evaluated for elevated serum calcium and parathyroid hormone (PTH) levels (Neville Ch. 14).'
    },
    {
      q: 'The classic histopathologic hallmark of Paget Disease of Bone (Osteitis Deformans) is:',
      options: [
        'A mosaic or "jigsaw puzzle" pattern of bone trabeculae with prominent basophilic reversal lines caused by repeated cycles of bone resorption and uncoordinated repair',
        'Curvilinear C-shaped trabeculae without osteoblastic rimming',
        'Sheets of atypical pleomorphic chondroblasts producing cartilage',
        'Acantholytic Tzanck cells in bone marrow'
      ],
      correct: 0,
      explanation: 'Neville Ch. 14 describes the pathognomonic "mosaic pattern" of Paget disease: chaotic alternating waves of osteoclastic resorption and osteoblastic deposition leave prominent, irregular, scalloped basophilic reversal lines resembling a jigsaw puzzle.'
    },
    {
      q: 'What is the absolute microscopic diagnostic requirement for Osteosarcoma?',
      options: [
        'Direct production of malignant osteoid matrix by neoplastic pleomorphic osteoblasts',
        'Formation of benign cartilage islands without atypia',
        'Presence of multinucleated osteoclasts',
        'Invasion of blood vessels by normal squamous cells'
      ],
      correct: 0,
      explanation: 'The definitive histologic hallmark of Osteosarcoma is the direct synthesis of neoplastic, unmineralized osteoid or immature bone by malignant pleomorphic stromal cells (osteoblasts) (Neville Ch. 14).'
    },
    {
      q: 'Which early radiographic sign is often considered the earliest diagnostic clue for jaw Osteosarcoma?',
      options: [
        'Symmetrical widening of the periodontal ligament (PDL) space and loss of lamina dura around involved teeth',
        'Punched-out clear radiolucent circles with corticated borders',
        'Heart-shaped inter-radicular radiolucency',
        'Corrugated calcification in maxillary sinus'
      ],
      correct: 0,
      explanation: 'Early osteosarcoma classically causes uniform, symmetrical widening of the periodontal ligament (PDL) space and thinning of the lamina dura around one or more teeth due to neoplastic tumor infiltration along the PDL (Neville Ch. 14).'
    },
    {
      q: 'Patients with severe polyostotic Paget disease of bone have a significantly elevated risk of developing which fatal malignancy?',
      options: [
        'Osteosarcoma (Pagetic Osteosarcoma)',
        'Ameloblastoma',
        'Mucoepidermoid Carcinoma',
        'Squamous Odontogenic Tumor'
      ],
      correct: 0,
      explanation: 'Approximately 1% of patients with Paget disease develop secondary Osteosarcoma (Pagetic osteosarcoma), which is highly aggressive, resistant to therapy, and carries an extremely poor prognosis (Neville Ch. 14).'
    }
  ],

  // Mission 5: Paget & Osteosarcoma Histology (bf_m5)
  bf_m5: [
    {
      q: 'The classic "sunburst" or "sunray" radiographic appearance in osteosarcoma is caused by:',
      options: [
        'Radiating spicules of neoplastic bone forming along elevated periosteal blood vessels perpendicular to the bone cortex',
        'Bacterial sulfur granules destroying the periosteum',
        'Ghost cell calcifications under the mucosa',
        'Accumulation of cholesterol crystals in marrow'
      ],
      correct: 0,
      explanation: 'As an osteosarcoma perforates the cortical bone and lifts the periosteum (Codman triangle), radiating spicules of new bone are laid down along the stretched Sharpey fibers and periosteal vessels, creating a "sunburst" pattern (Neville Ch. 14).'
    },
    {
      q: 'The three principal histologic subtypes of conventional Osteosarcoma based on predominant matrix production are:',
      options: [
        'Osteoblastic, Chondroblastic, and Fibroblastic',
        'Follicular, plexiform, and acanthomatous',
        'Cribriform, tubular, and solid',
        'Papillary, cystic, and alveolar'
      ],
      correct: 0,
      explanation: 'Conventional osteosarcoma is classified into Osteoblastic (predominant osteoid), Chondroblastic (predominant malignant cartilage matrix), and Fibroblastic (predominant atypical spindle stroma) subtypes; all share the requirement of malignant osteoid production (Neville Ch. 14).'
    },
    {
      q: 'In advanced Paget disease, patients often report that their dentures or hats no longer fit due to:',
      options: [
        'Progressive outward expansion and enlargement of the maxilla and skull vault (leontiasis ossea)',
        'Severe muscle hypertrophy',
        'Mucosal hyperplasia caused by candidiasis',
        'Condylar hypoplasia'
      ],
      correct: 0,
      explanation: 'Paget disease causes progressive, uncoordinated appositional bone deposition, leading to bilateral expansion of the maxilla and skull vault ("my hat size keeps increasing" and dentures become tight) with a classic "cotton wool" radiograph (Neville Ch. 14).'
    },
    {
      q: 'Chondrosarcoma of the jaws is microscopically characterized by:',
      options: [
        'Malignant cartilage matrix production with atypical binucleated pleomorphic chondrocytes in lacunae WITHOUT direct malignant osteoid formation',
        'Benign fibrous dysplasia stroma with Chinese characters',
        'Pure amyloid deposition with Liesegang rings',
        'Uniform parakeratinized lining with Rushton bodies'
      ],
      correct: 0,
      explanation: 'Chondrosarcoma is a malignant mesenchymal neoplasm characterized by the formation of neoplastic cartilage (never osteoid) by pleomorphic, hyperchromatic, binucleated chondrocytes within lacunae (Neville Ch. 14).'
    },
    {
      q: 'Garrè Osteomyelitis (Proliferative Periostitis) is a reactive condition that radiographically produces:',
      options: [
        'An "onion-skin" pattern of laminations of reactive new periosteal bone parallel to the cortical surface',
        'Punched-out skull osteolytic radiolucencies',
        'Multiple impacted supernumerary teeth',
        'Severe bone sequestra with sunburst rays'
      ],
      correct: 0,
      explanation: 'Garrè osteomyelitis (proliferative periostitis) is a unique reactive periosteal response to low-grade chronic infection (usually periapical abscess in a young patient), forming concentric, parallel laminations of new cortical bone mimicking layers of an onion skin (Neville Ch. 14).'
    }
  ],

  // Mission 6: Bone Oncology & Disease Terms (bf_m6)
  bf_m6: [
    {
      q: 'What is a "Sequestrum" in chronic osteomyelitis?',
      options: [
        'A piece of dead, devitalized bone that has separated from the adjacent viable healthy bone',
        'A sheath of new reactive bone surrounding an area of infection',
        'A true malignant cartilage pearl',
        'A calcified salivary stone in Wharton duct'
      ],
      correct: 0,
      explanation: 'A Sequestrum is a fragment of necrotic dead bone that has become detached from healthy vascular bone due to ischemia and enzymatic lysis in osteomyelitis (Neville Ch. 14).'
    },
    {
      q: 'An "Involucrum" represents:',
      options: [
        'The sheath of viable new periosteal bone formed around a dead bone sequestrum',
        'A surgical drainage tube',
        'A foreign body giant cell reaction to cholesterol',
        'A malignant metastatic focus in the lungs'
      ],
      correct: 0,
      explanation: 'An Involucrum is a collar or shell of new reactive subperiosteal bone that encapsulates the infected, necrotic sequestrum in chronic suppurative osteomyelitis (Neville Ch. 14).'
    },
    {
      q: 'Osteopetrosis (Albers-Schönberg / Marble Bone Disease) is caused by a genetic defect in:',
      options: [
        'Osteoclast function, resulting in failure of normal bone remodeling and heavy, brittle, sclerotic bones with obliterated marrow cavities',
        'Osteoblast collagen synthesis, causing thin fragile bones (Osteogenesis Imperfecta)',
        'G-protein alpha subunit in fibroblasts',
        'Salivary duct intercalated cells'
      ],
      correct: 0,
      explanation: 'Osteopetrosis is a hereditary disorder of defective osteoclast bone resorption, leading to generalized sclerosis of the skeleton, loss of marrow spaces, pancytopenia, cranial nerve compression, and high susceptibility to intractable osteomyelitis (Neville Ch. 14).'
    },
    {
      q: 'Ewing Sarcoma is a high-grade pediatric malignancy characterized microscopically by:',
      options: [
        'Sheets of uniform small round blue cells with glycogen-rich cytoplasm (PAS positive) and t(11;22) EWSR1-FLI1 translocation',
        'Well-differentiated bone trabeculae with osteocytes in lacunae',
        'Cribriform Swiss cheese structures with mucicarmine positivity',
        'Ghost cells undergoing dystrophic calcification'
      ],
      correct: 0,
      explanation: 'Ewing sarcoma is an aggressive small round blue cell tumor of bone and soft tissue in children, defined genetically by the t(11;22)(q24;q12) translocation generating the EWSR1-FLI1 chimeric transcription factor (Neville Ch. 14).'
    },
    {
      q: 'Bisphosphonate-Related Osteonecrosis of the Jaw (BRONJ / MRONJ) is clinically diagnosed when:',
      options: [
        'Exposed necrotic jaw bone persists for more than 8 weeks in a patient with current or previous antiresorptive/antiangiogenic therapy and NO history of radiation therapy to the jaws',
        'A patient has a traumatic extraction socket that heals within 1 week',
        'There is acute bilateral parotitis following viral infection',
        'A patient develops multiple OKCs associated with Gorlin syndrome'
      ],
      correct: 0,
      explanation: 'According to AAOMS and Neville Ch. 14, MRONJ requires: (1) exposed bone or bone probing through an intra/extraoral fistula persisting >8 weeks; (2) current or previous treatment with antiresorptive (e.g. zoledronate, denosumab) or antiangiogenic agents; and (3) no history of radiation therapy to the craniofacial region.'
    }
  ],

  // ══════════════════════════════════════════════════════════
  // TOPIC 5: INFECTIOUS & VESICULOBULLOUS DISEASES (Neville Ch. 5, 6 & 16)
  // ══════════════════════════════════════════════════════════

  // Mission 1: Autoimmune Mucosal Splitting (ii_m1)
  ii_m1: [
    {
      q: 'Pemphigus Vulgaris is pathologically characterized by:',
      options: [
        'Suprabasal intraepithelial splitting with acantholysis caused by autoantibodies against Desmoglein-3',
        'Subepithelial splitting with intact full-thickness epithelium caused by antibodies against BP180',
        'Caseating granulomas with multinucleated giant cells',
        'Submucosal fibrosis with arecoline deposition'
      ],
      correct: 0,
      explanation: 'In Pemphigus Vulgaris, IgG autoantibodies target Desmoglein-3 (and Desmoglein-1) in desmosomes, destroying cell-cell adhesion and creating a characteristic suprabasal intraepithelial blister with a "tombstone" row of basal cells remaining on the basement membrane (Neville Ch. 16).'
    },
    {
      q: 'Mucous Membrane Pemphigoid (Cicatricial Pemphigoid) differs from Pemphigus Vulgaris because:',
      options: [
        'It produces a subepithelial cleft (full-thickness epithelial separation from lamina propria) targeting hemidesmosomal proteins (BP180, BP230, laminin 332)',
        'It produces intraepithelial acantholytic blisters that rupture immediately',
        'It is caused by a fungal infection of parakeratin',
        'It occurs exclusively in male teenagers'
      ],
      correct: 0,
      explanation: 'Mucous Membrane Pemphigoid is a subepithelial blistering disease: autoantibodies bind hemidesmosomes in the basement membrane zone, cleanly separating the entire epithelium from the underlying connective tissue, frequently causing desquamative gingivitis and scarring ocular symblepharon (Neville Ch. 16).'
    },
    {
      q: 'What is the characteristic Direct Immunofluorescence (DIF) pattern in Pemphigus Vulgaris?',
      options: [
        'Intercellular "fishnet" or "chicken-wire" pattern of IgG and C3 throughout the spinous layer',
        'Continuous linear band of IgG and C3 along the basement membrane zone',
        'Granular lumpy-bumpy IgA deposits at the tips of connective tissue papillae',
        'Complete absence of immune deposits'
      ],
      correct: 0,
      explanation: 'Because antibodies in pemphigus vulgaris attack desmosomes between spinous cells, DIF demonstrates green fluorescent IgG and C3 binding the cell surfaces in an intercellular "fishnet" or "chicken-wire" pattern (Neville Ch. 16).'
    },
    {
      q: 'Positive Nikolsky Sign refers to:',
      options: [
        'Dislodgement of normal-appearing skin or mucosa or induction of a bulla by firm, sliding lateral manual pressure',
        'Sudden elevation of blood pressure upon palpation of the palate',
        'Paresthesia of the inferior alveolar nerve',
        'Radiating pain upon tapping a non-vital tooth'
      ],
      correct: 0,
      explanation: 'Nikolsky sign is positive when mechanical lateral shear pressure on clinically normal mucosa produces an intraepithelial or subepithelial bulla or sloughs the superficial layer, classic in pemphigus vulgaris and mucous membrane pemphigoid (Neville Ch. 16).'
    },
    {
      q: 'Erythema Multiforme (EM) is an acute immune-mediated disease characterized by target/iris skin lesions and hemorrhagic crusting of the lips, most commonly triggered by:',
      options: [
        'Herpes Simplex Virus (HSV) infection or adverse reaction to medications (antibiotics/NSAIDs)',
        'Excessive dietary calcium intake',
        'Chewing betel quid with slaked lime',
        'Chronic trauma from a fractured cusp'
      ],
      correct: 0,
      explanation: 'Over 60-70% of Erythema Multiforme cases are triggered by a preceding Herpes Simplex Virus (HSV) infection, with the remainder caused by medications (sulfonamides, anticonvulsants, NSAIDs) (Neville Ch. 16).'
    }
  ],

  // Mission 2: Acantholysis & Tzanck Cell Histology (ii_m2)
  ii_m2: [
    {
      q: 'Tzanck cells seen in cytologic smears of Pemphigus Vulgaris represent:',
      options: [
        'Rounded, loose, acantholytic keratinocytes with hyperchromatic nuclei and prominent perinuclear halo',
        'Langhans giant cells with peripheral horseshoe nuclei',
        'Malignant osteoblasts producing osteoid',
        'Degenerating fungal blastospores'
      ],
      correct: 0,
      explanation: 'Acantholytic Tzanck cells are detached, rounded epithelial spinous cells that have lost their desmosomal attachments, featuring enlarged, hyperchromatic nuclei and a condensed peripheral rim of cytoplasm (Neville Ch. 16).'
    },
    {
      q: 'Desquamative Gingivitis is a clinical descriptive term most commonly caused by which two underlying mucosal diseases?',
      options: [
        'Cicatricial (Mucous Membrane) Pemphigoid and Erosive Lichen Planus',
        'Ameloblastoma and Odontoma',
        'Actinomycosis and Tuberculosis',
        'Radicular Cyst and Dentigerous Cyst'
      ],
      correct: 0,
      explanation: 'Desquamative gingivitis (fiery red, glazed, peeling attached and marginal gingiva) is not a specific disease but a clinical manifestation, representing Mucous Membrane Pemphigoid in ~50% and Erosive Lichen Planus in ~45% of cases (Neville Ch. 16).'
    },
    {
      q: 'A patient presents with severe ocular cicatricial pemphigoid. What serious complication can occur if left untreated?',
      options: [
        'Entropion, trichiasis, corneal keratinization, and blindness (symblepharon)',
        'Malignant transformation to melanoma',
        'Jaw bone osteomyelitis',
        'Formation of supernumerary teeth'
      ],
      correct: 0,
      explanation: 'In ocular pemphigoid, subepithelial conjunctival scarring leads to adhesions between the bulbar and palpebral conjunctiva (symblepharon), inward turning of eyelids (entropion), eyelashes scratching the cornea (trichiasis), and eventual blindness (Neville Ch. 16).'
    },
    {
      q: 'What is the characteristic Direct Immunofluorescence (DIF) pattern in Mucous Membrane Pemphigoid?',
      options: [
        'Continuous smooth, linear band of IgG and C3 deposited along the basement membrane zone (BMZ)',
        'Intercellular fishnet IgG in spinous layer',
        'Nuclear speckled pattern of ANA',
        'Granular deposition of IgM in vessel walls'
      ],
      correct: 0,
      explanation: 'Because autoantibodies in pemphigoid attack hemidesmosomal antigens in the basement membrane, DIF exhibits a continuous, sharp, linear fluorescent line along the basement membrane zone (Neville Ch. 16).'
    },
    {
      q: 'Stevens-Johnson Syndrome (SJS) is classified as:',
      options: [
        'A severe, life-threatening form of immune complex-mediated mucocutaneous disease involving <10% body surface detachment with ocular, oral, and genital involvement',
        'A localized benign odontogenic tumor of the mandible',
        'A chronic bacterial osteomyelitis of the maxilla',
        'A primary salivary gland adenocarcinoma'
      ],
      correct: 0,
      explanation: 'Stevens-Johnson syndrome is a severe, acute mucocutaneous reaction typically triggered by drugs, characterized by widespread epidermal detachment (<10% BSA), hemorrhagic mucosal crusting, and ocular and genital lesions (Neville Ch. 16).'
    }
  ],

  // Mission 3: Immunopathology Terminology (ii_m3)
  ii_m3: [
    {
      q: 'What is the definition of "Acantholysis"?',
      options: [
        'The loss of intercellular desmosomal connections between epithelial cells, causing them to detach and become round',
        'Thickening of the stratum spinosum layer',
        'Destruction of the bone cortex by osteoclasts',
        'Infiltration of neutrophils into mucous acini'
      ],
      correct: 0,
      explanation: 'Acantholysis is the detachment and dissolution of intercellular bridges (desmosomes) connecting adjacent prickle cells, leading to intraepithelial clefting and rounded free-floating acantholytic cells (Neville Ch. 16).'
    },
    {
      q: 'A "Bulla" is clinically differentiated from a "Vesicle" by:',
      options: [
        'Size: a vesicle is fluid-filled and < 5 mm (or 1 cm); a bulla is fluid-filled and > 5 mm (or 1 cm)',
        'A bulla contains pus; a vesicle contains blood',
        'A vesicle occurs only in bone; a bulla occurs on skin',
        'A vesicle is always malignant'
      ],
      correct: 0,
      explanation: 'Both are fluid-filled elevated mucosal blisters: vesicles are small (<5 mm in diameter) while bullae are large blisters (>5 mm in diameter) (Neville Ch. 16).'
    },
    {
      q: 'The target antigens in Pemphigus Foliaceus are:',
      options: [
        'Desmoglein-1 (superficial subcorneal blister, sparing oral mucosa)',
        'Desmoglein-3 (deep suprabasal blister, severe oral involvement)',
        'BP180 collagen XVII',
        'Laminin-332'
      ],
      correct: 0,
      explanation: 'In Pemphigus Foliaceus, antibodies target Desmoglein-1, which is concentrated in the upper layers of skin but minimal in oral mucosa; thus, lesions are superficial and oral lesions are virtually absent (Neville Ch. 16).'
    },
    {
      q: 'Paraneoplastic Pemphigus is a devastating blistering disease almost always associated with an underlying:',
      options: [
        'Occult hematologic or lymphoid malignancy (e.g. Non-Hodgkin Lymphoma, CLL, Castleman Disease)',
        'Pleomorphic adenoma of parotid',
        'Odontogenic keratocyst',
        'Impacted third molar'
      ],
      correct: 0,
      explanation: 'Paraneoplastic pemphigus is triggered by underlying malignancies (lymphoma, chronic lymphocytic leukemia, Castleman disease), presenting with intractable, agonizing stomatitis and autoantibodies targeting multiple plakin and desmoglein family proteins (Neville Ch. 16).'
    },
    {
      q: 'Linear IgA Disease of the oral mucosa is confirmed by Direct Immunofluorescence showing:',
      options: [
        'A continuous linear band of IgA along the basement membrane zone',
        'Fishnet IgG in the spinous layer',
        'Linear IgM in capillary loops',
        'Scattered C3 in keratin pearls'
      ],
      correct: 0,
      explanation: 'Linear IgA disease exhibits subepithelial blistering with a definitive, continuous linear ribbon of IgA antibodies deposited along the basement membrane zone on direct immunofluorescence (Neville Ch. 16).'
    }
  ],

  // Mission 4: Microbial Pathology Spectrum (ii_m4)
  ii_m4: [
    {
      q: 'Pseudomembranous Candidiasis (Thrush) is clinically distinguished by:',
      options: [
        'White curdy mucosal plaques that CAN be wiped off with a gauze, leaving a red, erythematous, or bleeding base',
        'A white plaque that cannot be wiped off',
        'A hard, stony calcification of the lip',
        'Multiple target-like skin macules'
      ],
      correct: 0,
      explanation: 'Pseudomembranous candidiasis consists of tangled masses of fungal hyphae, desquamated epithelial cells, and debris that easily rub off with a tongue blade or gauze, revealing underlying inflamed erythematous mucosa (unlike leukoplakia) (Neville Ch. 6).'
    },
    {
      q: 'What is the diagnostic cytologic feature of Herpes Simplex Virus (HSV) in a Tzanck smear or tissue section?',
      options: [
        'Multinucleated syncytial epithelial giant cells with nuclear molding and Lipschütz / Cowdry A eosinophilic intranuclear inclusion bodies',
        'Acantholytic cells with desmoglein loss and tombstone basal row',
        'Large oncocytic cells packed with mitochondria',
        'Caseating necrosis with Langhans horseshoe giant cells'
      ],
      correct: 0,
      explanation: 'Herpes simplex virus causes distinctive cytopathic changes in keratinocytes: ballooning degeneration, syncytial multinucleated giant cells, nuclear molding (nuclei pressing tightly against each other like puzzle pieces), and eosinophilic Cowdry A intranuclear inclusions (Neville Ch. 5).'
    },
    {
      q: 'Actinomycosis is an infection caused by Actinomyces israelii that produces which pathognomonic macroscopic and microscopic structures in purulent exudate?',
      options: [
        'Yellow "Sulfur Granules" (colonies of radiating filamentous gram-positive bacilli with peripheral clubbed eosinophilic ends / Splendore-Hoeppli phenomenon)',
        'Bence Jones proteins',
        'Rushton curvilinear bodies',
        'Ghost cell calcifications'
      ],
      correct: 0,
      explanation: 'Actinomycosis produces soft tissue abscesses that discharge through sinus tracts; the purulent drainage contains macroscopic yellow-tan flecks called "Sulfur granules", composed of tightly tangled colonies of branching filamentous Actinomyces organisms (Neville Ch. 5).'
    },
    {
      q: 'The classic microscopic granuloma of Oral Tuberculosis is characterized by:',
      options: [
        'Central caseous (cheese-like) amorphous necrosis surrounded by epithelioid histiocytes, Langhans multinucleated giant cells with horseshoe nuclei, and a peripheral rim of lymphocytes',
        'Non-caseating granulomas with Birbeck tennis-racket granules',
        'Suppurative microabscesses packed with Candida pseudohyphae',
        'Vascular proliferation of Kaposi spindle cells'
      ],
      correct: 0,
      explanation: 'Neville Ch. 5 details the classic tuberculous granuloma (tubercle): central acellular eosinophilic caseous necrosis surrounded by palisaded epithelioid macrophages, Langhans giant cells (nuclei arranged in a peripheral horseshoe arc), and a collar of lymphocytes, confirmed by Ziehl-Neelsen acid-fast stain.'
    },
    {
      q: 'Primary Syphilis is characterized by a painless, indurated solitary ulcer termed a:',
      options: [
        'Chancre',
        'Gumma',
        'Mucous Patch',
        'Condyloma Lata'
      ],
      correct: 0,
      explanation: 'Primary syphilis develops at the site of inoculation 2-3 weeks after contact, presenting as a solitary, painless, clean-based, indurated ulcer called a Chancre, teeming with Treponema pallidum spirochetes (Neville Ch. 5).'
    }
  ],

  // Mission 5: Granulomas & Pseudohyphae Histology (ii_m5)
  ii_m5: [
    {
      q: 'Which special histochemical stain is most effective for demonstrating Candida albicans fungal hyphae in mucosal biopsies?',
      options: [
        'Periodic Acid-Schiff (PAS) or Grocott-Gomori Methenamine Silver (GMS)',
        'Alizarin Red',
        'Congo Red',
        'Von Kossa'
      ],
      correct: 0,
      explanation: 'Candida pseudohyphae and blastospores contain complex carbohydrates in their cell walls that stain intensely magenta with PAS and dark brown/black with GMS stains (Neville Ch. 6).'
    },
    {
      q: 'The characteristic histopathologic vascular alteration in Syphilis (Treponema pallidum infection) is:',
      options: [
        'Obliterative endarteritis with prominent perivascular cuffing of plasma cells',
        'Arteriovenous malformation with thromboses',
        'Malignant proliferation of endothelial cells',
        'Complete absence of inflammatory cells'
      ],
      correct: 0,
      explanation: 'Syphilitic lesions at all stages exhibit striking obliterative endarteritis (endothelial swelling and narrowing of small arterioles) surrounded by a dense, perivascular cuff of plasma cells (Neville Ch. 5).'
    },
    {
      q: 'Tertiary Syphilis produces localized, destructive, rubbery granulomatous lesions called:',
      options: [
        'Gummas',
        'Chancres',
        'Mucous patches',
        'Lichenoid striae'
      ],
      correct: 0,
      explanation: 'A Gumma is the classic granulomatous lesion of tertiary syphilis, capable of causing extensive necrosis and perforation of the hard palate into the nasal cavity (Neville Ch. 5).'
    },
    {
      q: 'Median Rhomboid Glossitis (Central Papillary Atrophy) is now recognized as a chronic clinical form of:',
      options: [
        'Oral Candidiasis affecting the midline dorsum of the tongue anterior to the circumvallate papillae',
        'Syphilitic chancre',
        'Epithelial dysplasia from smoking',
        'Developmental tuberculum impar persistence'
      ],
      correct: 0,
      explanation: 'Historically thought to be a developmental failure of the tuberculum impar to withdraw, Median Rhomboid Glossitis is now proven to be a chronic localized candidal infection producing an asymptomatic erythematous, depapillated diamond/rhomboid zone in the midline posterior tongue (Neville Ch. 6).'
    },
    {
      q: 'Langhans multinucleated giant cells in tuberculosis are formed by the fusion of:',
      options: [
        'Activated epithelioid macrophages (histiocytes)',
        'B-lymphocytes',
        'Odontoblasts',
        'Stratified squamous keratinocytes'
      ],
      correct: 0,
      explanation: 'Langhans giant cells are specialized multinucleated cells formed by the coalescence and fusion of transformed macrophages (epithelioid histiocytes) in response to persistent intracellular mycobacteria (Neville Ch. 5).'
    }
  ],

  // Mission 6: Infectious Pathology Terminology (ii_m6)
  ii_m6: [
    {
      q: 'Angular Cheilitis (Perlèche) at the labial commissures is typically a coinfection involving:',
      options: [
        'Candida albicans and Staphylococcus aureus',
        'Treponema pallidum and Mycobacterium tuberculosis',
        'HSV-1 and HHV-8',
        'Actinomyces and Epstein-Barr Virus'
      ],
      correct: 0,
      explanation: 'Angular cheilitis (erythema, scaling, and fissures at the corners of the mouth, often exacerbated by reduced vertical dimension of occlusion) is a mixed opportunistic infection caused by Candida albicans (60%) and Staphylococcus aureus (35%) (Neville Ch. 6).'
    },
    {
      q: 'Hairy Leukoplakia is a non-malignant corrugated white lesion on the lateral borders of the tongue in immunocompromised patients, caused by:',
      options: [
        'Epstein-Barr Virus (EBV / HHV-4) replicating in the spinous layer',
        'Candida albicans hyphae alone',
        'Human Papillomavirus type 16',
        'Treponema pallidum spirochetes'
      ],
      correct: 0,
      explanation: 'Oral Hairy Leukoplakia is caused by opportunistic EBV infection of the lateral tongue in HIV/AIDS or immunosuppressed organ transplant patients, showing epithelial acanthosis, surface hyperparakeratosis ("hairs"), and nuclear beading with koilocyte-like halo cells (Neville Ch. 5).'
    },
    {
      q: 'A patient with congenital syphilis may exhibit Hutchinson Triad, consisting of:',
      options: [
        'Hutchinson teeth (screwdriver incisors & mulberry molars), interstitial keratitis, and eighth nerve deafness',
        'OKCs, bifid ribs, and palmar pits',
        'Osteomas, supernumerary teeth, and polyposis',
        'Trismus, fibrosis, and microstomia'
      ],
      correct: 0,
      explanation: 'Hutchinson\'s triad of congenital syphilis includes: (1) Hutchinson\'s teeth (notched screwdriver incisors and dome-shaped mulberry molars); (2) interstitial keratitis leading to blindness; and (3) sensorineural eighth cranial nerve deafness (Neville Ch. 5).'
    },
    {
      q: 'The Splendore-Hoeppli phenomenon seen around bacterial colonies in actinomycosis represents:',
      options: [
        'Eosinophilic proteinaceous deposits formed by host antigen-antibody complexes and debris around the radiating microbial filaments',
        'Viral intranuclear inclusion bodies',
        'Melanin pigment deposition',
        'Bile salt crystallization'
      ],
      correct: 0,
      explanation: 'The Splendore-Hoeppli phenomenon is the radiating, club-shaped, strongly eosinophilic material deposited around the periphery of Actinomyces colonies, representing precipitated host immunoglobulins and basic proteins (Neville Ch. 5).'
    },
    {
      q: 'Herpetic Whitlow refers to HSV infection located on the:',
      options: [
        'Fingers or nail beds of dental healthcare workers inoculated through saliva contact',
        'Cornea of the eye',
        'Ventral surface of the tongue',
        'Skin of the lumbar back'
      ],
      correct: 0,
      explanation: 'Herpetic whitlow is an excruciatingly painful HSV-1 or HSV-2 infection of the terminal digits, contracted when saliva containing live virus enters through minor skin breaks in dentists or hygienists not wearing protective gloves (Neville Ch. 5).'
    }
  ],

  // ══════════════════════════════════════════════════════════
  // TOPIC 6: SOFT TISSUE & HEMATOLOGIC NEOPLASMS (Neville Ch. 12 & 13)
  // ══════════════════════════════════════════════════════════

  // Mission 1: Mesenchymal & Neural Proliferations (st_m1)
  st_m1: [
    {
      q: 'Schwannoma (Neurilemoma) is microscopically characterized by the alternating presence of:',
      options: [
        'Antoni A (cellular palisaded spindle cells around Verocay bodies) and Antoni B (loose, hypocellular, myxoid tissue)',
        'Keratin pearls and desmoplastic stroma',
        'Ghost cells and Liesegang rings',
        'Swiss-cheese cribriform cylinders'
      ],
      correct: 0,
      explanation: 'Neville Ch. 12 details the diagnostic architecture of Schwannoma: Antoni A tissue consists of parallel palisading spindle Schwann cell nuclei surrounding acellular eosinophilic zones (Verocay bodies), whereas Antoni B tissue consists of loose, disordered, hypocellular myxoid stroma.'
    },
    {
      q: 'What are Verocay Bodies in a Schwannoma?',
      options: [
        'Acellular eosinophilic zones composed of cytoplasmic Schwann cell processes surrounded on both ends by parallel palisaded nuclei',
        'Calcified concentric rings identical to Liesegang rings',
        'Intracellular viral inclusion clusters',
        'Apoptotic Civatte keratinocytes'
      ],
      correct: 0,
      explanation: 'Verocay bodies are the pathognomonic structures in Antoni A areas of Schwannoma, formed by two parallel rows of palisaded Schwann cell nuclei enclosing an acellular central zone of eosinophilic cytoplasmic extensions (Neville Ch. 12).'
    },
    {
      q: 'Granular Cell Tumor of the tongue frequently causes which pseudo-neoplastic reaction in the overlying epithelium that can be misdiagnosed as carcinoma?',
      options: [
        'Pseudoepitheliomatous (pseudocarcinomatous) Hyperplasia (PEH)',
        'Severe caseous necrosis',
        'Acantholysis with Tzanck cells',
        'Ghost cell cornification'
      ],
      correct: 0,
      explanation: 'In up to 50% of Granular Cell Tumors, the overlying stratified squamous epithelium responds with exuberant, florid Pseudoepitheliomatous Hyperplasia (PEH) that closely mimics invasive squamous cell carcinoma on shallow biopsy (Neville Ch. 12).'
    },
    {
      q: 'Neurofibroma is distinguished histologically from Schwannoma because Neurofibroma is:',
      options: [
        'Unencapsulated, containing a mixed cellular population of wavy comma-shaped Schwann cells, perineural cells, and mast cells embedded in delicate wire-like collagen fibrils',
        'Encapsulated with distinct Verocay bodies only',
        'A malignant bone tumor that produces osteoid',
        'Derived from salivary ductal epithelium'
      ],
      correct: 0,
      explanation: 'Unlike encapsulated Schwannomas, Neurofibromas are unencapsulated, infiltrating between nerve fascicles, and feature characteristic wavy, thin, comma-shaped nuclei with pointed ends scattered among delicate collagen strands ("shredded carrots") and mast cells (Neville Ch. 12).'
    },
    {
      q: 'Pyogenic Granuloma of the gingiva is fundamentally:',
      options: [
        'A reactive vascular proliferation of exuberant granulation tissue in response to local calculus or hormonal changes, NOT a true bacterial granuloma or true neoplasm',
        'A malignant angiosarcoma',
        'A pus-forming infection caused by Pyogenic streptococci',
        'A true bone-forming tumor'
      ],
      correct: 0,
      explanation: 'Despite its misnomer, pyogenic granuloma does not produce pus (not pyogenic) and is not a true granuloma; it is a benign, hyperplastic vascular proliferation of lobular capillary arrays in an inflamed edematous stroma (Neville Ch. 12).'
    }
  ],

  // Mission 2: Verocay Bodies & Granular Cell Histology (st_m2)
  st_m2: [
    {
      q: 'The large, polygonal cells of Granular Cell Tumor are strongly and diffusely positive for which immunohistochemical marker, confirming their neural crest / Schwann cell origin?',
      options: [
        'S-100 protein',
        'Cytokeratin AE1/AE3',
        'Desmin',
        'CD20'
      ],
      correct: 0,
      explanation: 'Granular cell tumors show intense cytoplasmic and nuclear positivity for S-100 protein, proving their origin from Schwann cells, and the granular appearance is caused by cytoplasmic accumulation of lysosomes (Neville Ch. 12).'
    },
    {
      q: 'Neurofibromatosis Type 1 (von Recklinghausen Disease) is clinically characterized by multiple neurofibromas and:',
      options: [
        'Six or more Café-au-lait macules ("Coast of California" smooth borders), axillary freckling (Crowe sign), and iris Lisch nodules',
        'Multiple OKCs and bifid ribs',
        'Intestinal polyps and multiple osteomas',
        'Trismus and severe subepithelial fibrosis'
      ],
      correct: 0,
      explanation: 'NF-1 (autosomal dominant mutation in the neurofibromin gene on chromosome 17q) features multiple plexiform neurofibromas, smooth-bordered café-au-lait spots ("Coast of California"), axillary/inguinal freckling (Crowe sign), and pigmented iris hamartomas (Lisch nodules) (Neville Ch. 12).'
    },
    {
      q: 'Traumatic Neuroma represents:',
      options: [
        'A reactive, non-neoplastic tangled proliferation of transected nerve axons and Schwann cells attempting to regenerate after trauma or surgery',
        'A high-grade malignant peripheral nerve sheath tumor',
        'A viral herpetic lesion of the mental nerve',
        'A primary intracranial glioblastoma'
      ],
      correct: 0,
      explanation: 'A traumatic (amputation) neuroma is not a true tumor but a painful mass produced when severed peripheral nerve axons regenerate into a disorganized, tangled knot of nerve fascicles and scar tissue (common in the mental foramen region) (Neville Ch. 12).'
    },
    {
      q: 'Congenital Epulis of the newborn occurs almost exclusively on the alveolar ridge of female infants and is microscopically composed of large granular cells that are:',
      options: [
        'S-100 NEGATIVE and do NOT show pseudoepitheliomatous hyperplasia (unlike adult granular cell tumor)',
        'S-100 strongly positive with severe malignant atypia',
        'Forming true bone and enamel crystals',
        'Lined by respiratory ciliated columnar cells'
      ],
      correct: 0,
      explanation: 'Congenital Epulis (granular cell epulis of infancy) resembles granular cell tumor histologically, but is distinctly S-100 negative, never exhibits pseudoepitheliomatous hyperplasia, and occurs almost exclusively in newborn females on the maxillary ridge (Neville Ch. 12).'
    },
    {
      q: 'Lipoma is a benign mesenchymal tumor of mature adipocytes that is microscopically recognized by:',
      options: [
        'Lobules of mature uniform fat cells with peripheral flattened nuclei and large clear lipid vacuoles',
        'Invasive islands of squamoid cells with keratin pearls',
        'Dense hypocellular lamellar bone',
        'Branching capillary channels lined by atypical endothelial cells'
      ],
      correct: 0,
      explanation: 'Lipoma consists of well-circumscribed lobules of normal-appearing mature adipocytes containing a single large intracellular lipid droplet that displaces the nucleus to the cell periphery (Neville Ch. 12).'
    }
  ],

  // Mission 3: Soft Tissue Pathology Terminology (st_m3)
  st_m3: [
    {
      q: 'An "Epulis Fissuratum" (Inflammatory Fibrous Hyperplasia) is caused by:',
      options: [
        'Chronic mechanical irritation along the border of an ill-fitting, overextended denture flange',
        'A high-grade mesenchymal genetic translocation',
        'Bacterial infection with Actinomyces',
        'Severe vitamin B12 deficiency'
      ],
      correct: 0,
      explanation: 'Epulis fissuratum represents reactive redundant folds of hyperplastic fibrous connective tissue that develop in the vestibular sulcus flanking the ill-fitting border of a loose dental prosthesis (Neville Ch. 12).'
    },
    {
      q: 'Lymphangioma of the anterior tongue characteristically presents with a surface appearance described as:',
      options: [
        'Translucent, clustered vesicle-like projections resembling "frog eggs" or "tapioca pudding"',
        'Smooth stony hard expansion of cortical bone',
        'Ulcerated necrotic slough with sulfur granules',
        'Fiery red peeled desquamated gingiva'
      ],
      correct: 0,
      explanation: 'Superficial lymphangiomas of the tongue create grouped, translucent, pebbly, fluid-filled papillary projections that resemble frog spawn or caviar/tapioca pudding due to dilated lymphatic channels in the papillary lamina propria (Neville Ch. 12).'
    },
    {
      q: 'Cystic Hygroma (Macrocystic Lymphatic Malformation) has a high predilection for which anatomical location?',
      options: [
        'Posterior cervical triangle and neck in infants, potentially compressing the airway',
        'Hard palate mucosa in elderly patients',
        'Mandibular condylar cartilage',
        'Maxillary sinus antrum'
      ],
      correct: 0,
      explanation: 'Cystic hygroma is a large, cavernous lymphatic malformation occurring in the neck and axilla of infants and young children, capable of massive soft swelling that causes airway compromise (Neville Ch. 12).'
    },
    {
      q: 'Leiomyoma is a benign mesenchymal neoplasm derived from:',
      options: [
        'Smooth muscle cells (often originating in the tunica media of oral blood vessels / Angioleiomyoma)',
        'Striated skeletal muscle fibers',
        'Peripheral nerve perineurial sheaths',
        'Marrow megakaryocytes'
      ],
      correct: 0,
      explanation: 'Oral leiomyomas are rare benign smooth muscle tumors that usually arise from the vascular smooth muscle (tunica media) of arterioles (Angiomyoma / Vascular Leiomyoma) (Neville Ch. 12).'
    },
    {
      q: 'Rhabdomyosarcoma is the most common soft tissue sarcoma of childhood. What is the most common histologic subtype found in the head and neck of young children?',
      options: [
        'Embryonal Rhabdomyosarcoma (including Sarcoma Botryoides)',
        'Alveolar Rhabdomyosarcoma',
        'Pleomorphic Rhabdomyosarcoma',
        'Spindle cell carcinoma'
      ],
      correct: 0,
      explanation: 'Embryonal rhabdomyosarcoma is the most frequent subtype in children under 6 years, featuring strap-shaped or tadpole rhabdomyoblasts with cross-striations and desmin/myogenin positivity (Neville Ch. 12).'
    }
  ],

  // Mission 4: Lymphomas & Plasma Cell Neoplasms (st_m4)
  st_m4: [
    {
      q: 'Burkitt Lymphoma exhibits a classic "starry-sky" histologic appearance produced by:',
      options: [
        'Tingible-body benign macrophages (the stars) engulfing apoptotic cellular debris amidst a uniform dark sea of malignant B-lymphoblasts (the sky)',
        'Concentric keratin pearls in poorly differentiated carcinoma',
        'Amyloid spherules calcifying in connective tissue',
        'Clear mucous cells floating in mucin pools'
      ],
      correct: 0,
      explanation: 'Neville Ch. 13 explains the pathognomonic "starry-sky" pattern of Burkitt Lymphoma: due to an extremely rapid mitotic rate (~100% Ki-67), massive apoptosis occurs; large, pale, phagocytic tingible-body macrophages clean up the debris, appearing as bright stars against a dark background of monomorphic neoplastic B-cells.'
    },
    {
      q: 'What characteristic chromosomal translocation driving the c-MYC oncogene is diagnostic for Burkitt Lymphoma?',
      options: [
        't(8;14)(q24;q32) translocation involving the MYC gene and immunoglobulin heavy chain (IGH) promoter',
        't(9;22) Philadelphia chromosome',
        't(11;19) CRTC1-MAML2 fusion',
        't(11;22) EWSR1-FLI1 fusion'
      ],
      correct: 0,
      explanation: 'Burkitt lymphoma is defined by chromosomal translocations juxtaposing the MYC proto-oncogene on chromosome 8 with the immunoglobulin heavy-chain gene locus on chromosome 14 (t[8;14]), resulting in constitutive c-MYC overexpression (Neville Ch. 13).'
    },
    {
      q: 'Multiple Myeloma is a monoclonal malignancy of plasma cells that produces classic skull radiographs showing:',
      options: [
        'Multiple non-corticated, sharply demarcated "punched-out" radiolucent osteolytic bone lesions',
        'A generalized ground-glass appearance with loss of lamina dura',
        'Sunburst periosteal new bone formations',
        'Bilateral expansion of the condyles'
      ],
      correct: 0,
      explanation: 'Multiple myeloma plasma cells secrete osteoclast-activating factors (IL-6, RANKL), producing clean, non-corticated "punched-out" osteolytic bone defects throughout the skull, jaws, and long bones without reactive bone formation (Neville Ch. 13).'
    },
    {
      q: 'Bence Jones proteins excreted in the urine of Multiple Myeloma patients represent:',
      options: [
        'Monoclonal unattached immunoglobulin free light chains (kappa or lambda)',
        'Degraded fibrinogen fragments',
        'Candida fungal toxins',
        'Excessive albumin proteins'
      ],
      correct: 0,
      explanation: 'Neoplastic plasma cell clones in multiple myeloma produce an excess of monoclonal free light chains (kappa or lambda) that pass through the renal glomeruli and precipitate as Bence Jones proteinuria (Neville Ch. 13).'
    },
    {
      q: 'Kaposi Sarcoma is an endothelial vascular malignancy caused by which oncogenic virus in patients with HIV/AIDS?',
      options: [
        'Human Herpesvirus 8 (HHV-8 / KSHV)',
        'Herpes Simplex Virus 1 (HSV-1)',
        'Human Papillomavirus 16 (HPV-16)',
        'Cytomegalovirus (CMV)'
      ],
      correct: 0,
      explanation: 'Kaposi Sarcoma is caused by Human Herpesvirus 8 (HHV-8), developing frequently in immunocompromised HIV patients as purplish-red macular or nodular lesions on the hard palate and gingiva, showing atypical spindle cells forming slit-like vascular channels with extravasated erythrocytes (Neville Ch. 13).'
    }
  ],

  // Mission 5: Starry-Sky & Plasmacytoma Histology (st_m5)
  st_m5: [
    {
      q: 'Russell bodies found within plasma cells represent:',
      options: [
        'Eosinophilic, globular intracellular inclusions of accumulated synthesized immunoglobulins distending the rough endoplasmic reticulum',
        'Intranuclear viral herpes inclusions',
        'Degenerated lysosomal enzymes in Schwann cells',
        'Phagocytosed red blood cells'
      ],
      correct: 0,
      explanation: 'Russell bodies are rounded, glassy, eosinophilic cytoplasmic inclusions representing excessive, packed immunoglobulins trapped inside the cisternae of rough endoplasmic reticulum in plasma cells (Neville Ch. 13).'
    },
    {
      q: 'Langerhans Cell Histiocytosis (LCH) is confirmed on electron microscopy by which pathognomonic organelle?',
      options: [
        'Birbeck Granules (rod-shaped pentalaminar cytoplasmic organelles with a terminal vesicle resembling a tennis racket)',
        'Zymogen secretory granules',
        'Liesegang rings',
        'Weibel-Palade bodies'
      ],
      correct: 0,
      explanation: 'Birbeck granules are rod- or tennis-racket-shaped pentalaminar cytoplasmic organelles with a central striated line, unique to Langerhans cells and diagnostic for LCH on electron microscopy, alongside CD1a and Langerin positivity (Neville Ch. 13).'
    },
    {
      q: 'The characteristic radiographic presentation of Langerhans Cell Histiocytosis in the jaws is described as:',
      options: [
        'Severe alveolar bone loss causing teeth to appear as "floating in air" or "floating in space"',
        'Ground glass appearance with tooth displacement',
        'Dense bilateral onion-skinning of the cortex',
        'Periapical cementoid radiopaque masses'
      ],
      correct: 0,
      explanation: 'LCH causes extensive osteolytic destruction of alveolar bone around molar teeth without root resorption, leaving the teeth suspended in soft tissue masses with a classic appearance of "teeth floating in space" (Neville Ch. 13).'
    },
    {
      q: 'Plasmacytoma of the jaw is microscopically composed of:',
      options: [
        'A monochromatic, uniform sheet of atypical plasma cells with eccentric clock-face nuclei and abundant basophilic cytoplasm with a perinuclear halo',
        'A mixed population of neutrophils, histiocytes, and fibroblasts',
        'Malignant squamous cells forming keratin pearls',
        'Invasive gland ducts with Swiss-cheese cylinders'
      ],
      correct: 0,
      explanation: 'Plasmacytoma consists of dense sheets of monoclonal, differentiated to poorly differentiated plasma cells featuring eccentric round nuclei with cartwheel/clock-face chromatin and a clear perinuclear Golgi halo (Neville Ch. 13).'
    },
    {
      q: 'Reed-Sternberg cells, the diagnostic pathognomonic cells in Hodgkin Lymphoma, are microscopically described as:',
      options: [
        'Giant binucleated or multinucleated B-cells with prominent, inclusion-like eosinophilic nucleoli resembling "owl eyes"',
        'Small uniform Tzanck cells with acantholysis',
        'Ghost cells with central loss of nuclei',
        'Oncocytes packed with mitochondria'
      ],
      correct: 0,
      explanation: 'Reed-Sternberg (RS) cells are large, atypical neoplastic lymphoid cells with two mirror-image nuclear lobes ("owl-eye" appearance) containing massive, inclusion-like eosinophilic nucleoli, surrounded by an abundant reactive background of lymphocytes, eosinophils, and plasma cells (Neville Ch. 13).'
    }
  ],

  // Mission 6: Hematologic Oncology Terminology (st_m6)
  st_m6: [
    {
      q: 'A Solitary Plasmacytoma of Bone (SPB) is distinguished from Multiple Myeloma by:',
      options: [
        'Single isolated bone lesion with normal bone marrow biopsy elsewhere, absence of hypercalcemia, renal impairment, and anemia (CRAB criteria)',
        'Complete absence of plasma cells',
        'Occurrence exclusively in newborns',
        'Inability to synthesize immunoglobulin chains'
      ],
      correct: 0,
      explanation: 'Solitary Plasmacytoma of Bone is an isolated clonal plasma cell lesion of bone without evidence of generalized marrow involvement or systemic CRAB features (hyperCalcemia, Renal insufficiency, Anemia, Bone lesions); however, over 50% eventually progress to multiple myeloma (Neville Ch. 13).'
    },
    {
      q: 'Acute Myeloid Leukemia (AML) frequently presents in the oral cavity as which dramatic gingival sign?',
      options: [
        'Boggy, diffuse, purple-red gingival enlargement caused by leukemic infiltration of immature neoplastic blasts into the gingival tissues',
        'Complete ankylosis of the dentition',
        'Dry mouth and keratoconjunctivitis',
        'Multiple supernumerary impacted premolars'
      ],
      correct: 0,
      explanation: 'Gingival leukemic infiltration is most pronounced in myelomonocytic and monocytic leukemias (AML M4/M5), where circulating malignant myeloid blasts infiltrate the gingival connective tissue, causing diffuse, boggy, hemorrhagic, spongy gingival enlargement (Neville Ch. 13).'
    },
    {
      q: 'The classic "CRAB" mnemonic for diagnosing Multiple Myeloma stands for:',
      options: [
        'hyperCalcemia, Renal failure, Anemia, and Bone osteolytic lesions',
        'Candidiasis, Radicular cyst, Ameloblastoma, and Burkitt lymphoma',
        'Cartwheel nuclei, Russell bodies, Amyloid, and Birbeck granules',
        'Cervical nodes, Retinopathy, Arthritis, and Bronchospasm'
      ],
      correct: 0,
      explanation: 'The clinical diagnostic criteria for active multiple myeloma include end-organ damage captured by CRAB: hyperCalcemia (>11 mg/dL), Renal insufficiency (creatinine >2 mg/dL), Anemia (hemoglobin <10 g/dL), and multiple Bone lytic lesions (Neville Ch. 13).'
    },
    {
      q: 'Extranodal NK/T-cell Lymphoma (Nasal type), formerly termed Lethal Midline Granuloma, is an aggressive necrotizing malignancy that causes:',
      options: [
        'Rapid, extensive, destructive midfacial and hard palate necrosis and perforation, strongly driven by Epstein-Barr Virus (EBV)',
        'Benign expansion of the mandibular angle',
        'Multiple unerupted odontomas',
        'Bilateral submandibular salivary stones'
      ],
      correct: 0,
      explanation: 'Extranodal NK/T-cell lymphoma (nasal type) is an aggressive, destructive angiocentric malignancy associated with EBV, characteristically causing midfacial destruction, extensive ulceration, and full-thickness perforation of the hard palate and nasal septum (Neville Ch. 13).'
    },
    {
      q: 'Primary intraoral Non-Hodgkin Lymphomas of soft tissue most commonly develop in which site as a diffuse, non-tender, boggy swelling?',
      options: [
        'Waldeyer ring (palatine tonsil, lingual tonsil, and posterior soft palate)',
        'Attached anterior gingiva',
        'Ventral midline of tongue',
        'Floor of the mouth sublingual fold'
      ],
      correct: 0,
      explanation: 'Waldeyer ring (the annular ring of lymphoid tissue in the oropharynx including tonsils and posterior palate) and the buccal vestibule are the most common sites for extranodal oral Non-Hodgkin lymphoma, presenting as a soft, non-tender, boggy, purplish mass with a high-grade diffuse large B-cell morphology (Neville Ch. 13).'
    }
  ]
};

// Helper to get questions for a mission (merges default + professor custom questions)
export function getQuestions(missionId) {
  const defaultQuestions = QUESTIONS[missionId] || [];
  const custom = getCustomData();
  const customList = custom.questions?.[missionId] || [];
  const merged = [...defaultQuestions, ...customList];

  return merged.map(q => ({
    q: q.q,
    options: q.options || ['Option A', 'Option B', 'Option C', 'Option D'],
    a: q.a !== undefined ? q.a : (q.correct !== undefined ? q.correct : 0),
    exp: q.exp || q.explanation || 'Neville\'s Oral & Maxillofacial Pathology Reference',
  }));
}

// Shuffle an array in place (Fisher-Yates)
export function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
