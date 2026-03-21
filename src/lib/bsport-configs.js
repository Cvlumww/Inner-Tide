/** BSport widget configs — parentElement must match the mount div id */

/**
 * Calendar embedded below gallery (BSport snippet: dialogMode 1).
 */
export const BSPORT_CALENDAR_INLINE = {
  parentElement: "bsport-widget-71461",
  companyId: 5621,
  franchiseId: null,
  dialogMode: 1,
  widgetType: "calendar",
  showFab: false,
  fullScreenPopup: false,
  config: {
    calendar: {},
  },
};

/** Pass widget — opens in our modal (inline in dialog). */
const BOOKING_MODAL_OVERRIDES = {
  dialogMode: 0,
  fullScreenPopup: false,
  showFab: false,
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

/* Private sessions — restore when ready
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
*/

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
