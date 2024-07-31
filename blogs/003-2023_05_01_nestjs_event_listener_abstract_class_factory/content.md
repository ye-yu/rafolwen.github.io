# Overview

In this blog post, I am going to demonstrate how to use a class factory to generate an event listener class using NestJS event emitter package.

**Table of Content**

1. Quick Review
2. Abstract Class in TypeScript
3. Event Emitter in NestJS
   1. Improving Listener 1: Fixing Event Consistencies
   2. Improving Listener 2: Single Event Handler Class
4. Improving Listener Using Abstract Class Factory
   1. Constructor Type in TypeScript
   2. Using Class Factory in Event Listener
5. Conclusion

# 1. Quick Review

It is assumed that you are already familiar with injectables in NestJS and also generics in TypeScript. For a quick summary, here is how you would normally create a module in NestJS:

**event.service.ts**: Handles event emission

```typescript
import { Injectable } from "@nestjs/common";

@Injectable()
export class EventService {
  // implementation is omitted for now
}
```

**event.module.ts**: Exports EventService singleton for other services

```typescript
import { Module } from "@nestjs/common";
import { EventService } from "./event.service";

@Module({
  providers: [EventService],
  exports: [EventService],
})
export class EventModule {}
```

**app.module.ts**: Imports EventsService for internal uses

```typescript
import { Module } from "@nestjs/common";
import { EventModule } from "./events/event.module";

@Module({
  imports: [EventModule],
})
export class AppModule {}
```

# 2. Abstract Class in TypeScript

Abstract class in TypeScript pattern follows the common convention of OOP paradigm. For TypeScript, you can only extend from a single abstract class with predefined properties and methods. For example, this is a base class for event listener with a `onEvent` method.

```typescript
export abstract class BaseEventListener {
  abstract onEvent(eventData: any): Promise<void>;
}
```

You can use the keyword `extends` to extend from this class and implement the required properties.

```typescript
export class OnSignUpEventListener extends BaseEventListener {
  async onEvent(signUpData: SignUpData): Promise<void> {
    await this.signUpForNewsletter(signUpData);
  }
}
```

# 3. Event Emitter in NestJS

