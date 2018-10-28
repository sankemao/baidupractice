import '../style/app.css';
import Bar from './bar';
import Line from './line';
import Data from './datasource';
import checkbox from './checkbox';
import table from './table';

let selectForm = document.querySelector('.select-form');
let tableWrapper = document.querySelector('#table-wrapper');
let barWrapper = document.querySelector('#bar-svg');
let lineWrapper = document.querySelector('#line-canvas');


let bar = new Bar(barWrapper);
let line = new Line(lineWrapper);
let dataSource = new Data();

//根据CheckBox的勾选展示表格
selectForm.onchange = () => {
    let selectAll = checkbox.getCheckedValues();
    let selectedData = dataSource.getData(selectAll.product.concat(selectAll.region));
    table.renderTable(tableWrapper, selectedData);
};

//渲染表格
let selectedData = dataSource.getData(checkbox.getCheckedValues().product.concat(checkbox.getCheckedValues().region));
table.renderTable(tableWrapper, selectedData);

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
        bar.drawBar(data);
        line.drawLine(data);
    }
};

table.handleTableEvent(tableWrapper);