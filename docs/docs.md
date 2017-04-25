# [](https://github.com/aretecode/likeaboss#readme) *0.1.0*



### src/from.js


#### module.exports(obj) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| obj | `Object`  | optimized shorthand obj with all properties | &nbsp; |




##### Returns


- `Object`  object to export, Exports.end




### src/index.js


#### new Exports() 








##### Returns


- `Void`



#### Exports.from(obj) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| obj | `Object`  | optimized shorthand obj with all properties | &nbsp; |




##### Returns


- `Object`  object to export, Exports.end



#### Exports.export(_exports) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| _exports | `module.exports`  |  | &nbsp; |




##### Returns


- `Exports`  @chainable



#### Exports.fn(func) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| func | `Function` `Object`  |  | &nbsp; |




##### Returns


- `Exports`  @chainable



#### Exports.props(objs) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| objs | `Array.&lt;Object&gt;`  | objects to export | &nbsp; |




##### Returns


- `Exports`  @chainable



#### Exports.dir(dirname[, dir&#x3D;&#x27;&#x27;]) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| dirname | `string`  | __dirname (root) | &nbsp; |
| dir&#x3D;&#x27;&#x27; | `string`  | src code folder | *Optional* |




##### Returns


- `Exports`  @chainable



#### Exports.s(path, names) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| path | `string`  | path relative from root/src to [names] | &nbsp; |
| names | `Array.&lt;string&gt;`  | names of files to export, statically required | &nbsp; |




##### Returns


- `Exports`  



#### Exports.dynamics(path, names) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| path | `string`  | path relative from root/src to [names] | &nbsp; |
| names | `Array.&lt;string&gt;`  | names of files to export, dynamically required | &nbsp; |




##### Returns


- `Exports`  @chainable



#### propName() 








##### Examples

```javascript
`{path: 'package.json', name: 'pkg'}`
```


##### Returns


- `Void`



#### web(name) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| name | `string`  | of pkg export for property on window | &nbsp; |




##### Returns


- `Exports`  @chainable



#### end() 








##### Returns


- `Object`  Object used for module.exports




*Documentation generated with [doxdox](https://github.com/neogeek/doxdox).*
