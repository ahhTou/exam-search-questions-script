const list = document.querySelectorAll('.col-9')

let storage = window.localStorage.getItem('questions')

if (storage !== null) {
    storage = JSON.parse(storage)
}

const questions = storage ? storage : {
    q1: {},
    q2: {}
}

list.forEach(l => {
    const strings = l.innerText.split('\n')
    const ans = l.querySelector('strong')
    const htmlElement = ans.querySelector('small')

    const collect = {
        q: '未取得题目',
        a: '未取得答案',
        full: '未取得题目和答案',
    }

    if (htmlElement === null) {
        let fq, q, start = 0 // fq = 题目 第一行
        for (let i = 0; i < strings.length; i++) {
            start++
            if (strings[i].includes('首次提交时间')) continue
            if (strings[i] !== '') {
                fq = strings[i]
                q = strings[i]
                break
            }
        }

        for (let i = start; i < strings.length; i++) {
            if (strings[i].substring(0, 1) === 'A') break
            else {
                q += strings[i]
                start++
            }
        }
        // 选择题
        const i = q[q.length - 2].charCodeAt() - 'A'.charCodeAt() + start
        const _q = fq.replaceAll(/([(（]\s*[)）])*\s*。*\s*【.*?】/g, '').trim()
        const _a = strings[i].trim().replaceAll(/^[A-D]/g, '').trim()
        const _full = q + '\n' + strings[i] + '\n'
        collect.q = _q
        collect.a = _a
        collect.full = _full
        questions.q1[collect.q] = collect
    } else {
        // 判断题
        const _a = htmlElement.innerText.trim().replace('正确答案：', '').trim()
        const _full = strings[1] + '\n'
        collect.q = _full.trim().replaceAll(/。*\s*【.*】/g, '')
        collect.a = _a
        collect.full = _full
        questions.q2[collect.q] = collect
    }

})

const data = JSON.stringify(questions)

localStorage.setItem('questions', data)
