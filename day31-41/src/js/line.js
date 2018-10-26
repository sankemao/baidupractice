/**
 * 绘制折线图
 */
export default class Line {
    constructor(canvas) {
        this.canvas = canvas;
    }

    drawLine(data) {
        const padding = 25;
        const width = 700;
        const height = 300;
        const axisWidth = width - padding;
        const axisHeight = height - padding;
        const pointGap = axisWidth / data.length;
        const pointRadius = 6;

        let context = this.canvas.getContext('2d');
        context.clearRect(0, 0, width, height);

        //绘制坐标轴
        context.beginPath();
        context.moveTo(padding, 0);
        context.lineTo(padding, axisHeight);
        context.lineTo(padding + axisWidth, axisHeight);
        context.strokeStyle = '#000';
        context.lineWidth = 2;
        context.stroke();

        let dataMax = Math.max(...data);
        //最大值距顶部padding像素
        let rate = dataMax / (axisHeight - padding);

        data.forEach((element, index, self) => {
            //绘制圆形
            let y = axisHeight - element / rate;
            let x = padding + pointGap / 2 + index * pointGap;
            context.beginPath();
            context.arc(x, y, pointRadius, 0, Math.PI * 2, false);
            context.fill();

            //绘制折线
            let yNext = axisHeight - self[index + 1] / rate;
            let xNext = x + pointGap;
            context.moveTo(x, y);
            context.lineTo(xNext, yNext);
            context.stroke();
        });
    }
}