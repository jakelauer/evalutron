import { getDataStoreBuilder } from '@bungie/datastore/DataStore';

import { CategoriesStore } from './CategoriesStore';
import { CriterionCategory } from './components/CriterionCategory';
import { CriterionEvaluation } from './components/CriterionEvaluation';
import { CriterionRating } from './components/CriterionRating';
import { Project } from './components/Project';
import { Stakeholder } from './components/Stakeholder';
import { EvaluationStore } from './EvaluationStore';


const getFileText = (file: File) => {
    const fileReader = new FileReader();

    let resultText: string | undefined;
    if (file) {
        fileReader.readAsText(file, "UTF-8");
        fileReader.onload = loadEvent => {
            resultText = loadEvent.target?.result as string;
        };
    }

    return resultText;
}

export const ProjectStore = getDataStoreBuilder<Project>().build({
    actions: {
        loadProjectFromFile: (state, file: File) => {
            const text = getFileText(file);
            if (!text) {
                throw new Error("Unable to read file - contents not readable.")
            }

            let project: Project;
            try {
                project = JSON.parse(text);
            }
            catch (e) {
                console.error(e);
                throw new Error("Unable to read project file.");
            }

            if (project.categories) {
                CategoriesStore.actions.hydrate(project.categories)
            }

            if (project.evaluations) {
                EvaluationStore.actions.hydrate(project.evaluations);
            }
            return project;
        },
        setName: (state, name: string) => ({
            name
        }),
        setDescription: (state, description: string) => ({
            description
        }),
        setCategories: (state, categories: CriterionCategory[]) => ({
            categories
        }),
        setEvaluations: (state, evaluations: CriterionEvaluation[]) => ({
            evaluations
        }),
        setRatings: (state, ratings: CriterionRating[]) => ({
            ratings
        }),
        addStakeholder: (state, stakeholder: Stakeholder) => ({
            stakeholders: [
                ...(state.stakeholders ?? []),
                stakeholder
            ]
        }),
        deleteStakeholder: (state, stakeholderId: string) => ({
            stakeholders: state.stakeholders?.filter(a => a.id !== stakeholderId) ?? []
        })
    },
    initialState: {
    }
})