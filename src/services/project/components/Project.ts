import { Criterion } from './Criterion';
import { CriterionCategory } from './CriterionCategory';
import { CriterionEvaluation } from './CriterionEvaluation';
import { CriterionRating } from './CriterionRating';
import { Stakeholder } from './Stakeholder';

export interface Project
{
    name?: string;
    description?: string;
    categories?: CriterionCategory[];
    criteria?: Criterion[];
    stakeholders?: Stakeholder[];
    ratings?: CriterionRating[];
    evaluations?: CriterionEvaluation[];
}