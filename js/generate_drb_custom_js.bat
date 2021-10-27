REM set the file to empty
type NUL > drb_custom.js
REM define the files to combine
set list= drb.namespaces.js drb.dom.js drb.utilities.js drb.xrm.getdemodata.js drb.models.js drb.ui.js drb.xrm.js drb.common.xrm.js drb.common.map.js drb.common.js drb.logic.js drb.logic.bindings.js drb.generatecode.js drb.customui.js drb.logic.retrievesingle.js drb.logic.column.js drb.logic.filter.js drb.logic.order.js drb.logic.retrievemultiple.js drb.logic.set.js drb.logic.create.js drb.logic.update.js drb.logic.delete.js drb.logic.association.js drb.logic.retrievenextlink.js drb.logic.predefinedquery.js drb.logic.dataverseexecute.js drb.logic.executeworkflow.js drb.collection.js drb.initialize.js
REM merge the files
for %%a in (%list%) do type %%a >> drb_custom.js & echo. >> drb_custom.js & echo. >> drb_custom.js