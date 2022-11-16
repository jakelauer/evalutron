import { useDataStore } from '@bungie/datastore/DataStoreHooks';
import { Input } from 'antd';
import { ChangeEvent } from 'react';

import { ProjectStore } from '../../services/project/ProjectStore';

export const NewProject: React.FC = () => {
    const project = useDataStore(ProjectStore);

    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => ProjectStore.actions.setName(e.target.value);
    const onChangeDescription = (e: ChangeEvent<HTMLInputElement>) => ProjectStore.actions.setDescription(e.target.value);

    return (
        <div>
            <Input placeholder="Name" onChange={onChangeName} value={project.name} />
            <br />
            <Input placeholder="Description" onChange={onChangeDescription} value={project.description} />
        </div>
    )
}