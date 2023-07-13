import createError from "http-errors";

export const InternalServerError = (error) => {
  return createError.InternalServerError(
    error.message || "Something Went wrong"
  );
};

export const NotFound = (error) => {
  return createError.NotFound(
    error.message || "Something Went wrong"
  );
};
