import { createEffect, createMemo, createSignal, For, Index, Show } from 'solid-js';
import mammoth from 'mammoth';
import JSZip from 'jszip';
import './App.css';

<<<<<<< HEAD
export default function App() {
  // Multiple Characters with Tabs
  const [characters, setCharacters] = createSignal([
    {
      id: 1,
      name: 'Character 1',
      class: '',
      portrait: null,
      abilityScores: { STR: 10, DEX: 10, CON: 10, INT: 10, WIS: 10, CHA: 10 },
      features: '',
      skills: [{ id: 1, name: '', modifier: 0 }],
      skillIdCounter: 2,
      resources: [{ id: 1, name: '', current: 0, total: 0 }],
      resourceIdCounter: 2,
      actionButtons: [
        { id: 1, name: 'Move', active: false },
        { id: 2, name: 'Action', active: false },
        { id: 3, name: 'Bonus Action', active: false },
        { id: 4, name: 'Reaction', active: false }
      ],
      actionIdCounter: 5,
      spells: [{ id: 1, name: '', resource: '', actionEconomy: '' }],
      spellIdCounter: 2,
    },
    { id: 2, name: 'Character 2', class: '', portrait: null, abilityScores: { STR: 10, DEX: 10, CON: 10, INT: 10, WIS: 10, CHA: 10 }, features: '', skills: [{ id: 1, name: '', modifier: 0 }], skillIdCounter: 2, resources: [{ id: 1, name: '', current: 0, total: 0 }], resourceIdCounter: 2, actionButtons: [{ id: 1, name: 'Move', active: false }, { id: 2, name: 'Action', active: false }, { id: 3, name: 'Bonus Action', active: false }, { id: 4, name: 'Reaction', active: false }], actionIdCounter: 5, spells: [{ id: 1, name: '', resource: '', actionEconomy: '' }], spellIdCounter: 2 },
    { id: 3, name: 'Character 3', class: '', portrait: null, abilityScores: { STR: 10, DEX: 10, CON: 10, INT: 10, WIS: 10, CHA: 10 }, features: '', skills: [{ id: 1, name: '', modifier: 0 }], skillIdCounter: 2, resources: [{ id: 1, name: '', current: 0, total: 0 }], resourceIdCounter: 2, actionButtons: [{ id: 1, name: 'Move', active: false }, { id: 2, name: 'Action', active: false }, { id: 3, name: 'Bonus Action', active: false }, { id: 4, name: 'Reaction', active: false }], actionIdCounter: 5, spells: [{ id: 1, name: '', resource: '', actionEconomy: '' }], spellIdCounter: 2 },
    { id: 4, name: 'Character 4', class: '', portrait: null, abilityScores: { STR: 10, DEX: 10, CON: 10, INT: 10, WIS: 10, CHA: 10 }, features: '', skills: [{ id: 1, name: '', modifier: 0 }], skillIdCounter: 2, resources: [{ id: 1, name: '', current: 0, total: 0 }], resourceIdCounter: 2, actionButtons: [{ id: 1, name: 'Move', active: false }, { id: 2, name: 'Action', active: false }, { id: 3, name: 'Bonus Action', active: false }, { id: 4, name: 'Reaction', active: false }], actionIdCounter: 5, spells: [{ id: 1, name: '', resource: '', actionEconomy: '' }], spellIdCounter: 2 },
    { id: 5, name: 'Character 5', class: '', portrait: null, abilityScores: { STR: 10, DEX: 10, CON: 10, INT: 10, WIS: 10, CHA: 10 }, features: '', skills: [{ id: 1, name: '', modifier: 0 }], skillIdCounter: 2, resources: [{ id: 1, name: '', current: 0, total: 0 }], resourceIdCounter: 2, actionButtons: [{ id: 1, name: 'Move', active: false }, { id: 2, name: 'Action', active: false }, { id: 3, name: 'Bonus Action', active: false }, { id: 4, name: 'Reaction', active: false }], actionIdCounter: 5, spells: [{ id: 1, name: '', resource: '', actionEconomy: '' }], spellIdCounter: 2 },
  ]);
  
  const [activeCharacterId, setActiveCharacterId] = createSignal(1);
  const [expandedSections, setExpandedSections] = createSignal({ abilities: true, features: true });
  
  const abilities = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];
  
  const getCurrentCharacter = () => characters().find(char => char.id === activeCharacterId());
  
  const updateCharacter = (updates) => {
    setCharacters(chars => chars.map(char => 
      char.id === activeCharacterId() ? { ...char, ...updates } : char
    ));
  };
  
  const calculateModifier = (score) => Math.floor((score - 10) / 2);
  
  const updateAbilityScore = (ability, value) => {
    const current = getCurrentCharacter();
    updateCharacter({
      abilityScores: {
        ...current.abilityScores,
        [ability]: parseInt(value) || 10
      }
    });
  };
  
  const handlePortraitUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updateCharacter({ portrait: event.target.result });
=======
const abilities = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];
const defaultActions = [
  { id: 1, name: 'Move', mode: 'circles', bars: [false], current: 0, total: 1 },
  { id: 2, name: 'Action', mode: 'circles', bars: [false], current: 0, total: 1 },
  { id: 3, name: 'Bonus Action', mode: 'circles', bars: [false], current: 0, total: 1 },
  { id: 4, name: 'Reaction', mode: 'circles', bars: [false], current: 0, total: 1 },
];
const storageKey = 'dnd-character-tabs-v1';
const spellLibraryStorageKey = 'vanfreyr-custom-spell-library-v1';
const maxCharacters = 5;
const diceOptions = ['d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd100'];
const resourcePresets = [
  'Cantrip',
  'Spell',
  'Ki',
  'Sorcery Points',
  'Channel Divinity',
  'Lay on Hands',
  'Rage',
  'Bardic Inspiration',
  'Wild Shape',
  'Superiority (Battle Master)',
  'Second Wind / Action Surge (Fighter)',
  'Warlock Pact',
];
const skillPresets = [
  'Acrobatics',
  'Animal Handling',
  'Arcana',
  'Athletics',
  'Deception',
  'History',
  'Insight',
  'Intimidation',
  'Investigation',
  'Medicine',
  'Nature',
  'Perception',
  'Performance',
  'Persuasion',
  'Religion',
  'Sleight of Hand',
  'Stealth',
  'Survival',
];
const skillAbilityDefaults = {
  Acrobatics: 'DEX',
  'Animal Handling': 'WIS',
  Arcana: 'INT',
  Athletics: 'STR',
  Deception: 'CHA',
  History: 'INT',
  Insight: 'WIS',
  Intimidation: 'CHA',
  Investigation: 'INT',
  Medicine: 'WIS',
  Nature: 'INT',
  Perception: 'WIS',
  Performance: 'CHA',
  Persuasion: 'CHA',
  Religion: 'INT',
  'Sleight of Hand': 'DEX',
  Stealth: 'DEX',
  Survival: 'WIS',
};
const armorPresets = [
  { value: 'Cloth', label: 'Cloth 10', rating: 10, armorType: 'cloth' },
  { value: 'Leather', label: 'Light Leather 11', rating: 11, armorType: 'light' },
  { value: 'Studded Leather', label: 'Light Studded Leather 12', rating: 12, armorType: 'light' },
  { value: 'Hide', label: 'Medium Hide 12', rating: 12, armorType: 'medium' },
  { value: 'Chain Shirt', label: 'Medium Chain Shirt 13', rating: 13, armorType: 'medium' },
  { value: 'Scale Mail', label: 'Medium Scale Mail 14', rating: 14, armorType: 'medium' },
  { value: 'Breastplate', label: 'Heavy Breastplate 14', rating: 14, armorType: 'heavy' },
  { value: 'Half Plate', label: 'Heavy Half Plate 15', rating: 15, armorType: 'heavy' },
  { value: 'Ring Mail', label: 'Heavy Ring Mail 14', rating: 14, armorType: 'heavy' },
  { value: 'Chain Mail', label: 'Heavy Chain Mail 16', rating: 16, armorType: 'heavy' },
  { value: 'Split', label: 'Heavy Split 17', rating: 17, armorType: 'heavy' },
  { value: 'Plate', label: 'Heavy Plate 18', rating: 18, armorType: 'heavy' },
];
const spellActionOptions = ['None', 'Action', 'Bonus Action', 'Reaction'];
const normalizeResourceName = (name = '') =>
  ['Cantrip (Level 0)', 'Level 0 Spell', 'Spell 0 Cantrip'].includes(name)
    ? 'Cantrip'
    : name;
const buffTypes = [
  { value: 'none', label: 'None' },
  { value: 'attackRoll', label: 'Attack Roll' },
  { value: 'weaponDamage', label: 'Weapon Damage' },
  { value: 'armorClass', label: 'Armor Class' },
  { value: 'tempHp', label: 'Temp HP' },
  { value: 'savingThrow', label: 'Saving Throw' },
  { value: 'ability', label: 'Ability' },
  { value: 'skill', label: 'Skill' },
];

const buffTypeLabel = (value) => buffTypes.find((type) => type.value === value)?.label ?? 'None';
const parseDice = (dice = 'd6') => {
  const match = String(dice).match(/^(\d+)?d(\d+)$/i);
  return {
    count: Number(match?.[1]) || 1,
    dice: match ? `d${match[2]}` : dice || 'd6',
  };
};

const formatDice = (count = 1, dice = 'd6') => `${Math.max(1, Number(count) || 1)}${dice}`;

const makeBuffEffect = (id, type = 'none', value = 0) => ({
  id,
  type,
  saveName: '',
  targetName: '',
  value,
  diceCount: 0,
  dice: 'd6',
});

const makeResource = (id, name = '', total = 4, permanent = false, mode = 'circles') => {
  const normalizedTotal = Math.max(1, Number(total) || 1);
  const numerical = mode === 'numbers' || name === 'Lay on Hands';
  return {
    id,
    name,
    permanent,
    mode: numerical ? 'numbers' : 'circles',
    current: numerical ? normalizedTotal : 0,
    total: normalizedTotal,
    bars: Array.from(
      { length: permanent ? 1 : normalizedTotal },
      () => permanent,
    ),
  };
};

const makeEconomy = (id, name = '', total = 1, mode = 'circles') => ({
  id,
  name,
  mode,
  bars: Array.from({ length: Math.max(1, Number(total) || 1) }, () => false),
  current: mode === 'numbers' ? Math.max(1, Number(total) || 1) : 0,
  total: Math.max(1, Number(total) || 1),
});

const makeAbilityRows = () =>
  abilities.map((ability, index) => ({
    id: index + 1,
    name: ability,
    score: 10,
    modifier: 0,
  }));

const makeWeapon = (id) => ({
  id,
  name: '',
  equipped: false,
  resourceName: '',
  abilityModifier: 0,
  attackAbilityName: '',
  attackBonusModifier: 0,
  proficiencyModifier: 0,
  damageDiceCount: 1,
  damageDice: 'd6',
  damageAbilityModifier: 0,
  damageAbilityName: '',
  damageBonusModifier: 0,
});

const makeArmor = (id) => ({
  id,
  name: '',
  equipped: false,
  base: 10,
  modifier: 0,
  shield: 0,
  abilityModifiers: [],
  abilityModifierIdCounter: 1,
  bonusModifier: 0,
  armorType: 'cloth',
  armorPreset: '',
  shieldEnabled: false,
  shieldBonus: 2,
});

const makeSpellDice = (id) => ({
  id,
  name: '',
  value: 0,
  diceCount: 1,
  dice: 'd6',
});

const makeCustomCalculation = (id, text = '') => ({
  id,
  text,
});

const spellResourceText = (spell) =>
  (spell.resourceEntries?.length ? spell.resourceEntries : [spell.resource])
    .filter(Boolean)
    .join(' / ');

const spellActionText = (spell) =>
  (spell.actionEntries?.length ? spell.actionEntries : [spell.actionEconomy])
    .filter(Boolean)
    .join(' / ');

const spellToLibraryEntry = (spell) => ({
  name: spell.name?.trim() ?? '',
  resourceEntries: [...(spell.resourceEntries ?? [spell.resource ?? ''])],
  actionEntries: [...(spell.actionEntries ?? [spell.actionEconomy ?? ''])],
  diceRolls: (spell.diceRolls ?? []).map((diceRoll, index) => ({
    ...makeSpellDice(index + 1),
    ...diceRoll,
    id: index + 1,
  })),
  customCalculations: (spell.customCalculations ?? []).map(
    (calculation, index) => ({
      id: index + 1,
      text: calculation.text ?? '',
    }),
  ),
  flavorText: spell.flavorText ?? '',
});

const spellActionFromCastingTime = (castingTime = '') => {
  const normalized = castingTime.toLowerCase();
  if (normalized.includes('bonus action')) return 'Bonus Action';
  if (normalized.includes('reaction')) return 'Reaction';
  if (normalized.includes('action')) return 'Action';
  return castingTime || 'None';
};

const spellDiceFromSrd = (spell, characterLevel) => {
  const slotDamage = spell.damage?.damage_at_slot_level?.[String(spell.level)];
  const characterDamageEntries = Object.entries(
    spell.damage?.damage_at_character_level ?? {},
  )
    .map(([level, dice]) => [Number(level), dice])
    .sort((left, right) => left[0] - right[0]);
  const characterDamage =
    characterDamageEntries
      .filter(([level]) => level <= characterLevel)
      .at(-1)?.[1] ?? characterDamageEntries[0]?.[1];
  const healing = spell.heal_at_slot_level?.[String(spell.level)];
  const diceText = slotDamage ?? characterDamage ?? healing ?? '';
  const match = String(diceText).match(/(\d+)d(\d+)/i);
  if (!match) return [];
  return [
    {
      ...makeSpellDice(1),
      name: spell.damage?.damage_type?.name ?? (healing ? 'Healing' : 'Roll'),
      diceCount: Number(match[1]),
      dice: `d${match[2]}`,
    },
  ];
};

const moveItem = (items, fromIndex, direction) => {
  const toIndex = fromIndex + direction;
  if (toIndex < 0 || toIndex >= items.length) return items;
  const nextItems = [...items];
  const [item] = nextItems.splice(fromIndex, 1);
  nextItems.splice(toIndex, 0, item);
  return nextItems;
};

const calculateProficiencyBonus = (level) => {
  const totalLevel = Number(level) || 0;
  if (totalLevel <= 0) return 0;
  return Math.min(6, Math.floor((totalLevel - 1) / 4) + 2);
};

const characterBuffTotal = (character, type, targetName = '') =>
  (character.activeBuffs ?? []).reduce(
    (total, buff) =>
      total +
      (buff.active
        ? (buff.effects ?? []).reduce(
            (effectTotal, effect) =>
              effectTotal +
              (effect.type === type && (!targetName || effect.targetName === targetName)
                ? Number(effect.value) || 0
                : 0),
            0,
          )
        : 0),
    0,
  );

const characterAbilityModifier = (character, abilityName) => {
  const ability = character.abilityRows.find((row) => row.name === abilityName);
  if (!ability) return 0;
  const baseModifier = character.autoCalculateModifiers
    ? Math.floor(((Number(ability.score) || 10) - 10) / 2)
    : Number(ability.modifier) || 0;
  return baseModifier + characterBuffTotal(character, 'ability', abilityName);
};

const findPreset = (value, presets) => {
  const query = String(value).trim().toLowerCase();
  if (!query) return '';
  return (
    presets.find((preset) => preset.toLowerCase() === query) ??
    presets.find((preset) => preset.toLowerCase().includes(query)) ??
    ''
  );
};

const calculateSkillModifier = (character, skill) => {
  if (!skill.abilityName) return Number(skill.modifier) || 0;
  const abilityModifier = characterAbilityModifier(character, skill.abilityName);
  const proficiencyMultiplier = skill.expertise ? 2 : skill.proficient ? 1 : 0;
  return (
    abilityModifier +
    calculateProficiencyBonus(character.characterLevel) * proficiencyMultiplier +
    (Number(skill.bonusModifier) || 0)
    + characterBuffTotal(character, 'skill', skill.name)
  );
};

const escapeXml = (value = '') =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');

const wordRuns = (value, { bold = false, color = '222222', size = 20 } = {}) =>
  String(value ?? '')
    .split('\n')
    .map(
      (line, index) =>
        `${index ? '<w:r><w:br/></w:r>' : ''}<w:r><w:rPr>${bold ? '<w:b/>' : ''}<w:color w:val="${color}"/><w:sz w:val="${size}"/></w:rPr><w:t xml:space="preserve">${escapeXml(line)}</w:t></w:r>`,
    )
    .join('');

const wordParagraph = (
  value,
  { bold = false, color = '222222', size = 20, after = 100, keepNext = false } = {},
) =>
  `<w:p><w:pPr><w:spacing w:after="${after}"/>${keepNext ? '<w:keepNext/>' : ''}</w:pPr>${wordRuns(value, { bold, color, size })}</w:p>`;

const wordHeading = (value, level = 1) =>
  wordParagraph(value, {
    bold: true,
    color: level === 1 ? 'B8860B' : '222222',
    size: level === 1 ? 32 : level === 2 ? 25 : 22,
    after: level === 1 ? 180 : level === 2 ? 110 : 70,
    keepNext: true,
  });

const wordRichParagraph = (
  runs,
  { size = 28, after = 100, before = 0, bullet = false, keepNext = false } = {},
) => {
  const content = (Array.isArray(runs) ? runs : [{ text: runs }])
    .map((run) =>
      wordRuns(run.text ?? '', {
        bold: run.bold ?? false,
        color: run.color ?? '222222',
        size: Math.max(28, run.size ?? size),
      }),
    )
    .join('');
  return `<w:p><w:pPr><w:spacing w:before="${before}" w:after="${after}"/>${
    bullet ? '<w:ind w:left="420" w:hanging="260"/>' : ''
  }${keepNext ? '<w:keepNext/>' : ''}</w:pPr>${
    bullet ? wordRuns('• ', { bold: true, color: 'B8860B', size }) : ''
  }${content}</w:p>`;
};

const wordRichHeading = (value, level = 1) =>
  wordRichParagraph(
    [{ text: value, bold: true, color: level === 1 ? 'B8860B' : '222222' }],
    {
      size: level === 1 ? 36 : level === 2 ? 32 : 28,
      before: level === 1 ? 0 : 180,
      after: level === 1 ? 180 : 100,
      keepNext: true,
    },
  );

const wordRichSection = (value) =>
  `<w:p><w:pPr><w:spacing w:before="240" w:after="120"/><w:keepNext/><w:shd w:fill="2F2F2F"/><w:pBdr><w:bottom w:val="single" w:sz="14" w:color="D9B300"/></w:pBdr><w:ind w:left="120" w:right="120"/></w:pPr>${wordRuns(
    value,
    { bold: true, color: 'FFFFFF', size: 30 },
  )}</w:p>`;

const wordTable = (
  headers,
  rows,
  { widths = [], fontSize = 18, zebra = false } = {},
) => {
  const normalizedWidths =
    widths.length === headers.length
      ? widths
      : headers.map(() => Math.floor(10800 / Math.max(1, headers.length)));
  const cell = (value, header = false, columnIndex = 0, shaded = false) =>
    `<w:tc><w:tcPr><w:tcW w:w="${normalizedWidths[columnIndex]}" w:type="dxa"/><w:vAlign w:val="center"/>${
      header
        ? '<w:shd w:fill="D9B300"/>'
        : shaded
          ? '<w:shd w:fill="F2F2F2"/>'
          : ''
    }<w:tcMar><w:top w:w="90" w:type="dxa"/><w:left w:w="120" w:type="dxa"/><w:bottom w:w="90" w:type="dxa"/><w:right w:w="120" w:type="dxa"/></w:tcMar></w:tcPr>${wordParagraph(
      value || '-',
      { bold: header, size: fontSize, after: 0 },
    )}</w:tc>`;
  const row = (values, header = false, rowIndex = 0) =>
    `<w:tr><w:trPr>${header ? '<w:tblHeader/>' : '<w:cantSplit/>'}</w:trPr>${values
      .map((value, columnIndex) =>
        cell(value, header, columnIndex, zebra && rowIndex % 2 === 1),
      )
      .join('')}</w:tr>`;
  return `<w:tbl><w:tblPr><w:tblW w:w="10800" w:type="dxa"/><w:tblLayout w:type="fixed"/><w:tblBorders><w:top w:val="single" w:sz="5" w:color="777777"/><w:left w:val="single" w:sz="5" w:color="777777"/><w:bottom w:val="single" w:sz="5" w:color="777777"/><w:right w:val="single" w:sz="5" w:color="777777"/><w:insideH w:val="single" w:sz="4" w:color="BBBBBB"/><w:insideV w:val="single" w:sz="4" w:color="BBBBBB"/></w:tblBorders></w:tblPr><w:tblGrid>${normalizedWidths
    .map((width) => `<w:gridCol w:w="${width}"/>`)
    .join('')}</w:tblGrid>${row(headers, true)}${rows
    .map((values, index) => row(values, false, index))
    .join('')}</w:tbl>${wordParagraph('', { after: 100 })}`;
};

const wordReportSection = (value) =>
  `<w:p><w:pPr><w:spacing w:before="220" w:after="110"/><w:keepNext/><w:shd w:fill="2F2F2F"/><w:pBdr><w:bottom w:val="single" w:sz="14" w:color="D9B300"/></w:pBdr><w:ind w:left="120" w:right="120"/></w:pPr>${wordRuns(
    value,
    { bold: true, color: 'FFFFFF', size: 25 },
  )}</w:p>`;

const wordPageBreak = () => '<w:p><w:r><w:br w:type="page"/></w:r></w:p>';

const wordSpellEntry = (spell, description) => {
  const resources = spellResourceText(spell) || 'None';
  const actions = spellActionText(spell) || 'None';
  const flavourText = spell.flavorText?.trim();
  return [
    `<w:p><w:pPr><w:spacing w:before="150" w:after="60"/><w:keepNext/><w:pBdr><w:bottom w:val="single" w:sz="5" w:color="D9B300"/></w:pBdr></w:pPr>${wordRuns(
      spell.name || 'Spell/Ability',
      { bold: true, color: '7A5D00', size: 23 },
    )}</w:p>`,
    wordTable(
      ['Resource', 'Action Economy'],
      [[resources, actions]],
      { widths: [5400, 5400], fontSize: 18 },
    ),
    wordParagraph('Description', { bold: true, color: '7A5D00', size: 19, after: 35 }),
    wordParagraph(description || '-', { size: 19, after: 90 }),
    ...(flavourText
      ? [
          wordParagraph('Flavour Text', {
            bold: true,
            color: '7A5D00',
            size: 19,
            after: 35,
          }),
          wordParagraph(flavourText, { size: 19, after: 120 }),
        ]
      : []),
  ].join('');
};

const dataUrlToBytes = (dataUrl) => {
  const base64 = String(dataUrl).split(',')[1] ?? '';
  const binary = atob(base64);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
};

const portraitDrawing = () => `
  <w:p>
    <w:r>
      <w:drawing>
        <wp:inline distT="0" distB="0" distL="0" distR="0">
          <wp:extent cx="1463040" cy="1920240"/>
          <wp:docPr id="1" name="Character Portrait"/>
          <a:graphic>
            <a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture">
              <pic:pic>
                <pic:nvPicPr><pic:cNvPr id="0" name="portrait"/><pic:cNvPicPr/></pic:nvPicPr>
                <pic:blipFill><a:blip r:embed="rIdPortrait"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill>
                <pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="1463040" cy="1920240"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr>
              </pic:pic>
            </a:graphicData>
          </a:graphic>
        </wp:inline>
      </w:drawing>
    </w:r>
  </w:p>`;

