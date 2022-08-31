import { Evaluators, makeGlobalThis, imports, Module } from './node_modules/@masknet/compartment/dist/index.js'

const redGlobalThis = makeGlobalThis()
const evaluator = new Evaluators({
    globalThis: redGlobalThis,
    importHook(spec) {
        if (spec === 'test') {
            return new Module(
                {
                    bindings: [{ export: 'test' }],
                    execute(env) {
                        env.test = () => {}
                    },
                },
                'test'
            )
        }
    },
})
const module = new evaluator.Module(
    {
        bindings: [{ import: 'test', from: 'test' }],
        execute(env, context) {
            debugger
            env.test
            context?.globalThis.hello
        },
    },
    ''
)
imports(module)
