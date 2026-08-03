async function asyncHandler(fn: any) {
    return async () => {
        try {
            await fn();
        } catch (error: any) {
            return { error: error.message };
        }
    };
}

export default asyncHandler;
