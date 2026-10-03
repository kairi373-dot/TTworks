// TTworks AI Company runtime state
window.TTWORKS_AI_RUNTIME = {
  version: "1.0.0",
  updated: "2026-10-03",
  states: ["idle","working","reporting","approval_wait","blocked","alert","completed"],
  transitions: {
    idle: ["working"], working: ["reporting","blocked","alert"], reporting: ["approval_wait","completed"],
    approval_wait: ["working","completed","blocked"], blocked: ["working"], alert: ["working","reporting"], completed: ["idle","working"]
  },
  approvalRequired: ["spending","contract","publish_product","price_change","official_external_send"],
  setStatus(id, status, message = "") {
    const event = new CustomEvent("ttworks:ai-status", {detail:{id,status,message,at:new Date().toISOString()}});
    window.dispatchEvent(event);
  }
};
