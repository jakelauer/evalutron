import { DataStore } from '@bungie/datastore/DataStore';

import { CriterionRating } from './components/CriterionRating';
import { ProjectStore } from './ProjectStore';


interface State {
    ratings: CriterionRating[];
}

class _RatingsStore extends DataStore<State>
{
    constructor() {
        super({
            ratings: []
        });
    }

    public override broadcast(data: State) {
        ProjectStore.actions.setRatings(this.state.ratings);
        
        return super.broadcast(data);
    }

    public actions = this.createActions({
        hydrate: (state, ratings: CriterionRating[]) => ({
            ratings
        }),
        addEvaluation: (state, rating: CriterionRating) => {
            return {
                ratings: [
                    ...state.ratings,
                    rating
                ]
            }
        },
        deleteEvaluation: (state, ratingId: string) => {
            return {
                ratings: state.ratings.filter(a => a.id !== ratingId)
            }
        }
    })
}

export const RatingsStore = new _RatingsStore();