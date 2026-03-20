/** BSport widget configs — parentElement must match the mount div id */

/**
 * dialogMode: 1 = launcher / popup style (often looks “blank” in a big empty div).
 * For inline embedding inside our modal, use dialogMode: 0.
 */
const BOOKING_MODAL_OVERRIDES = {
  dialogMode: 0,
  fullScreenPopup: false,
  showFab: false,
};

export const BSPORT_CALENDAR = {
  parentElement: "bsport-widget-71461",
  companyId: 5621,
  franchiseId: null,
  ...BOOKING_MODAL_OVERRIDES,
  widgetType: "calendar",
  config: {
    calendar: {},
  },
};

export const BSPORT_PASS = {
  parentElement: "bsport-widget-640742",
  companyId: 5621,
  franchiseId: null,
  ...BOOKING_MODAL_OVERRIDES,
  widgetType: "pass",
  config: {
    pass: {
      paymentPackCategories: [],
      privatePassCategories: [],
    },
  },
};

export const BSPORT_PRIVATE_SESSIONS = {
  parentElement: "bsport-widget-211031",
  companyId: 5621,
  franchiseId: null,
  ...BOOKING_MODAL_OVERRIDES,
  widgetType: "privateService",
  config: {
    privateService: { type: "list" },
  },
};

export const BSPORT_LOGIN = {
  parentElement: "bsport-widget-745073",
  companyId: 5621,
  franchiseId: null,
  dialogMode: 1,
  widgetType: "loginButton",
  showFab: false,
  fullScreenPopup: false,
  config: {
    loginButton: { openMemberProfile: true },
  },
};

export const BSPORT_MEMBER_PROFILE = {
  parentElement: "bsport-widget-273177",
  companyId: 5621,
  franchiseId: null,
  dialogMode: 1,
  widgetType: "consumerSpace",
  showFab: false,
  fullScreenPopup: false,
  config: {
    consumerSpace: {
      loginSubtitle: "",
      loginTitle: "",
      showSubtitle: true,
      showTitle: true,
      hideNavigation: false,
      defaultPage: "consumerBooking",
    },
  },
};
