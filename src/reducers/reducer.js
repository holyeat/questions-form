import questionsTransformer from "../transformers/QuestionsTransformer";

const initialState = {
    'currentStep': 0,
    'steps': questionsTransformer(window.config.questions.steps),
    'answers': [],
    'currentValue': '',
};
  
  // Use the initialState as a default value
  export default function appReducer(state = initialState, action) {
      console.log(state);
    // The reducer normally looks at the action type field to decide what happens
    switch (action.type) {
        case "nextStep":
            state.answers[state.currentStep] = state.currentValue;
            state.currentValue = null;
            return {...state, currentStep: state.currentStep + 1};
            case "previousStep":
                if (state.currentStep === 0) {
                    return state;
                }

                return {...state, currentStep: state.currentStep - 1};
        break;
        case 'changeCurrentValue':
                return {...state, currentValue: action.currentValue};
        break;
        case 'submitSingleChoice':
            state.answers[state.currentStep] = action.variant.value;
            console.log(state);
            return {
                ...state,
                currentStep: state.currentStep + 1,
            };
        break;
        default:
        // If this reducer doesn't recognize the action type, or doesn't
        // care about this specific action, return the existing state unchanged
        return state
    }
  }
  