const featuresHtmlToWordXml = (html) => {
  if (!html?.trim()) return wordRichParagraph('No features or traits.');

  const parsed = new DOMParser().parseFromString(`<body>${html}</body>`, 'text/html');
  const renderInline = (node, style = {}) => {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent
        ? `<w:r><w:rPr>${style.bold ? '<w:b/>' : ''}${style.italic ? '<w:i/>' : ''}${style.underline ? '<w:u w:val="single"/>' : ''}<w:color w:val="222222"/><w:sz w:val="28"/></w:rPr><w:t xml:space="preserve">${escapeXml(node.textContent)}</w:t></w:r>`
        : '';
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return '';
    const tag = node.tagName.toLowerCase();
    if (tag === 'br') return '<w:r><w:br/></w:r>';
    const nextStyle = {
      bold: style.bold || tag === 'strong' || tag === 'b',
      italic: style.italic || tag === 'em' || tag === 'i',
      underline: style.underline || tag === 'u',
    };
    return [...node.childNodes].map((child) => renderInline(child, nextStyle)).join('');
  };
  const paragraph = (node, options = {}) =>
    `<w:p><w:pPr><w:spacing w:after="${options.after ?? 90}"/>${options.indent ? `<w:ind w:left="${options.indent}"/>` : ''}</w:pPr>${options.prefix ? wordRuns(options.prefix, { bold: true, size: 28 }) : ''}${renderInline(node)}</w:p>`;
  const blocks = [];
  const renderBlock = (node, listDepth = 0) => {
    if (node.nodeType === Node.TEXT_NODE) {
      if (node.textContent.trim()) {
        blocks.push(wordRichParagraph(node.textContent.trim()));
      }
      return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return;
    const tag = node.tagName.toLowerCase();
    if (/^h[1-6]$/.test(tag)) {
      const level = Number(tag[1]);
      blocks.push(
        `<w:p><w:pPr><w:spacing w:before="${level === 1 ? 180 : 100}" w:after="80"/><w:keepNext/></w:pPr><w:r><w:rPr><w:b/><w:color w:val="${level === 1 ? 'B8860B' : '222222'}"/><w:sz w:val="${level === 1 ? 34 : 30}"/></w:rPr><w:t xml:space="preserve">${escapeXml(node.textContent)}</w:t></w:r></w:p>`,
      );
      return;
    }
    if (tag === 'ul' || tag === 'ol') {
      [...node.children].forEach((child, index) => {
        if (child.tagName.toLowerCase() !== 'li') return;
        const clone = child.cloneNode(true);
        clone.querySelectorAll(':scope > ul, :scope > ol').forEach((list) => list.remove());
        blocks.push(
          paragraph(clone, {
            prefix: tag === 'ol' ? `${index + 1}. ` : '• ',
            indent: 360 + listDepth * 280,
            after: 45,
          }),
        );
        [...child.children]
          .filter((nested) => ['ul', 'ol'].includes(nested.tagName.toLowerCase()))
          .forEach((nested) => renderBlock(nested, listDepth + 1));
      });
      return;
    }
    if (tag === 'p' || tag === 'div' || tag === 'blockquote') {
      blocks.push(paragraph(node, { indent: tag === 'blockquote' ? 360 : 0 }));
      return;
    }
    [...node.childNodes].forEach((child) => renderBlock(child, listDepth));
  };

  [...parsed.body.childNodes].forEach((node) => renderBlock(node));
  return (
    blocks.join('') ||
    wordRichParagraph(parsed.body.textContent || 'No features or traits.')
  );
};

const makeCharacter = (name = '') => ({
  id: crypto.randomUUID(),
  portrait: null,
  name,
  characterClass: '',
  characterLevel: 1,
  hpCurrent: 0,
  hpMax: 0,
  hpTemp: 0,
  showHitPointMath: true,
  weapons: [makeWeapon(1)],
  weaponIdCounter: 2,
  armorRows: [makeArmor(1)],
  armorIdCounter: 2,
  showWeaponMath: true,
  showArmorMath: true,
  activeBuffs: [],
  activeBuffIdCounter: 1,
  actionEconomyTitle: 'Custom',
  abilityRows: makeAbilityRows(),
  abilityIdCounter: abilities.length + 1,
  autoCalculateModifiers: true,
  features: '',
  skills: [{ id: 1, name: '', modifier: 0 }],
  skillIdCounter: 2,
  resources: [makeResource(1, '', 4)],
  resourceIdCounter: 2,
  actionButtons: [...defaultActions],
  actionIdCounter: 5,
  spells: [{ id: 1, name: '', resource: '', actionEconomy: '', rowColor: '', favorite: false, linkedBuffId: '', customCalculations: [makeCustomCalculation(1)], customCalculationIdCounter: 2, diceRolls: [makeSpellDice(1)], diceRollIdCounter: 2, flavorText: '', flavorCollapsed: true }],
  spellIdCounter: 2,
});

const normalizeCharacter = (character) => ({
  ...makeCharacter(),
  ...character,
  actionEconomyTitle:
    character.actionEconomyTitle === 'Action Economy'
      ? 'Custom'
      : character.actionEconomyTitle ?? 'Custom',
  abilityRows: Array.isArray(character.abilityRows)
    ? character.abilityRows
    : makeAbilityRows().map((row) => ({
        ...row,
        score: character.abilityScores?.[row.name] ?? row.score,
      })),
  abilityIdCounter: character.abilityIdCounter ?? abilities.length + 1,
  autoCalculateModifiers: character.autoCalculateModifiers ?? true,
  activeBuffs: (character.activeBuffs ?? []).map((buff) => ({
    ...buff,
    effectIdCounter: buff.effectIdCounter ?? 2,
    effects: (buff.effects?.length ? buff.effects : [makeBuffEffect(1, buff.type ?? 'none', buff.value ?? 0)]).map(
      (effect) => ({
        ...makeBuffEffect(effect.id ?? 1),
        ...effect,
      }),
    ),
  })),
  activeBuffIdCounter: character.activeBuffIdCounter ?? 1,
  weapons: (character.weapons?.length ? character.weapons : [makeWeapon(1)]).map((weapon) => ({
    ...makeWeapon(weapon.id ?? 1),
    ...weapon,
    damageDiceCount: weapon.damageDiceCount ?? parseDice(weapon.damageDice).count,
    damageDice: parseDice(weapon.damageDice).dice,
    attackAbilityName: weapon.attackAbilityName ?? '',
    attackBonusModifier: weapon.attackBonusModifier ?? 0,
    damageAbilityName: weapon.damageAbilityName ?? '',
    resourceName: weapon.resourceName ?? '',
  })),
  weaponIdCounter: character.weaponIdCounter ?? 2,
  armorRows: (character.armorRows?.length ? character.armorRows : [makeArmor(1)]).map((armor) => ({
    ...makeArmor(armor.id ?? 1),
    ...armor,
    abilityModifiers: armor.abilityModifiers ?? [],
    abilityModifierIdCounter: armor.abilityModifierIdCounter ?? 1,
    bonusModifier:
      armor.bonusModifier ??
      (Number(armor.shield) || 0) + (Number(armor.modifier) || 0),
    armorType: armor.armorType ?? 'cloth',
    armorPreset: armor.armorPreset ?? '',
    shieldEnabled: armor.shieldEnabled ?? false,
    shieldBonus: armor.shieldBonus ?? 2,
  })),
  armorIdCounter: character.armorIdCounter ?? 2,
  actionButtons: (character.actionButtons?.length ? character.actionButtons : defaultActions).map(
    (action, index) => {
      if (Array.isArray(action.bars)) {
        return {
          ...action,
          mode: action.mode ?? 'circles',
          current: Number(action.current) || 0,
          total: Math.max(1, Number(action.total) || action.bars.length || 1),
        };
      }
      return {
        id: action.id ?? index + 1,
        name: action.name ?? '',
        mode: 'circles',
        bars: [Boolean(action.active)],
        current: Boolean(action.active) ? 1 : 0,
        total: 1,
      };
    },
  ),
  resources: (character.resources?.length ? character.resources : [makeResource(1, '', 4)]).map(
    (resource, index) => {
      if (Array.isArray(resource.bars)) {
        const name = normalizeResourceName(resource.name);
        const permanent = resource.permanent ?? name === 'Cantrip';
        const numerical = resource.mode === 'numbers' || name === 'Lay on Hands';
        const total = Math.max(
          1,
          Number(resource.total) || resource.bars.length || 1,
        );
        return {
          ...resource,
          name,
          permanent,
          mode: numerical ? 'numbers' : 'circles',
          current: numerical
            ? Math.min(
                total,
                Math.max(
                  0,
                  resource.current == null
                    ? resource.bars.filter(Boolean).length
                    : Number(resource.current) || 0,
                ),
              )
            : 0,
          total,
          bars: permanent ? [true] : resource.bars,
        };
      }
      const total = Math.max(1, Number(resource.total) || 1);
      const current = Math.max(0, Number(resource.current) || 0);
      return {
        id: resource.id ?? index + 1,
        name: normalizeResourceName(resource.name ?? ''),
        permanent: normalizeResourceName(resource.name) === 'Cantrip',
        mode:
          normalizeResourceName(resource.name) === 'Lay on Hands'
            ? 'numbers'
            : resource.mode ?? 'circles',
        current,
        total,
        bars: Array.from({ length: total }, (_, barIndex) => barIndex < current),
      };
    },
  ),
  skills: (character.skills ?? []).map((skill) => ({
    ...skill,
    abilityName: skill.abilityName ?? '',
    proficient: skill.proficient ?? false,
    expertise: skill.expertise ?? false,
    bonusModifier: skill.bonusModifier ?? 0,
  })),
  spells: (character.spells?.length
    ? character.spells
    : [{ id: 1, name: '', resource: '', actionEconomy: '', rowColor: '', favorite: false, linkedBuffId: '', customCalculations: [makeCustomCalculation(1)], customCalculationIdCounter: 2, diceRolls: [makeSpellDice(1)], diceRollIdCounter: 2, flavorText: '', flavorCollapsed: true }]
  ).map((spell) => ({
    rowColor: '',
    favorite: false,
    customCalculations: [makeCustomCalculation(1)],
    customCalculationIdCounter: 2,
    diceRolls: [makeSpellDice(1)],
    diceRollIdCounter: 2,
    flavorText: '',
    flavorCollapsed: true,
    ...spell,
    linkedBuffId: spell.linkedBuffId ?? '',
    resourceEntries: spell.resourceEntries?.length
      ? spell.resourceEntries.map(normalizeResourceName)
      : [normalizeResourceName(spell.resource ?? '')],
    actionEntries: spell.actionEntries?.length
      ? spell.actionEntries
      : [spell.actionEconomy ?? ''],
    customCalculations: (
      Array.isArray(spell.customCalculations)
        ? spell.customCalculations
        : [makeCustomCalculation(1, spell.customCalculation ?? '')]
    ).map((customCalculation) => ({
      ...makeCustomCalculation(customCalculation.id ?? 1),
      ...customCalculation,
    })),
    diceRolls: (Array.isArray(spell.diceRolls) ? spell.diceRolls : [makeSpellDice(1)]).map((diceRoll) => ({
      ...makeSpellDice(diceRoll.id ?? 1),
      ...diceRoll,
      diceCount: diceRoll.diceCount ?? parseDice(diceRoll.dice).count,
      dice: parseDice(diceRoll.dice).dice,
    })),
  })),
});

const readStoredCharacters = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    if (saved?.characters?.length) {
      const characters = saved.characters.slice(0, maxCharacters).map(normalizeCharacter);
      return {
        activeId: saved.activeId ?? characters[0].id,
        characters,
      };
    }
  } catch {
    localStorage.removeItem(storageKey);
  }

  const firstCharacter = makeCharacter('Character 1');
  return {
    activeId: firstCharacter.id,
    characters: [firstCharacter],
  };
};

const readStoredSpellLibrary = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(spellLibraryStorageKey));
    return Array.isArray(saved)
      ? saved.map((spell) => ({
          ...spell,
          resourceEntries: (spell.resourceEntries ?? []).map(normalizeResourceName),
        }))
      : [];
  } catch {
    localStorage.removeItem(spellLibraryStorageKey);
    return [];
  }
};

function CollapsibleSection(props) {
  return (
    <section class={`section ${props.class || ''} ${props.isCollapsed ? 'collapsed' : ''}`}>
      <button
        type="button"
        class="section-toggle"
        onClick={props.onToggle}
        aria-expanded={!props.isCollapsed}
      >
        <span>{props.title}</span>
        <span class="toggle-icon">{props.isCollapsed ? '+' : '-'}</span>
      </button>
      <Show when={!props.isCollapsed}>
        <div class="section-content">{props.children}</div>
      </Show>
    </section>
  );
}

