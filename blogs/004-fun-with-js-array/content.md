When working with an array of elements that each have an identifier field, you might typically fetch a specific element like this:

```ts
const items: {id: string, name: string}[] = [...]
const selectedItem = items.find((e) => e.id === 'johndoe')
if (!selectedItem) {
  console.error("John Doe is not found")
}
```

Since the id field is unique for each element, you might prefer to accumulate the elements in an object to access them directly by key:

```ts
type IdName = {id: string, name: string}
const items: IdName[] = [...]
const itemsById: Record<string, IdName> =
  items.reduce((a, item) => {
    a[item.id] = item;
    return a;
  }, {} as Record<string, IdName>);

console.log(itemsById.johnDoe);
```

However, maintaining this structure means you must update both the array and the object, which can lead to redundant work. By using a JavaScript Proxy, we can enhance the array to simplify these operations:

```ts
const items: {id: string, name: string}[] = [...]
const arrayView = toArrayView(items, 'id')
const johnDoeItem = arrayView.johnDoe
if (!johnDoeItem) {
  console.error("John Doe is not found")
}

arrayView.push({ id: "johnDoe", name: "John Doe" })
const newJohnDoeItem = arrayView.johnDoe
console.log("John Doe is now found":, newJohnDoeItem);
```

This approach allows for more intuitive and efficient access to elements by their identifier. So, how do we implement toArrayView?

# Implementing ArrayView

The Proxy object in JavaScript is a powerful tool that allows you to create a custom behavior for fundamental operations (e.g., property lookup, assignment, enumeration, function invocation, etc.) on objects. The `toArrayView` function leverages the Proxy object to extend the standard array behavior, enabling elements to be accessed via object keys.

In our ArrayView, we need to intercept property access to check if the property exists as a key in an accumulated object. First, we create this accumulated object:

```ts
export function toArrayView<T>(arr: T[], key: keyof T): ArrayView<T> {
  const obj = arr.reduce((a, b) => {
    a[key] = b;
    return a;
  }, {} as Record<ObjectKey, T>);

  // ...pending implementation below
}
```

This object will be used in the proxy handler to look up the property value if it exists in the array items. To retain the properties of the array, we must also return the array’s property value.

```ts
return new Proxy(arr, {
  get(target, p: any) {
    // property p exists in the obj, return this value
    if (obj[p] !== undefined) {
      return obj[p];
    }

    // property p does not exist in the obj, return the value from array
    return typeof target[p] === "function"
      ? // dont forget to bind array functions to original object
        target[p].bind(target)
      : target[p];
  },
}) as ArrayView<T>;
```

This approach ensures that property accesses first check the accumulated object for a match, and if not found, default to the array’s properties and methods, maintaining the array’s original functionality.

## Handling duplicating values

The easiest way when two elements of the array having the same unique field is to throw an error:

```ts
const obj = arr.reduce((a, b) => {
  if (a[k] !== undefined) {
    throw new Error(`Duplicating index for key ${String(k)}`);
  }
  a[key] = b;
  return a;
}, {} as Record<ObjectKey, T>);
```

## Handling `Array.push`

Since we are preserving the original functionality of the array, using the `push` method will mutate the array without updating our lookup object. We can modify the proxy handler to return a modified function for the `Array.push` method. The `assignToObject` function will handle checking for duplicate values in our lookup object.

```ts
function assignToObject(item: T, obj: Record<ObjectKey, T>) {
  const k = item[key];
  if (obj[k] !== undefined) {
    throw new Error(`Duplicating index for key ${String(k)}`);
  }
  obj[k] = item;
  return obj;
}
const obj = arr.reduce((a, b) => {
  assignToObject(b, a);
  return a;
}, {} as Record<ObjectKey, T>);

return new Proxy(arr, {
  get(target, p: any) {
    if (p === "push") {
      return function pushProxy(...items: T[]) {
        target.push(...items);
        items.forEach((e) => assignToObject(e, obj));
      };
    }
    if (obj[p] !== undefined) {
      return obj[p];
    }

    return typeof target[p] === "function" ? target[p].bind(target) : target[p];
  },
}) as ArrayView<T>;
```

# ArrayView in action!

With a little bit of typing polishing and enhancement, we can finally use this utility function to access the array element directly from the array using its identifier key, while still maintaining all standard array operations.​

```ts
const items: {id: string, name: string}[] = [...]
const arrayView = toArrayView(items, 'id')
const johnDoeItem = arrayView.johnDoe
if (!johnDoeItem) {
  console.error("John Doe is not found")
}

arrayView.push({ id: "johnDoe", name: "John Doe" })
const newJohnDoeItem = arrayView.johnDoe
console.log("John Doe is now found":, newJohnDoeItem);
```

My ArrayView implementation can be found in the gist here: https://gist.github.com/ye-yu/250c5af0e7f4a09864faef0ef062a648
