function questionsTransformer(steps)
{
    let transformed = [];

    let commonQuestionsCounter = 0;
    let sectionCounter = 0;

    for (let i in steps) {
        sectionCounter ++;
        for(let i2 in steps[i]['questions']) {
            commonQuestionsCounter ++;
            let question = steps[i]['questions'][i2];
            question.section = steps[i].title;
            question.questionNumber = commonQuestionsCounter;
            question.sectionNumber = sectionCounter;

            transformed.push(question);
        }
    }

    return transformed;
}

export default questionsTransformer;
