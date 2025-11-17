var warning_1;
var hasRequiredWarning;
function requireWarning() {
  if (hasRequiredWarning) return warning_1;
  hasRequiredWarning = 1;
  var warning = function() {
  };
  warning_1 = warning;
  return warning_1;
}
export {
  requireWarning as r
};
