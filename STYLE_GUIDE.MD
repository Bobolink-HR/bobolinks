# Style Guide
- Quotes: "HTML uses double quotes", 'Javascript use single quotes'
- Variable/Class Naming:
  - Lower camelCase for Javascript variables ("numberOfRounds", "hitPointCount")
  - Upper CamelCase for Javascript classes/constructors ("AppCtrl", "PlayerModel")
  - Dash-case for HTML/CSS "number-of-rounds, hit-point-count"
- One File for every distinct purpose (template, controller, factory, etc)
- Only use Element (or attribute) directives [Try to make Element only unless special case]

## Wrapping angular modules in anonymous functions

// avoid
app.controller('MainCtrl', function MainCtrl () {});
app.service('SomeService', function SomeService () {});

// recommended
function MainCtrl () {}
function SomeService () {}

app.controller('MainCtrl', MainCtrl)
app.service('SomeService', SomeService);
