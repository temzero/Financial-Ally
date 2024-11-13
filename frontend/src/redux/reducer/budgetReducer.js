import { Types } from '../types';

const initState = {
    budgets: [],
};

const budgetReducer = (state = initState, action) => {
    switch (action.type) {
        case Types.getBudgetsSuccess:
            return { ...state, budgets: action.budgets || [] };
        case Types.addBudgetSuccess:
            return { ...state, budgets: [...state.budgets, action.budget] };
        case Types.updateBudgetSuccess:
            return {
                ...state,
                budgets: state.budgets.map((budget) =>
                    budget._id === action.budget._id ? action.budget : budget
                ),
            };
        default:
            return state;
    }
};

export default budgetReducer;
