import { createSignal, For, Show } from 'solid-js';
import './App.css';

export default function App() {
  // Portrait
  const [portrait, setPortrait] = createSignal(null);
  
  // Basic Info
  const [name, setName] = createSignal('');
  const [characterClass, setCharacterClass] = createSignal('');
  
  // Ability Scores
  const abilities = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];
  const [abilityScores, setAbilityScores] = createSignal(
    Object.fromEntries(abilities.map(ability => [ability, 10]))
  );
  
  const calculateModifier = (score) => Math.floor((score - 10) / 2);
  
  const updateAbilityScore = (ability, value) => {
    setAbilityScores(prev => ({
      ...prev,
      [ability]: parseInt(value) || 10
    }));
  };
  
  // Features & Traits
  const [features, setFeatures] = createSignal('');
  
  // Skills
  const [skills, setSkills] = createSignal([{ id: 1, name: '', modifier: 0 }]);
  const [skillIdCounter, setSkillIdCounter] = createSignal(2);
  
  const addSkill = () => {
    setSkills(prev => [...prev, { id: skillIdCounter(), name: '', modifier: 0 }]);
    setSkillIdCounter(prev => prev + 1);
  };
  
  const updateSkill = (id, field, value) => {
    setSkills(prev => prev.map(skill => 
      skill.id === id ? { ...skill, [field]: value } : skill
    ));
  };
  
  const removeSkill = (id) => {
    setSkills(prev => prev.filter(skill => skill.id !== id));
  };
  
  // Resource Pools
  const [resources, setResources] = createSignal([{ id: 1, name: '', current: 0, total: 0 }]);
  const [resourceIdCounter, setResourceIdCounter] = createSignal(2);
  
  const addResource = () => {
    setResources(prev => [...prev, { id: resourceIdCounter(), name: '', current: 0, total: 0 }]);
    setResourceIdCounter(prev => prev + 1);
  };
  
  const updateResource = (id, field, value) => {
    setResources(prev => prev.map(resource => 
      resource.id === id ? { ...resource, [field]: value } : resource
    ));
  };
  
  const removeResource = (id) => {
    setResources(prev => prev.filter(resource => resource.id !== id));
  };
  
  // Action Economy
  const [actionButtons, setActionButtons] = createSignal([
    { id: 1, name: 'Move', active: false },
    { id: 2, name: 'Action', active: false },
    { id: 3, name: 'Bonus Action', active: false },
    { id: 4, name: 'Reaction', active: false }
  ]);
  const [actionIdCounter, setActionIdCounter] = createSignal(5);
  const [editingAction, setEditingAction] = createSignal(null);
  const [newActionName, setNewActionName] = createSignal('');
  
  const toggleAction = (id) => {
    setActionButtons(prev => prev.map(action => 
      action.id === id ? { ...action, active: !action.active } : action
    ));
  };
  
  const addActionButton = () => {
    if (newActionName().trim()) {
      setActionButtons(prev => [...prev, { id: actionIdCounter(), name: newActionName(), active: false }]);
      setActionIdCounter(prev => prev + 1);
      setNewActionName('');
    }
  };
  
  const updateActionName = (id, newName) => {
    setActionButtons(prev => prev.map(action => 
      action.id === id ? { ...action, name: newName } : action
    ));
  };
  
  const removeActionButton = (id) => {
    setActionButtons(prev => prev.filter(action => action.id !== id));
  };
  
  // Spells and Abilities
  const [spells, setSpells] = createSignal([{ id: 1, name: '', resource: '', actionEconomy: '' }]);
  const [spellIdCounter, setSpellIdCounter] = createSignal(2);
  
  const addSpell = () => {
    setSpells(prev => [...prev, { id: spellIdCounter(), name: '', resource: '', actionEconomy: '' }]);
    setSpellIdCounter(prev => prev + 1);
  };
  
  const updateSpell = (id, field, value) => {
    setSpells(prev => prev.map(spell => 
      spell.id === id ? { ...spell, [field]: value } : spell
    ));
  };
  
  const removeSpell = (id) => {
    setSpells(prev => prev.filter(spell => spell.id !== id));
  };
  
  // Portrait Upload
  const handlePortraitUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPortrait(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div class="app-container">
      <h1>D&D Character Sheet</h1>
      
      <div class="character-header">
        {/* Portrait */}
        <div class="portrait-section">
          <div class="portrait-box">
            <Show when={portrait()} fallback={<span>No Portrait</span>}>
              <img src={portrait()} alt="Character Portrait" class="portrait-image" />
            </Show>
          </div>
          <input 
            type="file" 
            accept=".png,.jpg,.jpeg" 
            onChange={handlePortraitUpload}
            class="portrait-input"
          />
        </div>
        
        {/* Basic Info */}
        <div class="basic-info">
          <div class="input-group">
            <label>Name</label>
            <input 
              type="text" 
              value={name()} 
              onInput={(e) => setName(e.target.value)}
              placeholder="Character Name"
            />
          </div>
          <div class="input-group">
            <label>Class</label>
            <input 
              type="text" 
              value={characterClass()} 
              onInput={(e) => setCharacterClass(e.target.value)}
              placeholder="Character Class"
            />
          </div>
        </div>
      </div>

      {/* Ability Scores */}
      <section class="section">
        <h2>Ability Scores</h2>
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
                      value={abilityScores()[ability]}
                      onInput={(e) => updateAbilityScore(ability, e.target.value)}
                      min="1"
                      max="20"
                    />
                  </td>
                  <td class="modifier">{calculateModifier(abilityScores()[ability]) > 0 ? '+' : ''}{calculateModifier(abilityScores()[ability])}</td>
                </tr>
              )}
            </For>
          </tbody>
        </table>
      </section>

      {/* Features & Traits */}
      <section class="section">
        <h2>Features & Traits</h2>
        <textarea 
          value={features()}
          onInput={(e) => setFeatures(e.target.value.slice(0, 300))}
          placeholder="Enter features and traits (max 300 characters)"
          class="features-textarea"
          maxlength="300"
        />
        <span class="char-count">{features().length}/300</span>
      </section>

      {/* Skills */}
      <section class="section">
        <h2>Skills</h2>
        <table class="skills-table">
          <thead>
            <tr>
              <th>Skill</th>
              <th>Modifier</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <For each={skills()}>
              {(skill) => (
                <tr>
                  <td>
                    <input 
                      type="text" 
                      value={skill.name}
                      onInput={(e) => updateSkill(skill.id, 'name', e.target.value)}
                      placeholder="Skill Name"
                    />
                  </td>
                  <td>
                    <input 
                      type="number" 
                      value={skill.modifier}
                      onInput={(e) => updateSkill(skill.id, 'modifier', e.target.value)}
                      placeholder="0"
                    />
                  </td>
                  <td>
                    <button onClick={() => removeSkill(skill.id)} class="btn-remove">Remove</button>
                  </td>
                </tr>
              )}
            </For>
          </tbody>
        </table>
        <button onClick={addSkill} class="btn-add">+ Add Skill</button>
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
            <For each={resources()}>
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

      {/* Action Economy */}
      <section class="section">
        <h2>Action Economy</h2>
        <div class="action-buttons-container">
          <For each={actionButtons()}>
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
            value={newActionName()}
            onInput={(e) => setNewActionName(e.target.value)}
            placeholder="New button name"
            class="action-name-input"
          />
          <button onClick={addActionButton} class="btn-add">+ Add Button</button>
        </div>
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
            <For each={spells()}>
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
    </div>
  );
}
