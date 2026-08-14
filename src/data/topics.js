import { getCustomData } from '../utils/customContent';

// ============================================================
// HistoPath India — Core Oral Pathology Curriculum
// Sourced & Aligned with Neville's Textbook of Oral & Maxillofacial Pathology
// 6 Core Disease Domains × 2 Stages × 3 Missions = 36 Missions
// ============================================================

export const TOPICS = [
  {
    id: 'odontogenic_tumors_cysts',
    title: 'Odontogenic Cysts & Tumors',
    icon: '🦷',
    description: 'Ameloblastoma variants, odontomas, KCOTs/OKCs, dentigerous & radicular cysts',
    textbookRef: "Neville Ch. 15 — Odontogenic Cysts & Tumors",
    accentColor: 'hsl(200, 75%, 55%)',
    stages: [
      {
        id: 'otc_s1',
        title: 'Odontogenic Tumors',
        icon: '🔬',
        missions: [
          {
            id: 'otc_m1',
            title: 'Ameloblastoma & Subtypes',
            subtitle: 'Follicular, Plexiform, Desmoplastic, and Unicystic variants',
            stageTitle: 'Odontogenic Tumors',
            gameType: 'matching',
            pairs: [
              { image: 'Islands with peripheral palisading columnar cells & central stellate reticulum', label: 'Follicular Ameloblastoma' },
              { image: 'Interconnecting cords and strands of odontogenic epithelium', label: 'Plexiform Ameloblastoma' },
              { image: 'Densely collagenized stroma squeezing small epithelial nests', label: 'Desmoplastic Ameloblastoma' },
              { image: 'Vickers-Gorlin criteria: hyperchromatism & reversed nuclear polarity', label: 'Ameloblastoma Diagnostic Hallmark' },
              { image: 'Squamous metaplasia within central stellate reticulum islands', label: 'Acanthomatous Ameloblastoma' },
            ]
          },
          {
            id: 'otc_m2',
            title: 'Mixed & Calcifying Odontogenic Tumors',
            subtitle: 'CEOT (Pindborg), AOT, and Odontoma histopathology',
            stageTitle: 'Odontogenic Tumors',
            gameType: 'jigsaw',
            puzzleData: {
              imageDesc: 'Odontogenic tumor showing duct-like rosette structures and Liesegang rings',
              gridSize: 3,
              labels: [
                'Polyhedral Epithelial Sheets',
                'Liesegang Ring Calcifications',
                'Amyloid-Like Eosinophilic Material',
                'Duct-like Rosette Formations',
                'Tubular Dentinoid & Enamel Matrix',
                'Cellular Dental Papilla-like Stroma',
                'Ghost Cells with Calcification',
                'Clear Cells with Glycogen',
                'Fibrous Capsule'
              ]
            }
          },
          {
            id: 'otc_m3',
            title: 'Odontogenic Neoplasm Terms',
            subtitle: 'Key histopathologic terminology & eponyms',
            stageTitle: 'Odontogenic Tumors',
            gameType: 'crossword',
            puzzleData: {
              words: [
                { word: 'AMELOBLASTOMA', clue: 'Most common clinically significant aggressive odontogenic tumor' },
                { word: 'PINDBORG', clue: 'Eponym for Calcifying Epithelial Odontogenic Tumor (CEOT)' },
                { word: 'LIESEGANG', clue: 'Concentric ring calcifications characteristically seen in CEOT' },
                { word: 'ODONTOMA', clue: 'Developmental odontogenic hamartoma forming enamel and dentin' },
                { word: 'STELLATE', clue: '______ reticulum: loose central cells resembling enamel organ' },
                { word: 'AMYLOID', clue: 'Eosinophilic proteinaceous Congo red-positive material in CEOT' },
                { word: 'ROSETTE', clue: 'Duct-like glandular ring structure in Adenomatoid Odontogenic Tumor' },
                { word: 'VICKERS', clue: '______-Gorlin criteria for ameloblastic nuclear alterations' },
                { word: 'UNICYSTIC', clue: 'Ameloblastoma variant presenting inside a single cyst lumen' },
                { word: 'MYXOMA', clue: 'Odontogenic mesenchymal tumor of loose ground substance & stellate cells' },
              ]
            }
          }
        ]
      },
      {
        id: 'otc_s2',
        title: 'Odontogenic Cysts',
        icon: '💧',
        missions: [
          {
            id: 'otc_m4',
            title: 'Inflammatory vs Developmental Cysts',
            subtitle: 'Radicular, Dentigerous, OKC, and Lateral Periodontal cysts',
            stageTitle: 'Odontogenic Cysts',
            gameType: 'matching',
            pairs: [
              { image: 'Non-vital tooth apex with hyperplastic stratified squamous lining & Rushton bodies', label: 'Radicular (Periapical) Cyst' },
              { image: 'Attaches to cementoenamel junction (CEJ) of impacted third molar crown', label: 'Dentigerous (Follicular) Cyst' },
              { image: 'Corrugated parakeratinized 6-8 cell thick lining with tombstone basal layer', label: 'Odontogenic Keratocyst (OKC)' },
              { image: 'Polycystic clear cell plaques between vital mandibular premolar roots', label: 'Botryoid / Lateral Periodontal Cyst' },
              { image: 'Sheets of ghost cells undergoing dystrophic calcification in cyst wall', label: 'Calcifying Odontogenic Cyst (Gorlin)' },
            ]
          },
          {
            id: 'otc_m5',
            title: 'Cyst Wall & Epithelial Linings',
            subtitle: 'Microscopic diagnostic structures in cyst walls',
            stageTitle: 'Odontogenic Cysts',
            gameType: 'jigsaw',
            puzzleData: {
              imageDesc: 'Radicular cyst wall with chronic inflammatory infiltrate and Rushton bodies',
              gridSize: 3,
              labels: [
                'Wavy Corrugated Parakeratin',
                'Hyperchromatic Palisaded Basal Layer',
                'Rushton (Hyaline) Arching Bodies',
                'Cholesterol Clefts with Giant Cells',
                'Foamy Lipid-Laden Histiocytes',
                'Epithelial Rest of Malassez',
                'Satellite Daughter Microcysts',
                'Plasma Cells (Russell Bodies)',
                'Fibrous Capsule with Capillaries'
              ]
            }
          },
          {
            id: 'otc_m6',
            title: 'Odontogenic Cyst Terminology',
            subtitle: 'Pathognomonic microscopic features in Neville Ch. 15',
            stageTitle: 'Odontogenic Cysts',
            gameType: 'crossword',
            puzzleData: {
              words: [
                { word: 'KERATOCYST', clue: 'Aggressive cyst with PTCH mutation and high recurrence rate' },
                { word: 'RUSHTON', clue: 'Curvilinear hairpin eosinophilic bodies in radicular cyst epithelium' },
                { word: 'DENTIGEROUS', clue: 'Cyst originating by fluid accumulation around impacted crown' },
                { word: 'RADICULAR', clue: 'Most common inflammatory odontogenic cyst at non-vital tooth apex' },
                { word: 'GORLIN', clue: 'Nevoid basal cell carcinoma syndrome associated with multiple OKCs' },
                { word: 'CHOLESTEROL', clue: 'Birefringent needle-shaped clefts in inflamed cyst walls' },
                { word: 'PARAKERATIN', clue: 'Keratin with retained pyknotic nuclei lining OKC lumen' },
                { word: 'BOTRYOID', clue: 'Grape-like multicystic variant of lateral periodontal cyst' },
                { word: 'MALASSEZ', clue: 'Epithelial rests in PDL giving rise to radicular cysts' },
                { word: 'MARSUPIALIZATION', clue: 'Surgical decompression technique used for large odontogenic cysts' },
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: 'epithelial_pathology',
    title: 'Epithelial Pathology & Oral Cancer',
    icon: '🔬',
    description: 'OPMDs (Leukoplakia, OSMF, Lichen Planus), Dysplasia, OSCC, and Verrucous Carcinoma',
    textbookRef: "Neville Ch. 10 — Epithelial Pathology",
    accentColor: 'hsl(340, 75%, 55%)',
    stages: [
      {
        id: 'ep_s1',
        title: 'Potentially Malignant Disorders',
        icon: '⚠️',
        missions: [
          {
            id: 'ep_m1',
            title: 'OPMD Clinical & Histopath Spectrum',
            subtitle: 'Leukoplakia, Erythroplakia, OSMF, and Oral Lichen Planus',
            stageTitle: 'Potentially Malignant Disorders',
            gameType: 'matching',
            pairs: [
              { image: 'Dense avascular subepithelial collagen hyalinization with muscle atrophy', label: 'Oral Submucous Fibrosis (OSMF)' },
              { image: 'Band-like subepithelial lymphocytic infiltrate with basal hydropic degeneration', label: 'Oral Lichen Planus' },
              { image: 'High risk velvety red plaque showing severe dysplasia or carcinoma in situ', label: 'Erythroplakia' },
              { image: 'Hyperkeratosis with bulbous drop-shaped rete ridges and cellular atypia', label: 'Epithelial Dysplasia (Leukoplakia)' },
              { image: 'Saw-tooth rete pegs and necrotic keratinocyte Civatte bodies at DEJ', label: 'Lichenoid Mucositis' },
            ]
          },
          {
            id: 'ep_m2',
            title: 'Architectural & Cytologic Dysplasia',
            subtitle: 'WHO grading of epithelial dysplasia',
            stageTitle: 'Potentially Malignant Disorders',
            gameType: 'jigsaw',
            puzzleData: {
              imageDesc: 'Stratified squamous epithelium showing severe cellular and architectural dysplasia',
              gridSize: 3,
              labels: [
                'Drop-shaped Bulbous Rete Pegs',
                'Basal Cell Hyperplasia & Crowding',
                'Loss of Intercellular Desmosomes',
                'Nuclear Pleomorphism & Hyperchromasia',
                'Increased Nuclear-Cytoplasmic (N:C) Ratio',
                'Atypical & Suprabasal Mitotic Figures',
                'Premature Individual Cell Keratinization',
                'Prominent Multiple Nucleoli',
                'Intact Basement Membrane'
              ]
            }
          },
          {
            id: 'ep_m3',
            title: 'Epithelial Pathology Terminology',
            subtitle: 'Diagnostic terms from Neville Ch. 10',
            stageTitle: 'Potentially Malignant Disorders',
            gameType: 'crossword',
            puzzleData: {
              words: [
                { word: 'DYSPLASIA', clue: 'Disordered epithelial growth with cytological and architectural atypia' },
                { word: 'LEUKOPLAKIA', clue: 'White patch of oral mucosa that cannot be wiped off or diagnosed as other disease' },
                { word: 'ERYTHROPLAKIA', clue: 'Red velvety mucosal macule with extremely high risk of malignant transformation' },
                { word: 'FIBROSIS', clue: 'Subepithelial collagen deposition caused by areca nut alkaloids in OSMF' },
                { word: 'CIVATTE', clue: 'Apoptotic eosinophilic keratinocyte body seen in lichen planus' },
                { word: 'PARAKERATOSIS', clue: 'Retention of nuclei in stratum corneum keratin layer' },
                { word: 'ORTHOKERATIN', clue: 'Anuclear keratin layer with well-defined underlying stratum granulosum' },
                { word: 'ACANTHOSIS', clue: 'Abnormal thickening and hyperplasia of stratum spinosum' },
                { word: 'HYPERCHROMASIA', clue: 'Excessive dark staining of cell nuclei due to increased DNA content' },
                { word: 'PLEOMORPHISM', clue: 'Marked variation in the size and shape of cells and nuclei' },
              ]
            }
          }
        ]
      },
      {
        id: 'ep_s2',
        title: 'Oral Squamous Cell Carcinoma',
        icon: '⚠️',
        missions: [
          {
            id: 'ep_m4',
            title: 'Malignancy Patterns & Variants',
            subtitle: 'Well, moderately, poorly differentiated OSCC and Verrucous Carcinoma',
            stageTitle: 'Oral Squamous Cell Carcinoma',
            gameType: 'matching',
            pairs: [
              { image: 'Infiltrating islands with prominent concentric keratin pearls & intercellular bridges', label: 'Well-Differentiated OSCC' },
              { image: 'Broad pushing bulbous rete ridges with elephant feet & church spire keratosis', label: 'Verrucous Carcinoma (Ackerman)' },
              { image: 'Biphasic malignant squamous islands transitioning into atypical sarcomatoid spindle cells', label: 'Spindle Cell (Sarcomatoid) Carcinoma' },
              { image: 'Sheets of anaplastic pleomorphic cells with abundant atypical multipolar mitoses', label: 'Poorly Differentiated OSCC' },
              { image: 'Tumor cells tracking along epineurium and perineural spaces of peripheral nerves', label: 'Perineural Invasion' },
            ]
          },
          {
            id: 'ep_m5',
            title: 'Invasion & Keratin Pearl Histology',
            subtitle: 'Microscopic landscape of invasive oral carcinoma',
            stageTitle: 'Oral Squamous Cell Carcinoma',
            gameType: 'jigsaw',
            puzzleData: {
              imageDesc: 'Invasive squamous cell carcinoma showing keratin pearl and desmoplastic stroma',
              gridSize: 3,
              labels: [
                'Concentric Keratin Pearl (Epithelial Pearl)',
                'Invasive Malignant Squamous Islands',
                'Intercellular Prickle Bridges',
                'Atypical Multipolar Mitotic Figure',
                'Desmoplastic Collagenous Stroma',
                'Perineural Tumor Cell Infiltration',
                'Intravascular Lymphatic Invasion',
                'Chronic Lymphoplasmacytic Host Response',
                'Tumor Necrosis & Ulceration'
              ]
            }
          },
          {
            id: 'ep_m6',
            title: 'Oncology & Carcinoma Terminology',
            subtitle: 'Grading, invasion, and metastatic descriptors',
            stageTitle: 'Oral Squamous Cell Carcinoma',
            gameType: 'crossword',
            puzzleData: {
              words: [
                { word: 'CARCINOMA', clue: 'Malignant epithelial neoplasm invading past the basement membrane' },
                { word: 'METASTASIS', clue: 'Spread of malignant cells to regional cervical lymph nodes or distant organs' },
                { word: 'DESMOPLASIA', clue: 'Formation of dense fibrous connective tissue stroma induced by cancer invasion' },
                { word: 'DYSKERATOSIS', clue: 'Abnormal keratinization occurring prematurely within deep epithelial layers' },
                { word: 'PERINEURAL', clue: 'Invasion of malignant tumor cells wrapping around nerve sheaths' },
                { word: 'VERRUCOUS', clue: 'Low-grade warty variant of squamous cell carcinoma with pushing borders' },
                { word: 'ANAPLASIA', clue: 'Loss of cellular differentiation and structural tissue orientation' },
                { word: 'STAGING', clue: 'TNM clinical classification system determining anatomical extent of cancer' },
                { word: 'MARGATION', clue: 'Assessment of surgical excision edges for presence of residual tumor cells' },
                { word: 'ANGIOGENESIS', clue: 'Formation of new blood vessels supplying rapidly dividing tumor cells' },
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: 'salivary_pathology',
    title: 'Salivary Gland Pathology & Tumors',
    icon: '💧',
    description: 'Pleomorphic Adenoma, Warthin Tumor, Mucoepidermoid & Adenoid Cystic Carcinomas',
    textbookRef: "Neville Ch. 11 — Salivary Gland Pathology",
    accentColor: 'hsl(215, 75%, 55%)',
    stages: [
      {
        id: 'sp_s1',
        title: 'Benign Salivary Neoplasms',
        icon: '🔬',
        missions: [
          {
            id: 'sp_m1',
            title: 'Benign Tumors & Obstructive Lesions',
            subtitle: 'Pleomorphic Adenoma, Warthin, Canalicular Adenoma, and Mucocele',
            stageTitle: 'Benign Salivary Neoplasms',
            gameType: 'matching',
            pairs: [
              { image: 'Biphasic ductal and myoepithelial cells in chondromyxoid / hyaline stroma', label: 'Pleomorphic Adenoma (Mixed Tumor)' },
              { image: 'Papillary cystic bilayered oncocytes with dense lymphoid stroma & germinal centers', label: 'Warthin Tumor (Cystadenoma Lymphomatosum)' },
              { image: 'Parallel cords of uniform columnar cells forming bead-like canalicular channels', label: 'Canalicular Adenoma (Upper Lip)' },
              { image: 'Extravasated mucin surrounded by granulation tissue & foamy histiocytes (no epithelial lining)', label: 'Mucus Extravasation Phenomenon (Mucocele)' },
              { image: 'Squamous metaplasia of salivary ducts with ischemic acinar necrosis on hard palate', label: 'Necrotizing Sialometaplasia' },
            ]
          },
          {
            id: 'sp_m2',
            title: 'Pleomorphic Adenoma & Warthin Histology',
            subtitle: 'Microscopic morphology of common benign salivary tumors',
            stageTitle: 'Benign Salivary Neoplasms',
            gameType: 'jigsaw',
            puzzleData: {
              imageDesc: 'Pleomorphic adenoma showing ductal epithelium and chondromyxoid matrix',
              gridSize: 3,
              labels: [
                'Epithelial Ducts with Eosinophilic Coagulum',
                'Plasmacytoid Myoepithelial Cells',
                'Chondromyxoid Myxoid Matrix',
                'Islands of True Cartilaginous Differentiation',
                'Bilayered Eosinophilic Oncocytic Epithelium',
                'Lymphoid Stroma with Germinal Center',
                'Fibrous Pseudocapsule Capsular Infiltration',
                'Squamous Metaplasia Pearls',
                'Keratohyalin Granules'
              ]
            }
          },
          {
            id: 'sp_m3',
            title: 'Benign Salivary Terminology',
            subtitle: 'Microscopic identifiers from Neville Ch. 11',
            stageTitle: 'Benign Salivary Neoplasms',
            gameType: 'crossword',
            puzzleData: {
              words: [
                { word: 'PLEOMORPHIC', clue: 'Most common benign salivary gland neoplasm with diverse tissue patterns' },
                { word: 'WARTHIN', clue: 'Papillary cystadenoma lymphomatosum strongly associated with cigarette smoking' },
                { word: 'ONCOCYTE', clue: 'Large pink epithelial cell packed with abundant altered mitochondria' },
                { word: 'CHONDROID', clue: 'Cartilage-like matrix produced by modified myoepithelial cells' },
                { word: 'SIALOLITH', clue: 'Calcified stone inside salivary gland parenchyma or Wharton duct' },
                { word: 'MYOEPITHELIAL', clue: 'Contractile ectodermal cell essential in salivary tumor architecture' },
                { word: 'MUCOCELE', clue: 'Pseudocyst of spilled salivary mucin caused by severed duct trauma' },
                { word: 'RANULA', clue: 'Large bluish mucocele located in the floor of mouth from sublingual gland' },
                { word: 'CANALICULAR', clue: 'Benign monomorphic adenoma predilecting the upper lip' },
                { word: 'SJOGREN', clue: 'Autoimmune destruction of salivary and lacrimal glands (sicca syndrome)' },
              ]
            }
          }
        ]
      },
      {
        id: 'sp_s2',
        title: 'Malignant Salivary Neoplasms',
        icon: '⚠️',
        missions: [
          {
            id: 'sp_m4',
            title: 'Salivary Carcinoma Types',
            subtitle: 'Mucoepidermoid, Adenoid Cystic, and Acinic Cell carcinomas',
            stageTitle: 'Malignant Salivary Neoplasms',
            gameType: 'matching',
            pairs: [
              { image: 'Mixture of mucin-secreting mucous cells, epidermoid squamoid cells, & intermediate cells', label: 'Mucoepidermoid Carcinoma' },
              { image: 'Cribriform Swiss-cheese pattern with basaloid cells & extensive perineural invasion', label: 'Adenoid Cystic Carcinoma' },
              { image: 'Sheets of serous acinar cells with cytoplasmic basophilic zymogen granules', label: 'Acinic Cell Carcinoma' },
              { image: 'Single-file Indian-file cords and ductal structures with uniform bland nuclei on palate', label: 'Polymorphous Adenocarcinoma' },
              { image: 'Malignant transformation inside a long-standing benign pleomorphic adenoma', label: 'Carcinoma ex Pleomorphic Adenoma' },
            ]
          },
          {
            id: 'sp_m5',
            title: 'Swiss-Cheese & Mucinous Architecture',
            subtitle: 'Histopathology of Adenoid Cystic and Mucoepidermoid carcinoma',
            stageTitle: 'Malignant Salivary Neoplasms',
            gameType: 'jigsaw',
            puzzleData: {
              imageDesc: 'Adenoid cystic carcinoma showing classic cribriform Swiss cheese architecture',
              gridSize: 3,
              labels: [
                'Cribriform Cylindrical Spaces (Swiss Cheese)',
                'Basaloid Small Dark Myoepithelial Cells',
                'Glycosaminoglycan-rich Basophilic Cylinders',
                'Clear Mucous Cells with Intracellular Mucin',
                'Intermediate Squamoid Polygonal Cells',
                'Perineural Space Ring Infiltration',
                'Serous Acinar Zymogen Granules',
                'Dense Hyalinized Collagen Stroma',
                'Infiltrative Non-Capsulated Border'
              ]
            }
          },
          {
            id: 'sp_m6',
            title: 'Salivary Malignancy Terminology',
            subtitle: 'Diagnostic names and staging terms from Neville Ch. 11',
            stageTitle: 'Malignant Salivary Neoplasms',
            gameType: 'crossword',
            puzzleData: {
              words: [
                { word: 'CRIBRIFORM', clue: 'Swiss-cheese architectural pattern diagnostic of Adenoid Cystic Carcinoma' },
                { word: 'EPIDERMOID', clue: 'Squamous-like epithelial cell component of Mucoepidermoid Carcinoma' },
                { word: 'ZYMOGEN', clue: 'Enzyme precursor granules seen in serous acinar tumor cells' },
                { word: 'PERINEURAL', clue: 'Characteristic relentless nerve sheath tracking causing pain in ACC' },
                { word: 'MUCICARMINE', clue: 'Special histochemical stain used to confirm intracellular mucin in MEC' },
                { word: 'INTERMEDIATE', clue: 'Progenitor basaloid cell that differentiates into mucous or squamoid cells' },
                { word: 'CYLINDROMA', clue: 'Historical name for adenoid cystic carcinoma based on cylinder spaces' },
                { word: 'POLYMORPHOUS', clue: 'Low-grade adenocarcinoma of minor salivary glands with variable architecture' },
                { word: 'ADENOCARCINOMA', clue: 'Malignant neoplasm of glandular salivary epithelial differentiation' },
                { word: 'METASTASIS', clue: 'Late hematogenous pulmonary spread characteristic of adenoid cystic carcinoma' },
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: 'bone_fibroosseous',
    title: 'Bone Pathology & Fibro-Osseous Lesions',
    icon: '💀',
    description: 'Fibrous Dysplasia, Cemento-Ossifying Fibroma, Osteosarcoma, Paget Disease & Giant Cell Lesions',
    textbookRef: "Neville Ch. 14 — Bone Pathology",
    accentColor: 'hsl(25, 75%, 55%)',
    stages: [
      {
        id: 'bf_s1',
        title: 'Benign Fibro-Osseous Lesions',
        icon: '🦴',
        missions: [
          {
            id: 'bf_m1',
            title: 'Fibro-Osseous Spectrum',
            subtitle: 'Fibrous Dysplasia, COD, and Cemento-Ossifying Fibroma',
            stageTitle: 'Benign Fibro-Osseous Lesions',
            gameType: 'matching',
            pairs: [
              { image: 'Irregular C- and V-shaped woven bone trabeculae without osteoblastic rimming (Chinese characters)', label: 'Fibrous Dysplasia' },
              { image: 'Well-demarcated encapsulated mass with mixture of woven/lamellar bone and cementum-like calcifications', label: 'Cemento-Ossifying Fibroma (COF)' },
              { image: 'Periapical radiolucent-to-radiopaque lesion in mandibular anterior teeth of middle-aged vital females', label: 'Periapical Cemento-Osseous Dysplasia' },
              { image: 'Multiquadrant dense lobular sclerotic bone masses with radiolucent rims', label: 'Florid Cemento-Osseous Dysplasia' },
              { image: 'GNAS gene postzygotic mutation with polyostotic bone lesions, café-au-lait spots, & precocious puberty', label: 'McCune-Albright Syndrome' },
            ]
          },
          {
            id: 'bf_m2',
            title: 'Woven Bone & Spherule Histology',
            subtitle: 'Microscopic differentiation of benign fibro-osseous lesions',
            stageTitle: 'Benign Fibro-Osseous Lesions',
            gameType: 'jigsaw',
            puzzleData: {
              imageDesc: 'Fibrous dysplasia showing Chinese character-like woven bone in fibrous stroma',
              gridSize: 3,
              labels: [
                'Chinese Script Curvilinear Trabeculae',
                'Immature Woven Bone (No Osteoblast Rimming)',
                'Cellular Spindle Fibroblast Stroma',
                'Curved C-shaped Bone Spicules',
                'Acellular Rounded Cementoid Spherules',
                'Lamellar Mature Bony Trabeculae',
                'True Osteoblastic Rimming (Ossifying Fibroma)',
                'Collagen Whorls & Bundles',
                'Sharply Demarcated Capsule Boundary'
              ]
            }
          },
          {
            id: 'bf_m3',
            title: 'Fibro-Osseous Terminology',
            subtitle: 'Bone morphology terms from Neville Ch. 14',
            stageTitle: 'Benign Fibro-Osseous Lesions',
            gameType: 'crossword',
            puzzleData: {
              words: [
                { word: 'TRABECULAE', clue: 'Anastomosing meshwork spicules of woven or lamellar bone' },
                { word: 'CEMENTOID', clue: 'Acellular basophilic rounded globular calcifications resembling cementum' },
                { word: 'WOVEN', clue: 'Immature embryonic bone with haphazardly arranged collagen fibers' },
                { word: 'OSTEOBLAST', clue: 'Bone-forming cell derived from osteoprogenitor mesenchymal cells' },
                { word: 'FIBROMA', clue: 'Cemento-ossifying ______: true encapsulated benign fibro-osseous neoplasm' },
                { word: 'GROUNDGLASS', clue: 'Characteristic smoky radiographical appearance of fibrous dysplasia' },
                { word: 'GNAS', clue: 'Gene encoding G-protein alpha subunit mutated in fibrous dysplasia' },
                { word: 'CHERUBISM', clue: 'Autosomal dominant SH3BP2 mutation causing bilateral chubby angel cheeks' },
                { word: 'OSTEOMA', clue: 'Benign mature compact or cancellous bone tumor seen in Gardner syndrome' },
                { word: 'ALBRIGHT', clue: 'McCune-______ syndrome: polyostotic FD with endocrine hyperfunction' },
              ]
            }
          }
        ]
      },
      {
        id: 'bf_s2',
        title: 'Metabolic, Giant Cell & Malignant Bone Tumors',
        icon: '⚠️',
        missions: [
          {
            id: 'bf_m4',
            title: 'Giant Cell Lesions & Malignancies',
            subtitle: 'CGCG, Paget Disease, Brown Tumor, and Osteosarcoma',
            stageTitle: 'Metabolic & Malignant Bone Tumors',
            gameType: 'matching',
            pairs: [
              { image: 'Non-neoplastic fibroblastic stroma packed with multinucleated giant cells & extravasated RBCs', label: 'Central Giant Cell Granuloma (CGCG)' },
              { image: 'Mosaic jigsaw puzzle pattern of bone with prominent basophilic reversal lines', label: 'Paget Disease of Bone (Osteitis Deformans)' },
              { image: 'Hyperparathyroidism secondary bone resorption with giant cell accumulation (von Recklinghausen of bone)', label: 'Brown Tumor of Hyperparathyroidism' },
              { image: 'Production of malignant osteoid/bone directly by highly atypical neoplastic osteoblasts', label: 'Osteosarcoma' },
              { image: 'Sunburst periosteal osteogenesis and symmetrical widening of the PDL space on radiograph', label: 'Osteosarcoma Radiographic Signs' },
            ]
          },
          {
            id: 'bf_m5',
            title: 'Mosaic Bone & Osteoid Histology',
            subtitle: 'Paget disease mosaic lines and osteosarcoma malignant osteoid',
            stageTitle: 'Metabolic & Malignant Bone Tumors',
            gameType: 'jigsaw',
            puzzleData: {
              imageDesc: 'Osteosarcoma showing atypical osteoblasts producing neoplastic osteoid',
              gridSize: 3,
              labels: [
                'Malignant Osteoid Matrix Production',
                'Pleomorphic Hyperchromatic Osteoblasts',
                'Atypical Bizarre Multipolar Mitoses',
                'Multinucleated Osteoclast-like Giant Cells',
                'Basophilic Reversal Lines (Jigsaw Mosaic)',
                'Hemorrhage & Hemosiderin Pigment',
                'Chondroid Malignant Islands (Chondroblastic)',
                'Sunburst Periosteal Spiculation',
                'Infiltrative Bone Destruction Border'
              ]
            }
          },
          {
            id: 'bf_m6',
            title: 'Bone Oncology & Disease Terms',
            subtitle: 'Advanced pathology terminology from Neville Ch. 14',
            stageTitle: 'Metabolic & Malignant Bone Tumors',
            gameType: 'crossword',
            puzzleData: {
              words: [
                { word: 'OSTEOSARCOMA', clue: 'Most common primary malignant bone tumor excluding hematopoietic neoplasms' },
                { word: 'OSTEOID', clue: 'Unmineralized organic bone matrix produced by osteoblasts' },
                { word: 'PAGET', clue: 'Bone metabolic disease characterized by abnormal resorption and mosaic deposition' },
                { word: 'REVERSAL', clue: 'Scalloped basophilic cement lines indicating cycles of bone resorption and remodeling' },
                { word: 'SUNBURST', clue: 'Radiographic radiating bony spicules produced by elevated periosteum' },
                { word: 'OSTEOCLAST', clue: 'Multinucleated bone-resorbing cell derived from monocyte-macrophage lineage' },
                { word: 'GARRE', clue: '______ osteomyelitis: proliferative periostitis forming onion-skin bone layers' },
                { word: 'SEQUESTRUM', clue: 'Fragment of dead necrotic bone separated from viable healthy bone' },
                { word: 'INVOLUCRUM', clue: 'Sheath of new periosteal bone surrounding a dead sequestrum' },
                { word: 'CHONDROSARCOMA', clue: 'Malignant bone tumor characterized by formation of neoplastic cartilage' },
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: 'infectious_immunologic',
    title: 'Infectious & Vesiculobullous Diseases',
    icon: '🛡️',
    description: 'Pemphigus Vulgaris, Mucous Membrane Pemphigoid, Candidiasis, HSV, Syphilis, & Tuberculosis',
    textbookRef: "Neville Ch. 5, 6 & 16 — Infectious & Immunologic Diseases",
    accentColor: 'hsl(150, 75%, 40%)',
    stages: [
      {
        id: 'ii_s1',
        title: 'Vesiculobullous & Autoimmune Disorders',
        icon: '🔬',
        missions: [
          {
            id: 'ii_m1',
            title: 'Autoimmune Mucosal Splitting',
            subtitle: 'Pemphigus vs Pemphigoid vs Erythema Multiforme',
            stageTitle: 'Vesiculobullous & Autoimmune Disorders',
            gameType: 'matching',
            pairs: [
              { image: 'Suprabasal intraepithelial split with tombstone basal cells and free-floating Tzanck cells', label: 'Pemphigus Vulgaris' },
              { image: 'Subepithelial clean split of full-thickness epithelium from lamina propria with IgG at basement membrane', label: 'Mucous Membrane Pemphigoid' },
              { image: 'Target (iris) skin lesions with hemorrhagic crusting of vermilion border of lips', label: 'Erythema Multiforme' },
              { image: 'Circulating autoantibodies against Desmoglein-3 (desmosomal cadherin)', label: 'Pemphigus Vulgaris Autoantibody' },
              { image: 'Autoantibodies directed against BP180 and BP230 in hemidesmosomes', label: 'Cicatricial Pemphigoid Autoantibody' },
            ]
          },
          {
            id: 'ii_m2',
            title: 'Acantholysis & Tzanck Cell Histology',
            subtitle: 'Microscopic differentiation of intraepithelial and subepithelial blisters',
            stageTitle: 'Vesiculobullous & Autoimmune Disorders',
            gameType: 'jigsaw',
            puzzleData: {
              imageDesc: 'Pemphigus vulgaris showing suprabasilar cleft and rounded acantholytic Tzanck cells',
              gridSize: 3,
              labels: [
                'Intraepithelial Suprabasilar Cleft Split',
                'Tombstone Row of Basal Cells on Basement Membrane',
                'Acantholytic Rounded Tzanck Cells',
                'Subepithelial Clean Basement Membrane Separation',
                'Perivascular Mixed Eosinophilic Infiltrate',
                'Direct Immunofluorescence Fishnet IgG Staining',
                'Continuous Linear Basement Membrane Zone IgG',
                'Civatte Colloid Apoptotic Bodies',
                'Hydropic Basal Cell Degeneration'
              ]
            }
          },
          {
            id: 'ii_m3',
            title: 'Immunopathology Terminology',
            subtitle: 'Vesiculobullous terms from Neville Ch. 16',
            stageTitle: 'Vesiculobullous & Autoimmune Disorders',
            gameType: 'crossword',
            puzzleData: {
              words: [
                { word: 'ACANTHOLYSIS', clue: 'Loss of intercellular desmosome connections leading to detached round cells' },
                { word: 'PEMPHIGUS', clue: 'Potentially fatal autoimmune blistering disease targeting desmoglein proteins' },
                { word: 'PEMPHIGOID', clue: 'Subepithelial autoimmune blistering disease targeting hemidesmosomes' },
                { word: 'TZANCK', clue: 'Rounded degenerate epithelial cell with hyperchromatic nucleus seen in pemphigus' },
                { word: 'NIKOLSKY', clue: 'Clinical sign where firm lateral sliding pressure dislodges the epidermis' },
                { word: 'DESMOGLEIN', clue: 'Desmosomal cadherin protein targeted by IgG autoantibodies in pemphigus' },
                { word: 'BULLA', clue: 'Elevated fluid-filled mucosal blister larger than 5 millimeters in diameter' },
                { word: 'VESICLE', clue: 'Small fluid-filled mucosal blister less than 5 millimeters in diameter' },
                { word: 'HEMIDESMOSOME', clue: 'Cellular junction anchoring basal epithelial cells to the basal lamina' },
                { word: 'IMMUNOFLUORESCENCE', clue: 'Diagnostic antibody detection technique showing green fluorescent patterns' },
              ]
            }
          }
        ]
      },
      {
        id: 'ii_s2',
        title: 'Microbial & Deep Fungal Infections',
        icon: '🦠',
        missions: [
          {
            id: 'ii_m4',
            title: 'Microbial Pathology Spectrum',
            subtitle: 'Candidiasis, HSV, Actinomycosis, Tuberculosis, and Syphilis',
            stageTitle: 'Microbial & Deep Fungal Infections',
            gameType: 'matching',
            pairs: [
              { image: 'PAS-positive branching pseudohyphae and blastospores invading parakeratin layer', label: 'Oral Candidiasis (Thrush)' },
              { image: 'Multinucleated epithelial giant cells with nuclear molding & Lipschütz inclusion bodies (Cowdry A)', label: 'Herpes Simplex Virus (HSV)' },
              { image: 'Sulfur granules composed of radiating filamentous bacterial colonies with clubbed ends', label: 'Actinomycosis' },
              { image: 'Caseating granulomas with central amorphous necrosis, Langhans giant cells, & epithelioid histiocytes', label: 'Oral Tuberculosis' },
              { image: 'Obliterative endarteritis with perivascular cuffing of plasma cells around small arterioles', label: 'Syphilis (Treponema pallidum)' },
            ]
          },
          {
            id: 'ii_m5',
            title: 'Granulomas & Pseudohyphae Histology',
            subtitle: 'Pathognomonic microscopic signs of oral infections',
            stageTitle: 'Microbial & Deep Fungal Infections',
            gameType: 'jigsaw',
            puzzleData: {
              imageDesc: 'Tuberculosis granuloma with Langhans giant cells and central caseous necrosis',
              gridSize: 3,
              labels: [
                'Caseating Amorphous Eosinophilic Necrosis',
                'Horseshoe-arranged Langhans Giant Cells',
                'Epithelioid Histiocytes Granuloma Rim',
                'Branching PAS-positive Candida Hyphae',
                'Microabscess Neutrophil Infiltrates in Keratin',
                'Sulfur Granules with Radiating Filaments',
                'Multinucleated Herpetic Viral Cells',
                'Cowdry A Intranuclear Viral Inclusions',
                'Perivascular Plasma Cell Infiltrates'
              ]
            }
          },
          {
            id: 'ii_m6',
            title: 'Infectious Pathology Terminology',
            subtitle: 'Microbiology & tissue terms from Neville Ch. 5 & 6',
            stageTitle: 'Microbial & Deep Fungal Infections',
            gameType: 'crossword',
            puzzleData: {
              words: [
                { word: 'CANDIDIASIS', clue: 'Most common fungal infection of the oral cavity caused by Candida albicans' },
                { word: 'GRANULOMA', clue: 'Focal collection of epithelioid macrophages surrounded by lymphocytes' },
                { word: 'CASEATION', clue: 'Cheese-like tissue necrosis characteristic of Mycobacterium tuberculosis' },
                { word: 'LANGHANS', clue: 'Horseshoe-shaped multinucleated giant cell diagnostic in tuberculosis' },
                { word: 'ACTINOMYCES', clue: 'Gram-positive anaerobic filamentous bacterium causing lumpy jaw' },
                { word: 'TREPONEMA', clue: 'Spirochete bacterium species responsible for primary chancre and syphilis' },
                { word: 'PSEUDOHYPHAE', clue: 'Chains of elongated yeast buds formed during invasive candidal infection' },
                { word: 'CHANCRE', clue: 'Painless indurated ulcer characteristic of primary syphilis infection' },
                { word: 'GUMMA', clue: 'Destructive granulomatous lesion of tertiary syphilis destroying the palate' },
                { word: 'HERPESVIRUS', clue: 'Double-stranded DNA virus family causing recurrent fever blisters & shingles' },
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: 'soft_tissue_hematologic',
    title: 'Soft Tissue & Hematologic Neoplasms',
    icon: '🩸',
    description: 'Schwannoma, Neurofibroma, Pyogenic Granuloma, Lymphoma, Multiple Myeloma, & Langerhans Histiocytosis',
    textbookRef: "Neville Ch. 12 & 13 — Soft Tissue & Hematologic Diseases",
    accentColor: 'hsl(280, 75%, 55%)',
    stages: [
      {
        id: 'st_s1',
        title: 'Benign Soft Tissue & Neural Tumors',
        icon: '🔬',
        missions: [
          {
            id: 'st_m1',
            title: 'Mesenchymal & Neural Proliferations',
            subtitle: 'Fibroma, Pyogenic Granuloma, Schwannoma, and Neurofibroma',
            stageTitle: 'Benign Soft Tissue & Neural Tumors',
            gameType: 'matching',
            pairs: [
              { image: 'Dense nodular mass of collagenized fibrous connective tissue covered by stratified squamous epithelium', label: 'Irritation Fibroma' },
              { image: 'Lobular proliferation of capillary blood vessels with inflamed edematous stroma (pregnancy tumor)', label: 'Pyogenic Granuloma' },
              { image: 'Antoni A palisaded spindle cells with Verocay bodies & loose hypocellular Antoni B tissue', label: 'Schwannoma (Neurilemoma)' },
              { image: 'Wavy comma-shaped spindle Schwann cells with wire-like collagen fibers (NF1 associated)', label: 'Neurofibroma' },
              { image: 'Large polygonal cells packed with eosinophilic granules strongly S-100 positive with pseudoepitheliomatous hyperplasia', label: 'Granular Cell Tumor (Tongue)' },
            ]
          },
          {
            id: 'st_m2',
            title: 'Verocay Bodies & Granular Cell Histology',
            subtitle: 'Microscopic architecture of Schwannoma and granular cell tumors',
            stageTitle: 'Benign Soft Tissue & Neural Tumors',
            gameType: 'jigsaw',
            puzzleData: {
              imageDesc: 'Schwannoma showing Antoni A palisading nuclei around Verocay bodies',
              gridSize: 3,
              labels: [
                'Antoni A Densely Packed Spindle Schwann Cells',
                'Verocay Bodies (Palisaded Acellular Zones)',
                'Antoni B Loose Hypocellular Myxoid Tissue',
                'S-100 Strongly Positive Cytoplasmic Staining',
                'Pseudoepitheliomatous Hyperplasia Mimic',
                'Granular Lysosomal Cytoplasmic Inclusions',
                'Lobular Capillary Angiomatous Arrays',
                'Mast Cells in Neurofibroma Stroma',
                'Surrounding True Epineural Capsule'
              ]
            }
          },
          {
            id: 'st_m3',
            title: 'Soft Tissue Pathology Terminology',
            subtitle: 'Mesenchymal terms from Neville Ch. 12',
            stageTitle: 'Benign Soft Tissue & Neural Tumors',
            gameType: 'crossword',
            puzzleData: {
              words: [
                { word: 'SCHWANNOMA', clue: 'Benign encapsulated neural sheath neoplasm with Antoni A and B regions' },
                { word: 'VEROCAY', clue: 'Eponym for palisaded nucleus-free eosinophilic zones in Schwannoma' },
                { word: 'NEUROFIBROMA', clue: 'Unencapsulated nerve sheath tumor with comma-shaped wavy nuclei' },
                { word: 'FIBROMA', clue: 'Most common reactive mucosal growth caused by chronic biting trauma' },
                { word: 'LIPOMA', clue: 'Benign tumor of mature adipocytes with yellow clinical appearance' },
                { word: 'HEMANGIOMA', clue: 'Benign vascular proliferation of endothelial-lined blood vessels' },
                { word: 'LYMPHANGIOMA', clue: 'Benign lymphatic vessel proliferation creating pebble frog-egg surface on tongue' },
                { word: 'LEIOMYOMA', clue: 'Benign smooth muscle neoplasm originating in blood vessel tunica media' },
                { word: 'RHABDOMYOMA', clue: 'Extremely rare benign neoplasm showing skeletal muscle differentiation' },
                { word: 'NEUROFIBROMATOSIS', clue: 'Recklinghausen disease characterized by café-au-lait spots and Lisch nodules' },
              ]
            }
          }
        ]
      },
      {
        id: 'st_s2',
        title: 'Hematologic & Lymphoreticular Malignancies',
        icon: '⚠️',
        missions: [
          {
            id: 'st_m4',
            title: 'Lymphomas & Plasma Cell Neoplasms',
            subtitle: 'Non-Hodgkin, Burkitt Lymphoma, Multiple Myeloma, and LCH',
            stageTitle: 'Hematologic Malignancies',
            gameType: 'matching',
            pairs: [
              { image: 'Starry-sky pattern of tingible body macrophages amid high-grade neoplastic B-lymphocytes', label: 'Burkitt Lymphoma (EBV / MYC translocation)' },
              { image: 'Monoclonal sheets of atypical plasma cells with clock-face chromatin & Bence Jones proteinuria', label: 'Multiple Myeloma' },
              { image: 'Punched-out radiolucent skull lesions with Birbeck tennis-racket pentalaminar granules on EM', label: 'Langerhans Cell Histiocytosis' },
              { image: 'Malignant vascular neoplasm driven by HHV-8 causing purple mucosal plaques in HIV patients', label: 'Kaposi Sarcoma' },
              { image: 'Large binucleated Reed-Sternberg cells with owl-eye nucleoli in polymorphous background', label: 'Hodgkin Lymphoma' },
            ]
          },
          {
            id: 'st_m5',
            title: 'Starry-Sky & Plasmacytoma Histology',
            subtitle: 'Microscopic morphology of hematologic oral lesions',
            stageTitle: 'Hematologic Malignancies',
            gameType: 'jigsaw',
            puzzleData: {
              imageDesc: 'Burkitt lymphoma starry sky pattern with tingible body macrophages',
              gridSize: 3,
              labels: [
                'Starry Sky Pattern (Tingible Macrophages)',
                'Monomorphic Sheet of Intermediate B-Lymphoblasts',
                'Atypical Plasma Cells with Eccentric Nuclei',
                'Clock-Face (Cartwheel) Chromatin Pattern',
                'Russell Bodies (Immunoglobulin Distended Rough ER)',
                'Birbeck Granules (Tennis Racket Inclusions)',
                'CD1a & Langerin Positive Histiocytes',
                'Slit-like Vascular Channels with Extravasated RBCs',
                'Punched-out Osteolytic Bone Margin'
              ]
            }
          },
          {
            id: 'st_m6',
            title: 'Hematologic Oncology Terminology',
            subtitle: 'Lymphoid & myeloma diagnostic terms from Neville Ch. 13',
            stageTitle: 'Hematologic Malignancies',
            gameType: 'crossword',
            puzzleData: {
              words: [
                { word: 'LYMPHOMA', clue: 'Malignant neoplasm of lymphoid cells dividing into Hodgkin and Non-Hodgkin' },
                { word: 'BURKITT', clue: 'High-grade B-cell lymphoma with t(8;14) MYC translocation and starry-sky look' },
                { word: 'MYELOMA', clue: 'Multiple ______: malignant monoclonal proliferation of plasma cells in marrow' },
                { word: 'BIRBECK', clue: 'Tennis-racket shaped cytoplasmic granules pathognomonic of Langerhans cells' },
                { word: 'HISTIOCYTOSIS', clue: 'Langerhans cell ______: clonal proliferation of CD1a-positive Langerhans cells' },
                { word: 'RUSSELL', clue: '______ bodies: eosinophilic globular inclusions of immunoglobulin in plasma cells' },
                { word: 'BENCEJONES', clue: 'Monoclonal free light chain protein detected in urine of myeloma patients' },
                { word: 'KAPOSI', clue: 'HHV-8 associated vascular endothelial malignancy presenting with oral purpuric spots' },
                { word: 'LEUKEMIA', clue: 'Malignancy of hematopoietic stem cells frequently presenting with boggy gingival enlargement' },
                { word: 'PLASMACYTOMA', clue: 'Solitary discrete monoclonal plasma cell tumor in soft tissue or single bone site' },
              ]
            }
          }
        ]
      }
    ]
  }
];

// Helper to get all missions flattened
export function getAllMissions() {
  const missions = [];
  TOPICS.forEach(topic => {
    topic.stages.forEach(stage => {
      stage.missions.forEach(mission => {
        missions.push({
          ...mission,
          topicId: topic.id,
          topicTitle: topic.title,
          stageId: stage.id,
          stageTitle: stage.title,
        });
      });
    });
  });
  return missions;
}

// Helper to get missions for a specific topic
export function getTopicMissions(topicId) {
  const topic = TOPICS.find(t => t.id === topicId);
  if (!topic) return [];
  const missions = [];
  topic.stages.forEach(stage => {
    stage.missions.forEach(mission => {
      missions.push({
        ...mission,
        topicId: topic.id,
        topicTitle: topic.title,
        stageId: stage.id,
        stageTitle: stage.title,
      });
    });
  });
  return missions;
}

// Helper to find a specific mission (supports getMission(missionId) or getMission(topicId, missionId))
export function getMission(arg1, arg2) {
  let topicId = arg2 ? arg1 : null;
  let missionId = arg2 ? arg2 : arg1;

  if (topicId) {
    const topic = TOPICS.find(t => t.id === topicId);
    if (!topic) return null;
    for (const stage of topic.stages) {
      const mission = stage.missions.find(m => m.id === missionId);
      if (mission) {
        return {
          mission: mergeCustomMissionData(mission),
          stage,
          topic,
        };
      }
    }
  }

  // Fallback: search all topics for the missionId
  for (const topic of TOPICS) {
    for (const stage of topic.stages) {
      const mission = stage.missions.find(m => m.id === missionId);
      if (mission) {
        return {
          mission: mergeCustomMissionData(mission),
          stage,
          topic,
        };
      }
    }
  }

  return null;
}

function mergeCustomMissionData(defaultMission) {
  try {
    const custom = getCustomData();
    const customMission = custom.missions?.[defaultMission.id];
    if (!customMission) return defaultMission;

    const merged = { ...defaultMission };

    // Merge custom pairs for matching
    if (customMission.pairs?.length) {
      merged.pairs = [...(defaultMission.pairs || []), ...customMission.pairs];
    }

    // Merge custom crossword words
    if (customMission.crosswordWords?.length) {
      merged.puzzleData = {
        ...defaultMission.puzzleData,
        words: [...(defaultMission.puzzleData?.words || []), ...customMission.crosswordWords],
      };
    }

    // Custom slide image for jigsaw
    if (customMission.slideImage) {
      merged.puzzleData = {
        ...defaultMission.puzzleData,
        slideImage: customMission.slideImage,
      };
    }

    return merged;
  } catch (e) {
    return defaultMission;
  }
}

// Helper to get a topic by ID
export function getTopicById(topicId) {
  return TOPICS.find(t => t.id === topicId) || null;
}
