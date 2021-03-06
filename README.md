# Widget seed project

This is a template to start building custom widgets for the UI Designer.  
It includes build, test and deployment steps and supports multiple widgets.
 
## Conventions
- Widgets needs to be in `src/widgets`. A directory per widget.
- Tests must be called `*.spec.js`.
- Widget assets must be in `assets` directory and declared in `widget.json`.

The build step will create a `dist` folder with resulting directive and a zip file directly importable 
in the UI designer or via command line using `deploy` step. 

## Prerequisites
Node.js >= v4.2.0

## Getting started

```
npm install
```

## Build

```
npm run build
```

## Tests

Single run
```
npm test
```

On file change
```
 npm run test:watch
```

## Deploy
You can deploy widgets developed in widget seed directly in a running UI Designer. 

### Single run 

```
npm run deploy -- --widget <widget name> [--host <ui designer url> | --force]
```

`--widget` option is mandatory and allow you to specify the widget to deploy. It is the directory name.  
`--host` option allow you to specify UI Designer address. Default value: `http://127.0.0.1:8080/designer`  
`--force` option allow you to override the widget if it already exist.

e.g. `npm run deploy -- --widget customWidget --host http://127.0.0.1:8080/designer --force`

### On file change

```
npm run deploy:watch -- --widget <widget name> [--host <ui designer url> | --force]`
```

`--widget` option is mandatory and allow you to specify the widget to deploy. It is the directory name.  
`--host` option allow you to specify UI Designer address. Default value: `http://127.0.0.1:8080/designer`  
`--force` option allow you to override the widget if it already exist

e.g. `npm run deploy:watch -- --widget customWidget --host http://127.0.0.1:8080/designer --force`

## Widget model (widget.json)

```
{
  "id": "customWidget",                 // Camel cased widget id, used as tag name for the html element
                                        // should not begin by 'pb' since it is a reserved prefix for default widgets 
                                        
  "name": "Widget",                     // Displayed in the widget palette
  "template": "@template.tpl.html",     // Html template, inlined during the build
  "controller": "@controller.ctrl.js",  // Directive controller, inlined during the build
  "custom": true,                       // Must be set to true
  "icon": "<svg .... </svg>",           // Widget's icon that will be displayed in the palette, must be an inlined svg
  "properties": [                       // Define properties of the widget
    {
      "label": "Color",                 // Displayed in property panel
      
      "name": "color",                  // Name used in the template or the controller 
                                        // via the scope (e.g. $scope.properties.color)
                                        
      "type": "choice",                 // Define the type of the value, 
                                        // possible values: ['text', 'choice', 'html', 'integer', 'boolean', 'collection']
                                        
      "choiceValues": [                 // Only available for choice type
        "RebeccaPurple",
        "Chartreuse",
        "Tomato",
        "DeepSkyBlue"
      ],
      "defaultValue": "RebeccaPurple",
      "bond": "expression"              // Define the type of editor displayed in 
                                        // the property panel,
                                        // possible values: ['variable', 'expression', 'interpolation', 'constant']
    }
  ],
  "assets": [                           // Define widget assets and dependencies, can be local or external
    {
      "name": "style.css",              // Name of an internal asset or URL of an external asset
      "type": "css",                    // Possible values: ['css', 'js', 'img', 'json']
      
      "external": false,                // External assets name must be a standard URL
                                        // Internal assets content must be 
                                        // in assets/<type>/<name> (e.g. assets/css/style.css)
                                        
      "order": 1                        // Define load order
    }
  ],
  "requiredModules": ["ngAnimate"]      // To define an Angular module upon which the widget depends
}
```

