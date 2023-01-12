const START_OF_REVERT_ERROR = "Error: VM Exception while processing transaction: reverted with reason string '";

export function formatError(error: any): string | null {
  console.log("Error object keys", Object.keys(error));
  console.log(error.reason);
  if (error.reason) {
    if (error.reason.startsWith(START_OF_REVERT_ERROR)) {
      return error.reason.replace(START_OF_REVERT_ERROR, "").replace("'", "");
    }
    return error.reason;
  } else if (error.message) {
    return error.message;
  }
  return null;
}
