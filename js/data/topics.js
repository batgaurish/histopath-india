// ============================================================
// HistoPath India — Topic Definitions
// 6 topics from Shafer's Textbook of Oral Pathology
// Each topic: 2 stages × 3 missions = 6 missions per topic
// ============================================================

const TOPICS = [
  {
    id: 'oral_mucosa',
    title: 'Oral Mucosa',
    icon: '🔬',
    description: 'Microscopic structure of lining, masticatory, and specialized mucosa',
    shaferRef: "Shafer's Ch. 12 — Oral Mucous Membrane",
    accentColor: 'hsl(330, 70%, 55%)',
    stages: [
      {
        id: 'om_s1',
        title: 'Epithelial Organization',
        icon: '🔬',
        missions: [
          {
            id: 'om_m1',
            title: 'Types of Oral Mucosa',
            subtitle: 'Lining vs Masticatory vs Specialized',
            gameType: 'matching',
            puzzleData: {
              pairs: [
                { image: 'Keratinized stratified squamous epithelium', label: 'Masticatory Mucosa' },
                { image: 'Non-keratinized stratified squamous epithelium', label: 'Lining Mucosa' },
                { image: 'Dorsum of tongue with papillae', label: 'Specialized Mucosa' },
                { image: 'Hard palate with rugae', label: 'Masticatory — Hard Palate' },
                { image: 'Floor of mouth, thin epithelium', label: 'Lining — Floor of Mouth' },
              ]
            }
          },
          {
            id: 'om_m2',
            title: 'Epithelial Layers',
            subtitle: 'Stratum basale to stratum corneum',
            gameType: 'jigsaw',
            puzzleData: {
              imageDesc: 'Stratified squamous epithelium showing distinct layers',
              gridSize: 3,
              labels: ['Stratum Basale', 'Stratum Spinosum', 'Stratum Granulosum', 'Stratum Corneum']
            }
          },
          {
            id: 'om_m3',
            title: 'Keratinocyte Maturation',
            subtitle: 'Cell changes from basal to superficial',
            gameType: 'crossword',
            puzzleData: {
              words: [
                { word: 'KERATIN', clue: 'Fibrous protein that strengthens the cornified layer' },
                { word: 'TONOFILAMENT', clue: 'Intermediate filaments in epithelial cells (cytokeratin bundles)' },
                { word: 'DESMOSOME', clue: 'Cell junction giving the "prickle" appearance in stratum spinosum' },
                { word: 'MELANOCYTE', clue: 'Dendritic cell in basal layer producing pigment' },
                { word: 'MERKEL', clue: '_____ cell: tactile mechanoreceptor found in basal layer' },
                { word: 'LANGERHANS', clue: 'Dendritic antigen-presenting cell of the epithelium' },
              ]
            }
          },
        ]
      },
      {
        id: 'om_s2',
        title: 'Connective Tissue & Clinical',
        icon: '🧬',
        missions: [
          {
            id: 'om_m4',
            title: 'Lamina Propria',
            subtitle: 'Papillary and reticular layers',
            gameType: 'differences',
            puzzleData: {
              imageDesc: 'Lamina propria showing collagen fibers, blood vessels, and cellular components',
              differences: ['Extra fibroblast', 'Missing blood vessel', 'Changed collagen density', 'Added inflammatory cell', 'Different papilla shape']
            }
          },
          {
            id: 'om_m5',
            title: 'Submucosa & Glands',
            subtitle: 'Minor salivary glands and adipose tissue',
            gameType: 'matching',
            puzzleData: {
              pairs: [
                { image: 'Dense irregular connective tissue', label: 'Lamina Propria' },
                { image: 'Loose connective tissue with glands', label: 'Submucosa' },
                { image: 'Adipose tissue aggregates', label: 'Fat Pad (Submucosa)' },
                { image: 'Mixed serous-mucous acini', label: 'Minor Salivary Gland' },
                { image: 'Skeletal muscle fibers beneath mucosa', label: 'Buccal Mucosa Base' },
              ]
            }
          },
          {
            id: 'om_m6',
            title: 'Clinical Correlations',
            subtitle: 'Fordyce granules, leukoplakia, and more',
            gameType: 'crossword',
            puzzleData: {
              words: [
                { word: 'FORDYCE', clue: '_____ granules: ectopic sebaceous glands seen as yellow spots on buccal mucosa' },
                { word: 'LEUKOPLAKIA', clue: 'White patch that cannot be scraped off and is not attributable to another disease' },
                { word: 'ORTHOKERATIN', clue: 'Type of keratin WITHOUT nuclei in surface cells' },
                { word: 'PARAKERATIN', clue: 'Type of keratin WITH retained pyknotic nuclei' },
                { word: 'RETE', clue: '_____ pegs: epithelial projections into the lamina propria' },
              ]
            }
          },
        ]
      },
    ]
  },

  {
    id: 'tooth_dev',
    title: 'Tooth Development',
    icon: '🦷',
    description: 'Odontogenesis from bud stage through root formation',
    shaferRef: "Shafer's Ch. 1 — Development & Growth of Teeth",
    accentColor: 'hsl(200, 70%, 55%)',
    stages: [
      {
        id: 'td_s1',
        title: 'Initiation & Morphogenesis',
        icon: '🌱',
        missions: [
          {
            id: 'td_m1',
            title: 'Bud, Cap & Bell Stages',
            subtitle: 'Progressive stages of tooth germ development',
            gameType: 'matching',
            puzzleData: {
              pairs: [
                { image: 'Simple epithelial thickening into mesenchyme', label: 'Bud Stage' },
                { image: 'Enamel organ with concavity forming', label: 'Cap Stage' },
                { image: 'Advanced bell with 4 distinct layers', label: 'Bell Stage' },
                { image: 'Dental papilla condensation', label: 'Dental Papilla (Cap)' },
                { image: 'Inner and outer enamel epithelium visible', label: 'Enamel Organ Layers' },
              ]
            }
          },
          {
            id: 'td_m2',
            title: 'Enamel Organ Layers',
            subtitle: 'OEE, IEE, stellate reticulum, stratum intermedium',
            gameType: 'jigsaw',
            puzzleData: {
              imageDesc: 'Cross-section of bell stage showing all four layers of enamel organ',
              gridSize: 3,
              labels: ['Outer Enamel Epithelium', 'Stellate Reticulum', 'Stratum Intermedium', 'Inner Enamel Epithelium']
            }
          },
          {
            id: 'td_m3',
            title: 'Dental Lamina & Successional Teeth',
            subtitle: 'Primary and permanent tooth initiation',
            gameType: 'crossword',
            puzzleData: {
              words: [
                { word: 'LAMINA', clue: 'Dental _____: horseshoe-shaped epithelial band initiating tooth development' },
                { word: 'SUCCESSIONAL', clue: 'Type of lamina that gives rise to permanent successor teeth' },
                { word: 'VESTIBULAR', clue: '_____ lamina: forms the oral vestibule' },
                { word: 'PAPILLA', clue: 'Dental _____: ectomesenchyme that forms dentin and pulp' },
                { word: 'FOLLICLE', clue: 'Dental _____: sac that forms cementum, PDL, and alveolar bone' },
                { word: 'GUBERNACULUM', clue: '_____ cord: remnant of dental lamina guiding tooth eruption' },
              ]
            }
          },
        ]
      },
      {
        id: 'td_s2',
        title: 'Histodifferentiation',
        icon: '⚗️',
        missions: [
          {
            id: 'td_m4',
            title: 'Amelogenesis',
            subtitle: 'Stages of enamel formation by ameloblasts',
            gameType: 'differences',
            puzzleData: {
              imageDesc: 'Ameloblasts in different stages — secretory, transition, maturation',
              differences: ['Tomes process present vs absent', 'Ruffled border vs smooth', 'Changed cell polarity', 'Different granule density', 'Altered enamel matrix thickness']
            }
          },
          {
            id: 'td_m5',
            title: 'Dentinogenesis',
            subtitle: 'Odontoblast differentiation and dentin matrix',
            gameType: 'matching',
            puzzleData: {
              pairs: [
                { image: 'Columnar cells at pulp-dentin junction', label: 'Odontoblasts' },
                { image: 'Unmineralized matrix adjacent to odontoblasts', label: 'Predentin' },
                { image: 'Mineralized tubular structure', label: 'Dentin' },
                { image: 'First layer of dentin formed', label: 'Mantle Dentin' },
                { image: 'Dentin formed after root completion', label: 'Secondary Dentin' },
              ]
            }
          },
          {
            id: 'td_m6',
            title: 'Root Formation & HERS',
            subtitle: "Hertwig's epithelial root sheath and cementogenesis",
            gameType: 'crossword',
            puzzleData: {
              words: [
                { word: 'HERTWIG', clue: "_____ 's root sheath: epithelial structure that maps the root shape" },
                { word: 'CEMENTOBLAST', clue: 'Cell derived from dental follicle that forms cementum' },
                { word: 'MALASSEZ', clue: 'Epithelial cell rests of _____: remnants of HERS in PDL' },
                { word: 'APICAL', clue: '_____ foramen: opening at root tip for neurovascular entry' },
                { word: 'DIAPHRAGM', clue: 'Epithelial _____ at the growing root edge' },
              ]
            }
          },
        ]
      },
    ]
  },

  {
    id: 'tooth_struct',
    title: 'Tooth Structure',
    icon: '🔎',
    description: 'Histology of enamel, dentin, pulp, and cementum',
    shaferRef: "Shafer's Ch. 2–5 — Enamel, Dentin, Pulp, Cementum",
    accentColor: 'hsl(170, 70%, 45%)',
    stages: [
      {
        id: 'ts_s1',
        title: 'Enamel & Dentin',
        icon: '💎',
        missions: [
          {
            id: 'ts_m1',
            title: 'Enamel Prism Structure',
            subtitle: 'Rods, interrod, Hunter-Schreger bands',
            gameType: 'jigsaw',
            puzzleData: {
              imageDesc: 'Ground section of enamel showing prism arrangement and Hunter-Schreger bands',
              gridSize: 4,
              labels: ['Enamel Rods', 'Interrod Enamel', 'Hunter-Schreger Bands', 'Striae of Retzius']
            }
          },
          {
            id: 'ts_m2',
            title: 'Incremental Lines of Enamel',
            subtitle: 'Striae of Retzius, perikymata, neonatal line',
            gameType: 'matching',
            puzzleData: {
              pairs: [
                { image: 'Brown lines in longitudinal section', label: 'Striae of Retzius' },
                { image: 'Surface manifestation of striae', label: 'Perikymata' },
                { image: 'Accentuated line marking birth', label: 'Neonatal Line' },
                { image: 'Alternating light and dark bands', label: 'Hunter-Schreger Bands' },
                { image: 'Prismless enamel at surface', label: 'Final Aprismatic Enamel' },
              ]
            }
          },
          {
            id: 'ts_m3',
            title: 'Dentin Types & Tubules',
            subtitle: 'Primary, secondary, tertiary dentin; dentinal tubules',
            gameType: 'crossword',
            puzzleData: {
              words: [
                { word: 'TUBULE', clue: 'Dentinal _____: canal containing odontoblast process' },
                { word: 'PERITUBULAR', clue: 'Highly mineralized dentin lining each tubule' },
                { word: 'INTERTUBULAR', clue: 'Less mineralized dentin between tubules' },
                { word: 'INTERGLOBULAR', clue: '_____ dentin: areas of unmineralized matrix between calcospherites' },
                { word: 'TOMES', clue: "_____ granular layer: found in root dentin" },
                { word: 'SCLEROTIC', clue: 'Transparent/_____ dentin: tubules filled with mineral as defense' },
              ]
            }
          },
        ]
      },
      {
        id: 'ts_s2',
        title: 'Pulp & Cementum',
        icon: '❤️',
        missions: [
          {
            id: 'ts_m4',
            title: 'Dental Pulp Histology',
            subtitle: 'Zones, cells, vasculature, innervation',
            gameType: 'differences',
            puzzleData: {
              imageDesc: 'Dental pulp showing odontoblast layer, cell-free zone, cell-rich zone, and core',
              differences: ['Extra blood vessel', 'Missing odontoblast layer', 'Different nerve bundle', 'Added calcification', 'Changed cell density']
            }
          },
          {
            id: 'ts_m5',
            title: 'Cementum Types',
            subtitle: 'Acellular and cellular cementum',
            gameType: 'matching',
            puzzleData: {
              pairs: [
                { image: 'Thin layer covering cervical root', label: 'Acellular Extrinsic Fiber Cementum' },
                { image: 'Thick layer with lacunae at apex', label: 'Cellular Intrinsic Fiber Cementum' },
                { image: 'Alternating layers of cellular and acellular', label: 'Mixed Stratified Cementum' },
                { image: 'Incremental lines in cementum', label: 'Lines of Salter' },
                { image: 'Cementum overlapping enamel', label: 'CEJ Pattern Type 1 (60%)' },
              ]
            }
          },
          {
            id: 'ts_m6',
            title: 'DEJ & CEJ',
            subtitle: 'Dentin-enamel junction and cemento-enamel junction patterns',
            gameType: 'crossword',
            puzzleData: {
              words: [
                { word: 'SCALLOPED', clue: 'Shape of the DEJ under microscopy — increases retention' },
                { word: 'SPINDLE', clue: 'Enamel _____: trapped odontoblast processes that crossed DEJ' },
                { word: 'TUFT', clue: 'Enamel _____: hypomineralized ribbon-like structures at DEJ' },
                { word: 'LAMELLA', clue: 'Enamel _____: thin leaf-like fault extending from surface to DEJ' },
                { word: 'OVERLAP', clue: 'Most common CEJ pattern (60%) — cementum _____ enamel' },
              ]
            }
          },
        ]
      },
    ]
  },

  {
    id: 'salivary',
    title: 'Salivary Glands',
    icon: '💧',
    description: 'Major and minor salivary gland histology and duct systems',
    shaferRef: "Shafer's Ch. 7 — Salivary Glands",
    accentColor: 'hsl(210, 70%, 55%)',
    stages: [
      {
        id: 'sg_s1',
        title: 'Acinar & Duct Structure',
        icon: '🔵',
        missions: [
          {
            id: 'sg_m1',
            title: 'Serous vs Mucous Acini',
            subtitle: 'Cell morphology and secretion types',
            gameType: 'differences',
            puzzleData: {
              imageDesc: 'Side-by-side serous and mucous acini with distinct staining patterns',
              differences: ['Basal nuclei position', 'Zymogen granule presence', 'Mucin droplet clarity', 'Lumen size difference', 'Myoepithelial cell location']
            }
          },
          {
            id: 'sg_m2',
            title: 'Duct System',
            subtitle: 'Intercalated, striated, and excretory ducts',
            gameType: 'matching',
            puzzleData: {
              pairs: [
                { image: 'Small duct lined by cuboidal cells', label: 'Intercalated Duct' },
                { image: 'Columnar cells with basal striations', label: 'Striated Duct' },
                { image: 'Pseudostratified/stratified columnar lining', label: 'Excretory Duct' },
                { image: 'Star-shaped cells surrounding acini', label: 'Myoepithelial Cells' },
                { image: 'Mixed acinus with serous demilune', label: 'Serous Demilune' },
              ]
            }
          },
          {
            id: 'sg_m3',
            title: 'Salivary Secretion',
            subtitle: 'Composition and ion transport',
            gameType: 'crossword',
            puzzleData: {
              words: [
                { word: 'AMYLASE', clue: 'Enzyme in serous secretion that digests starch' },
                { word: 'MUCIN', clue: 'Glycoprotein in mucous secretion that lubricates' },
                { word: 'LYSOZYME', clue: 'Antibacterial enzyme in saliva' },
                { word: 'DEMILUNE', clue: 'Serous _____: crescent-shaped serous cap on mucous acinus' },
                { word: 'MYOEPITHELIAL', clue: '_____ cells: contractile cells that squeeze secretion from acini' },
              ]
            }
          },
        ]
      },
      {
        id: 'sg_s2',
        title: 'Major & Minor Glands',
        icon: '🏥',
        missions: [
          {
            id: 'sg_m4',
            title: 'Parotid Gland',
            subtitle: 'Purely serous gland with long striated ducts',
            gameType: 'jigsaw',
            puzzleData: {
              imageDesc: 'Parotid gland section showing serous acini, long striated ducts, and adipose tissue',
              gridSize: 3,
              labels: ['Serous Acini', 'Striated Ducts', 'Adipose Tissue', 'Interlobular Septae']
            }
          },
          {
            id: 'sg_m5',
            title: 'Submandibular & Sublingual',
            subtitle: 'Mixed and predominantly mucous glands',
            gameType: 'matching',
            puzzleData: {
              pairs: [
                { image: 'Mixed gland, predominantly serous', label: 'Submandibular Gland' },
                { image: 'Mixed gland, predominantly mucous', label: 'Sublingual Gland' },
                { image: 'Serous acini with dark zymogen granules', label: 'Parotid Acini' },
                { image: 'Pale mucous acini with flat basal nuclei', label: 'Mucous Acini (Sublingual)' },
                { image: 'Demilune capping mucous tubule', label: 'Serous Demilune (SMG)' },
              ]
            }
          },
          {
            id: 'sg_m6',
            title: 'Minor Salivary Glands',
            subtitle: 'Von Ebner, labial, buccal, palatal glands',
            gameType: 'crossword',
            puzzleData: {
              words: [
                { word: 'EBNER', clue: 'Von _____ glands: purely serous glands near circumvallate papillae' },
                { word: 'LABIAL', clue: '_____ glands: mixed minor glands in lips (biopsy site for Sjögren)' },
                { word: 'PALATAL', clue: '_____ glands: purely mucous glands on posterior hard palate' },
                { word: 'BLANDIN', clue: '_____ -Nuhn glands: mixed glands at tip of tongue' },
                { word: 'STENSEN', clue: "_____ 's duct: parotid excretory duct opening at buccal mucosa" },
              ]
            }
          },
        ]
      },
    ]
  },

  {
    id: 'periodontium',
    title: 'Periodontium',
    icon: '🦴',
    description: 'PDL, alveolar bone, gingiva, and junctional epithelium',
    shaferRef: "Shafer's Ch. 8–10 — Periodontium",
    accentColor: 'hsl(25, 70%, 55%)',
    stages: [
      {
        id: 'pd_s1',
        title: 'PDL & Alveolar Bone',
        icon: '🔗',
        missions: [
          {
            id: 'pd_m1',
            title: 'PDL Fiber Groups',
            subtitle: 'Principal fiber groups and their functions',
            gameType: 'matching',
            puzzleData: {
              pairs: [
                { image: 'Fibers from cementum running coronally to crest', label: 'Alveolar Crest Fibers' },
                { image: 'Fibers running horizontally between teeth', label: 'Horizontal Fibers' },
                { image: 'Fibers running obliquely — most numerous', label: 'Oblique Fibers' },
                { image: 'Fibers at root apex radiating outward', label: 'Apical Fibers' },
                { image: 'Fibers running between adjacent tooth roots', label: 'Interradicular Fibers' },
              ]
            }
          },
          {
            id: 'pd_m2',
            title: 'Alveolar Bone',
            subtitle: 'Bundle bone, cribriform plate, cancellous bone',
            gameType: 'jigsaw',
            puzzleData: {
              imageDesc: 'Alveolar bone cross-section showing cribriform plate, cancellous bone, and cortical plates',
              gridSize: 3,
              labels: ['Cribriform Plate (Bundle Bone)', 'Cancellous Bone', 'Buccal Cortical Plate', 'PDL Space']
            }
          },
          {
            id: 'pd_m3',
            title: 'PDL Cells & Ground Substance',
            subtitle: 'Fibroblasts, cementoblasts, osteoblasts',
            gameType: 'crossword',
            puzzleData: {
              words: [
                { word: 'FIBROBLAST', clue: 'Most abundant cell in PDL responsible for collagen turnover' },
                { word: 'SHARPEY', clue: "_____ 's fibers: embedded ends of principal fibers in bone/cementum" },
                { word: 'OXYTALAN', clue: '_____ fibers: elastic-like fibers unique to PDL running parallel to root' },
                { word: 'OSTEOCLAST', clue: 'Multinucleated cell that resorbs alveolar bone during tooth movement' },
                { word: 'INTERMEDIATE', clue: '_____ plexus: region where PDL fibers interweave mid-ligament' },
              ]
            }
          },
        ]
      },
      {
        id: 'pd_s2',
        title: 'Gingival Histology',
        icon: '🩸',
        missions: [
          {
            id: 'pd_m4',
            title: 'Gingival Epithelium',
            subtitle: 'Oral epithelium, sulcular, and junctional',
            gameType: 'differences',
            puzzleData: {
              imageDesc: 'Three types of gingival epithelium around a tooth — oral, sulcular, and junctional',
              differences: ['Keratinization presence', 'Rete peg length', 'Epithelial thickness', 'Cellular composition change', 'Basement membrane detail']
            }
          },
          {
            id: 'pd_m5',
            title: 'Junctional Epithelium',
            subtitle: 'Epithelial attachment and biological width',
            gameType: 'matching',
            puzzleData: {
              pairs: [
                { image: 'Non-keratinized epithelium attached to tooth', label: 'Junctional Epithelium' },
                { image: 'Keratinized epithelium facing oral cavity', label: 'Oral Epithelium' },
                { image: 'Non-keratinized lining of gingival sulcus', label: 'Sulcular Epithelium' },
                { image: 'Hemidesmosomes attaching to tooth surface', label: 'Epithelial Attachment' },
                { image: 'Distance from sulcus floor to bone crest', label: 'Biological Width' },
              ]
            }
          },
          {
            id: 'pd_m6',
            title: 'Gingival Connective Tissue',
            subtitle: 'Gingival fiber groups and components',
            gameType: 'crossword',
            puzzleData: {
              words: [
                { word: 'DENTOGINGIVAL', clue: '_____ fibers: from cementum to gingival lamina propria' },
                { word: 'CIRCULAR', clue: '_____ fibers: encircle the tooth within free gingiva' },
                { word: 'STIPPLING', clue: 'Orange peel texture on attached gingiva due to fiber attachments' },
                { word: 'TRANSSEPTAL', clue: '_____ fibers: connect cementum of adjacent teeth over alveolar crest' },
                { word: 'MUCOGINGIVAL', clue: '_____ junction: boundary between attached gingiva and alveolar mucosa' },
              ]
            }
          },
        ]
      },
    ]
  },

  {
    id: 'tmj_bone',
    title: 'TMJ & Bone',
    icon: '💀',
    description: 'TMJ histology, bone biology, and cartilage types',
    shaferRef: "Shafer's Ch. 11 — Bone, TMJ",
    accentColor: 'hsl(270, 60%, 55%)',
    stages: [
      {
        id: 'tb_s1',
        title: 'TMJ Structure',
        icon: '🔧',
        missions: [
          {
            id: 'tb_m1',
            title: 'TMJ Components',
            subtitle: 'Articular disc, condyle, fossa',
            gameType: 'matching',
            puzzleData: {
              pairs: [
                { image: 'Biconcave fibrocartilaginous structure', label: 'Articular Disc' },
                { image: 'Fibrocartilage-covered condylar head', label: 'Mandibular Condyle' },
                { image: 'Temporal bone concavity', label: 'Glenoid Fossa' },
                { image: 'Bony eminence anterior to fossa', label: 'Articular Eminence' },
                { image: 'Synovial membrane lining', label: 'Synovial Lining' },
              ]
            }
          },
          {
            id: 'tb_m2',
            title: 'Condylar Cartilage Layers',
            subtitle: 'Articular, proliferative, hypertrophic, and erosion zones',
            gameType: 'jigsaw',
            puzzleData: {
              imageDesc: 'Mandibular condyle showing fibrous, proliferative, hypertrophic, and erosion/ossification zones',
              gridSize: 3,
              labels: ['Fibrous Articular Zone', 'Proliferative Zone', 'Hypertrophic Zone', 'Erosion Zone']
            }
          },
          {
            id: 'tb_m3',
            title: 'TMJ Disc Histology',
            subtitle: 'Regions and fiber arrangement of articular disc',
            gameType: 'crossword',
            puzzleData: {
              words: [
                { word: 'BILAMINAR', clue: '_____ zone: posterior attachment of TMJ disc with vessels and nerves' },
                { word: 'COLLAGEN', clue: 'Predominant fiber type in articular disc (Type I)' },
                { word: 'AVASCULAR', clue: 'The central intermediate zone of disc is _____ (no blood vessels)' },
                { word: 'SYNOVIAL', clue: '_____ fluid: lubricant produced by synovial membrane' },
                { word: 'FIBROCARTILAGE', clue: 'Type of cartilage covering TMJ surfaces (not hyaline)' },
              ]
            }
          },
        ]
      },
      {
        id: 'tb_s2',
        title: 'Bone Biology',
        icon: '🏗️',
        missions: [
          {
            id: 'tb_m4',
            title: 'Bone Cells',
            subtitle: 'Osteoblasts, osteocytes, osteoclasts',
            gameType: 'differences',
            puzzleData: {
              imageDesc: 'Bone section showing osteoblasts lining surface, osteocytes in lacunae, and osteoclasts in Howship lacunae',
              differences: ['Missing osteocyte in lacuna', 'Extra ruffled border on osteoclast', 'Changed osteoblast shape', 'Additional reversal line', 'Modified Howship lacuna']
            }
          },
          {
            id: 'tb_m5',
            title: 'Compact & Cancellous Bone',
            subtitle: 'Haversian systems and trabecular architecture',
            gameType: 'jigsaw',
            puzzleData: {
              imageDesc: 'Cross-section of compact bone showing Haversian systems, Volkmann canals, and lamellae',
              gridSize: 4,
              labels: ['Haversian Canal', 'Concentric Lamellae', 'Volkmann Canal', 'Interstitial Lamellae']
            }
          },
          {
            id: 'tb_m6',
            title: 'Bone Remodeling & Cartilage',
            subtitle: 'Remodeling cycle, hyaline, elastic, and fibrocartilage',
            gameType: 'crossword',
            puzzleData: {
              words: [
                { word: 'HOWSHIP', clue: "_____ 's lacuna: resorption bay created by osteoclast activity" },
                { word: 'HAVERSIAN', clue: '_____ system (osteon): structural unit of compact bone' },
                { word: 'REVERSAL', clue: '_____ line: cement line between old and new bone in remodeling' },
                { word: 'HYALINE', clue: '_____ cartilage: type found in trachea and nose, NOT in TMJ' },
                { word: 'WOVEN', clue: '_____ bone: immature bone with random collagen arrangement, first to form in healing' },
              ]
            }
          },
        ]
      },
    ]
  },
];

// Helper to find a topic by ID
function getTopicById(id) {
  return TOPICS.find(t => t.id === id) || null;
}

// Helper to find a specific mission
function getMission(topicId, missionId) {
  const topic = getTopicById(topicId);
  if (!topic) return null;
  for (const stage of topic.stages) {
    const mission = stage.missions.find(m => m.id === missionId);
    if (mission) return mission;
  }
  return null;
}

// Get all missions in order for a topic
function getTopicMissions(topicId) {
  const topic = getTopicById(topicId);
  if (!topic) return [];
  const missions = [];
  topic.stages.forEach(stage => {
    stage.missions.forEach(m => {
      missions.push({ ...m, stageId: stage.id, stageTitle: stage.title });
    });
  });
  return missions;
}

// Get mission index (0-based) within its topic
function getMissionIndex(topicId, missionId) {
  const missions = getTopicMissions(topicId);
  return missions.findIndex(m => m.id === missionId);
}

// Get next mission ID (or null if last)
function getNextMission(topicId, currentMissionId) {
  const missions = getTopicMissions(topicId);
  const idx = missions.findIndex(m => m.id === currentMissionId);
  if (idx < 0 || idx >= missions.length - 1) return null;
  return missions[idx + 1];
}
