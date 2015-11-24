# Widget seed project

This is a template to start building custom widgets. It includes build, test and deployment steps.
It support multiple widgets.
 
## Conventions
- Widgets needs to be in `src/widget`. A directory per widget.
- Tests must be called `*.spec.js`.
- Assets must be in `asset` directory and declared in `widget.json`.

The build step will create a `dist` folder with resulting directive and a zip file directly importable 
in the UI designer or via command line using `deploy` step. 

## Get started

`npm install`

## build

`npm run build`

## clean

Remove built files by removing `dist` directory

`npm run clean`

## test

Single run: `npm test`

On file change: `npm run test:watch` 

## deploy
### Single run 

`npm run deploy -- --widget customWidget`

`--widget` option is mandatory and allow you to specify the widget to deploy. It is the directory name.

`--host` option allow you to specify UI Designer address. Default value: `http://127.0.0.1:8080/designer`

e.g. `npm run deploy -- --host http://127.0.0.1:8080/designer`

`--force` option allow you to override the widget if it already exist

### On file change

`npm run deploy:watch -- --widget customWidget`

`--widget` option is mandatory and allow you to specify the widget to deploy. It is the directory name.

`--host` option allow you to specify UI Designer address. Default value: `http://127.0.0.1:8080/designer`

e.g. `npm run deploy:watch -- --host http://127.0.0.1:8080/designer`

`--force` option allow you to override the widget if it already exist

## widget.json

```
{
  "id": "customWidget",                 // Camel cased widget id, used as tag name for the html element
  "name": "Widget",                     // Displayed in the widget palette
  "template": "@template.tpl.html",     // Html template, inlined during the build
  "controller": "@controller.ctrl.js",  // Directive controller, inlined during the build
  "custom": true,                       // Must be set to true
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
      "name": "style.css",              // When start with `http://` then the asset 
                                        // is external, otherwise the asset must be 
                                        // in assets/<type>/<name> (e.g. assets/css/style.css)
                                        
      "type": "css",                    // Possible values: ['css', 'js', 'img', 'json']
      "order": 1                        // Only used for `js` assets, define load order
    }
  ],
  "requiredModules": ["ngAnimate"]      // To define an Angular module upon which the widget depends
}
```
