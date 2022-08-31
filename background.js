import { Evaluators, makeGlobalThis, imports, Module } from './node_modules/@masknet/compartment/dist/index.js'
import createVirtualEnvironment from './node_modules/@masknet/membrane/dist/index.js'

const redGlobalThis = makeGlobalThis()
const vm = createVirtualEnvironment(globalThis, redGlobalThis, {
    endowments: Object.getOwnPropertyDescriptors({
        hello: () => 1,
    }),
})
const evaluator = new Evaluators({
    globalThis: redGlobalThis,
    importHook(spec) {
        if (spec === 'test') {
            return new Module(
                {
                    bindings: [{ export: 'test' }],
                    execute(env) {
                        vm.execute(() => (test) => (env.test = test))(function () {
                            debugger
                        })
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
