import { createSignal, For, Show } from 'solid-js';
import './App.css';

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
      };
      reader.readAsDataURL(file);
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
    </div>
  );
}
