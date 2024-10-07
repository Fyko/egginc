# egginc

A client for interfacing with the EggInc API.

## Installation

```sh
npm install egginc
```

## Usage

```js
import { REST } from 'egginc';

const rest = new REST();

const response = await rest.firstContact('EID1000000000001');
console.log(response);
```
