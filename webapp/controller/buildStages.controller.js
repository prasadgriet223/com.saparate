sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"scp/com/saparate/utils/formatter"
], function (Controller, formatter) {
	"use strict";

	return Controller.extend("scp.com.saparate.controller.buildStages", {
		formatter: formatter,
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf scp.com.saparate.view.buildStages
		 */
		onInit: function () {
			this._oRouter = this.getOwnerComponent().getRouter();
			this._oRouter.getRoute("buildStages").attachPatternMatched(this._onObjectMatched, this);
		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf scp.com.saparate.view.buildStages
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf scp.com.saparate.view.buildStages
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf scp.com.saparate.view.buildStages
		 */
		//	onExit: function() {
		//
		//	}
		_onObjectMatched: function (oEvent) {
			var jobId = oEvent.getParameter("arguments").jobId;
			var buildId= oEvent.getParameter("arguments").buildid;
			var oModel_buildstatusdetails = new sap.ui.model.json.JSONModel();
			oModel_buildstatusdetails.loadData(this.getOwnerComponent().getModel("servers").getProperty("JobStageResults") + "?jobName=" + jobId+"&buildNumber="+buildId)  ;
			this.getView().setModel(oModel_buildstatusdetails, "Jobstatusdetails");
			this.byId("idBuildStages").setTitle("Stagewise Build Results--" + jobId+"--Build#"+buildId);
			
			
		}
	});

});