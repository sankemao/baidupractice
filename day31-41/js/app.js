let areaWrapperDom = document.querySelector('#area-wrapper');
let goodsWrapperDom = document.querySelector('#goods-wrapper');
let selectForm = document.querySelector('.select-form');

handleCheckbox(areaWrapperDom);
handleCheckbox(goodsWrapperDom);

selectForm.onchange = () => {
    let selectedData = getData(getCheckedValues());
    renderTable(selectedData);
};

let selectedData = getData(getCheckedValues());
renderTable(selectedData);
