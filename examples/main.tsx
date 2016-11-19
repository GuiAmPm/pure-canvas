import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Stage from '../src/Stage';
import Circle from '../src/Circle';
import CanvasImage from '../src/Image';
import Line from '../src/Line';
import Rectangle from '../src/Rectangle';
import Translate from '../src/Translate';
import Transform from '../src/Transform';
import Layer from '../src/Layer';
import Scale from '../src/Scale';
import colors from './colors';
import * as triangle from './triangle.svg';
import * as lion from './lion.png';
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
    state = {
        direction: 1
    };

    smallerExample(canvas: HTMLCanvasElement) {
        const lionImage = new Image();

        const onImageLoaded = () => {
            const stage = new Stage(canvas);
            const container = new Layer();

            const lionLayer = new Transform();
            const leImage = new IdentifiedImage({width: 100, height: 100, image: lionImage});
            leImage.setHitEnabled(true);
            lionLayer.translate(-50, -50);
            lionLayer.add(leImage);

            for (let i = 0; i < 17 * 9; i++) {
                const subLayer = new Translate({x: (i % 17) * 100, y: Math.floor(i / 17) * 100});
                subLayer.add(lionLayer);
                container.add(subLayer);
            }

            stage.add(container);
            stage.render();

            const callback = () => {
                lionLayer.rotate(this.state.direction * Math.PI / 40);
                stage.render();
                window.requestAnimationFrame(callback);
            };
            callback();

            stage.on('click', (getNode, event) => {
                const node = getNode();
                if (node) {
                    if (1380 <= event.clientX && event.clientX <= 1440 && 530 <= event.clientY && event.clientY <= 620) {
                        window.alert('Surprise lion!');
                    }
                }
            });
        };

        lionImage.src = lion;
        if (lionImage.complete) {
            onImageLoaded();
        } else {
            lionImage.onload = onImageLoaded;
        }
    }

    renderToCanvas(canvas: HTMLCanvasElement) {
        const triangleImage = new Image();

        function onImageLoaded() {
            const stage = new Stage(canvas);
            const hoverLayer = new Translate();
            const scaledHoverLayer = new Scale({x: 2, y: 2});
            const cachedLayer = new LayerCached();

            const hoverImage = new CanvasImage({width: 24, height: 24, image: triangleImage});
            const hoverCircle = new Circle({radius: 10, fillStyle: 'white'});
            const hoverLine = new Line({x1: 0, y1: 0, x2: 15, y2: 15, lineWidth: 5});
            const hoverRectangle = new Rectangle({x1: 0, y1: 0, x2: 8, y2: 8, strokeStyle: 'red'});

            for (let i = 0; i < 400; i++) {
                const image = new IdentifiedImage({width: 20, height: 20, image: triangleImage});
                const circle = new IdentifiedCircle({radius: 8, fillStyle: getRandomColor()});
                const line = new IdentifiedLine({x1: 0, y1: 0, x2: 15, y2: 15, lineWidth: 3});
                const rectangle = new IdentifiedRectangle({x1: 0, y1: 0, x2: 8, y2: 8});
                image.setHitEnabled(true);
                circle.setHitEnabled(true);
                line.setHitEnabled(true);
                rectangle.setHitEnabled(true);
                image.id = i;
                circle.id = i;
                line.id = i;
                rectangle.id = i;
                const layer = new Transform();
                layer.translate((i % 20) * 20, Math.floor(i / 20) * 20);
                // layer.rotate(Math.PI / 8);
                layer.scale(1, 1);
                layer.add(image);
                layer.add(circle);
                layer.add(line);
                layer.add(rectangle);
                cachedLayer.add(layer);
            }

            scaledHoverLayer.add(hoverLayer);
            stage.add(cachedLayer);
            stage.add(scaledHoverLayer);
            stage.render();

            stage.on('mousemove', getNode => {
                hoverLayer.removeAll();
                const node = getNode();
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
        return <div>
            <canvas width={1600} height={800} ref={(r: HTMLCanvasElement) => this.smallerExample(r)}>
                Your browser does not support the HTML5 canvas tag.
            </canvas>
            <button onClick={() => this.setState({direction: -this.state.direction})}>Click me!</button>
        </div>;
    }
}

const container = document.createElement('div');
document.body.appendChild(container);

ReactDOM.render(
    <App/>,
    container
);
