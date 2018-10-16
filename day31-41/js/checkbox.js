
function handleCheckbox(parent) {
    //首先让所有CheckBox全选
    const checkDoms = parent.querySelectorAll("input[type='checkbox']");
    const checkAllDom = parent.querySelector("input[check-type='all']");
    const checkChildDoms = parent.querySelectorAll("input[check-type='single']");

    checkDoms.forEach(element => {
        element.checked = true;
    });

    //CheckBox点击事件
    parent.onclick = (e) => {
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
                        checkCount ++;
                    }
                });
                //不允许一个都不选
                if (checkCount == 0) {
                    target.checked = true;
                };
                //处理全选按钮
                checkAllDom.checked = checkCount === checkChildDoms.length;
            }
        }
    }
}

//获取选中的checkbox的value;
let singleCheckDoms = document.querySelectorAll("input[check-type='single']");
function getCheckedValues() {
    let checkedValues = [];
    Array.prototype.slice.call(singleCheckDoms, 0).forEach(dom => {
        if (dom.checked) {
            checkedValues.push(dom.value);
        }
    });
    return checkedValues;
}
