import { DataStore } from '@bungie/datastore/DataStore';

import { CriterionCategory } from './components/CriterionCategory';
import { ProjectStore } from './ProjectStore';

interface State {
    categories: CriterionCategory[];
}

class _CategoriesStore extends DataStore<State>
{
    constructor() {
        super({
            categories: []
        })
    }

    public actions = this.createActions({
        hydrate: (state, categories: CriterionCategory[]) => ({
            categories
        }),
        addCategory: (state, category: CriterionCategory) => {
            return {
                categories: [
                    ...state.categories,
                    category
                ]
            }
        },
        deleteCategory: (state, categoryId: string) => {
            return {
                categories: state.categories.filter(a => a.id !== categoryId)
            }
        }
    });

    public override broadcast(data: State) {
        ProjectStore.actions.setCategories(this.state.categories);
        
        return super.broadcast(data);
    }
}

export const CategoriesStore = new _CategoriesStore();