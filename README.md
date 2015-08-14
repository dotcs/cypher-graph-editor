# Cypher Graph Editor

Live editor that generates a graph from a Cypher query.

The tool allows you to write a Cypher query and generate a graph based on the query in real-time. The editor 
currently is in its early stages and lacks some features to make it really useful. If you like to contribute, please 
add your pull-requests, to speed things up. See also below for some ideas how the editor can be improved.

At the moment the editor looks like this

![Alt text](/screenshots/main-screen.png?raw=true "Main screen of the editor")

The editor builds upon Codemirror with syntax highlighting for Cypher queries, the component itself is a React 
component to easily update the graph while writing the query.

The underlying query analysis is performed by the Cypher-Utils package, written by Michael Hunger, that can be found 
[here](https://github.com/jexp/cypher-utils).


### Developer notices

To start developing, perform the following steps

```bash
git clone https://github.com/dotcs/cypher-graph-editor.git cypher-graph-editor
cd cypher-graph-editor
npm install
npm run serve

# after the package is build via the development webpack server, open the page at
# file:///path/to/cypher-graph-editor/index-dev.html
```

The development server that serves the development bundle will listen on port 3000.

Whenever you have a stable build, you can update the `dist/main.js` bundle via `npm run build`.

### Possible additional features

I would love to see some more features that make this editor more useable. If you want to help me, please open 
an issue to let us know what you are working on and contribute to the development of this editor via pull-request.

* Show relationship directions in the graph
* Add labels to both, nodes and the relationships
* List and color code the nodes
* Allow to select/deselect some of the node labels, relationships, etc.
* Allow to export the graph as SVG, PDF and possibly PNG, JPG, ...

Do you have more ideas? Please let me know by opening an issue.
