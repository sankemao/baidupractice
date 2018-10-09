let tableWrapper = document.querySelector('#table-wrapper');

function renderTable(container, data) {
    container.textContent = '';


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
			let value = sourceItem[key];//'手机'	'华东'	'[...]'
			//非数组类型直接添加到td中。
			if (!Array.isArray(value)) {
				let td = document.createElement('td');
				td.innerHTML = value;
				tr.appendChild(td);
			}else{
				value.forEach(number => {
					let td = document.createElement('td');
					td.innerHTML = number;
					tr.appendChild(td);
				});
			}
		})
		table.appendChild(tr);
	});

	container.appendChild(table);
	
	mergeCell(table, 1, 0);//从第1行开始检查合并， 排除了thead
}

function mergeCell(table, row, col) {
	
	
}

renderTable(tableWrapper, getData());