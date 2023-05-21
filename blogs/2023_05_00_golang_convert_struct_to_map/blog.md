Converting struct to `map[string]interface{}`
---

Using the reflect package of Golang, we can inspect the field inside a certain struct and obtain
the field name and value to be converted into `map[string]interface{}`

```go
type SimpleStruct struct {
  AString string `json:"aString"`
}

structed := SimpleStruct{"hehe"}
reflectedValue := reflect.ValueOf(structed)
reflectedType := reflect.TypeOf(structed)

log.Printf("Struct was named: %s", reflectedType.Name())
log.Printf("First field was named: %s", reflectedType.Field(0).Name)
log.Printf("First field has value: %s", reflectedValue.Field(0).Interface())
```

Some important reflect functions includes:
1. `CanInterface()`: to check if we can pick value out of the reflected variable
2. `value.Kind() == reflect.Pointer`: to check if the reflected value is a pointer or not
3. `value.Elem().Interface()`: to get the pointed value of a pointer variable
  - It is also important to check if the variable is a `nil` pointer or not to avoid accessing inexistent pointer
4. `type.NumField()`: to get the number of fields in the struct. We will be using this to iterate through the fields in the struct

The general idea of this struct to map function is to:
1. Always resolve pointer variables. If the variable is a `nil` pointer, assign `nil` to the map as well. e.g.
   ```go
   var maybeNil *T
   reflectedMaybeNil := reflect.ValueOf(maybeNil)

   if maybePointer == nil {
    outMap[fieldName] = nil
    return
   }

   value := reflectedMaybeNil.Elem().Interface()
   outMap[fieldname] = value
   ```
2. Recursively apply struct to map function if the value is a struct or an element of an array is a struct. A simple `reflect.Kind` check can help us.
   ```go
   value := reflect.Valueof(someVarHere)
   if value.Kind() == reflect.Struct {
     outmap[fieldName] = StructToMap(value)
   }

   var array []interface{}
   if value.Kind() == reflect.Array || value.Kind() == reflect.Slice {
     array := value.Interface().([]interface{})
     var outValue = make([]interface{}, len(array))
     for index, rawValue := range array {
       // check if struct or array here, call StructToMap as required
     }
   }

<br>

# Complete code

The full gist can be found here: https://gist.github.com/ye-yu/0e4c39fb1eee5b791d2768841f87753c

In this gist, I inspect the field name by the struct tag (if empty, I default it back to the original field name). I also add `,inline` feature to allow fields to be populate from the parent map instead.