export const Success = (data) => {
    return {
      success: true,
      info: data,
    };
  };
  
  export const SetError = (error) => {
    return {
      success: false,
      info: error || null,
    };
  };
  