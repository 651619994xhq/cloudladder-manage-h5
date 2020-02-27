export default (name) => (resolve) =>
    import(`@/components/${name}/index`).then((module) => {
        resolve(module)
    })
