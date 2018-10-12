/**
 * 柱状图
 */
function drawBar(svg, data) {
    const padding = 25;
    const width = 700;
    const height = 300;
    const axisWidth = width - padding;
    const axisHeight = height - padding;
    const axisColor = '#000';
    const barGap = 12;
    const barWidth = (width - barGap * (data.length + 1) - 2 * padding) / data.length;

    //设置svg尺寸
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);

    //绘制坐标轴
    let barHtml = [];
    barHtml.push("<line x1=" + padding + " y1=0 x2=" + padding + " y2=" + axisHeight + " stroke=" + axisColor + " stroke-width='2'/>");
    barHtml.push("<line x1=" + padding + " y1=" + axisHeight + " x2=" + axisWidth + " y2=" + axisHeight + " stroke=" + axisColor + " stroke-width='2'/>");

    //绘制柱子
    let dataMax = Math.max(...data);
    let rate = dataMax / (axisHeight-padding);
    
    let x = padding + barGap;
    data.forEach(element => {
        barHtml.push('<rect width=' + barWidth + ' height=' + (element / rate) + ' x=' + x + ' y=' + (axisHeight - element / rate) + ' fill=#ff0000' +  ' />')
        x += barWidth + barGap;
    });

    svg.innerHTML = barHtml.join('');
}