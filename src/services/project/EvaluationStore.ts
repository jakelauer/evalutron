import { DataStore } from '@bungie/datastore/DataStore';

import { CriterionEvaluation } from './components/CriterionEvaluation';
import { ProjectStore } from './ProjectStore';

interface State {
    evaluations: CriterionEvaluation[];
}

class _EvaluationStore extends DataStore<State>
{
    constructor() {
        super({
            evaluations: []
        })
    }

    public actions = this.createActions({
        hydrate: (state, evaluations: CriterionEvaluation[]) => ({
            evaluations
        }),
        addEvaluation: (state, evaluation: CriterionEvaluation) => {
            return {
                evaluations: [
                    ...state.evaluations,
                    evaluation
                ]
            }
        },
        deleteEvaluation: (state, categoryId: string) => {
            return {
                evaluations: state.evaluations.filter(a => a.id !== categoryId)
            }
        }
    });

    public override broadcast(data: State) {
        ProjectStore.actions.setEvaluations(this.state.evaluations);
        
        return super.broadcast(data);
    }
}

export const EvaluationStore = new _EvaluationStore();