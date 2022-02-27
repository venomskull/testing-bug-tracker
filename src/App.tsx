import React, { FormEvent, useState } from 'react';
import './App.css';
import { BugPriority, IBug } from './IBug';
import {v4 as uuid} from 'uuid';
import BugListTable from './BugListTable';

function App() {
  const [newBugDesc, setNewBugDesc] = useState<string>('');
  const [newBugPriority, setNewBugPriority] = useState<string>('');
  const [bugList, setBugList] = useState<IBug[]>([]);

  const addBug = (e: FormEvent) => {
    e.preventDefault();
    const newBug: IBug = {
      id: uuid(),
      description: newBugDesc,
      priority: newBugPriority as BugPriority
    }
    setBugList([...bugList, newBug]);
    setNewBugDesc('');
    setNewBugPriority('');
  };

  const deleteBug = (id: string) => {
    setBugList(bugList.filter(bug => bug.id !== id));
  }

  return (
    <div className='app'>
      <h1> 🐞 Bug Tracker</h1>
      <BugListTable bugs={bugList} onDeleteBug={deleteBug} />
      <form className='add-new-bug-form'>
        <label htmlFor="bugDescr">Bug Description</label>
        <input data-testid='bugDesc' type="text" id='bugDescr' onChange={e => setNewBugDesc(e.target.value)}
          value={newBugDesc}
        />
        <label htmlFor="priorityy">Priority</label>
        <select name="" id="priorityy" value={newBugPriority}
          onChange={e => setNewBugPriority(e.target.value)}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button data-testid='addBtn' type='submit' onClick={addBug}>Add New Bug</button>
      </form>
    </div>
  );
}

export default App;
