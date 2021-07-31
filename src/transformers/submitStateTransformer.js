function submitStateTransformer(state)
{
    let readyAnswers = {};
    for (let i in state.steps)
    {
        let stepTitle = state.steps[i]['title'];
        let stepName = state.steps[i]['name'];

        readyAnswers[stepName] = {
            'title': stepTitle,
            'name': stepName,
            'value': state.answers[i],
            'stepNumber': i,
        };
    }

    return readyAnswers;
}

export default submitStateTransformer;
