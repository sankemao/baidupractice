let areaWrapper = document.querySelector('#area-wrapper');
let goodsWrapper = document.querySelector('#goods-wrapper');
let allCheckboxes = document.querySelectorAll("input[type=checkbox]");

let goodsSingles = goodsWrapper.querySelectorAll("input[check-type='single']");
let areaSingles = areaWrapper.querySelectorAll("input[check-type='single']");

function handleCheckbox(checkWrapper) {
    //首先让所有CheckBox全选
    const checkAllDom = checkWrapper.querySelector("input[check-type='all']");
    const checkChildDoms = checkWrapper.querySelectorAll("input[check-type='single']");
    checkAllDom.checked = true;
    checkChildDoms.forEach(element => {
        element.checked = true;
    });

    //处理CheckBox点击选中状态
    checkWrapper.onclick = (e) => {
        let target = e.target;
        if (target.getAttribute('type') === 'checkbox') {
            let checkCount = 0;
            let type = target.getAttribute('check-type');
            if (type === 'all') {
                checkDoms.forEach(item => {
                    item.checked = true;
                    checkCount = checkChildDoms.length;
                });
            } else if (type === 'single') {
                let childCheckedCount = 0;
                checkChildDoms.forEach(item => {
                    if (item.checked) {
                        checkCount++;
                    }
                });
                //不允许一个都不选
                if (checkCount == 0) {
                    target.checked = true;
                };
                //处理全选按钮
                checkAllDom.checked = checkCount === checkChildDoms.length;
            }

            //将新状态pushState
            let str = '?' + getState();
            history.pushState("state", null, str);
        }
    }

    //处理默认的state,浏览器进入 replacestate
    history.replaceState("state", null, '?' + getState());
}

handleCheckbox(areaWrapper);
handleCheckbox(goodsWrapper);

function getCheckedValues() {
    let selected = [];
    allCheckboxes.forEach(el => {
        if(el.checked){
            selected.push(el.value);
        }
    });
    return selected;
}


function getState() {
    let str = "";
    allCheckboxes.forEach(el => {
        if (el.checked) {
            str += "1";
        } else {
            str += "0";
        }
    });

    return str;
}

function setState() {
    let arr = location.search.slice(1).split("");
    allCheckboxes.forEach((el, idx) => {
        if (arr[idx] === "1") {
            el.checked = true;
        } else {
            el.checked = false;
        }
    })
}


export default {
    getCheckedValues,
    setState,
}