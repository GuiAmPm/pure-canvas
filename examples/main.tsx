import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Stage from '../src/Stage';
import Circle from '../src/Circle';
import CanvasImage from '../src/Image';
import Line from '../src/Line';
import Rectangle from '../src/Rectangle';
import Translate from '../src/Translate';
import Scale from '../src/Scale';
import colors from './colors';
import * as triangle from './triangle.svg';
import LayerCached from '../src/LayerCached';

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

class IdentifiedImage extends CanvasImage {
    id: number;
    type: string = 'image';
}

class IdentifiedCircle extends Circle {
    id: number;
    type: string = 'circle';
}

class IdentifiedLine extends Line {
    id: number;
    type: string = 'line';
}

class IdentifiedRectangle extends Rectangle {
    id: number;
    type: string = 'rectangle';
}

class App extends React.Component<{}, {}> {
    renderToCanvas(canvas: HTMLCanvasElement) {
        const triangleImage = new Image();

        function onImageLoaded() {
            const stage = new Stage(canvas);
            const hoverLayer = new Translate();
            const scaledHoverLayer = new Scale({x: 2, y: 2});
            const scaledLayer = new Scale({x: 2, y: 2});
            const cachedLayer = new LayerCached();

            const hoverImage = new CanvasImage({width: 24, height: 24, image: triangleImage});
            const hoverCircle = new Circle({radius: 10, fillStyle: 'white'});
            const hoverLine = new Line({x1: 0, y1: 0, x2: 15, y2: 15, lineWidth: 5});
            const hoverRectangle = new IdentifiedRectangle({x1: 0, y1: 0, x2: 8, y2: 8, strokeStyle: 'red'});
            hoverImage.setHitEnabled(false);
            hoverCircle.setHitEnabled(false);
            hoverLine.setHitEnabled(false);
            hoverRectangle.setHitEnabled(false);

            for (let i = 0; i < 400; i++) {
                const image = new IdentifiedImage({width: 20, height: 20, image: triangleImage});
                const circle = new IdentifiedCircle({radius: 8, fillStyle: getRandomColor()});
                const line = new IdentifiedLine({x1: 0, y1: 0, x2: 15, y2: 15, lineWidth: 3});
                const rectangle = new IdentifiedRectangle({x1: 0, y1: 0, x2: 8, y2: 8});
                image.id = i;
                circle.id = i;
                line.id = i;
                rectangle.id = i;
                const layer = new Translate({x: (i % 20) * 20, y: Math.floor(i / 20) * 20});
                layer.add(image);
                layer.add(circle);
                layer.add(line);
                layer.add(rectangle);
                scaledLayer.add(layer);
            }

            scaledHoverLayer.add(hoverLayer);
            cachedLayer.add(scaledLayer);
            stage.add(cachedLayer);
            stage.add(scaledHoverLayer);
            stage.render();

            stage.on('mousemove', node => {
                hoverLayer.removeAll();
                if (node) {
                    switch (node.type) {
                        case 'image':
                            hoverLayer.x = (node.id % 20) * 20 - 2;
                            hoverLayer.y = Math.floor(node.id / 20) * 20 - 2;
                            hoverLayer.add(hoverImage);
                            break;
                        case 'circle':
                            hoverLayer.x = (node.id % 20) * 20;
                            hoverLayer.y = Math.floor(node.id / 20) * 20;
                            hoverLayer.add(hoverCircle);
                            break;
                        case 'line':
                            hoverLayer.x = (node.id % 20) * 20;
                            hoverLayer.y = Math.floor(node.id / 20) * 20;
                            hoverLayer.add(hoverLine);
                            break;
                        case 'rectangle':
                            hoverLayer.x = (node.id % 20) * 20;
                            hoverLayer.y = Math.floor(node.id / 20) * 20;
                            hoverLayer.add(hoverRectangle);
                            break;
                        default:
                            break;
                    }
                }
                stage.render();
            });
        }

        triangleImage.src = triangle;
        if (triangleImage.complete) {
            onImageLoaded();
        } else {
            triangleImage.onload = onImageLoaded;
        }
    }

    render() {
        return <canvas width={400} height={400} ref={(r: HTMLCanvasElement) => this.renderToCanvas(r)}>
            Your browser does not support the HTML5 canvas tag.
        </canvas>;
    }
}

const container = document.createElement('div');
document.body.appendChild(container);

ReactDOM.render(
    <App/>,
    container
);