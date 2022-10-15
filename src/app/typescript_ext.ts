declare global {
    interface Object {
        let<T>(this: T, callback:(it: T) => void): void;
    }
    interface String {
        $contains<T>(...possible: Array<T>) : boolean;
    }
}

// noinspection JSUnusedGlobalSymbols
export function $contains<T>(value: any, ...possible: Array<T>): boolean {
  return possible.includes(value);
}

export function initialize_typescript_ext() {
  Object.defineProperty(Object.prototype, 'let', {
    value: function <T>(callback: (fn: T) => T): void {
      callback(this);
    }
  });
}
