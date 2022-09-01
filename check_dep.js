const updateNotifer = require("alanngai-update-notifier");
const subscibeList = ["alanngai-node-helper"];
const dependencies = require("./package.json").dependencies;

subscibeList.forEach(pkgName=>{
  new updateNotifer({
    name: pkgName,
    version: dependencies[pkgName]
  })
})
