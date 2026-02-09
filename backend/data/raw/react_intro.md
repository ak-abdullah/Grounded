## State and Lifecycle

State is similar to props, but it is private and fully controlled by the component.

State allows React components to respond to user input, server responses, and other changes without rewriting the entire component.

### Using State Correctly

Do not modify state directly. Instead, use setState().

```js
this.setState({ count: this.state.count + 1 });

---

### State Updates and Re-rendering

When state changes, React automatically re-renders the component and its children.
This allows the UI to stay in sync with the underlying data without manual DOM updates.

React batches multiple state updates together for performance reasons.
Because of this, state updates may be asynchronous.

To correctly update state based on the previous value, use the functional form of setState:

```js
this.setState(prevState => ({
  count: prevState.count + 1
}));
