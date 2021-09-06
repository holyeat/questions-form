import questionsTransformer from "../transformers/QuestionsTransformer";
import saveState from "../middleware/saveState";
import submitForm from "../middleware/submitForm";
import submitStateTransformer from "../transformers/submitStateTransformer";

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function submit(state) {
    submitForm(window.userId, submitStateTransformer(state)).then(response => {
        if (typeof response !== 'object' || response === null) {
            return ;
        }

        if (typeof response === 'undefined' || !response) {
            return ;
        }
        if (typeof response.token === 'undefined') {
            return ;
        }

        let baseUrl = window.config.lastStep;
        if (response.token !== null && response.token.length > 1) {
            baseUrl +=  '&token=' + response.token;
        }

        window.location.href = baseUrl;
    });
}


const initialState = Object.assign({}, {
    'currentStep': 0,
    'steps': questionsTransformer(window.config.questions.steps),
    'answers': [],
    'currentValue': '',
    'error': '',
    'isLoaded': false,
    'verifiedNumbers': [],
});
  
  // Use the initialState as a default value
  export default function appReducer(state = initialState, action) {
      console.log(action);

    const initialState = Object.assign({}, {
        'currentStep': 0,
        'steps': questionsTransformer(window.config.questions.steps),
        'answers': [],
        'currentValue': '',
        'error': '',
        'isLoaded': false,
        'verifiedNumbers': [],
        'showClearState': false,
    });
      
    let step;

    console.log(state);
    switch (action.type) {
        case 'reload':
            return {...action.state, 'isLoaded': true};
        break;    
        case 'load':
                return {...state, 'isLoaded': false};
        break;
        case 'clear':
            return {...state, 'isLoaded': true, 'showClearState': true};
        case 'cancelClean': 
            return {...state, 'isLoaded': true, 'showClearState': false, 'isScrollHeader': true};
        break;
        case 'clear-confirm':
            return {...initialState, 'isLoaded': true, 'isScrollHeader': true};
        break;
        case 'ready':
            return {...state, 'isLoaded': true};
        break;
        case 'error':
            return {...state, error: action.error};
        break;

        case "nextStep":

            step = state.steps[state.currentStep];

            state.currentValue = state.currentValue === undefined ||  state.currentValue === null ? '' : state.currentValue;
            
            if (typeof step.validation !== 'undefined' && step.validation.includes('email')) {
                if (!validateEmail(state.currentValue)) {
                    return {...state, currentStep: state.currentStep, error: 'Email is invalid'};
                }
            }

            if (step.required && (state.currentValue.length < 1) && ['input', 'single-choice'].includes(step.type)) {
                return {...state, currentStep: state.currentStep, error: 'This field is required'};
            }


            if (step.required && step.type === 'multiple-choice' && (state.currentValue === null || state.currentValue.length === 0)) {
                return {...state, currentStep: state.currentStep, error: 'This field is required'};
            }

            if (step.required && step.type === 'phone_number' && state.currentValue === 0) {
                return {...state, currentStep: state.currentStep, error: 'This field is required'};
            }

            if (step.required && step.type === 'numeric' && state.currentValue === 0) {
                return {...state, currentStep: state.currentStep, error: 'This field is required'};
            }

            if (step.type === 'phone_number' && state.currentValue.includes('unconfirmed-')) {
                return {...state, currentStep: state.currentStep};
            }

            let nextStepNumber = state.currentStep + 1;
            console.log(nextStepNumber, state.currentStep, state);
            state.answers[state.currentStep] = state.currentValue;


            if (nextStepNumber === step.total) {
                submit(state);
                return {...state, 'isLoaded': false, 'stopApp': true};
            }

            let nextStep = state.steps[nextStepNumber];


            if(state.answers[nextStepNumber] === undefined) {
                state.currentValue = {
                    'input' : '',
                    'single-choice' : [],
                    'multiple-choice': [],
                    'numeric': nextStep.predefinedValue !== undefined ? nextStep.predefinedValue : 0,
                    'phone_number': '',
                }[nextStep.type];
            }

            console.log(state.answers[nextStepNumber]);
            if (state.answers[nextStepNumber] !== undefined && state.answers[nextStepNumber].length > 0) {
                state.currentValue = state.answers[nextStepNumber];
            }
            state = {...state, currentStep: nextStepNumber, error: '', 'isScrollHeader': true};
            saveState('form', window.userId, state);
            return state;
        case "previousStep":
                if (state.currentStep === 0) {
                    return state;
                }
                if (state.currentValue !== null && state.currentValue.length > 0) {
                    state.answers[state.currentStep] = state.currentValue;
                }

                let stepNumber = state.currentStep - 1;

                return {...state, currentStep: stepNumber, currentValue: state.answers[stepNumber], error: '', 'isScrollHeader': true};
        break;
        case 'changeCurrentValue':
                state =  {...state, currentValue: action.currentValue, 'isScrollHeader': false};
                return state;
        break;
        case 'phoneNumberSubmit':
            state =  {...state, currentValue: 'unconfirmed-' + state.currentValue, 'error': ''};
            saveState('form', window.userId, state);
            return state;
        break;
        case 'phoneNumberPreviousStep':
            state =  {...state, currentValue: '', 'error': ''};
            saveState('form', window.userId, state);
            return state;
        break;

        case 'changeConfirmationCode':
            state =  {...state, confirmationCode: action.confirmationCode};
            return state;
        break;
        case 'addVerifiedNumbers':
            state.verifiedNumbers.push(action.verifiedNumber);
            saveState('form', window.userId, state);
            return state;
        break;

        case 'submitSingleChoice':
            state.answers[state.currentStep] = action.variant.value;

            step = state.steps[state.currentStep];

            state =  {
                ...state,
                currentStep: state.currentStep + 1,
                error: '',
            };
            let nextStepNumber2 = state.currentStep + 1;
            if (nextStepNumber2 === step.total) {
                submit(state);
                return {...state, 'isLoaded': false, 'stopApp': true, 'isScrollHeader': true};
            }


            saveState('form', window.userId, state);
            return state;
        break;
        default:
        // If this reducer doesn't recognize the action type, or doesn't
        // care about this specific action, return the existing state unchanged
        return state
    }
  }
