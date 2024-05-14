

export const OnUnhandledRejection = (error:Error) => {
    console.error('Unhandled promise rejection:', error);
};