export default function App() {
  const stored = readStoredCharacters();
  const [characters, setCharacters] = createSignal(stored.characters);
  const [activeId, setActiveId] = createSignal(stored.activeId);
  const [collapsedSections, setCollapsedSections] = createSignal({});
  const [collapsedHelp, setCollapsedHelp] = createSignal({});
  const [favoriteResourceColumnCollapsed, setFavoriteResourceColumnCollapsed] =
    createSignal(false);
  const [favoriteActionColumnCollapsed, setFavoriteActionColumnCollapsed] =
    createSignal(false);
  const [favoriteDescriptionColumnCollapsed, setFavoriteDescriptionColumnCollapsed] =
    createSignal(false);
  const [favoriteFlavorColumnCollapsed, setFavoriteFlavorColumnCollapsed] =
    createSignal(true);
  const [skillAbilityColumnCollapsed, setSkillAbilityColumnCollapsed] =
    createSignal(false);
  const [skillProficiencyColumnCollapsed, setSkillProficiencyColumnCollapsed] =
    createSignal(false);
  const [skillBuffsColumnCollapsed, setSkillBuffsColumnCollapsed] =
    createSignal(false);
  const [skillActionColumnCollapsed, setSkillActionColumnCollapsed] =
    createSignal(false);
  const [resourceControlsCollapsed, setResourceControlsCollapsed] =
    createSignal(false);
  const [importStatus, setImportStatus] = createSignal('');
  const [exportText, setExportText] = createSignal('');
  const [newEconomyName, setNewEconomyName] = createSignal('');
  const [newEconomyTotal, setNewEconomyTotal] = createSignal(1);
  const [newEconomyMode, setNewEconomyMode] = createSignal('circles');
  const [actionUseAmounts, setActionUseAmounts] = createSignal({});
  const [actionRestoreAmounts, setActionRestoreAmounts] = createSignal({});
  const [newResourceName, setNewResourceName] = createSignal('');
  const [newResourceSpellLevel, setNewResourceSpellLevel] = createSignal('1');
  const [newResourceTotal, setNewResourceTotal] = createSignal(4);
  const [newResourceMode, setNewResourceMode] = createSignal('circles');
  const [resourceUseAmounts, setResourceUseAmounts] = createSignal({});
  const [resourceRestoreAmounts, setResourceRestoreAmounts] = createSignal({});
  const [newSkillName, setNewSkillName] = createSignal('');
  const [newSkillAbility, setNewSkillAbility] = createSignal('DEX');
  const [newSkillProficient, setNewSkillProficient] = createSignal(false);
  const [newSkillExpertise, setNewSkillExpertise] = createSignal(false);
  const [newSkillBonus, setNewSkillBonus] = createSignal(0);
  const [editingResourceId, setEditingResourceId] = createSignal(null);
  const [editingSkillId, setEditingSkillId] = createSignal(null);
  const [srdSpells, setSrdSpells] = createSignal([]);
  const [srdLoadingSpellId, setSrdLoadingSpellId] = createSignal(null);
  const [customSpellLibrary, setCustomSpellLibrary] = createSignal(
    readStoredSpellLibrary(),
  );
  const [newBuffName, setNewBuffName] = createSignal('');
  const [damageTaken, setDamageTaken] = createSignal('');
  const [damageHealed, setDamageHealed] = createSignal('');

  const activeCharacter = createMemo(
    () => characters().find((character) => character.id === activeId()) ?? characters()[0],
  );

  const appSpellLibrary = createMemo(() => {
    const library = new Map();
    characters().forEach((character) => {
      (character.spells ?? [])
        .filter((spell) => spell.name?.trim())
        .forEach((spell) => {
          const entry = spellToLibraryEntry(spell);
          library.set(entry.name.toLowerCase(), entry);
        });
    });
    customSpellLibrary()
      .filter((spell) => spell.name?.trim())
      .forEach((spell) => {
        const entry = spellToLibraryEntry(spell);
        library.set(entry.name.toLowerCase(), entry);
      });
    return [...library.values()].sort((left, right) =>
      left.name.localeCompare(right.name),
    );
  });

  createEffect(() => {
    localStorage.setItem(
      storageKey,
      JSON.stringify({ activeId: activeId(), characters: characters() }),
    );
  });

  createEffect(() => {
    localStorage.setItem(
      spellLibraryStorageKey,
      JSON.stringify(customSpellLibrary()),
    );
  });

  createEffect(() => {
    fetch('https://www.dnd5eapi.co/api/2014/spells')
      .then((response) => {
        if (!response.ok) throw new Error('Could not load the SRD spell list.');
        return response.json();
      })
      .then((data) => setSrdSpells(data.results ?? []))
      .catch(() => setSrdSpells([]));
  });

  const updateActiveCharacter = (updater) => {
    const active = activeCharacter();
    if (!active) return;
    setCharacters((current) =>
      current.map((character) =>
        character.id === active.id
          ? typeof updater === 'function'
            ? updater(character)
            : { ...character, ...updater }
          : character,
      ),
    );
  };

  const toggleSection = (section) => {
    setCollapsedSections((current) => ({ ...current, [section]: !current[section] }));
  };

  const toggleHelp = (section) => {
    setCollapsedHelp((current) => ({ ...current, [section]: !current[section] }));
  };

  const applyRichTextCommand = (command) => {
    document.execCommand(command, false, null);
  };

  const handleFeaturesKeyDown = (event) => {
    if (event.key !== 'Tab') return;
    event.preventDefault();
    document.execCommand(event.shiftKey ? 'outdent' : 'indent', false, null);
  };

  const calculateModifier = (score) => Math.floor((Number(score) - 10) / 2);

  const buffEffectValue = (effect) => Number(effect.value) || 0;
  const buffEffectText = (effect) => {
    const parts = [];
    if (effect.type === 'savingThrow' && effect.saveName) parts.push(effect.saveName);
    if (['ability', 'skill'].includes(effect.type) && effect.targetName) {
      parts.push(effect.targetName);
    }
    parts.push(`${buffTypeLabel(effect.type)}: +${Number(effect.value) || 0}`);
    if (Number(effect.diceCount) > 0) parts.push(`+ ${formatDice(effect.diceCount, effect.dice)}`);
    return parts.join(' ');
  };

  const buffTotal = (type) =>
    (activeCharacter().activeBuffs ?? []).reduce(
      (total, buff) =>
        total +
        (buff.active
          ? (buff.effects ?? []).reduce(
              (effectTotal, effect) =>
                effectTotal + (effect.type === type ? buffEffectValue(effect) : 0),
              0,
            )
          : 0),
      0,
    );

  const targetedBuffTotal = (type, targetName) =>
    characterBuffTotal(activeCharacter(), type, targetName);

  const abilityModifierFor = (abilityName) =>
    characterAbilityModifier(activeCharacter(), abilityName);

  const proficiencyBonus = () => calculateProficiencyBonus(activeCharacter().characterLevel);

  const weaponAttackRoll = (weapon) =>
    (weapon.attackAbilityName
      ? abilityModifierFor(weapon.attackAbilityName)
      : Number(weapon.abilityModifier) || 0) +
    proficiencyBonus() +
    (Number(weapon.attackBonusModifier) || 0) +
    buffTotal('attackRoll');

  const weaponDamageBonus = (weapon) =>
    (weapon.damageAbilityName
      ? abilityModifierFor(weapon.damageAbilityName)
      : Number(weapon.damageAbilityModifier) || 0) +
    Number(weapon.damageBonusModifier) +
    buffTotal('weaponDamage');

  const armorClass = (armor) =>
    Number(armor.base) +
    (() => {
      const abilityTotal = (armor.abilityModifiers ?? []).reduce(
        (total, ability) => total + abilityModifierFor(ability.abilityName),
        0,
      );
      if (armor.armorType === 'heavy') return 0;
      if (armor.armorType === 'medium') return Math.min(2, abilityTotal);
      return abilityTotal;
    })() +
    Number(armor.bonusModifier ?? 0) +
    (armor.shieldEnabled ? Number(armor.shieldBonus) || 0 : 0) +
    buffTotal('armorClass');

  const diceRollTotal = (diceRoll) => `${formatDice(diceRoll.diceCount, diceRoll.dice)} + ${Number(diceRoll.value) || 0}`;

  const activeTempHpTotal = (character) =>
    (character.activeBuffs ?? []).reduce(
      (total, buff) =>
        total +
        (buff.active
          ? (buff.effects ?? []).reduce(
              (effectTotal, effect) =>
                effectTotal + (effect.type === 'tempHp' ? buffEffectValue(effect) : 0),
              0,
            )
          : 0),
      0,
    );

  const syncTempHpBuffs = (character, nextTempHp) => ({
    ...character,
    hpTemp: Math.max(0, Number(nextTempHp) || 0),
    activeBuffs:
      Number(nextTempHp) > 0
        ? character.activeBuffs ?? []
        : (character.activeBuffs ?? []).map((buff) =>
            (buff.effects ?? []).some((effect) => effect.type === 'tempHp') ? { ...buff, active: false } : buff,
          ),
  });

  const setTempHpFromBuffs = (character) => ({
    ...character,
    hpTemp: activeTempHpTotal(character),
  });

  const addCharacter = () => {
    if (characters().length >= maxCharacters) return;
    const nextCharacter = makeCharacter(`Character ${characters().length + 1}`);
    setCharacters((current) => [...current, nextCharacter]);
    setActiveId(nextCharacter.id);
  };

  const removeActiveCharacter = () => {
    if (characters().length === 1) return;
    const active = activeCharacter();
    const remaining = characters().filter((character) => character.id !== active.id);
    setCharacters(remaining);
    setActiveId(remaining[0].id);
  };

  const moveCharacter = (index, direction) => {
    setCharacters((current) => moveItem(current, index, direction));
  };

  const updateAbilityRow = (id, field, value) => {
    updateActiveCharacter((character) => ({
      ...character,
      abilityRows: character.abilityRows.map((ability) =>
        ability.id === id ? { ...ability, [field]: value } : ability,
      ),
    }));
  };

  const updateNumberField = (field, value) => {
    const nextValue = Number(value) || 0;
    if (field === 'hpTemp') {
      updateActiveCharacter((character) => syncTempHpBuffs(character, nextValue));
      return;
    }
    updateActiveCharacter({ [field]: nextValue });
  };

  const healToFull = () => {
    updateActiveCharacter((character) => ({
      ...character,
      hpCurrent: Number(character.hpMax) || 0,
    }));
  };

  const addActiveBuff = () => {
    const name = newBuffName().trim();
    if (!name) return;
    updateActiveCharacter((character) => ({
      ...character,
      activeBuffs: [
        ...(character.activeBuffs ?? []),
        {
          id: character.activeBuffIdCounter ?? 1,
          name,
          active: true,
          effects: [makeBuffEffect(1)],
          effectIdCounter: 2,
        },
      ],
      activeBuffIdCounter: (character.activeBuffIdCounter ?? 1) + 1,
    }));
    setNewBuffName('');
  };

  const toggleActiveBuff = (id) => {
    updateActiveCharacter((character) => {
      const activeBuffs = (character.activeBuffs ?? []).map((buff) =>
        buff.id === id ? { ...buff, active: !buff.active } : buff,
      );
      const nextCharacter = { ...character, activeBuffs };
      const changedBuff = activeBuffs.find((buff) => buff.id === id);
      return (changedBuff?.effects ?? []).some((effect) => effect.type === 'tempHp')
        ? syncTempHpBuffs(nextCharacter, activeTempHpTotal(nextCharacter))
        : nextCharacter;
    });
  };

  const removeActiveBuff = (id) => {
    updateActiveCharacter((character) => {
      const removedBuff = (character.activeBuffs ?? []).find((buff) => buff.id === id);
      const nextCharacter = {
        ...character,
        activeBuffs: (character.activeBuffs ?? []).filter((buff) => buff.id !== id),
        spells: (character.spells ?? []).map((spell) =>
          String(spell.linkedBuffId ?? '') === String(id)
            ? { ...spell, linkedBuffId: '' }
            : spell,
        ),
      };
      return (removedBuff?.effects ?? []).some((effect) => effect.type === 'tempHp')
        ? setTempHpFromBuffs(nextCharacter)
        : nextCharacter;
    });
  };

  const updateActiveBuff = (id, field, value) => {
    updateActiveCharacter((character) => {
      const activeBuffs = (character.activeBuffs ?? []).map((buff) =>
        buff.id === id ? { ...buff, [field]: value } : buff,
      );
      const nextCharacter = { ...character, activeBuffs };
      const changedBuff = activeBuffs.find((buff) => buff.id === id);
      const affectsTempHp = (changedBuff?.effects ?? []).some((effect) => effect.type === 'tempHp') || field === 'type';
      return affectsTempHp ? setTempHpFromBuffs(nextCharacter) : nextCharacter;
    });
  };

  const addActiveBuffEffect = (buffId) => {
    updateActiveCharacter((character) => ({
      ...character,
      activeBuffs: (character.activeBuffs ?? []).map((buff) =>
        buff.id === buffId
          ? {
              ...buff,
              effects: [...(buff.effects ?? []), makeBuffEffect(buff.effectIdCounter ?? 1)],
              effectIdCounter: (buff.effectIdCounter ?? 1) + 1,
            }
          : buff,
      ),
    }));
  };

  const removeActiveBuffEffect = (buffId, effectId) => {
    updateActiveCharacter((character) => {
      const nextCharacter = {
        ...character,
        activeBuffs: (character.activeBuffs ?? []).map((buff) =>
          buff.id === buffId
            ? {
                ...buff,
                effects: (buff.effects ?? []).filter(
                  (effect) => effect.id !== effectId,
                ),
              }
            : buff,
        ),
      };
      return setTempHpFromBuffs(nextCharacter);
    });
  };

  const updateActiveBuffEffect = (buffId, effectId, field, value) => {
    updateActiveCharacter((character) => {
      const nextCharacter = {
        ...character,
        activeBuffs: (character.activeBuffs ?? []).map((buff) =>
          buff.id === buffId
            ? {
                ...buff,
                effects: (buff.effects ?? []).map((effect) =>
                  effect.id === effectId ? { ...effect, [field]: value } : effect,
                ),
              }
            : buff,
        ),
      };
      const updatedBuff = nextCharacter.activeBuffs.find((buff) => buff.id === buffId);
      const affectsTempHp = (updatedBuff?.effects ?? []).some((effect) => effect.type === 'tempHp') || field === 'type';
      return affectsTempHp ? setTempHpFromBuffs(nextCharacter) : nextCharacter;
    });
  };

  const applyDamageTaken = () => {
    const damage = Math.max(0, Number(damageTaken()) || 0);
    if (!damage) return;

    updateActiveCharacter((character) => {
      const currentTempHp = Math.max(0, Number(character.hpTemp) || 0);
      const tempDamage = Math.min(currentTempHp, damage);
      const nextTempHp = currentTempHp - tempDamage;
      const remainingDamage = damage - tempDamage;
      const nextCurrentHp = Math.max(0, (Number(character.hpCurrent) || 0) - remainingDamage);

      return syncTempHpBuffs(
        {
          ...character,
          hpCurrent: nextCurrentHp,
        },
        nextTempHp,
      );
    });
    setDamageTaken('');
  };

  const applyDamageHealed = () => {
    const healing = Math.max(0, Number(damageHealed()) || 0);
    if (!healing) return;

    updateActiveCharacter((character) => ({
      ...character,
      hpCurrent: Math.min(
        Number(character.hpMax) || 0,
        (Number(character.hpCurrent) || 0) + healing,
      ),
    }));
    setDamageHealed('');
  };

  const addWeapon = () => {
    updateActiveCharacter((character) => ({
      ...character,
      weapons: [...character.weapons, makeWeapon(character.weaponIdCounter)],
      weaponIdCounter: character.weaponIdCounter + 1,
    }));
  };

  const updateWeapon = (id, field, value) => {
    updateActiveCharacter((character) => ({
      ...character,
      weapons: character.weapons.map((weapon) =>
        weapon.id === id ? { ...weapon, [field]: value } : weapon,
      ),
    }));
  };

  const removeWeapon = (id) => {
    updateActiveCharacter((character) => ({
      ...character,
      weapons: character.weapons.filter((weapon) => weapon.id !== id),
    }));
  };

  const addArmor = () => {
    updateActiveCharacter((character) => ({
      ...character,
      armorRows: [...character.armorRows, makeArmor(character.armorIdCounter)],
      armorIdCounter: character.armorIdCounter + 1,
    }));
  };

  const updateArmor = (id, field, value) => {
    updateActiveCharacter((character) => ({
      ...character,
      armorRows: character.armorRows.map((armor) =>
        armor.id === id ? { ...armor, [field]: value } : armor,
      ),
    }));
  };

  const selectArmorPreset = (armorId, presetValue) => {
    const preset = armorPresets.find((option) => option.value === presetValue);
    if (!preset) {
      updateArmor(armorId, 'armorPreset', '');
      return;
    }
    updateActiveCharacter((character) => ({
      ...character,
      armorRows: character.armorRows.map((armor) =>
        armor.id === armorId
          ? {
              ...armor,
              armorPreset: preset.value,
              name: preset.value,
              base: preset.rating,
              armorType: preset.armorType,
            }
          : armor,
      ),
    }));
  };

  const removeArmor = (id) => {
    updateActiveCharacter((character) => ({
      ...character,
      armorRows: character.armorRows.filter((armor) => armor.id !== id),
    }));
  };

  const addArmorAbilityModifier = (armorId) => {
    updateActiveCharacter((character) => ({
      ...character,
      armorRows: character.armorRows.map((armor) =>
        armor.id === armorId
          ? {
              ...armor,
              abilityModifiers: [
                ...(armor.abilityModifiers ?? []),
                {
                  id: armor.abilityModifierIdCounter ?? 1,
                  abilityName: character.abilityRows[0]?.name ?? '',
                },
              ],
              abilityModifierIdCounter: (armor.abilityModifierIdCounter ?? 1) + 1,
            }
          : armor,
      ),
    }));
  };

  const updateArmorAbilityModifier = (armorId, modifierId, abilityName) => {
    updateActiveCharacter((character) => ({
      ...character,
      armorRows: character.armorRows.map((armor) =>
        armor.id === armorId
          ? {
              ...armor,
              abilityModifiers: (armor.abilityModifiers ?? []).map((modifier) =>
                modifier.id === modifierId ? { ...modifier, abilityName } : modifier,
              ),
            }
          : armor,
      ),
    }));
  };

  const removeArmorAbilityModifier = (armorId, modifierId) => {
    updateActiveCharacter((character) => ({
      ...character,
      armorRows: character.armorRows.map((armor) =>
        armor.id === armorId
          ? {
              ...armor,
              abilityModifiers: (armor.abilityModifiers ?? []).filter(
                (modifier) => modifier.id !== modifierId,
              ),
            }
          : armor,
      ),
    }));
  };

  const addAbilityRow = () => {
    updateActiveCharacter((character) => ({
      ...character,
      abilityRows: [
        ...character.abilityRows,
        {
          id: character.abilityIdCounter,
          name: '',
          score: 10,
          modifier: 0,
        },
      ],
      abilityIdCounter: character.abilityIdCounter + 1,
    }));
  };

  const removeAbilityRow = (id) => {
    updateActiveCharacter((character) => ({
      ...character,
      abilityRows: character.abilityRows.filter((ability) => ability.id !== id),
    }));
  };

  const moveAbilityRow = (index, direction) => {
    updateActiveCharacter((character) => ({
      ...character,
      abilityRows: moveItem(character.abilityRows, index, direction),
    }));
  };

  const addSkill = () => {
    const name = newSkillName().trim();
    if (!name) return;
    updateActiveCharacter((character) => ({
      ...character,
      skills: [
        ...character.skills,
        {
          id: character.skillIdCounter,
          name,
          abilityName: newSkillAbility(),
          proficient: newSkillProficient() || newSkillExpertise(),
          expertise: newSkillExpertise(),
          bonusModifier: Number(newSkillBonus()) || 0,
          modifier: 0,
        },
      ],
      skillIdCounter: character.skillIdCounter + 1,
    }));
    setNewSkillName('');
    setNewSkillProficient(false);
    setNewSkillExpertise(false);
    setNewSkillBonus(0);
  };

  const finishSkillName = () => {
    const match = findPreset(newSkillName(), skillPresets);
    if (!match) return;
    setNewSkillName(match);
    setNewSkillAbility(skillAbilityDefaults[match] ?? newSkillAbility());
  };

  const removeSkill = (id) => {
    updateActiveCharacter((character) => ({
      ...character,
      skills: character.skills.filter((skill) => skill.id !== id),
    }));
  };

  const updateSkill = (id, field, value) => {
    updateActiveCharacter((character) => ({
      ...character,
      skills: character.skills.map((skill) =>
        skill.id === id ? { ...skill, [field]: value } : skill,
      ),
    }));
  };

  const moveSkill = (skillId, direction) => {
    updateActiveCharacter((character) => {
      const visibleSkills = character.skills.filter((skill) => skill.name?.trim());
      const fromIndex = visibleSkills.findIndex((skill) => skill.id === skillId);
      const movedSkills = moveItem(visibleSkills, fromIndex, direction);
      let visibleIndex = 0;
      return {
        ...character,
        skills: character.skills.map((skill) =>
          skill.name?.trim() ? movedSkills[visibleIndex++] : skill,
        ),
      };
    });
  };

  const addResource = () => {
    const selectedResource = findPreset(newResourceName(), resourcePresets) || newResourceName().trim();
    if (!selectedResource) return;
    const resourceName =
      selectedResource === 'Spell'
        ? `Level ${newResourceSpellLevel()} Spell`
        : selectedResource;
    const isPermanentCantrip = selectedResource === 'Cantrip';
    const resourceMode =
      selectedResource === 'Lay on Hands'
        ? 'numbers'
        : isPermanentCantrip
          ? 'circles'
          : resourcePresets.includes(selectedResource)
            ? 'circles'
            : newResourceMode();
    updateActiveCharacter((character) => ({
      ...character,
      resources: [
        ...character.resources,
        makeResource(
          character.resourceIdCounter,
          resourceName,
          newResourceTotal(),
          isPermanentCantrip,
          resourceMode,
        ),
      ],
      resourceIdCounter: character.resourceIdCounter + 1,
    }));
    setNewResourceName('');
    setNewResourceSpellLevel('1');
    setNewResourceTotal(4);
    setNewResourceMode('circles');
  };

  const finishResourceName = () => {
    const match = findPreset(newResourceName(), resourcePresets);
    if (match) setNewResourceName(match);
  };

  const toggleResourceBar = (resourceId, barIndex) => {
    updateActiveCharacter((character) => ({
      ...character,
      resources: character.resources.map((resource) =>
        resource.id === resourceId
          ? resource.permanent
            ? resource
            : {
                ...resource,
                bars: resource.bars.map((bar, index) =>
                  index === barIndex ? !bar : bar,
                ),
              }
          : resource,
      ),
    }));
  };

  const fillResourceBlips = (resourceId) => {
    updateActiveCharacter((character) => ({
      ...character,
      resources: character.resources.map((resource) =>
        resource.id === resourceId &&
        resource.mode === 'circles' &&
        !resource.permanent
          ? {
              ...resource,
              bars: (resource.bars ?? []).map(() => true),
            }
          : resource,
      ),
    }));
  };

  const linkedResourcesAvailable = (resourceNames) => {
    const names = [
      ...new Set(
        (resourceNames ?? [])
          .map((name) => String(name ?? '').trim())
          .filter(Boolean),
      ),
    ];
    if (!names.length) return true;
    return names.every((name) => {
      const resource = activeCharacter().resources.find(
        (candidate) =>
          (candidate.name?.trim() ?? '').localeCompare(name, undefined, {
            sensitivity: 'accent',
          }) === 0,
      );
      if (!resource) return false;
      if (resource.permanent) return true;
      return resource.mode === 'numbers'
        ? (Number(resource.current) || 0) >= 1
        : (resource.bars ?? []).some(Boolean);
    });
  };

  const spendLinkedResources = (
    resourceNames,
    actionName,
    numericalAmounts = {},
  ) => {
    const names = [
      ...new Set(
        (resourceNames ?? [])
          .map((name) => String(name ?? '').trim())
          .filter(Boolean),
      ),
    ];
    const character = activeCharacter();
    const resourceMatchesName = (resource, name) =>
      (resource.name?.trim() ?? '').localeCompare(name, undefined, {
        sensitivity: 'accent',
      }) === 0;
    const linkedResources = character.resources.filter((resource) =>
      names.some((name) => resourceMatchesName(resource, name)),
    );
    const missingNames = names.filter(
      (name) =>
        !character.resources.some((resource) =>
          resourceMatchesName(resource, name),
        ),
    );
    if (missingNames.length) {
      setImportStatus(
        `${actionName || 'Action'} could not be used: missing Resource Pool ${missingNames.join(', ')}.`,
      );
      return false;
    }
    const spendableResources = linkedResources.filter(
      (resource) => !resource.permanent,
    );
    if (!spendableResources.length) {
      setImportStatus(
        names.length
          ? `${actionName || 'Action'} uses no expendable resources.`
          : `${actionName || 'Action'} has no Resource Pool connected.`,
      );
      return true;
    }
    const emptyResources = spendableResources.filter((resource) => {
      const amount =
        resource.mode === 'numbers'
          ? Math.max(1, Number(numericalAmounts[resource.id]) || 1)
          : 1;
      return resource.mode === 'numbers'
        ? (Number(resource.current) || 0) < amount
        : !(resource.bars ?? []).some(Boolean);
    });
    if (emptyResources.length) {
      setImportStatus(
        `${actionName || 'Action'} could not be used: ${emptyResources
          .map((resource) => resource.name || 'Resource')
          .join(', ')} is empty.`,
      );
      return false;
    }
    const spendableIds = new Set(
      spendableResources.map((resource) => resource.id),
    );
    updateActiveCharacter((currentCharacter) => ({
      ...currentCharacter,
      resources: currentCharacter.resources.map((resource) => {
        if (!spendableIds.has(resource.id)) return resource;
        if (resource.mode === 'numbers') {
          const amount = Math.max(
            1,
            Number(numericalAmounts[resource.id]) || 1,
          );
          return {
            ...resource,
            current: Math.max(
              0,
              (Number(resource.current) || 0) - amount,
            ),
          };
        }
        const lastAvailableIndex = (resource.bars ?? []).lastIndexOf(true);
        return {
          ...resource,
          bars: resource.bars.map((bar, index) =>
            index === lastAvailableIndex ? false : bar,
          ),
        };
      }),
    }));
    const spentText = spendableResources
      .map((resource) => {
        const amount =
          resource.mode === 'numbers'
            ? Math.max(1, Number(numericalAmounts[resource.id]) || 1)
            : 1;
        return `${amount} ${resource.name || 'Resource'}`;
      })
      .join(' and ');
    setImportStatus(
      `${actionName || 'Action'} used ${spentText}.`,
    );
    return true;
  };

  const useFavoriteSpell = (spell) => {
    const resourceNames = spell.resourceEntries?.length
      ? spell.resourceEntries
      : [spell.resource];
    const normalizedNames = resourceNames
      .map((name) => String(name ?? '').trim())
      .filter(Boolean);
    const numericalResources = activeCharacter().resources.filter(
      (resource) =>
        !resource.permanent &&
        resource.mode === 'numbers' &&
        normalizedNames.some(
          (name) =>
            (resource.name?.trim() ?? '').localeCompare(name, undefined, {
              sensitivity: 'accent',
            }) === 0,
        ),
    );
    const numericalAmounts = {};
    for (const resource of numericalResources) {
      const current = Math.max(0, Number(resource.current) || 0);
      const response = window.prompt(
        `How much ${resource.name || 'resource'} do you want to use? (${current} available)`,
        '1',
      );
      if (response === null) {
        setImportStatus(`${spell.name || 'Spell/Ability'} was cancelled.`);
        return;
      }
      const amount = Math.floor(Number(response));
      if (!Number.isFinite(amount) || amount < 1) {
        setImportStatus(
          `Enter a whole number of 1 or more for ${resource.name || 'the resource'}.`,
        );
        return;
      }
      if (amount > current) {
        setImportStatus(
          `${spell.name || 'Spell/Ability'} could not be used: only ${current} ${resource.name || 'resource'} remains.`,
        );
        return;
      }
      numericalAmounts[resource.id] = amount;
    }
    const usedSuccessfully = spendLinkedResources(
      resourceNames,
      spell.name || 'Spell/Ability',
      numericalAmounts,
    );
    if (!usedSuccessfully || !spell.linkedBuffId) return;

    const linkedBuff = (activeCharacter().activeBuffs ?? []).find(
      (buff) => String(buff.id) === String(spell.linkedBuffId),
    );
    if (!linkedBuff) return;

    updateActiveBuff(linkedBuff.id, 'active', true);
    setImportStatus(
      `${spell.name || 'Spell/Ability'} activated ${linkedBuff.name || 'its linked buff'}.`,
    );
  };

  const useEquippedWeapon = (weapon) => {
    spendLinkedResources(
      weapon.resourceName ? [weapon.resourceName] : [],
      weapon.name || 'Weapon',
    );
  };

  const useNumericalResource = (resourceId) => {
    const amount = Math.max(
      0,
      Number(resourceUseAmounts()[resourceId]) || 0,
    );
    if (!amount) return;
    updateActiveCharacter((character) => ({
      ...character,
      resources: character.resources.map((resource) =>
        resource.id === resourceId
          ? {
              ...resource,
              current: Math.max(0, (Number(resource.current) || 0) - amount),
            }
          : resource,
      ),
    }));
    setResourceUseAmounts((current) => ({ ...current, [resourceId]: '' }));
  };

  const restoreNumericalResource = (resourceId) => {
    const amount = Math.max(
      0,
      Number(resourceRestoreAmounts()[resourceId]) || 0,
    );
    if (!amount) return;
    updateActiveCharacter((character) => ({
      ...character,
      resources: character.resources.map((resource) =>
        resource.id === resourceId
          ? {
              ...resource,
              current: Math.min(
                Number(resource.total) || 0,
                (Number(resource.current) || 0) + amount,
              ),
            }
          : resource,
      ),
    }));
    setResourceRestoreAmounts((current) => ({ ...current, [resourceId]: '' }));
  };

  const updateResourceName = (resourceId, name) => {
    updateActiveCharacter((character) => ({
      ...character,
      resources: character.resources.map((resource) => {
        if (resource.id !== resourceId) return resource;
        const permanent = name.trim().toLowerCase() === 'cantrip';
        const isLayOnHands = name.trim().toLowerCase() === 'lay on hands';
        const numerical = isLayOnHands || (!permanent && resource.mode === 'numbers');
        const total = Math.max(
          1,
          Number(resource.total) || resource.bars.length || 1,
        );
        return {
          ...resource,
          name,
          permanent,
          mode: numerical ? 'numbers' : 'circles',
          current: numerical
            ? resource.mode === 'numbers'
              ? Math.min(total, Number(resource.current) || 0)
              : total
            : 0,
          total,
          bars: permanent
            ? [true]
            : resource.permanent
              ? [false]
              : resource.bars,
        };
      }),
    }));
  };

  const updateResourceMode = (resourceId, mode) => {
    updateActiveCharacter((character) => ({
      ...character,
      resources: character.resources.map((resource) => {
        if (resource.id !== resourceId || resource.permanent) return resource;
        const total = Math.max(1, Number(resource.total) || resource.bars.length || 1);
        return {
          ...resource,
          mode,
          current:
            mode === 'numbers'
              ? resource.mode === 'numbers'
                ? Math.min(total, Number(resource.current) || 0)
                : total
              : 0,
          bars:
            mode === 'circles'
              ? Array.from(
                  { length: total },
                  (_, index) => resource.bars[index] ?? false,
                )
              : resource.bars,
        };
      }),
    }));
  };

  const updateResourceTotal = (resourceId, total) => {
    const nextTotal = Math.max(1, Math.min(30, Number(total) || 1));
    updateActiveCharacter((character) => ({
      ...character,
      resources: character.resources.map((resource) =>
        resource.id === resourceId
          ? {
              ...resource,
              total: nextTotal,
              current:
                resource.mode === 'numbers'
                  ? Math.min(Number(resource.current) || 0, nextTotal)
                  : resource.current,
              bars: resource.permanent
                ? [true]
                : Array.from(
                    { length: nextTotal },
                    (_, index) => resource.bars[index] ?? false,
                  ),
            }
          : resource,
      ),
    }));
  };

  const removeResource = (id) => {
    updateActiveCharacter((character) => ({
      ...character,
      resources: character.resources.filter((resource) => resource.id !== id),
    }));
  };

  const moveResource = (index, direction) => {
    updateActiveCharacter((character) => ({
      ...character,
      resources: moveItem(character.resources, index, direction),
    }));
  };

  const restoreAllResources = () => {
    updateActiveCharacter((character) => ({
      ...character,
      resources: character.resources.map((resource) => ({
        ...resource,
        current:
          resource.mode === 'numbers'
            ? Number(resource.total) || 0
            : resource.current,
        bars:
          resource.mode === 'numbers'
            ? resource.bars
            : resource.bars.map(() => true),
      })),
    }));
  };

  const toggleActionBar = (actionId, barIndex) => {
    updateActiveCharacter((character) => ({
      ...character,
      actionButtons: character.actionButtons.map((action) =>
        action.id === actionId
          ? {
              ...action,
              bars: action.bars.map((bar, index) => (index === barIndex ? !bar : bar)),
            }
          : action,
      ),
    }));
  };

  const addActionButton = () => {
    updateActiveCharacter((character) => ({
      ...character,
      actionButtons: [
        ...character.actionButtons,
        makeEconomy(character.actionIdCounter, newEconomyName().trim(), newEconomyTotal(), newEconomyMode()),
      ],
      actionIdCounter: character.actionIdCounter + 1,
    }));
    setNewEconomyName('');
    setNewEconomyTotal(1);
    setNewEconomyMode('circles');
  };

  const updateActionName = (id, newName) => {
    updateActiveCharacter((character) => ({
      ...character,
      actionButtons: character.actionButtons.map((action) =>
        action.id === id ? { ...action, name: newName } : action,
      ),
    }));
  };

  const updateActionButton = (id, field, value) => {
    updateActiveCharacter((character) => ({
      ...character,
      actionButtons: character.actionButtons.map((action) =>
        action.id === id ? { ...action, [field]: value } : action,
      ),
    }));
  };

  const restoreAllActions = () => {
    updateActiveCharacter((character) => ({
      ...character,
      actionButtons: character.actionButtons.map((action) =>
        action.mode === 'numbers'
          ? { ...action, current: Number(action.total) || 0 }
          : { ...action, bars: (action.bars ?? []).map(() => true) },
      ),
    }));
  };

  const useNumericalAction = (actionId) => {
    const amount = Math.max(0, Number(actionUseAmounts()[actionId]) || 0);
    if (!amount) return;
    updateActiveCharacter((character) => ({
      ...character,
      actionButtons: character.actionButtons.map((action) =>
        action.id === actionId
          ? {
              ...action,
              current: Math.max(0, (Number(action.current) || 0) - amount),
            }
          : action,
      ),
    }));
    setActionUseAmounts((current) => ({ ...current, [actionId]: '' }));
  };

  const restoreNumericalAction = (actionId) => {
    const amount = Math.max(0, Number(actionRestoreAmounts()[actionId]) || 0);
    if (!amount) return;
    updateActiveCharacter((character) => ({
      ...character,
      actionButtons: character.actionButtons.map((action) =>
        action.id === actionId
          ? {
              ...action,
              current: Math.min(
                Number(action.total) || 0,
                (Number(action.current) || 0) + amount,
              ),
            }
          : action,
      ),
    }));
    setActionRestoreAmounts((current) => ({ ...current, [actionId]: '' }));
  };

  const removeActionButton = (id) => {
    updateActiveCharacter((character) => ({
      ...character,
      actionButtons: character.actionButtons.filter((action) => action.id !== id),
    }));
  };

  const moveActionButton = (index, direction) => {
    updateActiveCharacter((character) => ({
      ...character,
      actionButtons: moveItem(character.actionButtons, index, direction),
    }));
  };

  const addSpell = () => {
    updateActiveCharacter((character) => ({
      ...character,
      spells: [
        ...character.spells,
        { id: character.spellIdCounter, name: '', resource: '', resourceEntries: [''], actionEconomy: '', actionEntries: [''], rowColor: '', favorite: false, linkedBuffId: '', customCalculations: [makeCustomCalculation(1)], customCalculationIdCounter: 2, diceRolls: [makeSpellDice(1)], diceRollIdCounter: 2, flavorText: '', flavorCollapsed: true },
      ],
      spellIdCounter: character.spellIdCounter + 1,
    }));
  };

  const updateSpell = (id, field, value) => {
    updateActiveCharacter((character) => ({
      ...character,
      spells: character.spells.map((spell) =>
        spell.id === id ? { ...spell, [field]: value } : spell,
      ),
    }));
  };

  const updateSpellLinkedBuff = (spellIndex, linkedBuffId) => {
    updateActiveCharacter((character) => ({
      ...character,
      spells: character.spells.map((spell, index) =>
        index === spellIndex ? { ...spell, linkedBuffId } : spell,
      ),
    }));
  };

  const matchingSrdSpell = (name) => {
    const normalized = String(name).trim().toLowerCase();
    if (!normalized) return null;
    return (
      srdSpells().find((spell) => spell.name.toLowerCase() === normalized) ?? null
    );
  };

  const matchingCustomSpell = (name) => {
    const normalized = String(name).trim().toLowerCase();
    if (!normalized) return null;
    return (
      appSpellLibrary().find(
        (spell) => spell.name.toLowerCase() === normalized,
      ) ?? null
    );
  };

  const suggestedSpells = (name) => {
    const query = String(name).trim().toLowerCase();
    if (query.length < 2) return [];
    const customMatches = appSpellLibrary()
      .filter((spell) => spell.name.toLowerCase().includes(query))
      .map((spell) => ({ ...spell, source: 'Custom Library' }));
    const customNames = new Set(
      customMatches.map((spell) => spell.name.toLowerCase()),
    );
    const srdMatches = srdSpells()
      .filter(
        (spell) =>
          spell.name.toLowerCase().includes(query) &&
          !customNames.has(spell.name.toLowerCase()),
      )
      .map((spell) => ({ ...spell, source: 'SRD' }));
    return [...customMatches, ...srdMatches]
      .slice(0, 8);
  };

  const saveSpellToLibrary = (spell) => {
    const name = spell.name.trim();
    if (!name) {
      setImportStatus('Give the spell a name before saving it to the library.');
      return;
    }
    const librarySpell = spellToLibraryEntry(spell);
    setCustomSpellLibrary((current) => {
      const existingIndex = current.findIndex(
        (entry) => entry.name.toLowerCase() === name.toLowerCase(),
      );
      if (existingIndex < 0) return [...current, librarySpell];
      return current.map((entry, index) =>
        index === existingIndex ? librarySpell : entry,
      );
    });
    setImportStatus(`${name} saved to the custom spell library.`);
  };

  const autofillCustomSpell = (spellId, librarySpell) => {
    updateActiveCharacter((character) => ({
      ...character,
      spells: character.spells.map((spell) =>
        spell.id === spellId
          ? {
              ...spell,
              name: librarySpell.name,
              resourceEntries: [...(librarySpell.resourceEntries ?? [''])],
              actionEntries: [...(librarySpell.actionEntries ?? [''])],
              diceRolls: (librarySpell.diceRolls ?? []).map(
                (diceRoll, index) => ({ ...diceRoll, id: index + 1 }),
              ),
              diceRollIdCounter: (librarySpell.diceRolls?.length ?? 0) + 1,
              customCalculations: (
                librarySpell.customCalculations?.length
                  ? librarySpell.customCalculations
                  : [makeCustomCalculation(1)]
              ).map((calculation, index) => ({
                ...calculation,
                id: index + 1,
              })),
              customCalculationIdCounter:
                (librarySpell.customCalculations?.length ?? 0) + 1,
              flavorText: librarySpell.flavorText ?? '',
              flavorCollapsed: false,
              srdAutofilledName: librarySpell.name,
              srdDismissedName: '',
            }
          : spell,
      ),
    }));
    setImportStatus(`${librarySpell.name} filled from your custom library.`);
  };

  const autofillSrdSpell = async (spellId, spellSummary) => {
    if (!spellSummary || srdLoadingSpellId() === spellId) return;
    setSrdLoadingSpellId(spellId);
    try {
      const response = await fetch(`https://www.dnd5eapi.co${spellSummary.url}`);
      if (!response.ok) throw new Error('Could not load that SRD spell.');
      const srdSpell = await response.json();
      const resourceName =
        Number(srdSpell.level) === 0
          ? 'Cantrip'
          : `Level ${srdSpell.level} Spell`;
      const actionName = spellActionFromCastingTime(srdSpell.casting_time);
      const description = [
        ...(srdSpell.desc ?? []),
        ...(srdSpell.higher_level?.length
          ? ['', 'At Higher Levels', ...srdSpell.higher_level]
          : []),
      ].join('\n\n');
      const importedDiceRolls = spellDiceFromSrd(
        srdSpell,
        activeCharacter().characterLevel,
      );
      updateActiveCharacter((character) => ({
        ...character,
        spells: character.spells.map((spell) =>
          spell.id === spellId
            ? {
                ...spell,
                name: srdSpell.name,
                resourceEntries: [resourceName],
                actionEntries: [actionName],
                diceRolls: importedDiceRolls,
                diceRollIdCounter: importedDiceRolls.length + 1,
                flavorText: description,
                flavorCollapsed: false,
                srdAutofilledName: srdSpell.name,
                srdDismissedName: '',
              }
            : spell,
        ),
      }));
      setImportStatus(`${srdSpell.name} filled from the D&D 5e SRD.`);
    } catch {
      setImportStatus('Could not load that SRD spell. You can still enter it manually.');
    } finally {
      setSrdLoadingSpellId(null);
    }
  };

  const updateSpellEntry = (spellId, field, index, value) => {
    updateActiveCharacter((character) => ({
      ...character,
      spells: character.spells.map((spell) =>
        spell.id === spellId
          ? {
              ...spell,
              [field]: (spell[field] ?? ['']).map((entry, entryIndex) =>
                entryIndex === index ? value : entry,
              ),
            }
          : spell,
      ),
    }));
  };

  const addSpellEntry = (spellId, field) => {
    updateActiveCharacter((character) => ({
      ...character,
      spells: character.spells.map((spell) =>
        spell.id === spellId
          ? { ...spell, [field]: [...(spell[field] ?? []), ''] }
          : spell,
      ),
    }));
  };

  const removeSpellEntry = (spellId, field, index) => {
    updateActiveCharacter((character) => ({
      ...character,
      spells: character.spells.map((spell) => {
        if (spell.id !== spellId) return spell;
        const nextEntries = (spell[field] ?? []).filter(
          (_, entryIndex) => entryIndex !== index,
        );
        return { ...spell, [field]: nextEntries.length ? nextEntries : [''] };
      }),
    }));
  };

  const removeSpell = (id) => {
    updateActiveCharacter((character) => ({
      ...character,
      spells: character.spells.filter((spell) => spell.id !== id),
    }));
  };

  const setSpellRowColor = (id, rowColor) => {
    updateActiveCharacter((character) => ({
      ...character,
      spells: character.spells.map((spell) =>
        spell.id === id ? { ...spell, rowColor } : spell,
      ),
    }));
  };

  const toggleSpellFavorite = (id) => {
    updateActiveCharacter((character) => ({
      ...character,
      spells: character.spells.map((spell) =>
        spell.id === id ? { ...spell, favorite: !spell.favorite } : spell,
      ),
    }));
  };

  const moveSpell = (index, direction) => {
    updateActiveCharacter((character) => ({
      ...character,
      spells: moveItem(character.spells, index, direction),
    }));
  };

  const addSpellDiceRoll = (spellId) => {
    updateActiveCharacter((character) => ({
      ...character,
      spells: character.spells.map((spell) =>
        spell.id === spellId
          ? {
              ...spell,
              diceRolls: [...(spell.diceRolls ?? []), makeSpellDice(spell.diceRollIdCounter ?? 1)],
              diceRollIdCounter: (spell.diceRollIdCounter ?? 1) + 1,
            }
          : spell,
      ),
    }));
  };

  const updateSpellDiceRoll = (spellId, diceId, field, value) => {
    updateActiveCharacter((character) => ({
      ...character,
      spells: character.spells.map((spell) =>
        spell.id === spellId
          ? {
              ...spell,
              diceRolls: (spell.diceRolls ?? []).map((diceRoll) =>
                diceRoll.id === diceId ? { ...diceRoll, [field]: value } : diceRoll,
              ),
            }
          : spell,
      ),
    }));
  };

  const removeSpellDiceRoll = (spellId, diceId) => {
    updateActiveCharacter((character) => ({
      ...character,
      spells: character.spells.map((spell) =>
        spell.id === spellId
          ? { ...spell, diceRolls: (spell.diceRolls ?? []).filter((diceRoll) => diceRoll.id !== diceId) }
          : spell,
      ),
    }));
  };

  const addSpellCustomCalculation = (spellId) => {
    updateActiveCharacter((character) => ({
      ...character,
      spells: character.spells.map((spell) =>
        spell.id === spellId
          ? {
              ...spell,
              customCalculations: [
                ...(spell.customCalculations ?? []),
                makeCustomCalculation(spell.customCalculationIdCounter ?? 1),
              ],
              customCalculationIdCounter: (spell.customCalculationIdCounter ?? 1) + 1,
            }
          : spell,
      ),
    }));
  };

  const updateSpellCustomCalculation = (spellId, customId, text) => {
    updateActiveCharacter((character) => ({
      ...character,
      spells: character.spells.map((spell) =>
        spell.id === spellId
          ? {
              ...spell,
              customCalculations: (spell.customCalculations ?? []).map((customCalculation) =>
                customCalculation.id === customId ? { ...customCalculation, text } : customCalculation,
              ),
            }
          : spell,
      ),
    }));
  };

  const removeLastSpellCustomCalculation = (spellId) => {
    updateActiveCharacter((character) => ({
      ...character,
      spells: character.spells.map((spell) =>
        spell.id === spellId
          ? { ...spell, customCalculations: (spell.customCalculations ?? []).slice(0, -1) }
          : spell,
      ),
    }));
  };

  const toggleSpellFlavor = (spellId) => {
    updateActiveCharacter((character) => ({
      ...character,
      spells: character.spells.map((spell) =>
        spell.id === spellId ? { ...spell, flavorCollapsed: !spell.flavorCollapsed } : spell,
      ),
    }));
  };

  const handlePortraitUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      updateActiveCharacter({ portrait: readerEvent.target.result });
    };
    reader.readAsDataURL(file);
  };

  const handleFeaturesDocxUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const result = await mammoth.convertToHtml({ arrayBuffer: await file.arrayBuffer() });
      updateActiveCharacter({ features: result.value });
      setImportStatus('DOCX imported into Features & Traits.');
    } catch {
      setImportStatus('Could not import that DOCX file.');
    } finally {
      event.target.value = '';
    }
  };

  const exportSpellLibraryDocx = async () => {
    if (!appSpellLibrary().length) {
      setImportStatus('Add at least one spell or ability before exporting the library.');
      return;
    }
    const documentBody = [
      wordHeading("Vanfreyr's Spell & Ability Library"),
      wordParagraph(
        'This library contains spells and abilities from every character in the app plus manually saved library entries. You may edit the Value column in Word, keep the Field names unchanged, then import this document back into the sheet.',
      ),
      wordParagraph(`Library entries: ${appSpellLibrary().length}`, {
        bold: true,
      }),
      ...appSpellLibrary().flatMap((spell) => [
        wordHeading(spell.name, 2),
        wordTable(
          ['Field', 'Value'],
          [
            ['Name', spell.name],
            ['Resources', (spell.resourceEntries ?? []).filter(Boolean).join('\n') || '(none)'],
            ['Action Economy', (spell.actionEntries ?? []).filter(Boolean).join('\n') || '(none)'],
            [
              'Dice Rolls',
              (spell.diceRolls ?? [])
                .map(
                  (roll) =>
                    `${roll.name || 'Roll'} | ${Number(roll.diceCount) || 1} | ${roll.dice || 'd6'} | ${Number(roll.value) || 0}`,
                )
                .join('\n') || '(none)',
            ],
            [
              'Description',
              (spell.customCalculations ?? [])
                .map((calculation) => calculation.text)
                .filter(Boolean)
                .join('\n\n') || '(none)',
            ],
            ['Flavour Text', spell.flavorText || '(none)'],
          ],
          {
            widths: [2400, 8400],
            fontSize: 18,
            zebra: true,
          },
        ),
      ]),
      '<w:sectPr><w:pgSz w:w="12240" w:h="15840"/><w:pgMar w:top="720" w:right="720" w:bottom="720" w:left="720"/></w:sectPr>',
    ].join('');
    const zip = new JSZip();
    zip.file(
      '[Content_Types].xml',
      `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/><Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/></Types>`,
    );
    zip.folder('_rels').file(
      '.rels',
      `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/><Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/></Relationships>`,
    );
    zip.folder('word').file(
      'document.xml',
      `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>${documentBody}</w:body></w:document>`,
    );
    zip.folder('word').folder('_rels').file(
      'document.xml.rels',
      `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"/>`,
    );
    zip.folder('docProps').file(
      'core.xml',
      `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/"><dc:title>Vanfreyr&apos;s Spell &amp; Ability Library</dc:title><dc:creator>Vanfreyr&apos;s Character Sheet</dc:creator></cp:coreProperties>`,
    );
    zip.folder('docProps').file(
      'app.xml',
      `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties"><Application>Vanfreyr&apos;s Character Sheet</Application></Properties>`,
    );
    const blob = await zip.generateAsync({
      type: 'blob',
      mimeType:
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Vanfreyr-Spell-and-Ability-Library.docx';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setImportStatus(`${appSpellLibrary().length} spells and abilities exported to DOCX.`);
  };

  const importSpellLibraryDocx = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    try {
      const zip = await JSZip.loadAsync(await file.arrayBuffer());
      const documentXml = await zip.file('word/document.xml')?.async('string');
      if (!documentXml) throw new Error('Missing Word document data.');
      const document = new DOMParser().parseFromString(
        documentXml,
        'application/xml',
      );
      const readNodeText = (node) => {
        if (!node) return '';
        if (node.nodeType === Node.TEXT_NODE) return node.nodeValue ?? '';
        if (node.localName === 'br') return '\n';
        return [...(node.childNodes ?? [])].map(readNodeText).join('');
>>>>>>> cd0b550 (Expand character sheet and add desktop app)
      };
      const imported = [...document.getElementsByTagNameNS('*', 'tbl')]
        .map((table) => {
          const fields = {};
          const rows = [...table.getElementsByTagNameNS('*', 'tr')];
          rows.slice(1).forEach((row) => {
            const cells = [...row.getElementsByTagNameNS('*', 'tc')];
            const field = readNodeText(cells[0] ?? {}).trim();
            const value = readNodeText(cells[1] ?? {}).trim();
            if (field) fields[field] = value;
          });
          if (!fields.Name) return null;
          const diceRolls = String(fields['Dice Rolls'] ?? '')
            .split('\n')
            .map((line) => line.trim())
            .filter((line) => line && line !== '(none)')
            .map((line, index) => {
              const [name, count, dice, value] = line
                .split('|')
                .map((part) => part.trim());
              return {
                ...makeSpellDice(index + 1),
                name: name || 'Roll',
                diceCount: Math.max(1, Number(count) || 1),
                dice: diceOptions.includes(dice) ? dice : 'd6',
                value: Number(value) || 0,
              };
            });
          const resourceEntries = String(fields.Resources ?? '')
            .split('\n')
            .map((entry) => entry.trim())
            .filter((entry) => entry && entry !== '(none)');
          const actionEntries = String(fields['Action Economy'] ?? '')
            .split('\n')
            .map((entry) => entry.trim())
            .filter((entry) => entry && entry !== '(none)');
          return {
            name: fields.Name,
            resourceEntries: resourceEntries.length ? resourceEntries : [''],
            actionEntries: actionEntries.length ? actionEntries : [''],
            diceRolls,
            customCalculations:
              fields.Description && fields.Description !== '(none)'
              ? [makeCustomCalculation(1, fields.Description)]
              : [makeCustomCalculation(1)],
            flavorText:
              fields['Flavour Text'] === '(none)'
                ? ''
                : fields['Flavour Text'] ?? '',
          };
        })
        .filter(Boolean);
      if (!imported.length) throw new Error('No spell tables found.');
      setCustomSpellLibrary((current) => {
        const merged = [...current];
        imported.forEach((spell) => {
          const index = merged.findIndex(
            (entry) => entry.name.toLowerCase() === spell.name.toLowerCase(),
          );
          if (index >= 0) merged[index] = spell;
          else merged.push(spell);
        });
        return merged;
      });
      setImportStatus(
        `${imported.length} spell${imported.length === 1 ? '' : 's'} and abilities imported into the shared library.`,
      );
    } catch {
      setImportStatus(
        'Could not import that spell and ability library. Use a DOCX exported by this app and keep the Field names unchanged.',
      );
    } finally {
      event.target.value = '';
    }
  };

  const exportActiveCharacterTxt = () => {
    const character = normalizeCharacter(activeCharacter());
    const safeName = (character.name.trim() || 'Character').replace(/[^\w-]+/g, '-');
    const text = JSON.stringify({ version: 1, character }, null, 2);
    const blob = new Blob([text], {
      type: 'text/plain;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${safeName}-character-sheet.txt`;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setExportText(text);
    setImportStatus('Character saved. If no file downloaded, copy the text shown below.');
  };

  const saveAllCharactersTxt = () => {
    const text = JSON.stringify(
      {
        version: 1,
        activeId: activeId(),
        characters: characters().map(normalizeCharacter),
        customSpellLibrary: customSpellLibrary(),
      },
      null,
      2,
    );
    const blob = new Blob([text], {
      type: 'text/plain;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Vanfreyrs-Character-Sheet-All.txt';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setExportText(text);
    setImportStatus('All characters saved. This file can be restored with Load.');
  };

  const exportDocxReport = async () => {
    try {
      const character = normalizeCharacter(activeCharacter());
      const modifierText = (value) => `${Number(value) >= 0 ? '+' : ''}${Number(value) || 0}`;
      const spellDescription = (spell) =>
        [
          ...(spell.diceRolls ?? []).map(
            (roll) => `${roll.name || 'Roll'}: ${diceRollTotal(roll)}`,
          ),
          ...(spell.customCalculations ?? [])
            .map((calculation) => calculation.text?.trim())
            .filter(Boolean),
        ].join('\n') || '-';
      const totalHp = (Number(character.hpCurrent) || 0) + (Number(character.hpTemp) || 0);
      const proficiency = calculateProficiencyBonus(character.characterLevel);
      const favoriteSpells = character.spells
        .filter((spell) => spell.favorite && spell.name?.trim())
        .map((spell) => ({
          name: spell.name || 'Spell/Ability',
          resource: spellResourceText(spell) || '-',
          action: spellActionText(spell) || '-',
          calculations:
            (spell.diceRolls ?? [])
            .map((roll) => `${roll.name || 'Roll'}: ${diceRollTotal(roll)}`)
            .join(', ') || '-',
          flavorText: spell.flavorText?.trim() || '',
        }));
      const skillItems = character.skills
        .filter((skill) => skill.name?.trim())
        .map((skill) => ({
          name: skill.name || 'Skill',
          modifier: modifierText(calculateSkillModifier(character, skill)),
        }));
      const weaponItems = character.weapons
        .filter((weapon) => weapon.name?.trim())
        .map((weapon) => ({
          name: weapon.name || 'Weapon',
          attackRoll: String(weaponAttackRoll(weapon)),
          damageRoll: `${formatDice(weapon.damageDiceCount, weapon.damageDice)} + ${weaponDamageBonus(weapon)}`,
        }));
      const armorItems = character.armorRows
        .filter((armor) => armor.name?.trim())
        .map((armor) => ({
          name: armor.name || 'Armor',
          armorClass: String(armorClass(armor)),
        }));
      const abilityItems = character.abilityRows.map((ability) => ({
        name: ability.name || 'Custom',
        score: String(ability.score),
        modifier: modifierText(
          characterAbilityModifier(character, ability.name),
        ),
      }));

      const documentBody = [
        wordRichHeading(character.name || 'Character Report'),
        character.portrait ? portraitDrawing() : '',
        wordRichSection('Character Overview'),
        wordRichParagraph([
          { text: 'Class: ', bold: true, color: '7A5D00' },
          { text: character.characterClass || '-' },
        ]),
        wordRichParagraph([
          { text: 'Character Level: ', bold: true, color: '7A5D00' },
          { text: String(character.characterLevel || 1) },
        ]),
        wordRichParagraph([
          { text: 'Proficiency Modifier: ', bold: true, color: '7A5D00' },
          { text: `+${proficiency}` },
        ]),
        wordRichParagraph([
          { text: 'Total HP: ', bold: true, color: '7A5D00' },
          { text: String(totalHp) },
        ]),
        wordRichSection('Favorite Spells & Abilities'),
        favoriteSpells.length
          ? favoriteSpells
              .map((spell) =>
                [
                  wordRichParagraph(
                    [{ text: spell.name, bold: true, color: '7A5D00' }],
                    { bullet: true, after: 35, keepNext: true },
                  ),
                  wordRichParagraph(
                    [
                      { text: 'Resource: ', bold: true },
                      { text: `${spell.resource}; ` },
                      { text: 'Action Economy: ', bold: true },
                      { text: spell.action },
                    ],
                    { after: 35 },
                  ),
                  wordRichParagraph(
                    [
                      { text: 'Calculations: ', bold: true },
                      { text: spell.calculations },
                    ],
                    { after: spell.flavorText ? 35 : 100 },
                  ),
                  spell.flavorText
                    ? wordRichParagraph(
                        [
                          { text: 'Flavour Text: ', bold: true },
                          { text: spell.flavorText },
                        ],
                        { after: 120 },
                      )
                    : '',
                ].join(''),
              )
              .join('')
          : wordRichParagraph('No favorite spells or abilities.'),
        wordRichSection('Skills'),
        skillItems.length
          ? skillItems
              .map((skill) =>
                wordRichParagraph(
                  [
                    { text: `${skill.name}: `, bold: true },
                    { text: `Modifier ${skill.modifier}` },
                  ],
                  { bullet: true, after: 45 },
                ),
              )
              .join('')
          : wordRichParagraph('No skills.'),
        wordRichSection('Weapons'),
        weaponItems.length
          ? weaponItems
              .map((weapon) =>
                wordRichParagraph(
                  [
                    { text: `${weapon.name}: `, bold: true },
                    { text: `Attack Roll ${weapon.attackRoll}; ` },
                    { text: `Damage Roll ${weapon.damageRoll}` },
                  ],
                  { bullet: true, after: 55 },
                ),
              )
              .join('')
          : wordRichParagraph('No weapons.'),
        wordRichSection('Armor'),
        armorItems.length
          ? armorItems
              .map((armor) =>
                wordRichParagraph(
                  [
                    { text: `${armor.name}: `, bold: true },
                    { text: `Armor Class ${armor.armorClass}` },
                  ],
                  { bullet: true, after: 55 },
                ),
              )
              .join('')
          : wordRichParagraph('No armor.'),
        wordRichSection('Ability Scores'),
        abilityItems.length
          ? abilityItems
              .map((ability) =>
                wordRichParagraph(
                  [
                    { text: `${ability.name}: `, bold: true },
                    { text: `Score ${ability.score}; ` },
                    { text: `Modifier ${ability.modifier}` },
                  ],
                  { bullet: true, after: 45 },
                ),
              )
              .join('')
          : wordRichParagraph('No ability scores.'),
        wordPageBreak(),
        wordRichSection('Spells & Abilities'),
        character.spells.some((spell) => spell.name?.trim())
          ? character.spells
              .filter((spell) => spell.name?.trim())
              .map((spell) =>
                [
                  wordRichHeading(spell.name || 'Spell/Ability', 3),
                  wordRichParagraph([
                    { text: 'Resource: ', bold: true },
                    { text: spellResourceText(spell) || 'None' },
                  ]),
                  wordRichParagraph([
                    { text: 'Action Economy: ', bold: true },
                    { text: spellActionText(spell) || 'None' },
                  ]),
                  wordRichParagraph([
                    { text: 'Description: ', bold: true },
                    { text: spellDescription(spell) },
                  ]),
                  spell.flavorText?.trim()
                    ? wordRichParagraph([
                        { text: 'Flavour Text: ', bold: true },
                        { text: spell.flavorText.trim() },
                      ])
                    : '',
                ].join(''),
              )
              .join('')
          : wordRichParagraph('No spells or abilities.'),
        wordPageBreak(),
        wordRichSection('Features & Traits'),
        featuresHtmlToWordXml(character.features),
        '<w:sectPr><w:pgSz w:w="12240" w:h="15840"/><w:pgMar w:top="720" w:right="720" w:bottom="720" w:left="720" w:header="360" w:footer="360" w:gutter="0"/></w:sectPr>',
      ].join('');

      const zip = new JSZip();
      zip.file(
        '[Content_Types].xml',
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
        <Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
          <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
          <Default Extension="xml" ContentType="application/xml"/>
          <Default Extension="png" ContentType="image/png"/>
          <Default Extension="jpeg" ContentType="image/jpeg"/>
          <Default Extension="jpg" ContentType="image/jpeg"/>
          <Default Extension="gif" ContentType="image/gif"/>
          <Default Extension="webp" ContentType="image/webp"/>
          <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
          <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
          <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
        </Types>`,
      );
      zip.folder('_rels').file(
        '.rels',
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
        <Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
          <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
          <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
          <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
        </Relationships>`,
      );
      zip.folder('word').file(
        'document.xml',
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
        <w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"><w:body>${documentBody}</w:body></w:document>`,
      );
      const documentRelationships = [];
      if (character.portrait) {
        const portraitType = character.portrait.match(/^data:image\/([^;,]+)/)?.[1] || 'png';
        const portraitExtension = portraitType === 'svg+xml' ? 'png' : portraitType;
        zip.folder('word').folder('media').file(
          `portrait.${portraitExtension}`,
          dataUrlToBytes(character.portrait),
        );
        documentRelationships.push(
          `<Relationship Id="rIdPortrait" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/portrait.${portraitExtension}"/>`,
        );
      }
      zip.folder('word').folder('_rels').file(
        'document.xml.rels',
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${documentRelationships.join('')}</Relationships>`,
      );
      zip.folder('docProps').file(
        'core.xml',
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><dc:title>${escapeXml(character.name || 'Character Report')}</dc:title><dc:creator>Vanfreyr&apos;s Character Sheet</dc:creator><dcterms:created xsi:type="dcterms:W3CDTF">${new Date().toISOString()}</dcterms:created></cp:coreProperties>`,
      );
      zip.folder('docProps').file(
        'app.xml',
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes"><Application>Vanfreyr&apos;s Character Sheet</Application></Properties>`,
      );

      const blob = await zip.generateAsync({
        type: 'blob',
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      });
      const safeName = (character.name.trim() || 'Character').replace(/[^\w-]+/g, '-');
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${safeName}-report.docx`;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      setImportStatus('DOCX report downloaded.');
    } catch (error) {
      console.error(error);
      setImportStatus('Could not create the DOCX report.');
    }
  };

  const exportAllCharactersDocxReport = async () => {
    try {
      const reportCharacters = characters().map(normalizeCharacter);
      const modifierText = (value) =>
        `${Number(value) >= 0 ? '+' : ''}${Number(value) || 0}`;
      const characterWeaponAttack = (character, weapon) =>
        (weapon.attackAbilityName
          ? characterAbilityModifier(character, weapon.attackAbilityName)
          : Number(weapon.abilityModifier) || 0) +
        calculateProficiencyBonus(character.characterLevel) +
        (Number(weapon.attackBonusModifier) || 0) +
        characterBuffTotal(character, 'attackRoll');
      const characterWeaponDamage = (character, weapon) =>
        (weapon.damageAbilityName
          ? characterAbilityModifier(character, weapon.damageAbilityName)
          : Number(weapon.damageAbilityModifier) || 0) +
        (Number(weapon.damageBonusModifier) || 0) +
        characterBuffTotal(character, 'weaponDamage');
      const characterArmorClass = (character, armor) =>
        Number(armor.base) +
        (() => {
          const abilityTotal = (armor.abilityModifiers ?? []).reduce(
            (total, ability) =>
              total +
              characterAbilityModifier(character, ability.abilityName),
            0,
          );
          if (armor.armorType === 'heavy') return 0;
          if (armor.armorType === 'medium') return Math.min(2, abilityTotal);
          return abilityTotal;
        })() +
        (Number(armor.bonusModifier) || 0) +
        (armor.shieldEnabled ? Number(armor.shieldBonus) || 0 : 0) +
        characterBuffTotal(character, 'armorClass');

      const characterSummaries = reportCharacters
        .map((character, index) => {
          const equippedItems = [
            ...character.weapons
              .filter((weapon) => weapon.equipped && weapon.name?.trim())
              .map((weapon) => ({
                type: 'Weapon',
                name: weapon.name,
                attackRoll: String(characterWeaponAttack(character, weapon)),
                damageRoll: `${formatDice(weapon.damageDiceCount, weapon.damageDice)} + ${characterWeaponDamage(character, weapon)}`,
              })),
            ...character.armorRows
              .filter((armor) => armor.equipped && armor.name?.trim())
              .map((armor) => ({
                type: 'Armor',
                name: armor.name,
                armorClass: String(characterArmorClass(character, armor)),
              })),
          ];
          const spellNames = character.spells
            .filter((spell) => spell.name?.trim())
            .map((spell) => spell.name);
          const abilityItems = character.abilityRows
            .filter((ability) => ability.name?.trim())
            .map((ability) => ({
              name: ability.name,
              score: String(Number(ability.score) || 0),
              modifier: modifierText(
                characterAbilityModifier(character, ability.name),
              ),
            }));
          const skillItems = character.skills
            .filter((skill) => skill.name?.trim())
            .map((skill) => ({
              name: skill.name,
              modifier: modifierText(calculateSkillModifier(character, skill)),
            }));
          const hpCurrent = Number(character.hpCurrent) || 0;
          const hpMax = Number(character.hpMax) || 0;
          const hpTemp = Number(character.hpTemp) || 0;
          return [
            index ? wordPageBreak() : '',
            wordRichHeading(character.name || `Character ${index + 1}`),
            wordRichParagraph(
              [
                { text: 'Class: ', bold: true, color: '7A5D00' },
                { text: character.characterClass || '-' },
              ],
              { after: 55 },
            ),
            wordRichParagraph(
              [
                { text: 'Character Level: ', bold: true, color: '7A5D00' },
                { text: String(character.characterLevel || 1) },
              ],
              { after: 55 },
            ),
            wordRichParagraph(
              [
                {
                  text: 'Proficiency Modifier: ',
                  bold: true,
                  color: '7A5D00',
                },
                {
                  text: `+${calculateProficiencyBonus(
                    character.characterLevel,
                  )}`,
                },
              ],
              { after: 55 },
            ),
            wordRichParagraph([
              { text: 'Hit Points: ', bold: true, color: '7A5D00' },
              {
                text: `${hpCurrent} / ${hpMax}${hpTemp ? ` + ${hpTemp} Temp HP` : ''}`,
              },
            ]),
            wordRichSection('Equipped'),
            equippedItems.length
              ? equippedItems
                  .map((item) =>
                    wordRichParagraph(
                      item.type === 'Weapon'
                        ? [
                            { text: `${item.name}: `, bold: true },
                            { text: `Attack Roll ${item.attackRoll}; ` },
                            { text: `Damage Roll ${item.damageRoll}` },
                          ]
                        : [
                            { text: `${item.name}: `, bold: true },
                            { text: `Armor Class ${item.armorClass}` },
                          ],
                      { bullet: true, after: 65 },
                    ),
                  )
                  .join('')
              : wordRichParagraph('No equipped weapons or armor.'),
            wordRichSection('Spells & Abilities'),
            spellNames.length
              ? spellNames
                  .map((name) =>
                    wordRichParagraph([{ text: name, bold: true }], {
                      bullet: true,
                      after: 45,
                    }),
                  )
                  .join('')
              : wordRichParagraph('No spells or abilities.'),
            wordRichSection('Ability Scores'),
            abilityItems.length
              ? abilityItems
                  .map((ability) =>
                    wordRichParagraph(
                      [
                        { text: `${ability.name}: `, bold: true },
                        { text: `Score ${ability.score}; ` },
                        { text: `Modifier ${ability.modifier}` },
                      ],
                      { bullet: true, after: 45 },
                    ),
                  )
                  .join('')
              : wordRichParagraph('No ability scores.'),
            wordRichSection('Skills'),
            skillItems.length
              ? skillItems
                  .map((skill) =>
                    wordRichParagraph(
                      [
                        { text: `${skill.name}: `, bold: true },
                        { text: `Modifier ${skill.modifier}` },
                      ],
                      { bullet: true, after: 45 },
                    ),
                  )
                  .join('')
              : wordRichParagraph('No skills.'),
          ].join('');
        })
        .join('');

      const resourceAppendix = reportCharacters
        .map((character) => {
          const rows = character.resources
            .filter((resource) => resource.name?.trim())
            .map((resource) => {
              const total =
                resource.mode === 'numbers'
                  ? Math.max(1, Number(resource.total) || 1)
                  : Math.max(1, resource.bars?.length || 1);
              const current =
                resource.mode === 'numbers'
                  ? Math.max(0, Number(resource.current) || 0)
                  : (resource.bars ?? []).filter(Boolean).length;
              return [resource.name, String(current), String(total)];
            });
          return [
            wordRichHeading(character.name || 'Unnamed Character', 3),
            rows.length
              ? rows
                  .map(([name, current, total]) =>
                    wordRichParagraph(
                      [
                        { text: `${name}: `, bold: true },
                        { text: `${current} / ${total}` },
                      ],
                      { bullet: true, after: 45 },
                    ),
                  )
                  .join('')
              : wordRichParagraph('No Resource Pools.'),
          ].join('');
        })
        .join('');

      const spellAppendix = reportCharacters
        .map((character) => {
          const spells = character.spells.filter((spell) =>
            spell.name?.trim(),
          );
          return [
            wordRichHeading(character.name || 'Unnamed Character', 3),
            spells.length
              ? spells
                  .map((spell) =>
                    [
                      wordRichParagraph(
                        [{ text: spell.name, bold: true, color: '7A5D00' }],
                        { size: 28, after: 35, keepNext: true },
                      ),
                      wordRichParagraph(
                        spell.flavorText?.trim() || 'No Flavour Text.',
                        { size: 28, after: 130 },
                      ),
                    ].join(''),
                  )
                  .join('')
              : wordRichParagraph('No spells or abilities.'),
          ].join('');
        })
        .join('');

      const documentBody = [
        characterSummaries,
        wordPageBreak(),
        wordRichHeading('Party Appendix'),
        wordRichSection('Resource Pools'),
        resourceAppendix,
        wordPageBreak(),
        wordRichSection('Spell & Ability Flavour Text'),
        spellAppendix,
        '<w:sectPr><w:pgSz w:w="12240" w:h="15840"/><w:pgMar w:top="720" w:right="720" w:bottom="720" w:left="720" w:header="360" w:footer="360" w:gutter="0"/></w:sectPr>',
      ].join('');

      const zip = new JSZip();
      zip.file(
        '[Content_Types].xml',
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/><Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/></Types>`,
      );
      zip.folder('_rels').file(
        '.rels',
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/><Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/></Relationships>`,
      );
      zip.folder('word').file(
        'document.xml',
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>${documentBody}</w:body></w:document>`,
      );
      zip.folder('word').folder('_rels').file(
        'document.xml.rels',
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"/>`,
      );
      zip.folder('docProps').file(
        'core.xml',
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><dc:title>All Character Reports</dc:title><dc:creator>Vanfreyr&apos;s Character Sheet</dc:creator><dcterms:created xsi:type="dcterms:W3CDTF">${new Date().toISOString()}</dcterms:created></cp:coreProperties>`,
      );
      zip.folder('docProps').file(
        'app.xml',
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties"><Application>Vanfreyr&apos;s Character Sheet</Application></Properties>`,
      );
      const blob = await zip.generateAsync({
        type: 'blob',
        mimeType:
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Vanfreyrs-All-Characters-Report.docx';
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      setImportStatus(
        `DOCX report downloaded for ${reportCharacters.length} character${reportCharacters.length === 1 ? '' : 's'}.`,
      );
    } catch (error) {
      console.error(error);
      setImportStatus('Could not create the all-characters DOCX report.');
    }
  };

  const importCharacterTxt = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const parsed = JSON.parse(await file.text());
      if (Array.isArray(parsed.characters) && parsed.characters.length) {
        const importedCharacters = parsed.characters
          .slice(0, maxCharacters)
          .map(normalizeCharacter);
        const importedActiveId = importedCharacters.some(
          (character) => character.id === parsed.activeId,
        )
          ? parsed.activeId
          : importedCharacters[0].id;
        setCharacters(importedCharacters);
        setActiveId(importedActiveId);
        if (Array.isArray(parsed.customSpellLibrary)) {
          setCustomSpellLibrary(parsed.customSpellLibrary);
        }
        setImportStatus('All characters restored from the saved sheet.');
        return;
      }

      const importedCharacter = normalizeCharacter({
        ...(parsed.character ?? parsed),
        id: crypto.randomUUID(),
      });

      if (characters().length >= maxCharacters) {
        updateActiveCharacter(importedCharacter);
        setActiveId(importedCharacter.id);
        setImportStatus('Imported into the active tab.');
      } else {
        setCharacters((current) => [...current, importedCharacter]);
        setActiveId(importedCharacter.id);
        setImportStatus('Imported into a new tab.');
      }
    } catch {
      setImportStatus('Could not import that text file.');
    } finally {
      event.target.value = '';
    }
  };
  
  const updateCharacterName = (value) => {
    const current = getCurrentCharacter();
    setCharacters(chars => chars.map(char =>
      char.id === activeCharacterId() ? { ...char, name: value } : char
    ));
    updateCharacter({ name: value });
  };
  
  const updateCharacterClass = (value) => {
    updateCharacter({ class: value });
  };
  
  const updateFeatures = (value) => {
    updateCharacter({ features: value.slice(0, 3000) });
  };
  
  // Action Economy Functions
  const toggleAction = (id) => {
    const current = getCurrentCharacter();
    updateCharacter({
      actionButtons: current.actionButtons.map(action =>
        action.id === id ? { ...action, active: !action.active } : action
      )
    });
  };
  
  const addActionButton = (name) => {
    const current = getCurrentCharacter();
    if (name.trim()) {
      updateCharacter({
        actionButtons: [...current.actionButtons, { id: current.actionIdCounter, name, active: false }],
        actionIdCounter: current.actionIdCounter + 1
      });
    }
  };
  
  const updateActionName = (id, newName) => {
    const current = getCurrentCharacter();
    updateCharacter({
      actionButtons: current.actionButtons.map(action =>
        action.id === id ? { ...action, name: newName } : action
      )
    });
  };
  
  const removeActionButton = (id) => {
    const current = getCurrentCharacter();
    updateCharacter({
      actionButtons: current.actionButtons.filter(action => action.id !== id)
    });
  };
  
  // Skills Functions
  const addSkill = () => {
    const current = getCurrentCharacter();
    updateCharacter({
      skills: [...current.skills, { id: current.skillIdCounter, name: '', modifier: 0 }],
      skillIdCounter: current.skillIdCounter + 1
    });
  };
  
  const updateSkill = (id, field, value) => {
    const current = getCurrentCharacter();
    updateCharacter({
      skills: current.skills.map(skill =>
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    });
  };
  
  const removeSkill = (id) => {
    const current = getCurrentCharacter();
    updateCharacter({
      skills: current.skills.filter(skill => skill.id !== id)
    });
  };
  
  // Resources Functions
  const addResource = () => {
    const current = getCurrentCharacter();
    updateCharacter({
      resources: [...current.resources, { id: current.resourceIdCounter, name: '', current: 0, total: 0 }],
      resourceIdCounter: current.resourceIdCounter + 1
    });
  };
  
  const updateResource = (id, field, value) => {
    const current = getCurrentCharacter();
    updateCharacter({
      resources: current.resources.map(resource =>
        resource.id === id ? { ...resource, [field]: value } : resource
      )
    });
  };
  
  const removeResource = (id) => {
    const current = getCurrentCharacter();
    updateCharacter({
      resources: current.resources.filter(resource => resource.id !== id)
    });
  };
  
  // Spells Functions
  const addSpell = () => {
    const current = getCurrentCharacter();
    updateCharacter({
      spells: [...current.spells, { id: current.spellIdCounter, name: '', resource: '', actionEconomy: '' }],
      spellIdCounter: current.spellIdCounter + 1
    });
  };
  
  const updateSpell = (id, field, value) => {
    const current = getCurrentCharacter();
    updateCharacter({
      spells: current.spells.map(spell =>
        spell.id === id ? { ...spell, [field]: value } : spell
      )
    });
  };
  
  const removeSpell = (id) => {
    const current = getCurrentCharacter();
    updateCharacter({
      spells: current.spells.filter(spell => spell.id !== id)
    });
  };
  
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const current = getCurrentCharacter();

  return (
    <div class="app-container">
<<<<<<< HEAD
      <h1>D&D Character Sheet</h1>
      
      {/* Character Tabs */}
      <div class="tabs-container">
        <For each={characters()}>
          {(char) => (
            <button
              class={`tab ${char.id === activeCharacterId() ? 'active' : ''}`}
              onClick={() => setActiveCharacterId(char.id)}
            >
              {char.name || `Character ${char.id}`}
            </button>
          )}
        </For>
      </div>

      <Show when={current}>
        {/* Portrait, Name, Class */}
        <div class="character-header">
          <div class="portrait-section">
            <div class="portrait-box">
              <Show when={current.portrait} fallback={<span>No Portrait</span>}>
                <img src={current.portrait} alt="Character Portrait" class="portrait-image" />
              </Show>
            </div>
            <input 
              type="file" 
              accept=".png,.jpg,.jpeg" 
              onChange={handlePortraitUpload}
              class="portrait-input"
            />
          </div>
          
          <div class="basic-info">
            <div class="input-group">
              <label>Name</label>
              <input 
                type="text" 
                value={current.name} 
                onInput={(e) => updateCharacterName(e.target.value)}
                placeholder="Character Name"
              />
            </div>
            <div class="input-group">
              <label>Class</label>
              <input 
                type="text" 
                value={current.class} 
                onInput={(e) => updateCharacterClass(e.target.value)}
                placeholder="Character Class"
              />
            </div>
          </div>
        </div>

        {/* Action Economy */}
        <section class="section">
          <h2>Action Economy</h2>
          <div class="action-buttons-container">
            <For each={current.actionButtons}>
              {(action) => (
                <div class="action-button-wrapper">
                  <button 
                    onClick={() => toggleAction(action.id)}
                    class={`action-button ${action.active ? 'active' : ''}`}
                  >
                    {action.name}
                  </button>
                  <input 
                    type="text" 
                    value={action.name}
                    onInput={(e) => updateActionName(action.id, e.target.value)}
                    class="action-edit-input"
                    placeholder="Button name"
                  />
                  <button onClick={() => removeActionButton(action.id)} class="btn-remove-small">✕</button>
                </div>
              )}
            </For>
          </div>
          <div class="add-action-section">
            <input 
              type="text" 
              id="new-action-input"
              placeholder="New button name"
              class="action-name-input"
            />
            <button 
              onClick={() => {
                const input = document.getElementById('new-action-input');
                addActionButton(input.value);
                input.value = '';
              }} 
              class="btn-add"
            >
              + Add Button
            </button>
          </div>
        </section>

        {/* Resource Pools */}
        <section class="section">
          <h2>Resource Pools</h2>
          <table class="resources-table">
            <thead>
              <tr>
                <th>Resource</th>
                <th>Current</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <For each={current.resources}>
                {(resource) => (
                  <tr>
                    <td>
                      <input 
                        type="text" 
                        value={resource.name}
                        onInput={(e) => updateResource(resource.id, 'name', e.target.value)}
                        placeholder="Resource Name"
                      />
                    </td>
                    <td>
                      <input 
                        type="number" 
                        value={resource.current}
                        onInput={(e) => updateResource(resource.id, 'current', e.target.value)}
                        placeholder="0"
                      />
                    </td>
                    <td>
                      <input 
                        type="number" 
                        value={resource.total}
                        onInput={(e) => updateResource(resource.id, 'total', e.target.value)}
                        placeholder="0"
                      />
                    </td>
                    <td>
                      <button onClick={() => removeResource(resource.id)} class="btn-remove">Remove</button>
                    </td>
                  </tr>
                )}
              </For>
            </tbody>
          </table>
          <button onClick={addResource} class="btn-add">+ Add Resource</button>
        </section>

        {/* Spells and Abilities */}
        <section class="section">
          <h2>Spells and Abilities</h2>
          <table class="spells-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Resource</th>
                <th>Action Economy</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <For each={current.spells}>
                {(spell) => (
                  <tr>
                    <td>
                      <input 
                        type="text" 
                        value={spell.name}
                        onInput={(e) => updateSpell(spell.id, 'name', e.target.value)}
                        placeholder="Name"
                      />
                    </td>
                    <td>
                      <input 
                        type="text" 
                        value={spell.resource}
                        onInput={(e) => updateSpell(spell.id, 'resource', e.target.value)}
                        placeholder="Resource"
                      />
                    </td>
                    <td>
                      <input 
                        type="text" 
                        value={spell.actionEconomy}
                        onInput={(e) => updateSpell(spell.id, 'actionEconomy', e.target.value)}
                        placeholder="Action Type"
                      />
                    </td>
                    <td>
                      <button onClick={() => removeSpell(spell.id)} class="btn-remove">Remove</button>
                    </td>
                  </tr>
                )}
              </For>
            </tbody>
          </table>
          <button onClick={addSpell} class="btn-add">+ Add Spell/Ability</button>
        </section>

        {/* Ability Scores - Collapsible */}
        <section class="section collapsible">
          <div class="section-header" onClick={() => toggleSection('abilities')}>
            <h2>Ability Scores {expandedSections().abilities ? '▼' : '▶'}</h2>
          </div>
          <Show when={expandedSections().abilities}>
            <table class="ability-table">
              <thead>
                <tr>
                  <th>Ability</th>
                  <th>Score</th>
                  <th>Modifier</th>
                </tr>
              </thead>
              <tbody>
                <For each={abilities}>
                  {(ability) => (
                    <tr>
                      <td>{ability}</td>
                      <td>
                        <input 
                          type="number" 
                          value={current.abilityScores[ability]}
                          onInput={(e) => updateAbilityScore(ability, e.target.value)}
                          min="1"
                          max="20"
                        />
                      </td>
                      <td class="modifier">{calculateModifier(current.abilityScores[ability]) > 0 ? '+' : ''}{calculateModifier(current.abilityScores[ability])}</td>
                    </tr>
                  )}
                </For>
              </tbody>
            </table>
          </Show>
        </section>

        {/* Features & Traits - Collapsible */}
        <section class="section collapsible">
          <div class="section-header" onClick={() => toggleSection('features')}>
            <h2>Features & Traits {expandedSections().features ? '▼' : '▶'}</h2>
          </div>
          <Show when={expandedSections().features}>
            <textarea 
              value={current.features}
              onInput={(e) => updateFeatures(e.target.value)}
              placeholder="Enter features and traits (max 3000 characters)"
              class="features-textarea"
              maxlength="3000"
            />
            <span class="char-count">{current.features.length}/3000</span>
          </Show>
        </section>
      </Show>
=======
      <header class="app-header">
        <h1>Vanfreyr's Character Sheet</h1>
        <div class="header-actions no-print">
          <button type="button" class="btn-add" onClick={exportActiveCharacterTxt}>
            Save
          </button>
          <button type="button" class="btn-add" onClick={saveAllCharactersTxt}>
            Save All
          </button>
          <label class="btn-add file-button">
            Load
            <input type="file" accept=".txt,text/plain,application/json" onChange={importCharacterTxt} />
          </label>
          <button type="button" class="btn-add" onClick={exportDocxReport}>
            DOCX Report
          </button>
          <button
            type="button"
            class="btn-add"
            onClick={exportAllCharactersDocxReport}
          >
            DOCX All Characters
          </button>
        </div>
      </header>

      <div class="character-tabs no-print" role="tablist" aria-label="Characters">
        <For each={characters()}>
          {(character, index) => (
            <div class="character-tab-group">
              <button
                type="button"
                class={`character-tab ${character.id === activeId() ? 'active' : ''}`}
                onClick={() => setActiveId(character.id)}
                role="tab"
                aria-selected={character.id === activeId()}
              >
                {character.name.trim() || 'Unnamed'}
              </button>
              <div class="character-order-controls" aria-label="Change character order">
                <button
                  type="button"
                  onClick={() => moveCharacter(index(), -1)}
                  disabled={index() === 0}
                  aria-label={`Move ${character.name || 'character'} left`}
                >
                  &lt;
                </button>
                <button
                  type="button"
                  onClick={() => moveCharacter(index(), 1)}
                  disabled={index() === characters().length - 1}
                  aria-label={`Move ${character.name || 'character'} right`}
                >
                  &gt;
                </button>
              </div>
            </div>
          )}
        </For>
        <button
          type="button"
          class="character-tab add-tab"
          onClick={addCharacter}
          disabled={characters().length >= maxCharacters}
        >
          + New
        </button>
      </div>

      <Show when={importStatus()}>
        <p class="import-status no-print">{importStatus()}</p>
      </Show>

      <Show when={exportText()}>
        <section class="export-panel no-print">
          <div class="export-panel-header">
            <strong>TXT Export</strong>
            <button type="button" class="btn-remove-small" onClick={() => setExportText('')}>
              x
            </button>
          </div>
          <textarea readonly value={exportText()} />
        </section>
      </Show>

      <div class="action-layout omit-from-pdf">
        <CollapsibleSection
          class="action-section"
          title={activeCharacter().actionEconomyTitle.trim() || 'Custom'}
          isCollapsed={collapsedSections().actions}
          onToggle={() => toggleSection('actions')}
        >
          <div class={`mini-editor no-print ${collapsedHelp().actionTitle ? 'collapsed' : ''}`}>
            <div class="mini-editor-header">
              <button
                type="button"
                class="mini-editor-toggle"
                onClick={() => toggleHelp('actionTitle')}
                aria-expanded={!collapsedHelp().actionTitle}
              >
                <span>Section Name</span>
                <span>{collapsedHelp().actionTitle ? '+' : '-'}</span>
              </button>
              <button type="button" class="btn-add mini-restore-button" onClick={restoreAllActions}>
                Restore All
              </button>
            </div>
            <Show when={!collapsedHelp().actionTitle}>
              <div class="section-title-editor">
                <input
                  type="text"
                  value={activeCharacter().actionEconomyTitle}
                  onInput={(event) => updateActiveCharacter({ actionEconomyTitle: event.target.value })}
                  placeholder="Custom"
                />
              </div>
            </Show>
          </div>
          <div class="pool-list">
            <Index each={activeCharacter().actionButtons}>
              {(action, index) => (
                <div class="pool-row">
                  <span class="pool-name">{action().name || 'Custom'}</span>
                  <Show
                    when={action().mode === 'numbers'}
                    fallback={
                      <div class="pool-circles" aria-label={`${action().name || 'Custom'} circles`}>
                        <Index each={action().bars}>
                          {(bar, barIndex) => (
                            <button
                              type="button"
                              class={`pool-circle ${bar() ? 'green' : 'red'}`}
                              onClick={() => toggleActionBar(action().id, barIndex)}
                              aria-label={`Custom ${barIndex + 1}`}
                            />
                          )}
                        </Index>
                      </div>
                    }
                  >
                    <div class="numerical-resource">
                      <div
                        class="numerical-resource-total"
                        style={{
                          '--resource-percent': `${Math.min(
                            100,
                            Math.max(
                              0,
                              ((Number(action().current) || 0) /
                                Math.max(1, Number(action().total) || 1)) *
                                100,
                            ),
                          )}%`,
                        }}
                      >
                        <span>
                          {Number(action().current) || 0} / {Number(action().total) || 0}
                        </span>
                      </div>
                      <input
                        type="number"
                        min="0"
                        value={actionUseAmounts()[action().id] ?? ''}
                        onInput={(event) =>
                          setActionUseAmounts((current) => ({
                            ...current,
                            [action().id]: event.target.value,
                          }))
                        }
                        placeholder="#"
                        aria-label={`Amount of ${action().name || 'custom resource'} to use`}
                      />
                      <button
                        type="button"
                        class="btn-add numerical-resource-use"
                        onClick={() => useNumericalAction(action().id)}
                      >
                        Use
                      </button>
                      <input
                        type="number"
                        min="0"
                        value={actionRestoreAmounts()[action().id] ?? ''}
                        onInput={(event) =>
                          setActionRestoreAmounts((current) => ({
                            ...current,
                            [action().id]: event.target.value,
                          }))
                        }
                        placeholder="#"
                        aria-label={`Amount of ${action().name || 'custom resource'} to restore`}
                      />
                      <button
                        type="button"
                        class="btn-add numerical-resource-restore"
                        onClick={() => restoreNumericalAction(action().id)}
                      >
                        Restore
                      </button>
                    </div>
                  </Show>
                  <div class="row-controls no-print">
                    <button type="button" onClick={() => moveActionButton(index, -1)} aria-label="Move up">
                      ^
                    </button>
                    <button type="button" onClick={() => moveActionButton(index, 1)} aria-label="Move down">
                      v
                    </button>
                    <button type="button" onClick={() => removeActionButton(action().id)} aria-label="Remove">
                      x
                    </button>
                  </div>
                </div>
              )}
            </Index>
          </div>
          <div class="add-pool-form no-print">
            <input
              type="text"
              value={newEconomyName()}
              onInput={(event) => setNewEconomyName(event.target.value)}
              placeholder="Custom"
            />
            <select value={newEconomyMode()} onChange={(event) => setNewEconomyMode(event.currentTarget.value)}>
              <option value="circles">Circles</option>
              <option value="numbers">Numerical</option>
            </select>
            <input
              type="number"
              value={newEconomyTotal()}
              min="1"
              max="30"
              onInput={(event) => setNewEconomyTotal(event.target.value)}
              placeholder="Amount"
            />
            <button type="button" onClick={addActionButton} class="btn-add">
              + Add Economy
            </button>
          </div>
        </CollapsibleSection>

      </div>

      <div class="details-resource-grid">
        <CollapsibleSection
          class="character-section"
          title="Character Details"
          isCollapsed={collapsedSections().details}
          onToggle={() => toggleSection('details')}
        >
        <div class="character-header">
          <div class="portrait-section">
            <div class="portrait-box">
              <Show when={activeCharacter().portrait} fallback={<span>No Portrait</span>}>
                <img
                  src={activeCharacter().portrait}
                  alt="Character Portrait"
                  class="portrait-image"
                />
              </Show>
            </div>
            <input
              type="file"
              accept=".png,.jpg,.jpeg"
              onChange={handlePortraitUpload}
              class="portrait-input no-print"
            />
            <div class="equipped-preview">
              <label>Equipped</label>
              <Show
                when={
                  activeCharacter().weapons.some((weapon) => weapon.equipped) ||
                  activeCharacter().armorRows.some((armor) => armor.equipped)
                }
                fallback={<span class="empty-equipped">No equipped gear</span>}
              >
                <For each={activeCharacter().weapons.filter((weapon) => weapon.equipped)}>
                  {(weapon) => (
                    <div class="equipped-item">
                      <button
                        type="button"
                        class={`resource-use-name ${
                          linkedResourcesAvailable(
                            weapon.resourceName ? [weapon.resourceName] : [],
                          )
                            ? 'available'
                            : 'empty'
                        }`}
                        onClick={() => useEquippedWeapon(weapon)}
                        title={
                          weapon.resourceName
                            ? `Use weapon and spend 1 ${weapon.resourceName}`
                            : 'No Resource Pool connected'
                        }
                      >
                        {weapon.name || 'Weapon'}
                      </button>
                      <span>Attack Roll: {weaponAttackRoll(weapon)}</span>
                      <span>Damage Roll: {formatDice(weapon.damageDiceCount, weapon.damageDice)} + {weaponDamageBonus(weapon)}</span>
                      <Show when={weapon.resourceName}>
                        <span>Resource: {weapon.resourceName}</span>
                      </Show>
                    </div>
                  )}
                </For>
                <For each={activeCharacter().armorRows.filter((armor) => armor.equipped)}>
                  {(armor) => (
                    <div class="equipped-item">
                      <strong>{armor.name || 'Armor'}</strong>
                      <span>Armor Class: {armorClass(armor)}</span>
                      <button
                        type="button"
                        class={`shield-toggle no-print ${armor.shieldEnabled ? 'active' : ''}`}
                        onClick={() =>
                          updateArmor(armor.id, 'shieldEnabled', !armor.shieldEnabled)
                        }
                      >
                        Shield {armor.shieldEnabled ? 'On' : 'Off'} (+{Number(armor.shieldBonus) || 0})
                      </button>
                    </div>
                  )}
                </For>
              </Show>
            </div>
            <div class="equipped-preview buffs-preview">
              <label>Buffs</label>
              <Show
                when={activeCharacter().activeBuffs.length}
                fallback={<span class="empty-equipped">No buffs</span>}
              >
                <Index each={activeCharacter().activeBuffs}>
                  {(buff) => (
                    <div class={`equipped-item active-buff-preview ${buff().active ? 'active' : 'inactive'}`}>
                      <button
                        type="button"
                        class={`buff-button preview-buff-toggle no-print ${buff().active ? 'green' : 'red'}`}
                        onClick={() => toggleActiveBuff(buff().id)}
                      >
                        {buff().name || 'Buff'}
                      </button>
                      <For each={buff().effects ?? []}>
                        {(effect) => (
                          <Show when={effect.type && effect.type !== 'none'}>
                            <span>{buffEffectText(effect)}</span>
                          </Show>
                        )}
                      </For>
                    </div>
                  )}
                </Index>
              </Show>
            </div>
          </div>

          <div class="basic-info">
            <div class="character-identity-panel">
              <div class="mini-section-heading">
                <label>Character Information</label>
                <button
                  type="button"
                  class="btn-toggle-math no-print"
                  onClick={() => toggleSection('characterIdentity')}
                >
                  {collapsedSections().characterIdentity ? '+' : '-'}
                </button>
              </div>
              <Show when={!collapsedSections().characterIdentity}>
                <div class="character-identity-fields">
                  <div class="input-group">
                    <label>Name</label>
                    <input
                      type="text"
                      value={activeCharacter().name}
                      onInput={(event) => updateActiveCharacter({ name: event.target.value })}
                      placeholder="Character Name"
                    />
                  </div>
                  <div class="input-group">
                    <label>Class</label>
                    <input
                      type="text"
                      value={activeCharacter().characterClass}
                      onInput={(event) =>
                        updateActiveCharacter({ characterClass: event.target.value })
                      }
                      placeholder="Character Class"
                    />
                  </div>
                  <div class="input-group">
                    <div class="character-level-row">
                      <label>
                        <span>Character Level</span>
                        <input
                          type="number"
                          min="1"
                          max="20"
                          value={activeCharacter().characterLevel}
                          onInput={(event) =>
                            updateActiveCharacter({ characterLevel: Number(event.target.value) || 1 })
                          }
                          placeholder="#"
                        />
                      </label>
                      <span class="proficiency-display">
                        Proficiency Modifier: +{proficiencyBonus()}
                      </span>
                    </div>
                  </div>
                </div>
              </Show>
            </div>
            <div class="detail-stats-grid">
              <div class="input-group">
                <div class="mini-section-heading">
                  <label>Hit Points</label>
                  <button
                    type="button"
                    class="btn-toggle-math no-print"
                    onClick={() => updateActiveCharacter({ showHitPointMath: !activeCharacter().showHitPointMath })}
                  >
                    {activeCharacter().showHitPointMath ? 'Hide Math' : 'Show Math'}
                  </button>
                  <button type="button" class="btn-toggle-math no-print" onClick={healToFull}>
                    Heal to Full
                  </button>
                </div>
                <div class="hit-points-panel">
                  <div class="hp-summary">
                    <div
                      class="hp-progress"
                      style={{
                        '--hp-percent': `${Math.max(
                          0,
                          Math.min(
                            100,
                            ((Number(activeCharacter().hpCurrent) || 0) /
                              Math.max(1, Number(activeCharacter().hpMax) || 1)) *
                              100,
                          ),
                        )}%`,
                      }}
                    >
                      <span>
                        Total HP:{' '}
                        {(Number(activeCharacter().hpCurrent) || 0) +
                          (Number(activeCharacter().hpTemp) || 0)}
                      </span>
                    </div>
                  </div>
                  <Show when={activeCharacter().showHitPointMath}>
                    <div class="hp-total-row">
                      <label>
                        <span>Current</span>
                        <input
                          type="number"
                          value={activeCharacter().hpCurrent}
                          onInput={(event) => updateNumberField('hpCurrent', event.target.value)}
                          placeholder="#"
                        />
                      </label>
                      <span>/</span>
                      <label>
                        <span>Total</span>
                        <input
                          type="number"
                          value={activeCharacter().hpMax}
                          onInput={(event) => updateNumberField('hpMax', event.target.value)}
                          placeholder="#"
                        />
                      </label>
                      <span>+</span>
                      <label>
                        <span>Temp HP</span>
                        <input
                          type="number"
                          value={activeCharacter().hpTemp}
                          onInput={(event) => updateNumberField('hpTemp', event.target.value)}
                          placeholder="#"
                        />
                      </label>
                      <span class="calculated-total">
                        = {(Number(activeCharacter().hpCurrent) || 0) + (Number(activeCharacter().hpTemp) || 0)} Total HP
                      </span>
                    </div>
                  </Show>
                  <div class="damage-taken-row no-print">
                    <label>
                      <span>Damage Taken</span>
                      <input
                        type="number"
                        min="0"
                        value={damageTaken()}
                        onInput={(event) => setDamageTaken(event.target.value)}
                        placeholder="#"
                      />
                    </label>
                    <button type="button" class="btn-add" onClick={applyDamageTaken}>
                      OK
                    </button>
                    <label>
                      <span>Damage Healed</span>
                      <input
                        type="number"
                        min="0"
                        value={damageHealed()}
                        onInput={(event) => setDamageHealed(event.target.value)}
                        placeholder="#"
                      />
                    </label>
                    <button type="button" class="btn-add" onClick={applyDamageHealed}>
                      OK
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="character-spells-panel omit-from-pdf">
              <div class="inline-panel-heading">
                <label>Spells & Abilities</label>
                <button
                  type="button"
                  class="btn-toggle-math no-print"
                  onClick={() => toggleSection('favoriteSpells')}
                >
                  {collapsedSections().favoriteSpells ? '+' : '-'}
                </button>
              </div>
              <Show when={!collapsedSections().favoriteSpells}>
                <Show
                  when={activeCharacter().spells.some((spell) => spell.favorite)}
                  fallback={<span class="empty-equipped">No favorite spells or abilities</span>}
                >
                  <table class="favorite-spells-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th
                          class={`favorite-column-heading ${
                            favoriteResourceColumnCollapsed() ? 'collapsed' : ''
                          }`}
                        >
                          <Show when={!favoriteResourceColumnCollapsed()}>
                            <span>Resource</span>
                          </Show>
                          <button
                            type="button"
                            class="favorite-column-toggle no-print"
                            onClick={() =>
                              setFavoriteResourceColumnCollapsed(
                                !favoriteResourceColumnCollapsed(),
                              )
                            }
                            aria-label={
                              favoriteResourceColumnCollapsed()
                                ? 'Show Resource column'
                                : 'Hide Resource column'
                            }
                          >
                            {favoriteResourceColumnCollapsed() ? '+' : '-'}
                          </button>
                        </th>
                        <th
                          class={`favorite-column-heading ${
                            favoriteActionColumnCollapsed() ? 'collapsed' : ''
                          }`}
                        >
                          <Show when={!favoriteActionColumnCollapsed()}>
                            <span>Action Economy</span>
                          </Show>
                          <button
                            type="button"
                            class="favorite-column-toggle no-print"
                            onClick={() =>
                              setFavoriteActionColumnCollapsed(
                                !favoriteActionColumnCollapsed(),
                              )
                            }
                            aria-label={
                              favoriteActionColumnCollapsed()
                                ? 'Show Action Economy column'
                                : 'Hide Action Economy column'
                            }
                          >
                            {favoriteActionColumnCollapsed() ? '+' : '-'}
                          </button>
                        </th>
                        <th
                          class={`favorite-column-heading ${
                            favoriteDescriptionColumnCollapsed() ? 'collapsed' : ''
                          }`}
                        >
                          <Show when={!favoriteDescriptionColumnCollapsed()}>
                            <span>Description</span>
                          </Show>
                          <button
                            type="button"
                            class="favorite-column-toggle no-print"
                            onClick={() =>
                              setFavoriteDescriptionColumnCollapsed(
                                !favoriteDescriptionColumnCollapsed(),
                              )
                            }
                            aria-label={
                              favoriteDescriptionColumnCollapsed()
                                ? 'Show Description column'
                                : 'Hide Description column'
                            }
                          >
                            {favoriteDescriptionColumnCollapsed() ? '+' : '-'}
                          </button>
                        </th>
                        <th
                          class={`favorite-column-heading ${
                            favoriteFlavorColumnCollapsed() ? 'collapsed' : ''
                          }`}
                        >
                          <Show when={!favoriteFlavorColumnCollapsed()}>
                            <span>Flavour Text</span>
                          </Show>
                          <button
                            type="button"
                            class="favorite-column-toggle no-print"
                            onClick={() =>
                              setFavoriteFlavorColumnCollapsed(
                                !favoriteFlavorColumnCollapsed(),
                              )
                            }
                            aria-label={
                              favoriteFlavorColumnCollapsed()
                                ? 'Show Flavour Text column'
                                : 'Hide Flavour Text column'
                            }
                          >
                            {favoriteFlavorColumnCollapsed() ? '+' : '-'}
                          </button>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <For each={activeCharacter().spells.filter((spell) => spell.favorite)}>
                        {(spell) => (
                          <>
                            <tr>
                              <td>
                                <button
                                  type="button"
                                  class={`resource-use-name ${
                                    linkedResourcesAvailable(
                                      spell.resourceEntries?.length
                                        ? spell.resourceEntries
                                        : [spell.resource],
                                    )
                                      ? 'available'
                                      : 'empty'
                                  }`}
                                  onClick={() => useFavoriteSpell(spell)}
                                  title="Use spell or ability and spend its connected resources"
                                >
                                  {spell.name || 'Spell/Ability'}
                                </button>
                              </td>
                              <td
                                class={
                                  favoriteResourceColumnCollapsed()
                                    ? 'favorite-collapsible-cell collapsed'
                                    : 'favorite-collapsible-cell'
                                }
                              >
                                <Show when={!favoriteResourceColumnCollapsed()}>
                                  {spellResourceText(spell) || '-'}
                                </Show>
                              </td>
                              <td
                                class={
                                  favoriteActionColumnCollapsed()
                                    ? 'favorite-collapsible-cell collapsed'
                                    : 'favorite-collapsible-cell'
                                }
                              >
                                <Show when={!favoriteActionColumnCollapsed()}>
                                  {spellActionText(spell) || '-'}
                                </Show>
                              </td>
                              <td
                                class={`favorite-description-cell ${
                                  favoriteDescriptionColumnCollapsed() ? 'collapsed' : ''
                                }`}
                              >
                                <Show when={!favoriteDescriptionColumnCollapsed()}>
                                  <div class="readonly-dice-list">
                                    <For each={spell.diceRolls ?? []}>
                                      {(diceRoll) => (
                                        <span>
                                          {diceRoll.name || 'Roll'}: {diceRollTotal(diceRoll)}
                                        </span>
                                      )}
                                    </For>
                                    <For each={spell.customCalculations ?? []}>
                                      {(customCalculation) => (
                                        <Show when={customCalculation.text}>
                                          <span>{customCalculation.text}</span>
                                        </Show>
                                      )}
                                    </For>
                                  </div>
                                </Show>
                              </td>
                              <td
                                class={`favorite-flavor-cell ${
                                  favoriteFlavorColumnCollapsed() ? 'collapsed' : ''
                                }`}
                              >
                                <Show when={!favoriteFlavorColumnCollapsed()}>
                                  <div>{spell.flavorText?.trim() || '-'}</div>
                                </Show>
                              </td>
                            </tr>
                          </>
                        )}
                      </For>
                    </tbody>
                  </table>
                </Show>
              </Show>
            </div>
            <div class="character-resource-panel omit-from-pdf">
              <div class="inline-panel-heading">
                <label>Resource Pools</label>
                <button type="button" class="btn-toggle-math no-print" onClick={restoreAllResources}>
                  Restore All
                </button>
                <button
                  type="button"
                  class="btn-toggle-math no-print"
                  onClick={() => {
                    setResourceControlsCollapsed(!resourceControlsCollapsed());
                    setEditingResourceId(null);
                  }}
                  aria-label={
                    resourceControlsCollapsed()
                      ? 'Show Resource Pool controls'
                      : 'Hide Resource Pool controls'
                  }
                >
                  Controls {resourceControlsCollapsed() ? '+' : '-'}
                </button>
                <button
                  type="button"
                  class="btn-toggle-math no-print"
                  onClick={() => toggleSection('resources')}
                >
                  {collapsedSections().resources ? '+' : '-'}
                </button>
              </div>
              <Show when={!collapsedSections().resources}>
                <div class="pool-list">
                  <Index each={activeCharacter().resources}>
                    {(resource, index) => (
                      <div
                        class={`pool-row ${
                          resourceControlsCollapsed() ? 'controls-collapsed' : ''
                        }`}
                      >
                        <Show
                          when={editingResourceId() === resource().id}
                          fallback={
                            <>
                              <span class="pool-name">{resource().name || 'Resource'}</span>
                              <Show
                                when={resource().mode === 'numbers'}
                                fallback={
                                  <div class="pool-blips-with-fill">
                                    <div class="pool-circles" aria-label={`${resource().name || 'Resource'} bars`}>
                                      <Index each={resource().bars}>
                                        {(bar, barIndex) => (
                                          <button
                                            type="button"
                                            class={`pool-circle ${bar() ? 'green' : 'red'} ${resource().permanent ? 'permanent' : ''}`}
                                            onClick={() => toggleResourceBar(resource().id, barIndex)}
                                            aria-label={
                                              resource().permanent
                                                ? 'Permanent cantrip'
                                                : `Bar ${barIndex + 1}`
                                            }
                                            title={resource().permanent ? 'Cantrips are always available' : ''}
                                          />
                                        )}
                                      </Index>
                                    </div>
                                    <Show when={!resource().permanent}>
                                      <button
                                        type="button"
                                        class="btn-toggle-math resource-fill-button no-print"
                                        onClick={() => fillResourceBlips(resource().id)}
                                      >
                                        Fill
                                      </button>
                                    </Show>
                                  </div>
                                }
                              >
                                <div class="numerical-resource">
                                  <div
                                    class="numerical-resource-total"
                                    style={{
                                      '--resource-percent': `${Math.min(
                                        100,
                                        Math.max(
                                          0,
                                          ((Number(resource().current) || 0) /
                                            Math.max(1, Number(resource().total) || 1)) *
                                            100,
                                        ),
                                      )}%`,
                                    }}
                                  >
                                    <span>
                                      {Number(resource().current) || 0} / {Number(resource().total) || 0}
                                    </span>
                                  </div>
                                  <input
                                    type="number"
                                    min="0"
                                    value={resourceUseAmounts()[resource().id] ?? ''}
                                    onInput={(event) =>
                                      setResourceUseAmounts((current) => ({
                                        ...current,
                                        [resource().id]: event.target.value,
                                      }))
                                    }
                                    placeholder="#"
                                    aria-label={`Amount of ${resource().name || 'resource'} to use`}
                                  />
                                  <button
                                    type="button"
                                    class="btn-add numerical-resource-use"
                                    onClick={() => useNumericalResource(resource().id)}
                                  >
                                    Use
                                  </button>
                                  <input
                                    type="number"
                                    min="0"
                                    value={resourceRestoreAmounts()[resource().id] ?? ''}
                                    onInput={(event) =>
                                      setResourceRestoreAmounts((current) => ({
                                        ...current,
                                        [resource().id]: event.target.value,
                                      }))
                                    }
                                    placeholder="#"
                                    aria-label={`Amount of ${resource().name || 'resource'} to restore`}
                                  />
                                  <button
                                    type="button"
                                    class="btn-add numerical-resource-restore"
                                    onClick={() => restoreNumericalResource(resource().id)}
                                  >
                                    Restore
                                  </button>
                                </div>
                              </Show>
                            </>
                          }
                        >
                          <input
                            class="resource-edit-name"
                            type="text"
                            value={resource().name}
                            onInput={(event) =>
                              updateResourceName(resource().id, event.target.value)
                            }
                            placeholder="Resource name"
                          />
                          <label class="resource-edit-total">
                            <span>
                              {resource().mode === 'numbers' ? 'Total' : 'Total Blips'}
                            </span>
                            <input
                              type="number"
                              min="1"
                              max="30"
                              disabled={resource().permanent}
                              value={resource().total}
                              onInput={(event) =>
                                updateResourceTotal(resource().id, event.target.value)
                              }
                            />
                          </label>
                          <Show when={!resource().permanent}>
                            <select
                              class="resource-edit-mode"
                              value={resource().mode}
                              onChange={(event) =>
                                updateResourceMode(resource().id, event.currentTarget.value)
                              }
                              aria-label="Resource display type"
                            >
                              <option value="circles">Circles</option>
                              <option value="numbers">Numerical</option>
                            </select>
                          </Show>
                        </Show>
                        <Show when={!resourceControlsCollapsed()}>
                          <div class="row-controls no-print">
                            <button
                              type="button"
                              onClick={() =>
                                setEditingResourceId(
                                  editingResourceId() === resource().id
                                    ? null
                                    : resource().id,
                                )
                              }
                              aria-label={
                                editingResourceId() === resource().id
                                  ? 'Finish editing'
                                  : 'Edit resource'
                              }
                            >
                              {editingResourceId() === resource().id ? 's' : 'e'}
                            </button>
                            <button type="button" onClick={() => moveResource(index, -1)} aria-label="Move up">
                              ^
                            </button>
                            <button type="button" onClick={() => moveResource(index, 1)} aria-label="Move down">
                              v
                            </button>
                            <button type="button" onClick={() => removeResource(resource().id)} aria-label="Remove">
                              x
                            </button>
                          </div>
                        </Show>
                      </div>
                    )}
                  </Index>
                </div>
                <div class="add-form-panel no-print">
                  <button
                    type="button"
                    class="add-form-toggle"
                    onClick={() => toggleHelp('addResourceForm')}
                    aria-expanded={!collapsedHelp().addResourceForm}
                  >
                    <span>Add Resource</span>
                    <span>{collapsedHelp().addResourceForm ? '+' : '-'}</span>
                  </button>
                  <Show when={!collapsedHelp().addResourceForm}>
                    <div class="add-pool-form">
                      <select
                        value={resourcePresets.includes(newResourceName()) ? newResourceName() : 'custom'}
                        onChange={(event) =>
                          setNewResourceName(
                            event.currentTarget.value === 'custom'
                              ? ''
                              : event.currentTarget.value,
                          )
                        }
                        aria-label="Resource type"
                      >
                        <option value="custom">Custom</option>
                        <For each={resourcePresets}>
                          {(resource) => <option value={resource}>{resource}</option>}
                        </For>
                      </select>
                      <Show when={!resourcePresets.includes(newResourceName())}>
                        <input
                          type="text"
                          value={newResourceName()}
                          onInput={(event) => setNewResourceName(event.target.value)}
                          onBlur={finishResourceName}
                          placeholder="Type custom resource"
                        />
                        <select
                          value={newResourceMode()}
                          onChange={(event) => setNewResourceMode(event.currentTarget.value)}
                          aria-label="Custom resource display type"
                        >
                          <option value="circles">Circles</option>
                          <option value="numbers">Numerical</option>
                        </select>
                      </Show>
                      <Show when={newResourceName() === 'Spell'}>
                        <select
                          value={newResourceSpellLevel()}
                          onChange={(event) => setNewResourceSpellLevel(event.currentTarget.value)}
                          aria-label="Spell level"
                        >
                          <For each={Array.from({ length: 9 }, (_, index) => String(index + 1))}>
                            {(level) => <option value={level}>Level {level}</option>}
                          </For>
                        </select>
                      </Show>
                      <Show when={newResourceName() !== 'Cantrip'}>
                        <input
                          type="number"
                          value={newResourceTotal()}
                          min="1"
                          max="30"
                          onInput={(event) => setNewResourceTotal(event.target.value)}
                          placeholder={
                            newResourceName() === 'Lay on Hands' ||
                            (!resourcePresets.includes(newResourceName()) &&
                              newResourceMode() === 'numbers')
                              ? 'Total'
                              : 'Total Bars'
                          }
                        />
                      </Show>
                      <button type="button" onClick={addResource} class="btn-add">
                        + Add Resource
                      </button>
                    </div>
                  </Show>
                </div>
              </Show>
            </div>
            <div class="character-skills-panel">
              <div class="inline-panel-heading">
                <label>Skills</label>
                <button
                  type="button"
                  class="btn-toggle-math no-print"
                  onClick={() => toggleSection('skills')}
                >
                  {collapsedSections().skills ? '+' : '-'}
                </button>
              </div>
              <Show when={!collapsedSections().skills}>
                <table class="skills-table">
                  <thead>
                    <tr>
                      <th>Skill</th>
                      <th
                        class={`skill-column-heading ${
                          skillAbilityColumnCollapsed() ? 'collapsed' : ''
                        }`}
                      >
                        <Show when={!skillAbilityColumnCollapsed()}>
                          <span>Ability</span>
                        </Show>
                        <button
                          type="button"
                          class="favorite-column-toggle no-print"
                          onClick={() =>
                            setSkillAbilityColumnCollapsed(
                              !skillAbilityColumnCollapsed(),
                            )
                          }
                          aria-label={
                            skillAbilityColumnCollapsed()
                              ? 'Show Skill Ability column'
                              : 'Hide Skill Ability column'
                          }
                        >
                          {skillAbilityColumnCollapsed() ? '+' : '-'}
                        </button>
                      </th>
                      <th
                        class={`skill-column-heading ${
                          skillProficiencyColumnCollapsed() ? 'collapsed' : ''
                        }`}
                      >
                        <Show when={!skillProficiencyColumnCollapsed()}>
                          <span>Proficiency</span>
                        </Show>
                        <button
                          type="button"
                          class="favorite-column-toggle no-print"
                          onClick={() =>
                            setSkillProficiencyColumnCollapsed(
                              !skillProficiencyColumnCollapsed(),
                            )
                          }
                          aria-label={
                            skillProficiencyColumnCollapsed()
                              ? 'Show Skill Proficiency column'
                              : 'Hide Skill Proficiency column'
                          }
                        >
                          {skillProficiencyColumnCollapsed() ? '+' : '-'}
                        </button>
                      </th>
                      <th
                        class={`skill-column-heading ${
                          skillBuffsColumnCollapsed() ? 'collapsed' : ''
                        }`}
                      >
                        <Show when={!skillBuffsColumnCollapsed()}>
                          <span>Buffs</span>
                        </Show>
                        <button
                          type="button"
                          class="favorite-column-toggle no-print"
                          onClick={() =>
                            setSkillBuffsColumnCollapsed(
                              !skillBuffsColumnCollapsed(),
                            )
                          }
                          aria-label={
                            skillBuffsColumnCollapsed()
                              ? 'Show Skill Buffs column'
                              : 'Hide Skill Buffs column'
                          }
                        >
                          {skillBuffsColumnCollapsed() ? '+' : '-'}
                        </button>
                      </th>
                      <th>Modifier</th>
                      <th
                        class={`skill-column-heading no-print ${
                          skillActionColumnCollapsed() ? 'collapsed' : ''
                        }`}
                      >
                        <Show when={!skillActionColumnCollapsed()}>
                          <span>Action</span>
                        </Show>
                        <button
                          type="button"
                          class="favorite-column-toggle"
                          onClick={() =>
                            setSkillActionColumnCollapsed(
                              !skillActionColumnCollapsed(),
                            )
                          }
                          aria-label={
                            skillActionColumnCollapsed()
                              ? 'Show Skill Action column'
                              : 'Hide Skill Action column'
                          }
                        >
                          {skillActionColumnCollapsed() ? '+' : '-'}
                        </button>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <Index each={activeCharacter().skills.filter((skill) => skill.name?.trim())}>
                      {(skill, index) => (
                        <tr>
                          <td>
                            <Show
                              when={editingSkillId() === skill().id}
                              fallback={skill().name || 'Skill'}
                            >
                              <input
                                type="text"
                                value={skill().name}
                                onInput={(event) =>
                                  updateSkill(skill().id, 'name', event.target.value)
                                }
                                placeholder="Skill name"
                              />
                            </Show>
                          </td>
                          <td class={skillAbilityColumnCollapsed() ? 'skill-collapsible-cell collapsed' : 'skill-collapsible-cell'}>
                            <Show when={!skillAbilityColumnCollapsed()}>
                              <Show
                                when={editingSkillId() === skill().id}
                                fallback={skill().abilityName || 'Manual'}
                              >
                                <select
                                  value={skill().abilityName}
                                  onChange={(event) =>
                                    updateSkill(
                                      skill().id,
                                      'abilityName',
                                      event.currentTarget.value,
                                    )
                                  }
                                >
                                  <For each={activeCharacter().abilityRows}>
                                    {(ability) => (
                                      <option value={ability.name}>
                                        {ability.name || 'Custom Ability'}
                                      </option>
                                    )}
                                  </For>
                                </select>
                              </Show>
                            </Show>
                          </td>
                          <td class={skillProficiencyColumnCollapsed() ? 'skill-collapsible-cell collapsed' : 'skill-collapsible-cell'}>
                            <Show when={!skillProficiencyColumnCollapsed()}>
                              <Show
                                when={editingSkillId() === skill().id}
                                fallback={
                                  skill().expertise
                                    ? 'Expertise'
                                    : skill().proficient
                                      ? 'Proficient'
                                      : 'None'
                                }
                              >
                                <div class="skill-edit-toggles">
                                  <button
                                    type="button"
                                    class={skill().proficient ? 'active' : ''}
                                    onClick={() => {
                                      const next = !skill().proficient;
                                      updateSkill(skill().id, 'proficient', next);
                                      if (!next) updateSkill(skill().id, 'expertise', false);
                                    }}
                                  >
                                    P
                                  </button>
                                  <button
                                    type="button"
                                    class={skill().expertise ? 'active' : ''}
                                    onClick={() => {
                                      const next = !skill().expertise;
                                      updateSkill(skill().id, 'expertise', next);
                                      if (next) updateSkill(skill().id, 'proficient', true);
                                    }}
                                  >
                                    E
                                  </button>
                                </div>
                              </Show>
                            </Show>
                          </td>
                          <td class={skillBuffsColumnCollapsed() ? 'skill-collapsible-cell collapsed' : 'skill-collapsible-cell'}>
                            <Show when={!skillBuffsColumnCollapsed()}>
                              {targetedBuffTotal('skill', skill().name) >= 0 ? '+' : ''}
                              {targetedBuffTotal('skill', skill().name)}
                            </Show>
                          </td>
                          <td class="modifier">
                            <Show
                              when={editingSkillId() === skill().id}
                              fallback={
                                <>
                                  {calculateSkillModifier(activeCharacter(), skill()) >= 0 ? '+' : ''}
                                  {calculateSkillModifier(activeCharacter(), skill())}
                                </>
                              }
                            >
                              <label class="skill-edit-bonus">
                                <span>Bonus</span>
                                <input
                                  type="number"
                                  value={skill().bonusModifier ?? 0}
                                  onInput={(event) =>
                                    updateSkill(
                                      skill().id,
                                      'bonusModifier',
                                      Number(event.target.value) || 0,
                                    )
                                  }
                                />
                              </label>
                            </Show>
                          </td>
                          <td class={`no-print ${skillActionColumnCollapsed() ? 'skill-collapsible-cell collapsed' : 'skill-collapsible-cell'}`}>
                            <Show when={!skillActionColumnCollapsed()}>
                              <div class="row-controls">
                                <button
                                  type="button"
                                  onClick={() =>
                                    setEditingSkillId(
                                      editingSkillId() === skill().id
                                        ? null
                                        : skill().id,
                                    )
                                  }
                                  aria-label={
                                    editingSkillId() === skill().id
                                      ? 'Finish editing'
                                      : 'Edit skill'
                                  }
                                >
                                  {editingSkillId() === skill().id ? 's' : 'e'}
                                </button>
                                <button type="button" onClick={() => moveSkill(skill().id, -1)} aria-label="Move up">
                                  ^
                                </button>
                                <button type="button" onClick={() => moveSkill(skill().id, 1)} aria-label="Move down">
                                  v
                                </button>
                                <button type="button" onClick={() => removeSkill(skill().id)} aria-label="Remove">
                                  x
                                </button>
                              </div>
                            </Show>
                          </td>
                        </tr>
                    )}
                    </Index>
                  </tbody>
                </table>
                <div class="add-form-panel no-print">
                  <button
                    type="button"
                    class="add-form-toggle"
                    onClick={() => toggleHelp('addSkillForm')}
                    aria-expanded={!collapsedHelp().addSkillForm}
                  >
                    <span>Add Skill</span>
                    <span>{collapsedHelp().addSkillForm ? '+' : '-'}</span>
                  </button>
                  <Show when={!collapsedHelp().addSkillForm}>
                    <div class="add-skill-form">
                  <select
                    value={skillPresets.includes(newSkillName()) ? newSkillName() : 'custom'}
                    onChange={(event) => {
                      const value = event.currentTarget.value;
                      if (value === 'custom') {
                        setNewSkillName('');
                        return;
                      }
                      setNewSkillName(value);
                      setNewSkillAbility(skillAbilityDefaults[value]);
                    }}
                    aria-label="Skill name"
                  >
                    <option value="custom">Custom</option>
                    <For each={skillPresets}>
                      {(skill) => <option value={skill}>{skill}</option>}
                    </For>
                  </select>
                  <Show when={!skillPresets.includes(newSkillName())}>
                    <input
                      type="text"
                      value={newSkillName()}
                      onInput={(event) => setNewSkillName(event.target.value)}
                      onBlur={finishSkillName}
                      placeholder="Type custom skill"
                    />
                  </Show>
                  <select
                    value={newSkillAbility()}
                    onChange={(event) => setNewSkillAbility(event.currentTarget.value)}
                    aria-label="Skill ability"
                  >
                    <For each={activeCharacter().abilityRows}>
                      {(ability) => (
                        <option value={ability.name}>
                          {ability.name || 'Custom Ability'}
                        </option>
                      )}
                    </For>
                  </select>
                  <button
                    type="button"
                    class={`skill-toggle ${newSkillProficient() ? 'active' : ''}`}
                    onClick={() => {
                      const nextValue = !newSkillProficient();
                      setNewSkillProficient(nextValue);
                      if (!nextValue) setNewSkillExpertise(false);
                    }}
                  >
                    Proficiency
                  </button>
                  <button
                    type="button"
                    class={`skill-toggle ${newSkillExpertise() ? 'active' : ''}`}
                    onClick={() => {
                      const nextValue = !newSkillExpertise();
                      setNewSkillExpertise(nextValue);
                      if (nextValue) setNewSkillProficient(true);
                    }}
                  >
                    Expertise
                  </button>
                  <label class="skill-bonus-input">
                    <span>Bonus Modifier</span>
                    <input
                      type="number"
                      value={newSkillBonus()}
                      onInput={(event) => setNewSkillBonus(event.target.value)}
                      placeholder="#"
                    />
                  </label>
                  <div class="skill-math">
                    {(() => {
                      const abilityModifier = characterAbilityModifier(
                        activeCharacter(),
                        newSkillAbility(),
                      );
                      const proficiency = proficiencyBonus();
                      const multiplier = newSkillExpertise()
                        ? 2
                        : newSkillProficient()
                          ? 1
                          : 0;
                      const bonus = Number(newSkillBonus()) || 0;
                      const skillBuff = targetedBuffTotal('skill', newSkillName());
                      const total =
                        abilityModifier + proficiency * multiplier + bonus + skillBuff;
                      return `${newSkillAbility()} ${abilityModifier >= 0 ? '+' : ''}${abilityModifier} + Proficiency ${proficiency >= 0 ? '+' : ''}${proficiency}${multiplier === 2 ? ' x 2' : multiplier === 0 ? ' x 0' : ''} + Bonus ${bonus >= 0 ? '+' : ''}${bonus} + Buff ${skillBuff >= 0 ? '+' : ''}${skillBuff} = ${total >= 0 ? '+' : ''}${total}`;
                    })()}
                  </div>
                  <button type="button" onClick={addSkill} class="btn-add">
                    + Add Skill
                  </button>
                    </div>
                  </Show>
                </div>
              </Show>
            </div>
            <button
              type="button"
              onClick={removeActiveCharacter}
              class="btn-remove align-left no-print"
              disabled={characters().length === 1}
            >
              Delete Character
            </button>
          </div>
        </div>
        </CollapsibleSection>
      </div>

      <CollapsibleSection
        class="buffs-weapons-armors-section omit-from-pdf"
        title="Buffs, Weapons & Armors"
        isCollapsed={collapsedSections().buffsWeaponsArmors}
        onToggle={() => toggleSection('buffsWeaponsArmors')}
      >
        <div class="active-buffs">
          <label>Active Buffs</label>
          <div class="buff-list">
            <Index each={activeCharacter().activeBuffs ?? []}>
              {(buff) => (
                <div class="buff-item">
                  <button
                    type="button"
                    class={`buff-button ${buff().active ? 'green' : 'red'}`}
                    onClick={() => toggleActiveBuff(buff().id)}
                  >
                    {buff().name}
                  </button>
                  <button
                    type="button"
                    class="btn-remove-small no-print"
                    onClick={() => removeActiveBuff(buff().id)}
                  >
                    x
                  </button>
                  <div class="buff-effects no-print">
                    <div class="buff-trigger-editor">
                      <span>Triggered By</span>
                      <div class="buff-trigger-list">
                        <For
                          each={activeCharacter().spells
                            .map((spell, index) => ({ spell, index }))
                            .filter(
                              ({ spell }) =>
                                spell.favorite &&
                                String(spell.linkedBuffId ?? '') ===
                                  String(buff().id),
                            )}
                        >
                          {(entry) => (
                            <span class="buff-trigger-chip">
                              {entry.spell.name || 'Spell/Ability'}
                              <button
                                type="button"
                                onClick={() =>
                                  updateSpellLinkedBuff(entry.index, '')
                                }
                                aria-label={`Unlink ${entry.spell.name || 'Spell/Ability'} from ${buff().name || 'buff'}`}
                              >
                                x
                              </button>
                            </span>
                          )}
                        </For>
                      </div>
                      <select
                        class="buff-trigger-select"
                        value=""
                        onChange={(event) => {
                          const spellId = event.currentTarget.value;
                          if (!spellId) return;
                          updateSpellLinkedBuff(Number(spellId), buff().id);
                          event.currentTarget.value = '';
                        }}
                        aria-label={`Link favorite spell or ability to ${buff().name || 'buff'}`}
                      >
                        <option value="">Link Favorite...</option>
                        <For
                          each={activeCharacter().spells
                            .map((spell, index) => ({ spell, index }))
                            .filter(
                              ({ spell }) =>
                                spell.favorite &&
                                spell.name?.trim() &&
                                String(spell.linkedBuffId ?? '') !==
                                  String(buff().id),
                            )}
                        >
                          {(entry) => (
                            <option value={String(entry.index)}>
                              {entry.spell.name}
                            </option>
                          )}
                        </For>
                      </select>
                    </div>
                    <Index each={buff().effects ?? []}>
                      {(effect) => (
                        <div class="buff-effect-row">
                          <select
                            class="buff-select"
                            value={effect().type ?? 'none'}
                            onChange={(event) =>
                              updateActiveBuffEffect(buff().id, effect().id, 'type', event.currentTarget.value)
                            }
                          >
                            <For each={buffTypes}>
                              {(type) => <option value={type.value}>{type.label}</option>}
                            </For>
                          </select>
                          <Show when={effect().type === 'savingThrow'}>
                            <input
                              class="buff-save-name"
                              type="text"
                              value={effect().saveName}
                              onInput={(event) =>
                                updateActiveBuffEffect(buff().id, effect().id, 'saveName', event.target.value)
                              }
                              placeholder="Saving throw"
                            />
                          </Show>
                          <Show when={effect().type === 'ability'}>
                            <select
                              class="buff-select"
                              value={effect().targetName ?? ''}
                              onChange={(event) =>
                                updateActiveBuffEffect(
                                  buff().id,
                                  effect().id,
                                  'targetName',
                                  event.currentTarget.value,
                                )
                              }
                            >
                              <option value="">Choose Ability</option>
                              <For each={activeCharacter().abilityRows}>
                                {(ability) => (
                                  <option value={ability.name}>{ability.name || 'Custom Ability'}</option>
                                )}
                              </For>
                            </select>
                          </Show>
                          <Show when={effect().type === 'skill'}>
                            <select
                              class="buff-select"
                              value={effect().targetName ?? ''}
                              onChange={(event) =>
                                updateActiveBuffEffect(
                                  buff().id,
                                  effect().id,
                                  'targetName',
                                  event.currentTarget.value,
                                )
                              }
                            >
                              <option value="">Choose Skill</option>
                              <For each={activeCharacter().skills.filter((skill) => skill.name?.trim())}>
                                {(skill) => <option value={skill.name}>{skill.name}</option>}
                              </For>
                            </select>
                          </Show>
                          <input
                            class="buff-value"
                            type="number"
                            value={effect().value ?? 0}
                            onInput={(event) =>
                              updateActiveBuffEffect(buff().id, effect().id, 'value', Number(event.target.value) || 0)
                            }
                            placeholder="#"
                          />
                          <input
                            class="buff-dice-count"
                            type="number"
                            min="0"
                            value={effect().diceCount ?? 0}
                            onInput={(event) =>
                              updateActiveBuffEffect(buff().id, effect().id, 'diceCount', Number(event.target.value) || 0)
                            }
                            placeholder="#"
                          />
                          <span>*</span>
                          <select
                            class="buff-select"
                            value={effect().dice ?? 'd6'}
                            onChange={(event) =>
                              updateActiveBuffEffect(buff().id, effect().id, 'dice', event.currentTarget.value)
                            }
                          >
                            <For each={diceOptions}>
                              {(dice) => <option value={dice}>{dice}</option>}
                            </For>
                          </select>
                          <button
                            type="button"
                            class="btn-remove-small buff-effect-remove"
                            onClick={() =>
                              removeActiveBuffEffect(buff().id, effect().id)
                            }
                            aria-label="Remove this effect"
                          >
                            x
                          </button>
                        </div>
                      )}
                    </Index>
                    <div class="dice-buttons">
                      <button type="button" class="btn-add" onClick={() => addActiveBuffEffect(buff().id)}>
                        + Effect
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </Index>
          </div>
          <div class="add-buff-form no-print">
            <input
              type="text"
              value={newBuffName()}
              onInput={(event) => setNewBuffName(event.target.value)}
              placeholder="Buff Name"
            />
            <button type="button" class="btn-add" onClick={addActiveBuff}>
              + Add Buff
            </button>
          </div>
        </div>

        <div class="combat-list">
          <div class="combat-list-header">
            <label>Weapon</label>
            <button
              type="button"
              class="btn-toggle-math no-print"
              onClick={() => updateActiveCharacter({ showWeaponMath: !activeCharacter().showWeaponMath })}
            >
              {activeCharacter().showWeaponMath ? 'Hide Math' : 'Show Math'}
            </button>
          </div>
          <Index each={activeCharacter().weapons}>
            {(weapon) => (
              <div class="combat-row">
                <div class="combat-row-header">
                  <input type="text" value={weapon().name} onInput={(event) => updateWeapon(weapon().id, 'name', event.target.value)} placeholder="Weapon" />
                  <button
                    type="button"
                    class={`equip-toggle no-print ${weapon().equipped ? 'equipped' : ''}`}
                    onClick={() => updateWeapon(weapon().id, 'equipped', !weapon().equipped)}
                  >
                    Equipped
                  </button>
                </div>
                <div class="combat-summary">
                  <span>Attack Roll: {weaponAttackRoll(weapon())}</span>
                  <span>Weapon Damage: {formatDice(weapon().damageDiceCount, weapon().damageDice)} + {weaponDamageBonus(weapon())}</span>
                </div>
                <label class="weapon-resource-select no-print">
                  <span>Resource</span>
                  <select
                    value={weapon().resourceName ?? ''}
                    onChange={(event) =>
                      updateWeapon(
                        weapon().id,
                        'resourceName',
                        event.currentTarget.value,
                      )
                    }
                  >
                    <option value="">None</option>
                    <Show
                      when={
                        weapon().resourceName &&
                        !activeCharacter().resources.some(
                          (resource) => resource.name === weapon().resourceName,
                        )
                      }
                    >
                      <option value={weapon().resourceName}>
                        Missing: {weapon().resourceName}
                      </option>
                    </Show>
                    <For
                      each={activeCharacter().resources.filter(
                        (resource) => resource.name?.trim(),
                      )}
                    >
                      {(resource) => (
                        <option value={resource.name}>{resource.name}</option>
                      )}
                    </For>
                  </select>
                </label>
                <Show when={activeCharacter().showWeaponMath}>
                  <div class="roll-line weapon-roll-line attack-roll-line">
                    <strong>Attack Roll</strong>
                    <label><span>Ability Modifier</span><select value={weapon().attackAbilityName ?? ''} onChange={(event) => updateWeapon(weapon().id, 'attackAbilityName', event.currentTarget.value)}>
                      <option value="">Manual</option>
                      <For each={activeCharacter().abilityRows}>{(ability) => <option value={ability.name}>{ability.name || 'Custom Ability'}</option>}</For>
                    </select></label>
                    <Show when={!weapon().attackAbilityName}>
                      <label><span>Manual Ability</span><input type="number" value={weapon().abilityModifier} onInput={(event) => updateWeapon(weapon().id, 'abilityModifier', Number(event.target.value) || 0)} /></label>
                    </Show>
                    <span>+</span>
                    <label><span>Proficiency Modifier</span><input type="number" value={proficiencyBonus()} readonly /></label>
                    <span>+</span>
                    <label><span>Bonus Modifier</span><input type="number" value={weapon().attackBonusModifier ?? 0} onInput={(event) => updateWeapon(weapon().id, 'attackBonusModifier', Number(event.target.value) || 0)} placeholder="#" /></label>
                    <span class="roll-total">+ Buff {buffTotal('attackRoll')}</span>
                  </div>
                  <div class="roll-line weapon-roll-line damage-roll-line">
                    <strong>Damage Roll</strong>
                    <label><span>Weapon Damage Dice</span><div class="dice-picker"><input type="number" min="1" value={weapon().damageDiceCount ?? 1} onInput={(event) => updateWeapon(weapon().id, 'damageDiceCount', Number(event.target.value) || 1)} /><span>*</span><select value={weapon().damageDice} onChange={(event) => updateWeapon(weapon().id, 'damageDice', event.currentTarget.value)}>
                      <For each={diceOptions}>{(dice) => <option value={dice}>{dice}</option>}</For>
                    </select></div></label>
                    <span>+</span>
                    <label><span>Ability Modifier</span><select value={weapon().damageAbilityName ?? ''} onChange={(event) => updateWeapon(weapon().id, 'damageAbilityName', event.currentTarget.value)}>
                      <option value="">Manual</option>
                      <For each={activeCharacter().abilityRows}>{(ability) => <option value={ability.name}>{ability.name || 'Custom Ability'}</option>}</For>
                    </select></label>
                    <Show when={!weapon().damageAbilityName}>
                      <label><span>Manual Ability</span><input type="number" value={weapon().damageAbilityModifier} onInput={(event) => updateWeapon(weapon().id, 'damageAbilityModifier', Number(event.target.value) || 0)} /></label>
                    </Show>
                    <span>+</span>
                    <label><span>Bonus Modifier</span><input type="number" value={weapon().damageBonusModifier} onInput={(event) => updateWeapon(weapon().id, 'damageBonusModifier', Number(event.target.value) || 0)} placeholder="#" /></label>
                    <span class="roll-total">+ Buff {buffTotal('weaponDamage')}</span>
                  </div>
                </Show>
                <button type="button" class="btn-remove-small no-print" onClick={() => removeWeapon(weapon().id)}>x</button>
              </div>
            )}
          </Index>
          <button type="button" class="btn-add no-print" onClick={addWeapon}>+ Add Weapon</button>
        </div>

        <div class="combat-list">
          <div class="combat-list-header">
            <label>Armor</label>
            <button
              type="button"
              class="btn-toggle-math no-print"
              onClick={() => updateActiveCharacter({ showArmorMath: !activeCharacter().showArmorMath })}
            >
              {activeCharacter().showArmorMath ? 'Hide Math' : 'Show Math'}
            </button>
          </div>
          <Index each={activeCharacter().armorRows}>
            {(armor) => (
              <div class="combat-row">
                <div class="combat-row-header">
                  <input type="text" value={armor().name} onInput={(event) => updateArmor(armor().id, 'name', event.target.value)} placeholder="Armor" />
                  <button
                    type="button"
                    class={`equip-toggle no-print ${armor().equipped ? 'equipped' : ''}`}
                    onClick={() => updateArmor(armor().id, 'equipped', !armor().equipped)}
                  >
                    Equipped
                  </button>
                </div>
                <div class="combat-summary">
                  <span>Armor Class: {armorClass(armor())}</span>
                </div>
                <Show when={activeCharacter().showArmorMath}>
                  <div class="armor-type-buttons no-print">
                    <For each={['cloth', 'light', 'medium', 'heavy']}>
                      {(armorType) => (
                        <button
                          type="button"
                          class={armor().armorType === armorType ? 'active' : ''}
                          onClick={() => updateArmor(armor().id, 'armorType', armorType)}
                        >
                          {armorType[0].toUpperCase() + armorType.slice(1)}
                        </button>
                      )}
                    </For>
                  </div>
                  <div class="armor-settings-row">
                    <strong>Armor Class</strong>
                    <label>
                      <span>Armor Rating</span>
                      <select
                        value={armor().armorPreset ?? ''}
                        onChange={(event) =>
                          selectArmorPreset(armor().id, event.currentTarget.value)
                        }
                      >
                        <option value="">Custom</option>
                        <For each={armorPresets}>
                          {(preset) => <option value={preset.value}>{preset.label}</option>}
                        </For>
                      </select>
                    </label>
                    <input
                      class="armor-rating-input"
                      type="number"
                      value={armor().base}
                      onInput={(event) => {
                        updateArmor(armor().id, 'base', Number(event.target.value) || 0);
                        updateArmor(armor().id, 'armorPreset', '');
                      }}
                      aria-label="Custom armor rating"
                    />
                    <span>+</span>
                    <label><span>Bonus Modifier</span><input type="number" value={armor().bonusModifier ?? 0} onInput={(event) => updateArmor(armor().id, 'bonusModifier', Number(event.target.value) || 0)} placeholder="#" /></label>
                    <span>+</span>
                    <button
                      type="button"
                      class={`shield-toggle ${armor().shieldEnabled ? 'active' : ''}`}
                      onClick={() =>
                        updateArmor(armor().id, 'shieldEnabled', !armor().shieldEnabled)
                      }
                    >
                      Shield
                    </button>
                    <input
                      class="shield-bonus-input"
                      type="number"
                      value={armor().shieldBonus ?? 2}
                      onInput={(event) =>
                        updateArmor(armor().id, 'shieldBonus', Number(event.target.value) || 0)
                      }
                      aria-label="Shield bonus"
                    />
                    <span>+ Buff {buffTotal('armorClass')}</span>
                  </div>
                  <div class={`armor-ability-modifiers no-print ${armor().armorType === 'heavy' ? 'disabled' : ''}`}>
                    <strong>Ability Modifiers</strong>
                    <Show when={armor().armorType === 'medium'}>
                      <span class="armor-rule-note">Max +2</span>
                    </Show>
                    <Show when={armor().armorType === 'heavy'}>
                      <span class="armor-rule-note">Disabled</span>
                    </Show>
                    <For each={armor().abilityModifiers ?? []}>
                      {(modifier) => (
                        <div class="armor-ability-row">
                          <select
                            disabled={armor().armorType === 'heavy'}
                            value={modifier.abilityName}
                            onChange={(event) =>
                              updateArmorAbilityModifier(
                                armor().id,
                                modifier.id,
                                event.currentTarget.value,
                              )
                            }
                          >
                            <For each={activeCharacter().abilityRows}>
                              {(ability) => <option value={ability.name}>{ability.name || 'Custom Ability'}</option>}
                            </For>
                          </select>
                          <span>
                            {abilityModifierFor(modifier.abilityName) >= 0 ? '+' : ''}
                            {abilityModifierFor(modifier.abilityName)}
                          </span>
                          <button type="button" class="btn-remove-small" onClick={() => removeArmorAbilityModifier(armor().id, modifier.id)}>x</button>
                        </div>
                      )}
                    </For>
                    <button
                      type="button"
                      class="btn-add armor-add-ability"
                      onClick={() => addArmorAbilityModifier(armor().id)}
                      disabled={armor().armorType === 'heavy'}
                      title="Add ability modifier"
                    >
                      +
                    </button>
                  </div>
                </Show>
                <button type="button" class="btn-remove-small no-print" onClick={() => removeArmor(armor().id)}>x</button>
              </div>
            )}
          </Index>
          <button type="button" class="btn-add no-print" onClick={addArmor}>+ Add Armor</button>
        </div>
      </CollapsibleSection>

      <CollapsibleSection
        class="features-section"
        title="Features & Traits"
        isCollapsed={collapsedSections().features}
        onToggle={() => toggleSection('features')}
      >
        <div class="features-toolbar no-print">
          <button type="button" onClick={() => applyRichTextCommand('bold')} title="Bold">
            B
          </button>
          <button type="button" onClick={() => applyRichTextCommand('italic')} title="Italic">
            I
          </button>
          <button type="button" onClick={() => applyRichTextCommand('underline')} title="Underline">
            U
          </button>
          <button type="button" onClick={() => applyRichTextCommand('insertUnorderedList')} title="Bullet list">
            •
          </button>
          <label class="btn-add file-button">
            Upload DOCX
            <input
              type="file"
              accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={handleFeaturesDocxUpload}
            />
          </label>
        </div>
        <div
          class="features-editor"
          contenteditable
          innerHTML={activeCharacter().features}
          onKeyDown={handleFeaturesKeyDown}
          onInput={(event) => updateActiveCharacter({ features: event.currentTarget.innerHTML })}
          data-placeholder="Enter features and traits"
        />
        <div class={`section-help ${collapsedHelp().features ? 'collapsed' : ''}`}>
          <button
            type="button"
            class="section-help-toggle"
            onClick={() => toggleHelp('features')}
            aria-expanded={!collapsedHelp().features}
          >
            <span>Instructions</span>
            <span>{collapsedHelp().features ? '+' : '-'}</span>
          </button>
          <Show when={!collapsedHelp().features}>
            <div class="section-help-content">
              <p>Best used for features, traits, and homebrewed explanations.</p>
              <p>Equipment with spells, blessings, or once/twice/thrice/etc. a day spells and skills can be placed on Resource Pools so you can track usage.</p>
              <p>If it is homebrew, explain it down in this section.</p>
              <p>Spells and Abilities have their own section.</p>
              <p>At the end of the day, this is your sheet. (:</p>
            </div>
          </Show>
        </div>
      </CollapsibleSection>

      <CollapsibleSection
        class="spells-section omit-from-pdf"
        title="Spells & Abilities"
        isCollapsed={collapsedSections().spells}
        onToggle={() => toggleSection('spells')}
      >
        <div class="spell-library-toolbar no-print">
          <span>App Library: {appSpellLibrary().length}</span>
          <button type="button" class="btn-add" onClick={exportSpellLibraryDocx}>
            Export Spells & Abilities DOCX
          </button>
          <label class="btn-add file-button">
            Import Spells & Abilities DOCX
            <input
              type="file"
              accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={importSpellLibraryDocx}
            />
          </label>
        </div>
        <table class="spells-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Resource</th>
              <th>Action Economy</th>
              <th>Description</th>
              <th class="no-print">Controls</th>
            </tr>
          </thead>
          <tbody>
            <Index each={activeCharacter().spells}>
              {(spell, index) => (
                <>
                <tr class={spell().rowColor ? `spell-row-${spell().rowColor}` : ''}>
                  <td>
                    <input
                      type="text"
                      list={`srd-spells-${spell().id}`}
                      value={spell().name}
                      onInput={(event) => {
                        const name = event.target.value;
                        updateSpell(spell().id, 'name', name);
                        if (spell().srdAutofilledName !== name) {
                          updateSpell(spell().id, 'srdAutofilledName', '');
                        }
                      }}
                      placeholder="Name"
                    />
                    <datalist id={`srd-spells-${spell().id}`}>
                      <For each={appSpellLibrary()}>
                        {(librarySpell) => <option value={librarySpell.name} />}
                      </For>
                      <For each={srdSpells()}>
                        {(srdSpell) => <option value={srdSpell.name} />}
                      </For>
                    </datalist>
                    <Show
                      when={
                        suggestedSpells(spell().name).length &&
                        !matchingSrdSpell(spell().name) &&
                        !matchingCustomSpell(spell().name)
                      }
                    >
                      <div class="srd-suggestions no-print">
                        <For each={suggestedSpells(spell().name)}>
                          {(suggestion) => (
                            <button
                              type="button"
                              onClick={() => {
                                updateSpell(spell().id, 'name', suggestion.name);
                                updateSpell(spell().id, 'srdDismissedName', '');
                              }}
                            >
                              <span>{suggestion.name}</span>
                              <small>
                                {suggestion.source === 'Custom Library'
                                  ? 'Custom'
                                  : suggestion.level === 0
                                    ? 'Cantrip'
                                    : `Level ${suggestion.level}`}
                              </small>
                            </button>
                          )}
                        </For>
                      </div>
                    </Show>
                    <Show
                      when={
                        matchingCustomSpell(spell().name) &&
                        !matchingSrdSpell(spell().name) &&
                        spell().srdAutofilledName !== spell().name &&
                        spell().srdDismissedName !== spell().name
                      }
                    >
                      <div class="srd-autofill-prompt no-print">
                        <span>Autofill from Custom Library?</span>
                        <button
                          type="button"
                          class="btn-add"
                          onClick={() =>
                            autofillCustomSpell(
                              spell().id,
                              matchingCustomSpell(spell().name),
                            )
                          }
                        >
                          Autofill
                        </button>
                        <button
                          type="button"
                          class="btn-toggle-math"
                          onClick={() =>
                            updateSpell(
                              spell().id,
                              'srdDismissedName',
                              spell().name,
                            )
                          }
                        >
                          No Thanks
                        </button>
                      </div>
                    </Show>
                    <Show
                      when={
                        matchingSrdSpell(spell().name) &&
                        spell().srdAutofilledName !== spell().name &&
                        spell().srdDismissedName !== spell().name
                      }
                    >
                      <div class="srd-autofill-prompt no-print">
                        <span>Autofill {matchingSrdSpell(spell().name)?.name}?</span>
                        <button
                          type="button"
                          class="btn-add"
                          disabled={srdLoadingSpellId() === spell().id}
                          onClick={() =>
                            autofillSrdSpell(
                              spell().id,
                              matchingSrdSpell(spell().name),
                            )
                          }
                        >
                          {srdLoadingSpellId() === spell().id ? 'Loading...' : 'Autofill'}
                        </button>
                        <button
                          type="button"
                          class="btn-toggle-math"
                          onClick={() =>
                            updateSpell(
                              spell().id,
                              'srdDismissedName',
                              spell().name,
                            )
                          }
                        >
                          No Thanks
                        </button>
                      </div>
                    </Show>
                    <button
                      type="button"
                      class="flavour-toggle no-print"
                      onClick={() => toggleSpellFlavor(spell().id)}
                      aria-label="Toggle flavour text"
                    >
                      {spell().flavorCollapsed ? '+ Flavour Text' : '- Flavour Text'}
                    </button>
                    <button
                      type="button"
                      class="save-spell-library no-print"
                      onClick={() => saveSpellToLibrary(spell())}
                    >
                      Save to Library
                    </button>
                  </td>
                  <td>
                    <div class="spell-entry-list">
                      <Index each={spell().resourceEntries ?? ['']}>
                        {(resourceEntry, resourceIndex) => (
                          <div class="spell-entry-row">
                            <select
                              value={
                                activeCharacter().resources.some(
                                  (resource) => resource.name === resourceEntry(),
                                )
                                  ? resourceEntry()
                                  : 'custom'
                              }
                              onChange={(event) =>
                                updateSpellEntry(
                                  spell().id,
                                  'resourceEntries',
                                  resourceIndex,
                                  event.currentTarget.value === 'custom'
                                    ? ''
                                    : event.currentTarget.value,
                                )
                              }
                            >
                              <option value="custom">Custom</option>
                              <For
                                each={activeCharacter().resources.filter(
                                  (resource) => resource.name?.trim(),
                                )}
                              >
                                {(resource) => (
                                  <option value={resource.name}>{resource.name}</option>
                                )}
                              </For>
                            </select>
                            <Show
                              when={
                                !activeCharacter().resources.some(
                                  (resource) => resource.name === resourceEntry(),
                                )
                              }
                            >
                              <input
                                type="text"
                                value={resourceEntry()}
                                onInput={(event) =>
                                  updateSpellEntry(
                                    spell().id,
                                    'resourceEntries',
                                    resourceIndex,
                                    event.target.value,
                                  )
                                }
                                placeholder="Custom resource"
                              />
                            </Show>
                            <button
                              type="button"
                              class="btn-remove-small no-print"
                              onClick={() =>
                                removeSpellEntry(
                                  spell().id,
                                  'resourceEntries',
                                  resourceIndex,
                                )
                              }
                              aria-label="Remove resource"
                            >
                              x
                            </button>
                          </div>
                        )}
                      </Index>
                      <button
                        type="button"
                        class="spell-entry-add no-print"
                        onClick={() => addSpellEntry(spell().id, 'resourceEntries')}
                      >
                        + Resource
                      </button>
                    </div>
                  </td>
                  <td>
                    <div class="spell-entry-list">
                      <Index each={spell().actionEntries ?? ['']}>
                        {(actionEntry, actionIndex) => (
                          <div class="spell-entry-row">
                            <select
                              value={
                                spellActionOptions.includes(actionEntry())
                                  ? actionEntry()
                                  : 'custom'
                              }
                              onChange={(event) =>
                                updateSpellEntry(
                                  spell().id,
                                  'actionEntries',
                                  actionIndex,
                                  event.currentTarget.value === 'custom'
                                    ? ''
                                    : event.currentTarget.value,
                                )
                              }
                            >
                              <For each={spellActionOptions}>
                                {(action) => <option value={action}>{action}</option>}
                              </For>
                              <option value="custom">Custom</option>
                            </select>
                            <Show when={!spellActionOptions.includes(actionEntry())}>
                              <input
                                type="text"
                                value={actionEntry()}
                                onInput={(event) =>
                                  updateSpellEntry(
                                    spell().id,
                                    'actionEntries',
                                    actionIndex,
                                    event.target.value,
                                  )
                                }
                                placeholder="Custom action"
                              />
                            </Show>
                            <button
                              type="button"
                              class="btn-remove-small no-print"
                              onClick={() =>
                                removeSpellEntry(
                                  spell().id,
                                  'actionEntries',
                                  actionIndex,
                                )
                              }
                              aria-label="Remove action economy"
                            >
                              x
                            </button>
                          </div>
                        )}
                      </Index>
                      <button
                        type="button"
                        class="spell-entry-add no-print"
                        onClick={() => addSpellEntry(spell().id, 'actionEntries')}
                      >
                        + Action
                      </button>
                    </div>
                  </td>
                  <td>
                    <div class="dice-roll-list">
                      <Index each={spell().diceRolls ?? []}>
                        {(diceRoll) => (
                          <div class="dice-roll-row">
                            <input
                              type="text"
                              value={diceRoll().name}
                              onInput={(event) => updateSpellDiceRoll(spell().id, diceRoll().id, 'name', event.target.value)}
                              placeholder="Roll Name"
                            />
                            <input
                              type="number"
                              min="1"
                              value={diceRoll().diceCount ?? 1}
                              onInput={(event) => updateSpellDiceRoll(spell().id, diceRoll().id, 'diceCount', Number(event.target.value) || 1)}
                              placeholder="#"
                            />
                            <span>*</span>
                            <select
                              value={diceRoll().dice}
                              onChange={(event) => updateSpellDiceRoll(spell().id, diceRoll().id, 'dice', event.currentTarget.value)}
                            >
                              <For each={diceOptions}>{(dice) => <option value={dice}>{dice}</option>}</For>
                            </select>
                            <span>+</span>
                            <input
                              type="number"
                              value={diceRoll().value ?? 0}
                              onInput={(event) => updateSpellDiceRoll(spell().id, diceRoll().id, 'value', Number(event.target.value) || 0)}
                              placeholder="#"
                            />
                            <span>= {diceRollTotal(diceRoll())}</span>
                          </div>
                        )}
                      </Index>
                      <div class="dice-buttons no-print">
                        <button type="button" class="btn-add" onClick={() => addSpellDiceRoll(spell().id)}>
                          + Dice
                        </button>
                        <button
                          type="button"
                          class="btn-remove-small"
                          onClick={() => {
                            const diceRolls = spell().diceRolls ?? [];
                            const lastDiceRoll = diceRolls[diceRolls.length - 1];
                            if (lastDiceRoll) removeSpellDiceRoll(spell().id, lastDiceRoll.id);
                          }}
                        >
                          - Dice
                        </button>
                      </div>
                      <div class="custom-calculation-list">
                        <Index each={spell().customCalculations ?? []}>
                          {(customCalculation) => (
                            <textarea
                              class="custom-calculation-box"
                              value={customCalculation().text}
                              onInput={(event) =>
                                updateSpellCustomCalculation(
                                  spell().id,
                                  customCalculation().id,
                                  event.target.value,
                                )
                              }
                              placeholder="Custom calculation"
                            />
                          )}
                        </Index>
                      </div>
                      <div class="dice-buttons no-print">
                        <button type="button" class="btn-add" onClick={() => addSpellCustomCalculation(spell().id)}>
                          + Custom
                        </button>
                        <button
                          type="button"
                          class="btn-remove-small"
                          onClick={() => removeLastSpellCustomCalculation(spell().id)}
                        >
                          - Custom
                        </button>
                      </div>
                    </div>
                  </td>
                  <td class="no-print">
                    <div class="row-controls">
                      <button type="button" class="color-chip green-chip" onClick={() => setSpellRowColor(spell().id, 'green')} aria-label="Mark green">
                        G
                      </button>
                      <button type="button" class="color-chip red-chip" onClick={() => setSpellRowColor(spell().id, 'red')} aria-label="Mark red">
                        R
                      </button>
                      <button type="button" onClick={() => setSpellRowColor(spell().id, '')} aria-label="Clear color">
                        -
                      </button>
                      <button
                        type="button"
                        class={`favorite-chip ${spell().favorite ? 'favorite' : ''}`}
                        onClick={() => toggleSpellFavorite(spell().id)}
                        aria-label="Toggle favorite"
                      >
                        F
                      </button>
                      <button type="button" onClick={() => moveSpell(index, -1)} aria-label="Move up">
                        ^
                      </button>
                      <button type="button" onClick={() => moveSpell(index, 1)} aria-label="Move down">
                        v
                      </button>
                      <button type="button" onClick={() => removeSpell(spell().id)} aria-label="Remove">
                        x
                      </button>
                    </div>
                  </td>
                </tr>
                <Show when={!spell().flavorCollapsed}>
                  <tr class="spell-flavor-row">
                    <td colspan="5">
                      <textarea
                        value={spell().flavorText}
                        onInput={(event) => updateSpell(spell().id, 'flavorText', event.target.value)}
                        placeholder="Flavour text"
                      />
                    </td>
                  </tr>
                </Show>
                </>
              )}
            </Index>
          </tbody>
        </table>
        <button type="button" onClick={addSpell} class="btn-add no-print">
          + Add Spell/Ability
        </button>
        <div class={`section-help ${collapsedHelp().spells ? 'collapsed' : ''}`}>
          <button
            type="button"
            class="section-help-toggle"
            onClick={() => toggleHelp('spells')}
            aria-expanded={!collapsedHelp().spells}
          >
            <span>Instructions</span>
            <span>{collapsedHelp().spells ? '+' : '-'}</span>
          </button>
          <Show when={!collapsedHelp().spells}>
            <div class="section-help-content">
              <p>Green or Red buttons can be used for prepared or unprepared spells.</p>
              <p>The - button clears the row color when you do not need it.</p>
              <p>The F button marks a favorite and makes it appear in the Spells & Abilities section in Character Details.</p>
              <p>Spell autofill uses the D&D 5e SRD catalog provided by 5e-bits. Custom and homebrew spells remain fully editable.</p>
            </div>
          </Show>
        </div>
      </CollapsibleSection>

      <CollapsibleSection
        class="abilities-section"
        title="Ability Scores"
        isCollapsed={collapsedSections().abilities}
        onToggle={() => toggleSection('abilities')}
      >
        <label class="modifier-toggle no-print">
          <input
            type="checkbox"
            checked={activeCharacter().autoCalculateModifiers}
            onChange={(event) =>
              updateActiveCharacter({ autoCalculateModifiers: event.currentTarget.checked })
            }
          />
          Auto-calculate modifiers
        </label>
        <table class="ability-table">
          <thead>
            <tr>
              <th>Ability</th>
              <th>Score</th>
              <th>Buffs</th>
              <th>Modifier</th>
              <th class="no-print">Action</th>
            </tr>
          </thead>
          <tbody>
            <Index each={activeCharacter().abilityRows}>
              {(ability, index) => (
                <tr>
                  <td>
                    <div class="ability-name-editor">
                      <select
                        value={abilities.includes(ability().name) ? ability().name : 'custom'}
                        onChange={(event) =>
                          updateAbilityRow(
                            ability().id,
                            'name',
                            event.currentTarget.value === 'custom'
                              ? ''
                              : event.currentTarget.value,
                          )
                        }
                        aria-label="Ability name"
                      >
                        <For each={abilities}>
                          {(abilityName) => <option value={abilityName}>{abilityName}</option>}
                        </For>
                        <option value="custom">Custom</option>
                      </select>
                      <Show when={!abilities.includes(ability().name)}>
                        <input
                          type="text"
                          value={ability().name}
                          onInput={(event) =>
                            updateAbilityRow(ability().id, 'name', event.target.value)
                          }
                          placeholder="Custom ability"
                        />
                      </Show>
                    </div>
                  </td>
                  <td>
                    <input
                      type="number"
                      value={ability().score}
                      onInput={(event) =>
                        updateAbilityRow(ability().id, 'score', Number(event.target.value) || 0)
                      }
                      min="1"
                    />
                  </td>
                  <td class="modifier">
                    {targetedBuffTotal('ability', ability().name) >= 0 ? '+' : ''}
                    {targetedBuffTotal('ability', ability().name)}
                  </td>
                  <td class="modifier">
                    <Show
                      when={!activeCharacter().autoCalculateModifiers}
                      fallback={
                        <>
                          {abilityModifierFor(ability().name) > 0 ? '+' : ''}
                          {abilityModifierFor(ability().name)}
                        </>
                      }
                    >
                      <div class="manual-modifier-editor">
                        <input
                          type="number"
                          value={ability().modifier}
                          onInput={(event) =>
                            updateAbilityRow(
                              ability().id,
                              'modifier',
                              Number(event.target.value) || 0,
                            )
                          }
                        />
                        <span>
                          Total:{' '}
                          {(Number(ability().modifier) || 0) +
                            targetedBuffTotal('ability', ability().name) >
                          0
                            ? '+'
                            : ''}
                          {(Number(ability().modifier) || 0) +
                            targetedBuffTotal('ability', ability().name)}
                        </span>
                      </div>
                    </Show>
                  </td>
                  <td class="no-print">
                    <div class="row-controls">
                      <button type="button" onClick={() => moveAbilityRow(index, -1)} aria-label="Move up">
                        ^
                      </button>
                      <button type="button" onClick={() => moveAbilityRow(index, 1)} aria-label="Move down">
                        v
                      </button>
                      <button type="button" onClick={() => removeAbilityRow(ability().id)} aria-label="Remove">
                        x
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </Index>
          </tbody>
        </table>
        <button type="button" onClick={addAbilityRow} class="btn-add no-print">
          + Add Ability
        </button>
      </CollapsibleSection>
>>>>>>> cd0b550 (Expand character sheet and add desktop app)
    </div>
  );
}
