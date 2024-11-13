import { Types } from '../types';

const initState = {
    categories: [],
};

const categoryReducer = (state = initState, action) => {
    switch (action.type) {
        // Fetch all categories
        case Types.getCategoriesSuccess:
            return {
                ...state,
                categories: action.categories,
            };

        // Fetch a single category
        case Types.getOneCategorySuccess:
            return {
                ...state,
                categories: state.categories.map((category) =>
                    category._id === action.category._id ? action.category : category
                ),
            };

        // Add a new category
        case Types.addCategorySuccess:
            return {
                ...state,
                categories: [...state.categories, action.category],
            };

        // Update an existing category
        case Types.updateCategorySuccess:
            return {
                ...state,
                categories: state.categories.map((category) =>
                    category._id === action.category._id ? action.category : category
                ),
            };

        // Delete a category
        case Types.deleteCategorySuccess:
            return {
                ...state,
                categories: state.categories.filter(
                    (category) => category._id !== action.categoryId
                ),
            };

        default:
            return state;
    }
};

export default categoryReducer;
