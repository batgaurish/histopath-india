const CUSTOM_KEY = 'histopath_custom_content';

export function getCustomData() {
  try {
    const raw = localStorage.getItem(CUSTOM_KEY);
    return raw ? JSON.parse(raw) : { missions: {}, questions: {} };
  } catch (e) {
    return { missions: {}, questions: {} };
  }
}

export function saveCustomData(data) {
  try {
    localStorage.setItem(CUSTOM_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save custom content', e);
  }
}

export function addCustomQuestion(missionId, questionObj) {
  const data = getCustomData();
  if (!data.questions[missionId]) {
    data.questions[missionId] = [];
  }
  data.questions[missionId].push(questionObj);
  saveCustomData(data);
}

export function addCustomMissionPair(missionId, pairObj) {
  const data = getCustomData();
  if (!data.missions[missionId]) {
    data.missions[missionId] = { pairs: [], words: [], differences: [] };
  }
  if (!data.missions[missionId].pairs) data.missions[missionId].pairs = [];
  data.missions[missionId].pairs.push(pairObj);
  saveCustomData(data);
}

export function addCustomCrosswordWord(missionId, wordObj) {
  const data = getCustomData();
  if (!data.missions[missionId]) {
    data.missions[missionId] = { pairs: [], words: [], differences: [] };
  }
  if (!data.missions[missionId].words) data.missions[missionId].words = [];
  data.missions[missionId].words.push(wordObj);
  saveCustomData(data);
}

// Automated Document & File Parsers
export function parseTextDocumentToMCQs(text) {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const questions = [];

  let currentQ = null;

  lines.forEach(line => {
    if (line.match(/^(Q|Question|\d+[\.\)])\s*(.+)/i)) {
      if (currentQ && currentQ.q && currentQ.options.length >= 2) {
        questions.push(currentQ);
      }
      const match = line.match(/^(Q|Question|\d+[\.\)])\s*(.+)/i);
      currentQ = {
        q: match[2],
        options: [],
        correct: 0,
        explanation: 'Shafer\'s Pathology Reference',
      };
    } else if (line.match(/^([A-D])[\.\)]\s*(.+)/i) && currentQ) {
      const match = line.match(/^([A-D])[\.\)]\s*(.+)/i);
      currentQ.options.push(match[2]);
    } else if (line.match(/^(Answer|Ans|Correct):\s*([A-D]|\d+)/i) && currentQ) {
      const match = line.match(/^(Answer|Ans|Correct):\s*([A-D]|\d+)/i);
      const val = match[2].toUpperCase();
      if (['A', 'B', 'C', 'D'].includes(val)) {
        currentQ.correct = ['A', 'B', 'C', 'D'].indexOf(val);
      } else {
        currentQ.correct = parseInt(val, 10) - 1 || 0;
      }
    } else if (line.match(/^(Exp|Explanation):\s*(.+)/i) && currentQ) {
      const match = line.match(/^(Exp|Explanation):\s*(.+)/i);
      currentQ.explanation = match[2];
    }
  });

  if (currentQ && currentQ.q && currentQ.options.length >= 2) {
    questions.push(currentQ);
  }

  return questions;
}

export function parseCrosswordText(text) {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const words = [];

  lines.forEach(line => {
    // Expected format: WORD: Clue description
    const parts = line.split(/[:=\-]/);
    if (parts.length >= 2) {
      const word = parts[0].trim().toUpperCase().replace(/[^A-Z]/g, '');
      const clue = parts.slice(1).join(':').trim();
      if (word && clue) {
        words.push({ word, clue });
      }
    }
  });

  return words;
}
