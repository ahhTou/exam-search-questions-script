const formList = document.querySelectorAll('form')
let res = ''
formList.forEach(l => {


    if (l.action.includes('stuAnswerHandler.jsp')) {
        if (l.autocomplete === 'off') {
            const strings = l.innerText.split('\n')
            const q = strings[0]
            let a = strings[1]
            const val = l.querySelector('input').value.toUpperCase()
            switch (val) {
                case 'A':
                    a = 1
                    break
                case 'B':
                    a = 2
                    break
                case 'C':
                    a = 3
                    break
                case 'D':
                    a = 4
                    break
            }
            const an = strings[a]

            res += q + '\n' + an + '\n\n'

        } else if (l.autocomplete === 'on') {
            const strings = l.innerText.split('。')

            const q = strings[0]
            let an = '错误'

            if (l.querySelector('input').checked) {
                an = '正确'
            }

            res += q + '\n' + an + '\n\n'
        }
    }

})
console.log(res)
