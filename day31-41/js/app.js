let selectForm = document.querySelector('.select-form');
let tableWrapper = document.querySelector('#table-wrapper');
let barWrapper = document.querySelector('#bar-svg');
let lineWrapper = document.querySelector('#line-canvas');

//根据CheckBox的勾选展示表格
selectForm.onchange = () => {
    let selectAll = getCheckedValues();
    let selectedData = getData(selectAll.product.concat(selectAll.region));
    renderTable(tableWrapper, selectedData);
};

//渲染表格
let selectedData = getData(getCheckedValues().product.concat(getCheckedValues().region));
renderTable(tableWrapper, selectedData);

//开始处理图表
tableWrapper.onmouseover = (e) => {
    let target = e.target;
    if (target && target.nodeName.toUpperCase() == 'TD') {
        let parent = target.parentNode;
        if (!Number(parent.childNodes[3].innerText)) return;
        let data = [];
        [...parent.childNodes].slice(0).forEach(child => {
            let numData = Number(child.innerText);
            if(numData){
                data.push(numData);
            }
        });

        //绘制柱状图
        drawBar(barWrapper, data);
        drawLine(lineWrapper, data);
    }
};

handleTableEvent(tableWrapper);