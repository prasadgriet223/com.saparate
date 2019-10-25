sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("scp.com.saparate.controller.RegisterEnvironments", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf scp.com.saparate.view.RegisterEnvironments
		 */
		onInit: function () {
			this._oRouter = this.getOwnerComponent().getRouter();
			this._oRouter.getRoute("RegisterEnvironments").attachPatternMatched(this._onObjectMatched, this);
		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf scp.com.saparate.view.RegisterEnvironments
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf scp.com.saparate.view.RegisterEnvironments
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf scp.com.saparate.view.RegisterEnvironments
		 */
		//	onExit: function() {
		//
		//	}
		_onObjectMatched: function (oEvent) {
			var oModel_Enviromnents = new sap.ui.model.json.JSONModel();
			var oModel_Credential = new sap.ui.model.json.JSONModel();
			oModel_Enviromnents.loadData(this.getOwnerComponent().getModel("servers").getProperty("getcfc"));
			this.getView().setModel(oModel_Enviromnents, "Enviroments");
			oModel_Credential.loadData(this.getOwnerComponent().getModel("servers").getProperty("credentials"));
			this.getView().setModel(oModel_Credential, "credentials");
		},
		onregisterEnviroment: function (oEvent) {
			this._getDialog().open();
		},
		_getDialog: function () {
			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("scp.com.saparate.view.fragments.Enviromnent", this);
				this.getView().addDependent(this._oDialog);
				this._oDialog.setModel(this.getView().getModel("Enviroments"));
			}
			return this._oDialog;
		},
		onSaveEditEnvironment: function (oEvent) {
			oEvent.getSource().getParent().close();
		},
		openEnvironmentFragment: function (oEvent) {
			this._getDialog().open();
		}
	});

});