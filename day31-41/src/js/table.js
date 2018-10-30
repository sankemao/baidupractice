/**
 * 渲染表格
 * @param {*} tableWrapper 
 * @param {*} data 
 */

import editIcon from '../img/edit.png';
import dataCenter from './datasource';


function renderTable(tableWrapper, data) {
    tableWrapper.textContent = '';
    let table = document.createElement('table');
    table.setAttribute('id', 'table');
    //表头
    let thead = document.createElement('tr');
    thead.innerHTML = `
		<th>商品</th>
		<th>地区</th>
		<th>1月</th>
		<th>2月</th>
		<th>3月</th>
		<th>4月</th>
		<th>5月</th>
		<th>6月</th>
		<th>7月</th>
		<th>8月</th>
		<th>9月</th>
		<th>10月</th>
		<th>11月</th>
		<th>12月</th>
    `;
    table.appendChild(thead);

    //表格内容
    data.forEach(sourceItem => {
        let tr = document.createElement('tr');
        Object.keys(sourceItem).forEach(key => {
            let value = sourceItem[key]; //'手机'    '华东'	   '[...]'
            //非数组类型直接添加到td中。
            if (!Array.isArray(value)) {
                let td = document.createElement('td');
                td.innerHTML = value;
                tr.appendChild(td);
            } else {
                value.forEach(number => {
                    let td = document.createElement('td');
                    td.innerHTML = number;

                    //添加input输入
                    let img = document.createElement('img');
                    let inputNum = document.createElement('input');
                    let inputConfirm = document.createElement('input');
                    let inputCancel = document.createElement('input');

                    img.setAttribute('src', editIcon);
                    inputNum.setAttribute('type', 'text');
                    inputConfirm.setAttribute('type', 'button');
                    inputCancel.setAttribute('type', 'button');
                    inputNum.setAttribute('placeholder', number);
                    inputNum.setAttribute('class', 'input');
                    inputConfirm.setAttribute('class', 'confirm');
                    inputCancel.setAttribute('class', 'cancel');
                    inputConfirm.setAttribute('value', '确定');
                    inputCancel.setAttribute('value', '取消');

                    td.appendChild(img);
                    td.appendChild(inputNum);
                    td.appendChild(inputConfirm);
                    td.appendChild(inputCancel);

                    [...td.childNodes].slice(2).forEach(element => {
                        element.style.visibility = 'hidden';
                    });

                    tr.appendChild(td);
                });
            }
        })
        table.appendChild(tr);
    });

    //当地区选择一个，商品多个的时候，交换第一和第二列。
    let areaWrapper = document.querySelector('#area-wrapper');
    let goodsWrapper = document.querySelector('#goods-wrapper');
    let areaSel = areaWrapper.querySelectorAll("input[check-type='single']");
    let goodsSel = goodsWrapper.querySelectorAll("input[check-type='single']");
    let areaSelCount = 0;
    for (let i = 0; i < areaSel.length; i++) {
        if (areaSel[i].checked) areaSelCount++;
    }
    let goodsSelCount = 0;
    for (let i = 0; i < goodsSel.length; i++) {
        if (goodsSel[i].checked) goodsSelCount++;
    }
    if (areaSelCount === 1 && goodsSelCount !== 1) {
        [...table.rows].slice(0).forEach(row => {
            let temp = row.cells[0].innerHTML;
            row.cells[0].innerHTML = row.cells[1].innerHTML;
            row.cells[1].innerHTML = temp;
        });
    }

    tableWrapper.appendChild(table);
    mergeCell(table, 1, 0); //从第1行开始检查合并， 排除了thead
}

/**
 * 思路：
 * 从指定的startRow的col单元格开始往下遍历，相同则合并；
 * 一旦遍历到不相等，表明该startRow合并完成，递归重新指定startRow进入新的一轮遍历，并跳出当前遍历。
 * @param {*} table 需要修改的表格
 * @param {*} startRow 开始的行数
 * @param {*} col 指定的列数
 */
function mergeCell(table, startRow, col) {
    console.log('执行了mergeCell');
    let startRowDom = table.rows[startRow];

    for (let i = startRow; i < table.rows.length - 1; i++) {
        if (startRowDom.cells[col].innerHTML === table.rows[i + 1].cells[col].innerHTML) {
            table.rows[i + 1].cells[col].style.display = 'none';
            table.rows[startRow].cells[col].rowSpan += 1;
        } else {
            mergeCell(table, i + 1, col);
            break;
        }
    }
}

//数据td编辑按钮点击事件
function handleTableEvent(tableWrapper) {
    let preTd;
    tableWrapper.addEventListener('click', event => {
        let target = event.target;
        if (!target) return;
        let parent = target.parentNode;
        if (target.nodeName.toUpperCase() == 'IMG') {
            //处理pre
            hideEditContent(preTd);
            //处理current
            target.style.visibility = 'hidden';
            preTd = parent;
            [...parent.childNodes].slice(2).forEach(item => {
                item.style.visibility = 'visible';
            });
        } else if (target.className.toUpperCase() == 'CONFIRM') {
            //check valid input
            let inputNum = parent.childNodes[2].value;
            if (!Number(inputNum)) {
                alert('please input a valid number');
                return;
            }
            parent.childNodes[0].textContent = inputNum;
            hideEditContent(parent);
            //保存数据到localStorage
            let tdDom = parent.parentNode;
            let product;
            let region;
            let sale = [];
            [...tdDom.childNodes].slice(0).forEach((item,idx,self) => {
                let txt = item.textContent;
                if(idx == 0){
                    product = txt;
                }else if(idx == 1){
                    region = txt;
                }else{
                    sale.push(txt);
                }
            });
            dataCenter.saveCurrentData(product, region, sale);
        } else if (target.className.toUpperCase() == 'CANCEL') {
            hideEditContent(parent);
        }
    }, false);

    tableWrapper.addEventListener('blur', event => {
        let target = event.target;
        if (!target) return;
        if (target.className.toUpperCase() === 'INPUT') {
            setTimeout(() => {
                hideEditContent(preTd);
            }, 100);
        }
    }, true);
}

function hideEditContent(tdNode) {
    if (!tdNode) return;
    [...tdNode.childNodes].slice(1).forEach((item, index, self) => {
        if (index === 0) {
            item.removeAttribute('style');
        } else {
            item.style.visibility = 'hidden';
        }
    })
}

export default {
    hideEditContent,
    handleTableEvent,
    renderTable,
}