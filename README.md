# extenda-element

Extends LightningElement with some useful methods.


| Syntax      | Description | Usage     |
| :---        |    :---   |   :--- |
| dispatchEventFromExtended    | dispatch event workaround | `this.dispatchEventFromExtended()`       |
| debug   | log out data      | `this.debug()`      |
| handleError  | handle, parse, toast errors      | `this.handleError()`     |
| toast  | toast messages to user     | `this.toast()`     |

## Usage

```js
import ExtendaElement from 'c/extendaElement';

export default class MyComponent extends ExtendaElement {
}
```

---

Coded w/ ❤️ by [Jamie Smith](https://jsmith.dev)
