import questionsTransformer from "../transformers/QuestionsTransformer";

const initialState = {
    'currentStep': 0,
    'steps': questionsTransformer(window.config.questions.steps),
};
  
  // Use the initialState as a default value
  export default function appReducer(state = initialState, action) {

    // The reducer normally looks at the action type field to decide what happens
    switch (action.type) {
        case "nextStep":
            return {...state, currentStep: state.currentStep + 1};

        default:
        // If this reducer doesn't recognize the action type, or doesn't
        // care about this specific action, return the existing state unchanged
        return state
    }
  }
  