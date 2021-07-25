import counter from './counter';
import addItem from './addItem';
import number from './number.js';
import './index.css';
// 同步
// import _ from 'lodash';

// 异步
function getComponent() {
    return import(/*webpackChunkName: "lodash"*/'lodash').then(({default: _}) => {
        var element = document.createElement('div');
        element.innerHTML = _.join(['thomas', 'zz'], '-');
        return element;
    })
}

getComponent().then(element => {
    document.body.appendChild(element);
})

// console.log(_.join([1, 2, 3], '--'));

if (module.hot) {
    module.hot.accept('./number', () => {
        document.body.removeChild(document.getElementById('number'));
        number();
    })
}

number();
counter();
addItem();

