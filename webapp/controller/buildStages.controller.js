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
			var buildId = oEvent.getParameter("arguments").buildid;
			var oModel_buildstatusdetails = new sap.ui.model.json.JSONModel();
			oModel_buildstatusdetails.loadData(this.getOwnerComponent().getModel("servers").getProperty("JobStageResults") + "?jobName=" +
				jobId + "&buildNumber=" + buildId);
			// var oModel_buildstatusdetails_cpp = new sap.ui.model.json.JSONModel();
			// oModel_buildstatusdetails_cpp.setData([{
			// 	"name": "#1",
			// 	"duartion": 0,
			// 	"estimatedDuration": 0,
			// 	"number": 1,
			// 	"buildResult": "FAILURE",
			// 	"testResult": null,
			// 	"testReport": null,
			// 	"timeStamp": "2019/10/22 22:55:50",
			// 	"stageResult": {
			// 		"stages": [{
			// 			"id": 7,
			// 			"name": "prepare----000",
			// 			"execNode": "",
			// 			"status": "SUCCESS",
			// 			"startTime": "2019/10/22 22:56:02",
			// 			"duration": 0,
			// 			"pauseDuration": 0
			// 		}, {
			// 			"id": 12,
			// 			"name": "prepareConfigYaml",
			// 			"execNode": "",
			// 			"status": "SUCCESS",
			// 			"startTime": "2019/10/22 22:56:04",
			// 			"duration": 0,
			// 			"pauseDuration": 0
			// 		}, {
			// 			"id": 17,
			// 			"name": "prepareBuild",
			// 			"execNode": "",
			// 			"status": "FAILED",
			// 			"startTime": "2019/10/22 22:56:04",
			// 			"duration": 0,
			// 			"pauseDuration": 0
			// 		}]
			// 	}
			// }]);
			// this.getView().setModel(oModel_buildstatusdetails_cpp, "Jobstatusdetails");
			this.getView().setModel(oModel_buildstatusdetails, "Jobstatusdetails");
			this.byId("idBuildStages").setTitle("Stagewise Build Results--" + jobId + "--Build#" + buildId);
			var oModel_buildstageslog = new sap.ui.model.json.JSONModel();
			oModel_buildstageslog.loadData(this.getOwnerComponent().getModel("servers").getProperty("log") + "?jobName=" +
				jobId + "&buildNumber=" + buildId);
			oModel_buildstageslog.attachRequestCompleted(function () {
				var p = this.byId("idlog_content");
				p.removeAllContent();
				var sResponse = oModel_buildstageslog.getData()["response"];
				var r = JSON.stringify(sResponse).replace(/\\r\\n/g, "<br />");
				var oText2 = new sap.ui.core.HTML();
				oText2.setContent("<div>" + r + " </div>");
				oText2.placeAt(this.byId("idlog_content"));
				this.getView().setBusy(false);
			}.bind(this));
		}
	});

});