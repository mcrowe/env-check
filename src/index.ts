import fs = require('fs')


interface IEnvMap {
  [name: string]: string
}


interface ISchema {
  required: IEnvMap
  optional: IEnvMap
}


function run() {
  const schema = loadSchema()

  const invalid = []

  for (let name in schema.required) {
    if (!process.env[name] || process.env[name].length == 0) {
      const description = schema.required[name]
      invalid.push({ name, description })
    }
  }

  if (invalid.length > 0) {
    console.log('EnvCheck: Missing the following required environment variables:')
    for (let variable of invalid) {
      console.log(`${variable.name}: ${variable.description}`)
    }
    console.log('Aborting...')
    process.exit()
  }
}


export default { run }


function loadSchema(): ISchema {
  const schema = JSON.parse(fs.readFileSync('package.json', 'utf-8')).env

  if (!schema) {
    console.error('EnvCheck: Missing "env" key in package.json. Aborting...')
    process.exit()
  }

  if (!schema.required && !schema.optional) {
    console.error('EnvCheck: "env" key in package.json must have a "required" or "optional" section. Aborting...')
    process.exit()
  }

  if (!schema.required) {
    schema.required = {}
  }

  if (!schema.optional) {
    schema.optional = {}
  }

  return schema
}