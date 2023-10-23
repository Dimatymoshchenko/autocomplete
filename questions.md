1. What is the difference between Component and PureComponent? Give
   an example where it might break my app.

- Component: Doesn't automatically compare props or state. Will re-render whenever setState is called.
  PureComponent: Performs shallow comparison of props and state. If they're the same (on a shallow level), it won't re-render.
  Example: If you have an array of objects in state and update one object within that array by mutation, a PureComponent won't see the change because the shallow comparison will consider them the same. This can lead to the UI not updating even though the state has changed.

2. Context + ShouldComponentUpdate might be dangerous. Why is that?

- It may lead to unexpected rendering behavior. shouldComponentUpdate often relies on shallow comparisons of props and state to decide if a component should re-render. However, this comparison doesn't account for changes in context. If a component's render is reliant on context values, and those values change, shouldComponentUpdate might prevent the component from re-rendering, even when it should. Also maybe cause of child Component updates.

3. Describe 3 ways to pass information from a component to its PARENT.

- Callback, Context, Controlled component

4. Give 2 ways to prevent components from re-rendering.

- using composition: moving the state down; using the composition: children as props

5. What is a fragment and why do we need it? Give an example where it might
   break my app.

- Fragments allow you not to wrap the code with unnecessary tags. Fewer DOM nodes can lead to a lighter-weight and potentially faster UI.
  Example where it might break the app: While React fragments support the key prop, they don't pass it down to their children. If you're using a library or a feature that requires the key prop on the immediate children, using a Fragment can break this.

6. Give 3 examples of the HOC pattern.

- a)

```
function withLoadingIndicator(WrappedComponent) {
 return function(props) {
   if (props.isLoading) {
     return <div>Loading...</div>;
   }
   return <WrappedComponent {...props} />;
 };
}

const DataFetchingComponent = withLoadingIndicator(MyComponent);

```

b)

```
function requireAuthentication(WrappedComponent) {
 return function(props) {
   if (!props.isAuthenticated) {
     return <Redirect to="/login" />;
   }
   return <WrappedComponent {...props} />;
 };
}

const AuthenticatedComponent = requireAuthentication(MyComponent);
```

c)

```
function withDataFetching(url, WrappedComponent) {
 return class extends React.Component {
   state = { data: null };

   componentDidMount() {
     fetch(url)
       .then(response => response.json())
       .then(data => this.setState({ data }));
   }

   render() {
     if (!this.state.data) {
       return <div>Loading data...</div>;
     }
     return <WrappedComponent data={this.state.data} {...this.props} />;
   }
 };
}

const DataComponent = withDataFetching("https://api.example.com/data", MyComponent);

```

7. What's the difference in handling exceptions in promises, callbacks
   and async...await?

- Promise have .catch() method, async await can handle errors with try catch, callback can handle error in error first callback

8. How many arguments does setState take and why is it async.

- setState can receive data or function callback to use previous data.
  setState is asynchronous primarily for performance reasons. React batches multiple setState calls together to minimize the number of re-renders and DOM updates, making applications more performant.

9. List the steps needed to migrate a Class to Function Component.

- a) Replace this.state and this.setState with the useState hook.
  b) Refactor this.props to props from arguments
  c) Convert class methods to either function declarations or arrow functions within the component.
  d) Change lifecycle method to hooks
  e) Replace React.createRef() with the useRef hook.

10. List a few ways styles can be used with components.

- With css file, with css module file, with styles using in tags, using <styles> tag

11. How to render an HTML string coming from the server.

- we can use dangerouslySetInnerHTML, but beware about XSS attack
