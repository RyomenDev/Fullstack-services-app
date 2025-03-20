const responseBuilder = {
  success: (res, data, message = "Success", statusCode = 200) => {
    return res.status(statusCode).json({
      status: "success",
      message,
      data,
    });
  },

  created: (res, data, message = "Resource created successfully") => {
    return res.status(201).json({
      status: "success",
      message,
      data,
    });
  },

  badRequest: (res, message = "Bad Request", data = null) => {
    return res.status(400).json({
      status: "error",
      message,
      data,
    });
  },

  unauthorized: (res, message = "Unauthorized", data = null) => {
    return res.status(401).json({
      status: "error",
      message,
      data,
    });
  },

  notFound: (res, message = "Resource not found", data = null) => {
    return res.status(404).json({
      status: "error",
      message,
      data,
    });
  },

  serverError: (res, message = "Internal Server Error", data = null) => {
    return res.status(500).json({
      status: "error",
      message,
      data,
    });
  },
};

module.exports = responseBuilder;
