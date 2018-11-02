import '../style/app.css';
import Bar from './bar';
import Line from './line';
import dataCenter from './datasource';
import checkbox from './checkbox';
import table from './table';

let selectForm = document.querySelector('.select-form');
let tableWrapper = document.querySelector('#table-wrapper');


let barWrapper = document.querySelector('#bar-svg');
let lineWrapper = document.querySelector('#line-canvas');
let bar = new Bar(barWrapper);
let line = new Line(lineWrapper);

let renderTable = function () {
    let selectedData = dataCenter.getData(checkbox.getCheckedValues());
    table.renderTable(tableWrapper, selectedData);
}

//根据CheckBox的勾选展示表格
selectForm.onchange = () => {
    renderTable();
};

window.addEventListener("popstate", (pe) => {
    checkbox.setState();
    //重新绘制界面
    renderTable();
});

renderTable();

//开始处理图表
tableWrapper.onmouseover = (e) => {
    let target = e.target;
    if (target && target.nodeName.toUpperCase() == 'TD') {
        let parent = target.parentNode;
        if (!Number(parent.childNodes[3].innerText)) return;
        let data = [];
        [...parent.childNodes].slice(0).forEach(child => {
            let numData = Number(child.innerText);
            if (numData) {
                data.push(numData);
            }
        });

        //绘制柱状图
        bar.drawBar(data);
        line.drawLine(data);
    }
};

table.handleTableEvent(tableWrapper);
