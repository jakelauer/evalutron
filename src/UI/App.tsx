import './App.css';

import { useDataStore } from '@bungie/datastore/DataStoreHooks';
import { Button } from 'antd';
import React from 'react';

import { ProjectStore } from '../services/project/ProjectStore';
import { NewProject } from './Wizard/NewProject';

function App() {
  const project = useDataStore(ProjectStore);

  const serialize = () => console.log(JSON.stringify(project, null, 2))

  return (
    <div className="App">
      <br /><br />

      <Button type="primary" size={'large'}>New Project</Button>
      <br /><br />
      <Button type="primary" size={'large'}>Open Project</Button>
      <br /><br />
      <Button type="primary" size={'large'} onClick={serialize}>Save Project</Button>
      <br /><br />
      <NewProject />
    </div>
  );
}

export default App;
