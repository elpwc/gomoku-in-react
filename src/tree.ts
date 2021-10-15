import { isUndefined } from "util";

export { }

class Tree<T>{
    constructor(value: T | undefined, tree: Tree<T> | undefined = undefined) {
        this.value = value;
        if (tree !== undefined) {
            this.childTree = tree as unknown as Tree<T>;
        }
    }
    public value: T | undefined = undefined;

    public childTree: Tree<T> = new Tree<T>(undefined);

    public hasChildTree?():boolean{
        return this.childTree !== undefined && this.childTree !== null;
    }

}