Event emitter allows workflows to be triggered after certain action. You can read more about event emitter in NestJS from their [documentation page here](https://docs.nestjs.com/techniques/events).

In summary, this package provides decorators that can be annotated on a method to assign the handler to the event data.

```typescript
@Injectable()
export class UserEventsListener {
  @OnEvent("user.signup")
  async onSignUp(data: UserSignUpData): Promise<void> {
    // ...
  }

  @OnEvent("user.login")
  async onLogin(data: UserLoginData): Promise<void> {
    // ...
  }
}
```

When this method is provided by a module, `EventEmitterModule` will scan through the providers and register the event handlers annotated by the `OnEvent` decorator`

```typescript
import { EventEmitterModule } from "@nestjs/event-emitter";
import { UserEventsListener } from "./events/user.event";

@Module({
  imports: [
    // this module should be imported in app.module.ts
    // but for the sake of simplicity of the blog post, i will only provide this here
    EventEmitterModule.forRoot(),
  ],
  provides: [
    // by providing this injectable that used `OnEvent` decorator,
    // this will be discoverable by EventEmitterModule and be
    // automatically registered as an event handler
    UserEventsListener,
  ],
})
export class UserModule {}
```

To trigger these event listener, we will simply use the `EventEmitter` class

```typescript
@Injectable()
export class UserService {
  constructor(readonly eventEmitter: EventEmitter) {}
  async login(username: string, password: string): Promise<void> {
    // some operations here
    this.eventEmitter.emit("user.login", { username, password });
  }
}
```

From here, we could identify a few error-prone areas that we can slowly fix to overcome the error:

1. Consistency of event name and data: can be fixed using event data class
2. Listener service that keeps expanding with listener methods: can be fixed using separating listeners into their own class
3. Associating the correct event name with event data in the listener: can be fixed using abstract class factory

## 3.1 Improving Listener 1: Fixing Event Consistencies

Using plain string for the event name is prone to many errors like typos. We can avoid this by creating an enum to keep track of all event names:

```typescript
export enum UserEvents {
  Login = "Login",
  SignUp = "SignUp",
}
```

(Note that I use the same casing and spelling for key and enum value. This is the ultimate correct way to create string enums btw :v)

With the help of your code editors, you can easily autocomplete the event names by just pressing tabs. The TypeScript compilers are also able to guarantee of the consistent event names across the whole project.

```typescript
this.eventEmitter.emit(UserEvents.Login, { username, password });
```

However, this may not fix the consistency of event data because this only fix the consistency of event name. To fix that, we can use a class instead to define the event data structure and use the class name as the event name. For example, this is the event data class:

```typescript
export class UserLoginEvent {
  constructor(readonly username: string, readonly password: string) {}
}
```

This is how you should emit the event from here.

```typescript
this.eventEmitter.emit(
  UserLoginEvent.name,
  new UserLoginEvent(username, password)
);
```

From here, you can also create a helper function to reduce the length of the parameters.

```typescript
class UserService {
  emit<T = any>(data: T): void {
    this.eventEmitter(data.constructor.name, data);
  }

  async login(username: string, password: string): Promise<void> {
    // some operations here
    this.emit(new UserLoginEvent(username, password));
  }
}
```

## 3.2 Improving Listener 2: Single Event Handler Class

Too many event handler methods in one class makes it hard to maintain the code. This is because injectable dependencies might grow and affect the cleanliness of test files. One ideal approach is to take out the event handler method into their own listener class.

```typescript
@Injectable()
export class UserLoginListener {
  @OnEvent(UserLoginEvent.name)
  async onUserLogin(data: UserLoginEvent): Promise<void> {
    // do something
  }
}
```

Next, we register each listener as a provider in the module.

```typescript
@Module({
  provides: [UserLoginListener, UserSignUpListener],
})
export class UserModule {}
```

# 4. Improving Listener Using Abstract Class Factory

How do I enforce stronger rule to the event listener so that TypeScript can report to me errors if the event name in `OnEvent` is not the correct event class in the handler method parameter? At any time of the app development, this kind of error could happen:

```typescript
// i copied and pasted this into another file, but i forgot to change the method signature
// of onEvent from UserLoginEvent to UserSignUpEvent
@Injectable()
export class UserSignUpListener {
  @OnEvent(UserSignUpEvent.name)
  async onUserSignUp(data: UserLoginEvent): Promise<void> {
    // do something
  }
}
```

This human error will not be reported by the TypeScript compiler because there is no association between on event name in `OnEvent` decorator and the data type of the method parameter.

## Constructor Type in TypeScript

Before we get into the fix, let look into how can we define a class type in TypeScript.

```typescript
interface ExecInterface {
  exec(): void;
}

type ExecClassType = new () => ExecInterface;
```

From the snippet above, the `new () => ExecInterface` defines the constructor type that returns `ExecInterface`. For example, if a variable `instantiatable` is defined as `ExecClassType`, then `new instantiatable()` will be interfered as type `ExecClassType`. For example,

```typescript
interface ExecInterface {
  exec(): void;
}

type ExecClassType = new () => ExecInterface;

class ExecLogName {
  exec(): void {
    console.log("name");
  }
}

class ExecLogTime {
  exec(): void {
    console.log("time");
  }
}

let instantiatable: ExecClassType;

instantiatable = ExecLogName;
new instantiatable().exec(); // output: name

instantiatable = ExecLogTime;
new instantiatable().exec(); // output: time
```

This is important because now we can create a function to return a constructor while customising the function parameter to manipulate the type of constructor to be returned by the function.

```typescript
function getClass(type: "name" | "time"): ExecClassType {
  switch (type) {
    case "name":
      return ExecLogName;
    case "time":
      return ExecLogTime;
  }
}

let instantiatable: ExecClassType;

instantiatable = getClass("name");
new instantiatable().exec(); // output: name

instantiatable = getClass("time");
new instantiatable().exec(); // output: time
```

Now that we have type checking on the class factory function, the compiler will throw error if we pass an invalid value to the function.

```typescript
// does not compile. throws error something like
// "location" is not assignable to "name" | "time"
getClass("location");
```

Can we also extend from a class factory? Yes, we can!

```typescript
class ExecNameLocation extends getClass("name") {
  exec(): void {
    super.exec();
    console.log("location");
  }
}

new ExecNameLocation().exec();
// output:
//   name
//   location
```

## Using Class Factory in Event Listener

From here, we can already make use of the class factory receiving the event data class to generate an injectable so that the extending class is implementing the correct listener handler function with the correct event data class. We apply this together with generics so that this function is reusable for all other event data class.

```typescript
interface BaseEventListener<T> {
  handle(data: T): Promise<void>;
}

type BaseEventListenerConstructor<T> = new () => BaseEventListener<T>;
type NoArgConstructor<T> = new () => T;

function EventListener<T>(
  EventData: NoArgConstructor<T>
): BaseEventListenerConstructor<T> {
  @Injectable()
  abstract class eventListener {
    abstract handle(data: T): Promise<void>;

    @OnEvent(EventData.name)
    async onEvent(data: T): Promise<void> {
      await this.handle(data);
    }
  }

  return eventListener as any;
}
```

Now that we have a class factory function, this is how we will create an event listener:

```typescript
export class UserLoginListener extends EventListener(UserLoginEvent) {}
```

However, we have a problem at this point. The class factory returns a typing that assumed the method `handle()` has been implemented in the class even though we actually have not implemented it. If you write:

```typescript
new UserLoginListener().handle(new UserLoginEvent("", ""));
```

TypeScript will compile successfully because we have deceived it by returning `BaseEventListener` as a constructor that has 'implemented' the interface. However, in reality, the implementation of the `handle` function is missing. From the return type of the function, it is akin to performing this operation in TypeScript:

```typescript
const obj = {};
// wrong, but typescript compiles as usual
const instantiation = obj.constructor as any as BaseEventListener<any>;
// also wrong, but compiles as usual
new instantiation().handle({});
```

From the factory function, can we return an interface so that the extending function must implement the required property? Yes, using abstract class constructor type instead.

In TypeScript interface, you cannot add the modifier `abstract` to any of the properties because an interface is already a contract of properties and methods for a class or an object, i.e. all the properties in the interface is already has `abstract` properties and must be implemented by the class or the object. Therefore, this syntax does not make sense.

```typescript
interface BaseEventListener<T> {
  handle(data: T): Promise<void>;
}
```

However, in our use-case, we need this to happen because the extending class must implement a method to handle event data for specific class. We can transform this into abstract class and pair it with abstract class constructor type.

```typescript
// this acts as a proxy for TypeScript typings.
// no class will be extending from this class directly.
abstract class AbstractBaseEventListener<T> {
  abstract handle(data: T): Promise<void>;
}

type BaseEventListener<T> = abstract new () => AbstractBaseEventListener<T>;
```

Now, let's go back to our `UserLoginListener`, and yes, we finally got an error for not implementing a property required by the abstract class!

> Non-abstract class 'UserLoginListener' does not implement inherited abstract member 'handle' from class 'AbstractBaseEventListener&lt;UserSignUpEvent>'. <span style="color:maroon"> ts(2515) </span>

With the help of our code editor, the missing method will be automatically populated.

```typescript
export class UserLoginListener extends EventListener(UserLoginEvent) {
  handle(data: UserLoginEvent): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
```

Now, if you tried to change the method signature, the TypeScript will throw error saying that the method signature does not match with the abstract method in the abstract class that we are extending.

# 5. Conclusion

This feature of using an abstract class factory to generate event listener is very great because as a developer, we tend to copy and paste a lot of things. Sometimes, we forgot to modify one or two properties from the code that we copied, and this could lead to a lot of time spent on debugging the root cause of the problem.

This abstract class factory not only help to populate the event handler method with the correct event data class, but helps a lot with boilerplate-ing event listener in NestJS application. The full gist of the event listener factory class can be found [here](https://gist.github.com/ye-yu/ff7a06f2367db3c364533c0af6b8df18).
