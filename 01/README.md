# NOTES

- index js is always the first file to be executed
- the code isnt run 1 to 1 it is first transformed and then delivered to the browser for rendering
- react and react-dom together make up the react library
- ReactDOM.createRoot() method creates the root element of the webpage where our code is going to be loaded
- index.html is the entry point of the code.
- component in react is just a function. A special function as it returns html code but it is still a simple js function
- instead of the JSX return we can write it in plain JS with React.createElement() method
  - it takes 3 element as argument.
  - first is the element which should be created.
  - second element is the object which sets the attributes of the element.
  - third it the content in btw the opening and closing first element. Also it can be infinite elements and not just 1.
  - if its a html element you can just pass the string like 'div' but incase of custom component you can refer the component directly.
- in past all the files where JSX was used needed the import React from './react' line, but now it is able to process without it.
