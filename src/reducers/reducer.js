import questionsTransformer from "../transformers/QuestionsTransformer";
import saveState from "../middleware/saveState";

const initialState = {
    'currentStep': 0,
    'steps': questionsTransformer(window.config.questions.steps),
    'answers': [],
    'currentValue': '',
    'error': '',
    'isLoaded': false,
};
  
  // Use the initialState as a default value
  export default function appReducer(state = initialState, action) {

    const initialState = {
        'currentStep': 0,
        'steps': questionsTransformer(window.config.questions.steps),
        'answers': [],
        'currentValue': '',
        'error': '',
        'isLoaded': false,
    };
      
    

    switch (action.type) {
        case 'reload':
            return {...state, 'isLoaded': true};
        break;    
        case 'load':
                return {...state, 'isLoaded': false};
        break;
        case 'clear':
            return {...initialState, 'isLoaded': true};
        break;
        case 'ready':
            return {...state, 'isLoaded': true};
        break;
        case "nextStep":

            let step = state.steps[state.currentStep];

            state.currentValue = state.currentValue === undefined ||  state.currentValue === null ? '' : state.currentValue;
            if (step.required && (state.currentValue.length < 1) && ['input', 'single-choice'].includes(step.type)) {
                return {...state, currentStep: state.currentStep, error: 'This field is required'};
            }

            console.log(step.required, step.type === 'multiple-choice', state.currentValue, state.currentValue.length);
            if (step.required && step.type === 'multiple-choice' && (state.currentValue === null || state.currentValue.length === 0)) {
                return {...state, currentStep: state.currentStep, error: 'This field is required'};
            }

            if (step.required && step.type === 'numeric' && state.currentValue === 0) {
                return {...state, currentStep: state.currentStep, error: 'This field is required'};
            }


            state.answers[state.currentStep] = state.currentValue;
            state.currentValue = '';
            state = {...state, currentStep: state.currentStep + 1, error: ''};
            saveState('form', window.userId, state);
            return state;
        case "previousStep":
                if (state.currentStep === 0) {
                    return state;
                }
                let stepNumber = state.currentStep - 1;

                return {...state, currentStep: stepNumber, currentValue: state.answers[stepNumber], error: ''};
        break;
        case 'changeCurrentValue':
                state =  {...state, currentValue: action.currentValue};
                return state;
        break;
        case 'submitSingleChoice':
            state.answers[state.currentStep] = action.variant.value;
            console.log(state);
            state =  {
                ...state,
                currentStep: state.currentStep + 1,
                error: '',
            };

            saveState('form', window.userId, state);
            return state;
        break;
        default:
        // If this reducer doesn't recognize the action type, or doesn't
        // care about this specific action, return the existing state unchanged
        return state
    }
  }
