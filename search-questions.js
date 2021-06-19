import utils from './utils.js'

utils.appendStyleTag()

const questions = utils.getQuestions()

const q1Keys = Object.keys(questions.q1)
const q2Keys = Object.keys(questions.q2)
console.log(q2Keys)


const formList = document.querySelectorAll('form')
formList.forEach((l, index) => {


    if (l.action.includes('stuAnswerHandler.jsp')) {
        if (l.autocomplete === 'off') {
            const innerText = l.innerText
            const strings = innerText.split('\n')

            for (let i = 0; i < q1Keys.length; i++) {
                const key = q1Keys[i]
                const cQ = utils.clearBrackets(strings[0].trim())
                const cKey = utils.clearBrackets(key.trim())
                if (cQ.includes(cKey)) {
                    const ans = questions.q1[key].a

                    console.log((index - 1) + '.' + '题目：' + key)
                    console.log('答案：' + ans)
                    console.log('防错: ' + questions.q1[key].full)
                    console.log('')
                    // 选项上色
                    l.innerHTML = l.innerHTML.replace(ans, `<span class="ahhTouA" >${ans}</span>`)

                    if (l.innerHTML.includes(key)) {
                        l.innerHTML = l.innerHTML.replace(key, `<span class="ahhTouQ" >${key}</span>`)
                    } else {
                        let test = l.innerHTML.toString().replaceAll('&nbsp;', ' ')
                        const sp = strings[0].split(/([(（]\s*[)）])/g)
                        for (let j = 0; j < sp.length; j++) {
                            test = test.replace(sp[j], `<span class="ahhTouQ" >${sp[j]}</span>`)
                        }
                        l.innerHTML = test
                    }
                    break
                }
            }

        } else if (l.autocomplete === 'on') {
            const q = l.innerText.replaceAll(/\s*/g, '')
            for (let i = 0; i < q2Keys.length; i++) {
                const _key = q2Keys[i].replace(' ', '')
                const key = q2Keys[i]
                if (q.includes(_key)) {
                    console.log((index - 26) + '.' + '题干: ' + questions.q2[key].full)
                    let test = l.innerHTML.replaceAll('&nbsp;', ' ')
                    const a = questions.q2[key].a
                    l.innerHTML = test.replace(key, `<span class="ahhTouQ" >${key} (答案：${a})</span>`)
                    break
                }

            }

        }
    }

})