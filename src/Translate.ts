import Node, {Bounds, Point} from './Node';
import TransformerBase from './TransformerBase';

export default class Translate<T> extends TransformerBase<T> {
    private _x: number;

    private _y: number;

    constructor(options: {x: number, y: number} = {x: 0, y: 0}) {
        super();
        this._x = options.x;
        this._y = options.y;
    }

    preDraw(context: CanvasRenderingContext2D): void {
        context.translate(this._x, this._y);
    }

    postDraw(context: CanvasRenderingContext2D): void {
        context.translate(-this._x, -this._y);
    }

    getBounds(): Bounds {
        const {minX, minY, maxX, maxY} = super.getBounds();
        return {
            minX: minX + this._x,
            minY: minY + this._y,
            maxX: maxX + this._x,
            maxY: maxY + this._y
        };
    }

    intersection(point: Point): Node<T> | undefined {
        const translatedPoint = {x: point.x - this._x, y: point.y - this._y};
        return super.intersection(translatedPoint);
    }

    transform(point: Point): Point {
        return {x: point.x + this._x, y: point.y + this._y};
    }

    untransform(point: Point): Point {
        return {x: point.x - this._x, y: point.y - this._y};
    }

    get x(): number {
        return this._x;
    }

    set x(value: number) {
        this._x = value;
    }

    get y(): number {
        return this._y;
    }

    set y(value: number) {
        this._y = value;
    }
};
