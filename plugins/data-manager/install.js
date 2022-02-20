var pluginManager = require('../pluginManager.js');

console.log("Installing data manager plugin");
console.log("Generating schema for events in drill");

pluginManager.dbConnection().then(async(db) => {
    await db.collection('systemlogs').ensureIndex({"i.segment": 1}, {sparse: true, background: true});
    await db.collection('systemlogs').ensureIndex({"i.ev": 1}, {sparse: true, background: true});
    await db.collection('systemlogs').ensureIndex({"i.id": 1}, {sparse: true, background: true});
    try {
        require('./install-extension.js')();
    }
    catch (e) {
        // suppress
    }
    db.close();
});