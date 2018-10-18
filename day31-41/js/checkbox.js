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


let areaWrapper = document.querySelector('#area-wrapper');
let areaSingles = areaWrapper.querySelectorAll("input[check-type='single']");
let goodsWrapper = document.querySelector('#goods-wrapper');
let goodsSingles = goodsWrapper.querySelectorAll("input[check-type='single']");

function getCheckedValues() {
    let region = [];
    let product = [];
    [...areaSingles].slice(0).forEach(el => {
        if(el.checked){
            region.push(el.value);
        }
    });

    [...goodsSingles].slice(0).forEach(el => {
        if (el.checked) {
            product.push(el.value);
        }
    });

    return {
        region,
        product
    }
}

//处理CheckBox
handleCheckbox(areaWrapper);
handleCheckbox(goodsWrapper);



